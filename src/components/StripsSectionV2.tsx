import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { strips, STRIP_DEMO, STRIP_PRODUCT_DEMO } from "../data/strips";
import type { StripProduct, StripType } from "../data/strips";
import StripProductModal from "./StripProductModal";
import { copy } from "../data/translations";
import type { Language } from "../types";

const base = import.meta.env.BASE_URL;
const LOGO_SRC = `${base}assets/logo.png`;

// 7 tarjetas × 120px + 6 huecos × 12px = 912px antes del scroll
const MAX_PRODUCTS_WIDTH = 912;

// ─── BrandRow — definido FUERA del componente padre para que React
//     no lo desmonte/remonte en cada re-render (el hover cambia estado del padre)
// ────────────────────────────────────────────────────────────────────────────
interface BrandRowProps {
  strip: StripType;
  hoveredId: string | null;
  hoveredStripId: string | null;
  onProductEnter: (product: StripProduct, strip: StripType) => void;
  onRowLeave: () => void;
  onOpen: (product: StripProduct, strip: StripType) => void;
}

function BrandRow({ strip, hoveredId, hoveredStripId, onProductEnter, onRowLeave, onOpen }: BrandRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const leftArrowRef = useRef<HTMLDivElement>(null);
  const hasMore = strip.products.length > 7;

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;
    const atStart = el.scrollLeft <= 0;
    if (arrowRef.current) {
      arrowRef.current.style.opacity = atEnd ? "0" : "1";
      arrowRef.current.style.pointerEvents = atEnd ? "none" : "auto";
    }
    if (leftArrowRef.current) {
      leftArrowRef.current.style.opacity = atStart ? "0" : "1";
      leftArrowRef.current.style.pointerEvents = atStart ? "none" : "auto";
    }
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 600, behavior: "smooth" });
  };

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -600, behavior: "smooth" });
  };

  return (
    <div className="flex gap-3 py-1" onMouseLeave={onRowLeave}>
      {/* Logo + DEMO — anclado, fuera del área scrollable */}
      <div className="flex h-[165px] w-[120px] flex-none flex-col gap-1.5">
        <span
          className="self-start rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-white shadow-sm"
          style={{ background: strip.gradient }}
        >
          DEMO
        </span>
        <div className="relative flex-1 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
          <img src={strip.logo ?? LOGO_SRC} alt={strip.id} className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </div>

      {/* Contenedor de productos con scroll + flecha indicadora */}
      <div className="relative" style={{ maxWidth: MAX_PRODUCTS_WIDTH }}>
        {/* Scroll horizontal — máx 7 visibles */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto py-1 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none" }}
          onScroll={handleScroll}
        >
          {strip.products.map((product) => {
            const isHovered = hoveredId === product.id && hoveredStripId === strip.id;
            return (
              <button
                key={product.id}
                type="button"
                onMouseEnter={() => onProductEnter(product, strip)}
                onClick={() => onOpen(product, strip)}
                className="group relative flex w-[120px] flex-none flex-col items-center rounded-[1rem] border border-slate-200 bg-white px-2 py-3 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <span
                  className="mb-1 max-w-full truncate text-[9px] font-black transition group-hover:-translate-y-0.5"
                  style={{ color: strip.color }}
                >
                  {product.ref}
                </span>
                <motion.div
                  animate={{ scale: isHovered ? 1.1 : 1, y: isHovered ? -4 : 0, opacity: isHovered ? 1 : 0.84 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="relative flex h-[100px] w-full items-end justify-center"
                >
                  <div
                    className="absolute inset-x-2 bottom-4 top-4 rounded-full opacity-0 blur-xl transition group-hover:opacity-35"
                    style={{ backgroundColor: strip.color }}
                  />
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    draggable="false"
                    onError={(e) => { e.currentTarget.src = STRIP_PRODUCT_DEMO(strip.color, strip.label); }}
                    className="relative z-10 max-h-[90px] w-auto object-contain drop-shadow-xl"
                  />
                  <div className="absolute bottom-[-6px] h-4 w-12 rounded-full bg-black/15 blur-lg" />
                </motion.div>
                <div
                  className="mt-2 rounded-full px-2.5 py-0.5 text-[9px] font-black text-white shadow-sm"
                  style={{ background: strip.gradient }}
                >
                  {strip.label}
                </div>
              </button>
            );
          })}
        </div>

        {/* Flecha izquierda — oculta al inicio, aparece al deslizar */}
        {hasMore && (
          <div
            ref={leftArrowRef}
            className="pointer-events-none absolute inset-y-0 left-0 flex items-center opacity-0 transition-opacity duration-200"
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 rounded-l-2xl bg-gradient-to-l from-transparent via-white/70 to-white dark:via-slate-900/70 dark:to-slate-900" />
            <button
              type="button"
              onClick={scrollLeft}
              className="relative z-10 ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-150 hover:scale-110 hover:bg-white hover:shadow-xl dark:border-slate-700 dark:bg-slate-800/90 dark:hover:bg-slate-800"
              aria-label="Ver productos anteriores"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-slate-500 dark:text-slate-400">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          </div>
        )}

        {/* Flecha derecha — solo si hay más de 7 productos */}
        {hasMore && (
          <div
            ref={arrowRef}
            className="pointer-events-auto absolute inset-y-0 right-0 flex items-center transition-opacity duration-200"
          >
            {/* Degradado que se funde con el fondo */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 rounded-r-2xl bg-gradient-to-r from-transparent via-white/70 to-white dark:via-slate-900/70 dark:to-slate-900" />
            {/* Botón flecha */}
            <button
              type="button"
              onClick={scrollRight}
              className="relative z-10 mr-2 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-150 hover:scale-110 hover:bg-white hover:shadow-xl dark:border-slate-700 dark:bg-slate-800/90 dark:hover:bg-slate-800"
              aria-label="Ver más productos"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-slate-500 dark:text-slate-400"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────

interface Props {
  language: Language;
}

export default function StripsSectionV2({ language }: Props) {
  const t = copy[language] ?? copy.es;
  const [activeStripIdx, setActiveStripIdx] = useState<number | null>(null);
  const [previewSrc, setPreviewSrc] = useState(strips[0].template);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hoveredStrip, setHoveredStrip] = useState<StripType | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<StripProduct | null>(null);
  const [selectedStrip, setSelectedStrip] = useState<StripType>(strips[0]);

  const activeStrip = activeStripIdx !== null ? strips[activeStripIdx] : strips[0];
  const fichaStrip = hoveredStrip ?? activeStrip;
  const hoveredProduct = fichaStrip.products.find((p) => p.id === hoveredId) ?? null;

  const handleBrandSwitch = useCallback((idx: number | null) => {
    setActiveStripIdx(idx);
    setPreviewSrc(idx !== null ? strips[idx].template : strips[0].template);
    setHoveredId(null);
    setHoveredStrip(null);
  }, []);

  const openProduct = useCallback((product: StripProduct, strip: StripType) => {
    setSelectedProduct(product);
    setSelectedStrip(strip);
  }, []);

  const handleProductEnter = useCallback((product: StripProduct, strip: StripType) => {
    setPreviewSrc(product.preview);
    setHoveredId(product.id);
    setHoveredStrip(strip);
  }, []);

  // ─── Selector de marcas ──────────────────────────────────────────────────
  const BrandSelector = ({ size }: { size: number }) => (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => handleBrandSwitch(null)}
        className={`flex flex-none items-center justify-center overflow-hidden rounded-xl border-2 font-black shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
          activeStripIdx === null
            ? "border-[#169b22] bg-green-50 ring-2 ring-[#169b22]/30 text-[#169b22]"
            : "border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
        }`}
        style={{ width: size, height: size, fontSize: size * 0.18 }}
      >
        ALL
      </button>
      {strips.map((s, i) => (
        <button
          key={s.id}
          type="button"
          onClick={() => handleBrandSwitch(i)}
          className={`flex-none overflow-hidden rounded-xl border-2 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
            activeStripIdx === i ? "border-[#169b22] ring-2 ring-[#169b22]/30" : "border-slate-200"
          }`}
          style={{ width: size, height: size }}
        >
          <img src={s.logo ?? LOGO_SRC} alt={s.id} className="h-full w-full object-cover" />
        </button>
      ))}
    </div>
  );

  // ─── Ficha técnica ───────────────────────────────────────────────────────
  const FichaTecnica = () => (
    <div className="relative min-h-[420px]">
      <motion.div
        animate={{ opacity: hoveredProduct ? 0 : 1 }}
        transition={{ duration: 0.12 }}
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-200 p-4 text-center"
        style={{ pointerEvents: hoveredProduct ? "none" : "auto" }}
      >
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-black text-white shadow-md"
          style={{ background: fichaStrip.gradient }}
        >
          {fichaStrip.label}
        </div>
        <p className="text-[11px] font-medium leading-snug text-slate-400 dark:text-slate-500">{t.stripsHoverHint}</p>
      </motion.div>

      <AnimatePresence>
        {hoveredProduct && (
          <motion.div
            key={hoveredProduct.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            className="absolute inset-0 flex flex-col gap-3 overflow-y-auto rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-lg backdrop-blur-sm"
          >
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">{t.stripsProductEyebrow}</p>
              <span
                className="rounded-full px-2.5 py-0.5 text-[9px] font-black text-white shadow-sm"
                style={{ background: fichaStrip.gradient }}
              >
                {fichaStrip.label}
              </span>
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">{t.stripsRef}</p>
              <p className="mt-0.5 text-2xl font-black text-slate-900">{hoveredProduct.ref}</p>
            </div>
            <div
              className="flex items-center justify-center rounded-xl p-3"
              style={{ backgroundColor: fichaStrip.color + "12" }}
            >
              <img
                src={hoveredProduct.image}
                alt={hoveredProduct.name}
                onError={(e) => { e.currentTarget.src = STRIP_PRODUCT_DEMO(fichaStrip.color, fichaStrip.label); }}
                className="h-16 w-auto object-contain drop-shadow-md"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              {([
                [t.stripsSalePrice, fichaStrip.label, true],
                [t.stripsUnitsPerStrip, "12 uds.", false],
              ] as [string, string, boolean][]).map(([label, value, colored]) => (
                <div key={label}>
                  <p className="font-black uppercase tracking-wider text-slate-400">{label}</p>
                  <div
                    className={`mt-1 flex h-7 items-center justify-center rounded-lg text-[10px] font-black ${colored ? "" : "bg-slate-50 text-slate-700"}`}
                    style={colored ? { background: fichaStrip.gradient, color: "white" } : undefined}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] leading-relaxed text-slate-500">{t.stripsProductDescription}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const visibleStrips = activeStripIdx === null ? strips : [strips[activeStripIdx]];

  return (
    <>
      {/* ══════════════════════════════════════════════
          VISTA MÓVIL  (oculta en md+)
      ══════════════════════════════════════════════ */}
      <div className="flex flex-col gap-5 md:hidden">
        <div className="px-2">
          <span className="mb-2 inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            El complemento perfecto
          </span>
          <h2 className="text-4xl font-black tracking-tight text-slate-950 dark:text-white">
            Strips Supermarket
          </h2>
        </div>

        {/* Info envío */}
        <div className="flex flex-col gap-2 px-2">
          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
            PEDIDO MÍNIMO 1 PALET = 27 CAJAS
          </p>
          <img src={`${base}assets/tiras/imagen-envio.png`} alt="Imagen envío" className="w-full object-contain" />
        </div>

        {/* Selector */}
        <div className="px-2"><BrandSelector size={44} /></div>

        {/* Filas de marcas */}
        <div className="flex flex-col gap-4 px-2">
          {visibleStrips.map((strip) => (
            <div
              key={strip.id}
              className="flex gap-3 overflow-x-auto py-1 [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: "none" }}
            >
              <div className="h-[120px] w-[100px] flex-none overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                <img src={strip.logo ?? LOGO_SRC} alt={strip.id} className="h-full w-full object-cover" />
              </div>
              {strip.products.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => openProduct(product, strip)}
                  className="group mr-1 flex w-[100px] flex-none flex-col items-center rounded-2xl border border-slate-200 bg-white/90 px-2 py-3 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <span className="mb-1 max-w-full truncate text-[9px] font-black" style={{ color: strip.color }}>{product.ref}</span>
                  <div className="relative flex h-[72px] w-full items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      draggable="false"
                      onError={(e) => { e.currentTarget.src = STRIP_PRODUCT_DEMO(strip.color, strip.label); }}
                      className="relative z-10 max-h-[64px] w-auto object-contain drop-shadow-lg"
                    />
                  </div>
                  <div className="mt-2 rounded-full px-2 py-0.5 text-[9px] font-black text-white shadow-sm" style={{ background: strip.gradient }}>{strip.label}</div>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          VISTA DESKTOP  (oculta en móvil)
      ══════════════════════════════════════════════ */}
      <div className="hidden md:flex md:gap-6">

        {/* Columna izquierda */}
        <div className="flex min-w-0 flex-1 flex-col gap-5">

          {/* Col1 (título/envío) + Col2 (preview) */}
          <div className="grid grid-cols-2 gap-4">

            {/* Col 1 */}
            <div className="flex flex-col justify-center gap-6 p-4">
              <div>
                <span className="mb-3 inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  El complemento perfecto
                </span>
                <h2 className="mt-2 text-6xl font-black tracking-tight text-slate-950 dark:text-white">
                  Strips Supermarket
                </h2>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                  1 CAJA = 10 TIRAS = 100 UNIDADES
                </p>
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                  PEDIDO MÍNIMO 1 PALET = 27 CAJAS
                </p>
                <img src={`${base}assets/tiras/imagen-envio.png`} alt="Imagen envío" className="w-full object-contain" />
              </div>
            </div>

            {/* Col 2: preview */}
            <div className="flex flex-col gap-3">
              <div className="relative flex min-h-[320px] flex-1 items-center justify-center px-4 py-6">
                <div
                  className="pointer-events-none absolute inset-x-8 inset-y-12 rounded-full opacity-20 blur-3xl transition-colors duration-500"
                  style={{ backgroundColor: fichaStrip.color }}
                />
                <div className="absolute bottom-6 h-8 w-40 rounded-full bg-black/10 blur-2xl" />
                <div className="relative h-[280px] w-full">
                  <AnimatePresence mode="sync">
                    <motion.img
                      key={previewSrc}
                      src={previewSrc}
                      alt={`Tira ${activeStrip.label}`}
                      draggable="false"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.1, ease: "easeOut" }}
                      onError={(e) => { e.currentTarget.src = STRIP_DEMO(activeStrip.color, activeStrip.label); }}
                      className="absolute inset-0 m-auto max-h-full max-w-full object-contain drop-shadow-2xl"
                    />
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Selector de marcas */}
          <BrandSelector size={52} />

          {/* Filas de marcas */}
          <div className="flex flex-col gap-5">
            {visibleStrips.map((strip) => (
              <BrandRow
                key={strip.id}
                strip={strip}
                hoveredId={hoveredId}
                hoveredStripId={hoveredStrip?.id ?? null}
                onProductEnter={handleProductEnter}
                onRowLeave={() => {
                  setPreviewSrc(activeStripIdx !== null ? strip.template : strips[0].template);
                  setHoveredId(null);
                  setHoveredStrip(null);
                }}
                onOpen={openProduct}
              />
            ))}
          </div>
        </div>

        {/* Ficha técnica sticky — se detiene al final de la sección */}
        <div className="w-72 flex-none">
          <div className="sticky top-4">
            <FichaTecnica />
          </div>
        </div>
      </div>

      {/* Modal */}
      <StripProductModal
        product={selectedProduct}
        strip={selectedStrip}
        onClose={() => setSelectedProduct(null)}
        language={language}
      />
    </>
  );
}
