import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { strips, STRIP_DEMO, STRIP_PRODUCT_DEMO } from "../data/strips";
import type { StripProduct, StripType } from "../data/strips";
import StripProductModal from "./StripProductModal";
import { copy } from "../data/translations";
import { brandGradients } from "../data/stands";
import type { Language } from "../types";

const base = import.meta.env.BASE_URL;
const LOGO_SRC = `${base}assets/logo.png`;
const LEIVA_GREEN = brandGradients.green;

interface Props {
  language: Language;
}

// Fila de una marca (usada en modo ALL y modo individual)
function BrandRow({
  strip,
  onProductClick,
  onMouseEnter,
  onMouseLeave,
  hoveredId,
}: {
  strip: StripType;
  onProductClick: (p: StripProduct, s: StripType) => void;
  onMouseEnter?: (p: StripProduct) => void;
  onMouseLeave?: () => void;
  hoveredId?: string | null;
}) {
  return (
    <div
      className="flex gap-3 overflow-x-auto py-1 [&::-webkit-scrollbar]:hidden"
      style={{ scrollbarWidth: "none" }}
      onMouseLeave={onMouseLeave}
    >
      {/* Logo + DEMO */}
      <div className="flex h-[165px] w-[120px] flex-none flex-col gap-1.5">
        <span
          className="self-start rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-white shadow-sm"
          style={{ background: LEIVA_GREEN }}
        >
          DEMO
        </span>
        <div className="relative flex-1 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
          <img
            src={strip.logo ?? LOGO_SRC}
            alt={strip.id}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Productos */}
      {strip.products.map((product) => {
        const isHovered = hoveredId === product.id;
        return (
          <button
            key={product.id}
            type="button"
            onMouseEnter={() => onMouseEnter?.(product)}
            onClick={() => onProductClick(product, strip)}
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
              style={{ background: LEIVA_GREEN }}
            >
              {strip.label}
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default function StripsSectionV2({ language }: Props) {
  const t = copy[language] ?? copy.es;
  // null = ALL, number = índice de marca seleccionada
  const [activeStripIdx, setActiveStripIdx] = useState<number | null>(null);
  const [previewSrc, setPreviewSrc] = useState(strips[0].template);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<StripProduct | null>(null);
  const [selectedStrip, setSelectedStrip] = useState<StripType>(strips[0]);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeStrip = activeStripIdx !== null ? strips[activeStripIdx] : strips[0];
  const hoveredProduct = activeStrip.products.find((p) => p.id === hoveredId) ?? null;

  const handleBrandSwitch = useCallback((idx: number | null) => {
    setActiveStripIdx(idx);
    if (idx !== null) setPreviewSrc(strips[idx].template);
    setHoveredId(null);
    setMobileActiveIndex(0);
  }, []);

  const openProduct = useCallback((product: StripProduct, strip: StripType) => {
    setSelectedProduct(product);
    setSelectedStrip(strip);
  }, []);

  const handleCarouselScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const itemW = el.clientWidth * 0.72 + 16;
    const idx = Math.round(el.scrollLeft / itemW);
    setMobileActiveIndex(Math.max(0, Math.min(idx, activeStrip.products.length - 1)));
  }, [activeStrip.products.length]);

  // ─── Selector de marcas (compartido mobile/desktop) ──────────────────────
  const BrandSelector = ({ size }: { size: number }) => (
    <div className="flex gap-2">
      {/* Botón ALL */}
      <button
        type="button"
        onClick={() => handleBrandSwitch(null)}
        className={`flex flex-none items-center justify-center overflow-hidden rounded-xl border-2 font-black text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:text-slate-300 ${
          activeStripIdx === null
            ? "border-[#169b22] bg-green-50 ring-2 ring-[#169b22]/30 dark:bg-green-950"
            : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
        }`}
        style={{ width: size, height: size, fontSize: size * 0.18 }}
      >
        ALL
      </button>

      {/* Logos de cada marca */}
      {strips.map((s, i) => (
        <button
          key={s.id}
          type="button"
          onClick={() => handleBrandSwitch(i)}
          className={`flex-none overflow-hidden rounded-xl border-2 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
            activeStripIdx === i
              ? "border-[#169b22] ring-2 ring-[#169b22]/30"
              : "border-slate-200"
          }`}
          style={{ width: size, height: size }}
        >
          <img
            src={s.logo ?? LOGO_SRC}
            alt={s.id}
            className="h-full w-full object-cover"
          />
        </button>
      ))}
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

        {/* Selector de marcas */}
        <div className="px-2">
          <BrandSelector size={44} />
        </div>

        {activeStripIdx === null ? (
          /* ALL: todas las marcas apiladas */
          <div className="flex flex-col gap-4 px-2">
            {strips.map((strip) => (
              <div key={strip.id} className="flex gap-3 overflow-x-auto py-1 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
                {/* Logo móvil */}
                <div className="h-[136px] w-[100px] flex-none overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                  <img src={strip.logo ?? LOGO_SRC} alt={strip.id} className="h-full w-full object-cover" />
                </div>
                {/* Productos */}
                {strip.products.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => openProduct(product, strip)}
                    className="group mr-1 flex w-[100px] flex-none flex-col items-center rounded-2xl border border-slate-200 bg-white/90 px-2 py-3 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <span className="mb-1 max-w-full truncate text-[9px] font-black" style={{ color: strip.color }}>
                      {product.ref}
                    </span>
                    <div className="relative flex h-[72px] w-full items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        draggable="false"
                        onError={(e) => { e.currentTarget.src = STRIP_PRODUCT_DEMO(strip.color, strip.label); }}
                        className="relative z-10 max-h-[64px] w-auto object-contain drop-shadow-lg"
                      />
                    </div>
                    <div className="mt-2 rounded-full px-2 py-0.5 text-[9px] font-black text-white shadow-sm" style={{ background: LEIVA_GREEN }}>
                      {strip.label}
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        ) : (
          /* Marca individual */
          <div
            ref={scrollRef}
            onScroll={handleCarouselScroll}
            className="flex overflow-x-auto px-2 py-2 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="h-[136px] w-[100px] flex-none overflow-hidden rounded-2xl border border-slate-200 shadow-sm mr-3">
              <img src={activeStrip.logo ?? LOGO_SRC} alt={activeStrip.id} className="h-full w-full object-cover" />
            </div>
            {activeStrip.products.map((product, i) => {
              const isActive = i === mobileActiveIndex;
              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => {
                    if (!isActive) setMobileActiveIndex(i);
                    else openProduct(product, activeStrip);
                  }}
                  className="group mr-3 flex w-[100px] flex-none flex-col items-center rounded-2xl border border-slate-200 bg-white/90 px-2 py-3 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <span className="mb-1 max-w-full truncate text-[9px] font-black" style={{ color: activeStrip.color }}>
                    {product.ref}
                  </span>
                  <div className="relative flex h-[72px] w-full items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      draggable="false"
                      onError={(e) => { e.currentTarget.src = STRIP_PRODUCT_DEMO(activeStrip.color, activeStrip.label); }}
                      className="relative z-10 max-h-[64px] w-auto object-contain drop-shadow-lg"
                    />
                  </div>
                  <div className="mt-2 rounded-full px-2 py-0.5 text-[9px] font-black text-white shadow-sm" style={{ background: LEIVA_GREEN }}>
                    {activeStrip.label}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════
          VISTA DESKTOP  (oculta en móvil)
      ══════════════════════════════════════════════ */}
      <div className="hidden flex-col gap-5 md:flex">
        {/* Selector de marcas */}
        <BrandSelector size={52} />

        {activeStripIdx === null ? (
          /* ALL: todas las marcas apiladas */
          <div className="flex flex-col gap-5">
            {strips.map((strip) => (
              <BrandRow
                key={strip.id}
                strip={strip}
                onProductClick={openProduct}
              />
            ))}
          </div>
        ) : (
          /* Marca individual: título + preview + ficha + fila */
          <>
            <section className="relative z-10 w-full items-stretch gap-4 md:grid md:grid-cols-[0.38fr_0.38fr_0.24fr]">
              {/* Col 1: título + logo */}
              <div className="flex flex-col justify-center gap-6 p-4">
                <div>
                  <span className="mb-3 inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    El complemento perfecto
                  </span>
                  <h2 className="mt-2 text-6xl font-black tracking-tight text-slate-950 dark:text-white">
                    Strips Supermarket
                  </h2>
                </div>
                {activeStrip.logo && (
                  <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                    <img src={activeStrip.logo} alt={activeStrip.id} className="max-h-[120px] w-full object-cover" />
                  </div>
                )}
              </div>

              {/* Col 2: preview */}
              <div className="flex flex-col gap-3">
                <div className="relative flex min-h-[320px] flex-1 items-center justify-center px-4 py-6">
                  <div
                    className="pointer-events-none absolute inset-x-8 inset-y-12 rounded-full opacity-20 blur-3xl transition-colors duration-500"
                    style={{ backgroundColor: activeStrip.color }}
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

              {/* Col 3: ficha técnica en hover */}
              <div className="relative min-h-[420px]">
                <motion.div
                  animate={{ opacity: hoveredProduct ? 0 : 1 }}
                  transition={{ duration: 0.12 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-200 p-4 text-center"
                  style={{ pointerEvents: hoveredProduct ? "none" : "auto" }}
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-black text-white shadow-md"
                    style={{ background: LEIVA_GREEN }}
                  >
                    {activeStrip.label}
                  </div>
                  <p className="text-[11px] font-medium leading-snug text-slate-400 dark:text-slate-500">
                    {t.stripsHoverHint}
                  </p>
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
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                          {t.stripsProductEyebrow}
                        </p>
                        <span className="rounded-full px-2.5 py-0.5 text-[9px] font-black text-white shadow-sm" style={{ background: LEIVA_GREEN }}>
                          {activeStrip.label}
                        </span>
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">{t.stripsRef}</p>
                        <p className="mt-0.5 text-2xl font-black text-slate-900">{hoveredProduct.ref}</p>
                      </div>
                      <div className="flex items-center justify-center rounded-xl p-3" style={{ backgroundColor: activeStrip.color + "12" }}>
                        <img
                          src={hoveredProduct.image}
                          alt={hoveredProduct.name}
                          onError={(e) => { e.currentTarget.src = STRIP_PRODUCT_DEMO(activeStrip.color, activeStrip.label); }}
                          className="h-16 w-auto object-contain drop-shadow-md"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        {[
                          [t.stripsSalePrice, activeStrip.label, true],
                          [t.stripsUnitsPerStrip, "12 uds.", false],
                        ].map(([label, value, colored]) => (
                          <div key={String(label)}>
                            <p className="font-black uppercase tracking-wider text-slate-400">{label}</p>
                            <div
                              className={`mt-1 flex h-7 items-center justify-center rounded-lg text-[10px] font-black ${colored ? "" : "bg-slate-50 text-slate-700"}`}
                              style={colored ? { background: LEIVA_GREEN, color: "white" } : undefined}
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
            </section>

            {/* Fila de productos */}
            <BrandRow
              strip={activeStrip}
              onProductClick={openProduct}
              onMouseEnter={(p) => { setPreviewSrc(p.preview); setHoveredId(p.id); }}
              onMouseLeave={() => { setPreviewSrc(activeStrip.template); setHoveredId(null); }}
              hoveredId={hoveredId}
            />
          </>
        )}
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
