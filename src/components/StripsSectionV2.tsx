import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { strips, STRIP_DEMO, STRIP_PRODUCT_DEMO } from "../data/strips";
import type { StripProduct } from "../data/strips";
import StripProductModal from "./StripProductModal";
import { copy } from "../data/translations";
import type { Language } from "../types";

const base = import.meta.env.BASE_URL;
const LOGO_SRC = `${base}assets/logo.png`;

interface Props {
  language: Language;
}

export default function StripsSectionV2({ language }: Props) {
  const t = copy[language] ?? copy.es;
  const [previewSrc, setPreviewSrc] = useState(strips[0].template);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<StripProduct | null>(null);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeStrip = strips[0];
  const hoveredProduct = activeStrip.products.find((p) => p.id === hoveredId) ?? null;

  const handleCarouselScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const itemW = el.clientWidth * 0.72 + 16;
    const idx = Math.round(el.scrollLeft / itemW);
    setMobileActiveIndex(Math.max(0, Math.min(idx, activeStrip.products.length - 1)));
  }, [activeStrip.products.length]);

  return (
    <>
      {/* ══════════════════════════════════════════════
          VISTA MÓVIL  (oculta en md+)
      ══════════════════════════════════════════════ */}
      <div className="flex flex-col gap-5 md:hidden">
        <div className="px-2">
          <h2 className="text-4xl font-black tracking-tight text-slate-950 dark:text-white">
            Strips Supermarket
          </h2>
        </div>

        {/* Fila logo + productos — 1 línea, scroll horizontal */}
        <div
          ref={scrollRef}
          onScroll={handleCarouselScroll}
          className="flex overflow-x-auto py-2 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", paddingLeft: "8px", paddingRight: "8px" }}
        >
          {/* Logo de marca */}
          <div className="mr-3 flex w-[100px] flex-none flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <img src={activeStrip.logo ?? LOGO_SRC} alt={activeStrip.id} className="max-h-[60px] w-full object-contain" />
          </div>

          {/* Productos */}
          {activeStrip.products.map((product, i) => {
            const isActive = i === mobileActiveIndex;
            return (
              <button
                key={product.id}
                type="button"
                onClick={() => {
                  if (!isActive) setMobileActiveIndex(i);
                  else setSelectedProduct(product);
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
                <div className="mt-2 rounded-full px-2 py-0.5 text-[9px] font-black text-white shadow-sm" style={{ background: activeStrip.gradient }}>
                  {activeStrip.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          VISTA DESKTOP  (oculta en móvil)
      ══════════════════════════════════════════════ */}

      {/* Parte 1: título + preview tira + ficha técnica */}
      <section className="relative z-10 hidden w-full items-stretch gap-4 md:grid md:grid-cols-[0.38fr_0.38fr_0.24fr]">

        {/* Col 1: título + logo de marca */}
        <div className="flex flex-col justify-center gap-6 p-4">
          <h2 className="text-6xl font-black tracking-tight text-slate-950 dark:text-white">
            Strips Supermarket
          </h2>
          {activeStrip.logo && (
            <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <img
                src={activeStrip.logo}
                alt={activeStrip.id}
                className="max-h-[100px] w-full object-contain"
              />
            </div>
          )}
        </div>

        {/* Col 2: preview de la tira (igual que antes) + badge DEMO */}
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

        {/* Col 3: ficha técnica en hover — sin cambios */}
        <div className="relative min-h-[420px]">
          <motion.div
            animate={{ opacity: hoveredProduct ? 0 : 1 }}
            transition={{ duration: 0.12 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-200 p-4 text-center"
            style={{ pointerEvents: hoveredProduct ? "none" : "auto" }}
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-black text-white shadow-md"
              style={{ background: activeStrip.gradient }}
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
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[9px] font-black text-white shadow-sm"
                    style={{ background: activeStrip.gradient }}
                  >
                    {activeStrip.label}
                  </span>
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">{t.stripsRef}</p>
                  <p className="mt-0.5 text-2xl font-black text-slate-900">{hoveredProduct.ref}</p>
                </div>
                <div
                  className="flex items-center justify-center rounded-xl p-3"
                  style={{ backgroundColor: activeStrip.color + "12" }}
                >
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
                    [t.stripsEAN, `8437${hoveredProduct.ref}`, false],
                    [t.stripsStock, "240 uds.", false],
                  ].map(([label, value, colored]) => (
                    <div key={String(label)}>
                      <p className="font-black uppercase tracking-wider text-slate-400">{label}</p>
                      <div
                        className={`mt-1 flex h-7 items-center justify-center rounded-lg text-[10px] font-black ${colored ? "" : "bg-slate-50 text-slate-700"}`}
                        style={colored ? { background: activeStrip.gradient, color: "white" } : undefined}
                      >
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] leading-relaxed text-slate-500">
                  {t.stripsProductDescription}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Parte 2: fila logo + productos (desktop) — 1 línea, scroll horizontal */}
      <div
        className="hidden overflow-x-auto py-1 [&::-webkit-scrollbar]:hidden md:block"
        style={{ scrollbarWidth: "none" }}
        onMouseLeave={() => { setPreviewSrc(activeStrip.template); setHoveredId(null); }}
      >
        <div className="flex gap-3">
          {/* Logo de marca + badge DEMO encima */}
          <div className="flex w-[120px] flex-none flex-col gap-1.5">
            <span
              className="self-start rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-white shadow-sm"
              style={{ background: activeStrip.gradient }}
            >
              DEMO
            </span>
            <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <img
                src={activeStrip.logo ?? LOGO_SRC}
                alt={activeStrip.id}
                className="max-h-[72px] w-full object-contain"
              />
            </div>
          </div>

          {/* Productos */}
          {activeStrip.products.map((product) => {
            const isHovered = hoveredId === product.id;
            return (
              <button
                key={product.id}
                type="button"
                onMouseEnter={() => { setPreviewSrc(product.preview); setHoveredId(product.id); }}
                onClick={() => setSelectedProduct(product)}
                className="group relative flex w-[120px] flex-none flex-col items-center rounded-[1rem] border border-slate-200 bg-white px-2 py-3 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <span
                  className="mb-1 max-w-full truncate text-[9px] font-black transition group-hover:-translate-y-0.5"
                  style={{ color: activeStrip.color }}
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
                    style={{ backgroundColor: activeStrip.color }}
                  />
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    draggable="false"
                    onError={(e) => { e.currentTarget.src = STRIP_PRODUCT_DEMO(activeStrip.color, activeStrip.label); }}
                    className="relative z-10 max-h-[90px] w-auto object-contain drop-shadow-xl"
                  />
                  <div className="absolute bottom-[-6px] h-4 w-12 rounded-full bg-black/15 blur-lg" />
                </motion.div>
                <div
                  className="mt-2 rounded-full px-2.5 py-0.5 text-[9px] font-black text-white shadow-sm"
                  style={{ background: activeStrip.gradient }}
                >
                  {activeStrip.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <StripProductModal
        product={selectedProduct}
        strip={activeStrip}
        onClose={() => setSelectedProduct(null)}
        language={language}
      />
    </>
  );
}
