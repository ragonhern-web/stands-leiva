import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { strips, STRIP_DEMO, STRIP_PRODUCT_DEMO } from "../data/strips";
import type { StripProduct, StripType } from "../data/strips";
import StripProductModal from "./StripProductModal";
import { copy } from "../data/translations";
import type { Language } from "../types";

const base = import.meta.env.BASE_URL;
const LOGO_SRC = `${base}assets/logo.png`;

// 7 cards × 120px + 6 gaps × 12px = 912px visible antes de scroll
const MAX_PRODUCTS_WIDTH = "912px";

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

  // ─── Fila de una marca ─────────────────────────────────────────────────────
  // Logo fijo fuera del área scrollable; productos con scroll a partir del 8º
  const BrandRow = ({ strip }: { strip: StripType }) => (
    <div
      className="flex gap-3 py-1"
      onMouseLeave={() => {
        setPreviewSrc(activeStripIdx !== null ? strip.template : strips[0].template);
        setHoveredId(null);
        setHoveredStrip(null);
      }}
    >
      {/* Logo + DEMO — anclado, no participa en el scroll */}
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

      {/* Productos — scroll horizontal, máximo 7 visibles a la vez */}
      <div
        className="flex gap-3 overflow-x-auto py-1 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none", maxWidth: MAX_PRODUCTS_WIDTH }}
      >
        {strip.products.map((product) => {
          const isHovered = hoveredId === product.id && hoveredStrip?.id === strip.id;
          return (
            <button
              key={product.id}
              type="button"
              onMouseEnter={() => {
                setPreviewSrc(product.preview);
                setHoveredId(product.id);
                setHoveredStrip(strip);
              }}
              onClick={() => openProduct(product, strip)}
              className="group relative flex w-[120px] flex-none flex-col items-center rounded-[1rem] border border-slate-200 bg-white px-2 py-3 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <span className="mb-1 max-w-full truncate text-[9px] font-black transition group-hover:-translate-y-0.5" style={{ color: strip.color }}>
                {product.ref}
              </span>
              <motion.div
                animate={{ scale: isHovered ? 1.1 : 1, y: isHovered ? -4 : 0, opacity: isHovered ? 1 : 0.84 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="relative flex h-[100px] w-full items-end justify-center"
              >
                <div className="absolute inset-x-2 bottom-4 top-4 rounded-full opacity-0 blur-xl transition group-hover:opacity-35" style={{ backgroundColor: strip.color }} />
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
              <div className="mt-2 rounded-full px-2.5 py-0.5 text-[9px] font-black text-white shadow-sm" style={{ background: strip.gradient }}>
                {strip.label}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  // ─── Selector de marcas ────────────────────────────────────────────────────
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

  // ─── Ficha técnica (contenido compartido) ──────────────────────────────────
  const FichaTecnica = () => (
    <div className="relative min-h-[420px]">
      <motion.div
        animate={{ opacity: hoveredProduct ? 0 : 1 }}
        transition={{ duration: 0.12 }}
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-200 p-4 text-center"
        style={{ pointerEvents: hoveredProduct ? "none" : "auto" }}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-black text-white shadow-md" style={{ background: fichaStrip.gradient }}>
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
              <span className="rounded-full px-2.5 py-0.5 text-[9px] font-black text-white shadow-sm" style={{ background: fichaStrip.gradient }}>{fichaStrip.label}</span>
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">{t.stripsRef}</p>
              <p className="mt-0.5 text-2xl font-black text-slate-900">{hoveredProduct.ref}</p>
            </div>
            <div className="flex items-center justify-center rounded-xl p-3" style={{ backgroundColor: fichaStrip.color + "12" }}>
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
            1 CAJA = 10 TIRAS = 100 UNIDADES
          </p>
          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
            PEDIDO MÍNIMO 1 PALET (25 CAJAS)
          </p>
          <img
            src={`${base}assets/tiras/imagen-envio.png`}
            alt="Imagen envío"
            className="w-full object-contain"
          />
        </div>

        {/* Selector */}
        <div className="px-2"><BrandSelector size={44} /></div>

        {/* Filas de marcas */}
        <div className="flex flex-col gap-4 px-2">
          {(activeStripIdx === null ? strips : [strips[activeStripIdx]]).map((strip) => (
            <div key={strip.id} className="flex gap-3 overflow-x-auto py-1 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
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
          Estructura: [contenido izquierdo flex-1] + [ficha sticky derecha]
          La ficha se ancla al top mientras scrolleas las filas de marcas,
          y se detiene sola al llegar al final de la sección (bottom del padre).
      ══════════════════════════════════════════════ */}
      <div className="hidden md:flex md:gap-6">

        {/* ── Columna izquierda: título + preview + selector + filas ── */}
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
                  PEDIDO MÍNIMO 1 PALET (25 CAJAS)
                </p>
                <img
                  src={`${base}assets/tiras/imagen-envio.png`}
                  alt="Imagen envío"
                  className="w-full object-contain"
                />
              </div>
            </div>

            {/* Col 2: preview */}
            <div className="flex flex-col gap-3">
              <div className="relative flex min-h-[320px] flex-1 items-center justify-center px-4 py-6">
                <div className="pointer-events-none absolute inset-x-8 inset-y-12 rounded-full opacity-20 blur-3xl transition-colors duration-500" style={{ backgroundColor: fichaStrip.color }} />
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
            {(activeStripIdx === null ? strips : [strips[activeStripIdx]]).map((strip) => (
              <BrandRow key={strip.id} strip={strip} />
            ))}
          </div>
        </div>

        {/* ── Ficha técnica sticky ── */}
        {/* El div.w-72 ocupa la misma altura que la columna izquierda (flex stretch),
            así que sticky se detiene exactamente al final de la sección. */}
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
