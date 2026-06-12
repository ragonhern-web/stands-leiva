import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { strips, STRIP_DEMO, STRIP_PRODUCT_DEMO } from "../data/strips";
import type { StripProduct } from "../data/strips";
import StripProductModal from "./StripProductModal";
import type { Language } from "../types";

interface Props {
  language: Language;
}

export default function StripsSectionV2({ language: _language }: Props) {
  const [activeStripId, setActiveStripId] = useState(strips[0].id);
  const [previewSrc, setPreviewSrc] = useState(strips[0].template);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<StripProduct | null>(null);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeStrip = strips.find((s) => s.id === activeStripId) ?? strips[0];
  const hoveredProduct = activeStrip.products.find((p) => p.id === hoveredId) ?? null;

  // Al cambiar de tira, vuelve al primer producto en móvil
  useEffect(() => {
    setMobileActiveIndex(0);
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
  }, [activeStripId]);

  function handleChangeStrip(id: string) {
    const next = strips.find((s) => s.id === id) ?? strips[0];
    setActiveStripId(next.id);
    setPreviewSrc(next.template);
    setHoveredId(null);
  }

  const handleCarouselScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const itemW = el.clientWidth * 0.72 + 16;
    const idx = Math.round(el.scrollLeft / itemW);
    setMobileActiveIndex(Math.max(0, Math.min(idx, activeStrip.products.length - 1)));
  }, [activeStrip.products.length]);

  // ── Tabs compartidos (móvil y desktop) ──────────────────────────────────
  const tabButtons = (
    <div className="flex gap-2">
      {strips.map((strip) => (
        <button
          key={strip.id}
          type="button"
          onClick={() => handleChangeStrip(strip.id)}
          className={`rounded-full border px-5 py-2 text-sm font-black shadow-sm transition hover:-translate-y-0.5 ${
            activeStrip.id === strip.id
              ? "border-transparent text-white"
              : "border-slate-200 bg-white text-slate-700"
          }`}
          style={activeStrip.id === strip.id ? { backgroundColor: strip.color } : undefined}
        >
          {strip.label}
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
        {/* Cabecera */}
        <div className="px-2">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.32em] text-slate-400">
            TIRAS PROMOCIONALES
          </p>
          <h2 className="text-4xl font-black tracking-tight text-slate-950">
            Tiras para supermercado
          </h2>
          <p className="mt-3 text-sm font-medium leading-relaxed text-slate-500">
            Tiras expositoras de precio único para lineales de supermercado.
            Disponibles en tres gamas de precio:
          </p>
          <div className="mt-4">{tabButtons}</div>
        </div>

        {/* Carrusel de productos */}
        <div
          ref={scrollRef}
          onScroll={handleCarouselScroll}
          className="flex overflow-x-auto py-4 [&::-webkit-scrollbar]:hidden"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            paddingLeft: "14%",
            paddingRight: "14%",
          }}
        >
          {activeStrip.products.map((product, i) => {
            const dist = Math.abs(i - mobileActiveIndex);
            const isCenter = dist === 0;
            return (
              <div
                key={product.id}
                style={{
                  minWidth: "72%",
                  marginRight: "16px",
                  scrollSnapAlign: "center",
                  transform: `scale(${isCenter ? 1 : 0.86}) translateY(${isCenter ? 0 : 14}px)`,
                  opacity: isCenter ? 1 : dist === 1 ? 0.72 : 0.45,
                  transition: "transform 0.25s ease, opacity 0.25s ease",
                  transformOrigin: "center bottom",
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (!isCenter) {
                      setMobileActiveIndex(i);
                    } else {
                      setSelectedProduct(product);
                    }
                  }}
                  className="group flex w-full flex-col items-center rounded-[1.5rem] border border-slate-200 bg-white/90 px-3 py-5 shadow-xl shadow-slate-300/35"
                >
                  {/* Ref */}
                  <span
                    className="mb-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-black shadow-sm"
                    style={{ color: activeStrip.color }}
                  >
                    {product.ref}
                  </span>

                  {/* Imagen */}
                  <div className="relative flex h-[180px] w-full items-end justify-center">
                    <div
                      className="absolute inset-x-4 bottom-6 top-8 rounded-full opacity-30 blur-2xl"
                      style={{ backgroundColor: activeStrip.color }}
                    />
                    <img
                      src={product.image}
                      alt={product.name}
                      draggable="false"
                      onError={(e) => {
                        e.currentTarget.src = STRIP_PRODUCT_DEMO(activeStrip.color, activeStrip.label);
                      }}
                      className="relative z-10 max-h-[165px] w-auto object-contain drop-shadow-2xl"
                    />
                    <div className="absolute bottom-[-8px] h-6 w-24 rounded-full bg-black/15 blur-xl" />
                  </div>

                  {/* Badge precio */}
                  <div
                    className="mt-4 rounded-full px-4 py-1 text-sm font-black text-white"
                    style={{ backgroundColor: activeStrip.color }}
                  >
                    {activeStrip.label}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          VISTA DESKTOP  (oculta en móvil)
      ══════════════════════════════════════════════ */}

      {/* Parte 1: Hero 3 columnas */}
      <section className="relative z-10 hidden w-full items-stretch gap-4 md:grid md:grid-cols-[0.38fr_0.38fr_0.24fr]">

        {/* Col 1: título + descripción + selector */}
        <div className="flex flex-col justify-center p-4">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.32em] text-slate-400">
            TIRAS PROMOCIONALES
          </p>
          <h2 className="text-6xl font-black tracking-tight text-slate-950">
            Tiras para<br />supermercado
          </h2>
          <p className="mt-3 max-w-lg text-lg font-medium leading-relaxed text-slate-500">
            Tiras expositoras de precio único para lineales de supermercado.
            Disponibles en tres gamas de precio:
          </p>
          <div className="mt-6">{tabButtons}</div>
        </div>

        {/* Col 2: preview grande */}
        <div className="relative flex min-h-[320px] items-center justify-center px-4 py-6">
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
                onError={(e) => {
                  e.currentTarget.src = STRIP_DEMO(activeStrip.color, activeStrip.label);
                }}
                className="absolute inset-0 m-auto max-h-full max-w-full object-contain drop-shadow-2xl"
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Col 3: ficha técnica — tamaño fijo con absolute para no mover el layout */}
        <div className="relative min-h-[420px]">
          {/* Placeholder */}
          <motion.div
            animate={{ opacity: hoveredProduct ? 0 : 1 }}
            transition={{ duration: 0.12 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-200 p-4 text-center"
            style={{ pointerEvents: hoveredProduct ? "none" : "auto" }}
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-black text-white shadow-md"
              style={{ backgroundColor: activeStrip.color }}
            >
              {activeStrip.label}
            </div>
            <p className="text-[11px] font-medium leading-snug text-slate-400">
              Pasa el cursor sobre un producto para ver su ficha
            </p>
          </motion.div>

          {/* Ficha */}
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
                    Tira promocional
                  </p>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[9px] font-black text-white"
                    style={{ backgroundColor: activeStrip.color }}
                  >
                    {activeStrip.label}
                  </span>
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">Referencia</p>
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
                    ["Precio", activeStrip.label, true],
                    ["Uds./tira", "12 uds.", false],
                    ["EAN", `8437${hoveredProduct.ref}`, false],
                    ["Stock", "240 uds.", false],
                  ].map(([label, value, colored]) => (
                    <div key={String(label)}>
                      <p className="font-black uppercase tracking-wider text-slate-400">{label}</p>
                      <div
                        className="mt-1 flex h-7 items-center justify-center rounded-lg text-[10px] font-black"
                        style={colored ? { backgroundColor: activeStrip.color, color: "white" } : undefined}
                        {...(!colored ? { className: "mt-1 flex h-7 items-center justify-center rounded-lg bg-slate-50 text-[10px] font-black text-slate-700" } : {})}
                      >
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] leading-relaxed text-slate-500">
                  Producto de precio único para tira expositora de supermercado.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Parte 2: Grid de productos (desktop) */}
      <div
        className="hidden overflow-y-auto rounded-[1.75rem] border border-slate-200 bg-white/90 px-4 py-5 shadow-xl shadow-slate-300/40 md:block"
        style={{ maxHeight: "220px" }}
        onMouseLeave={() => { setPreviewSrc(activeStrip.template); setHoveredId(null); }}
      >
        <div className="grid grid-cols-8 gap-3">
          {activeStrip.products.map((product) => {
            const isHovered = hoveredId === product.id;
            return (
              <button
                key={product.id}
                type="button"
                onMouseEnter={() => { setPreviewSrc(product.image); setHoveredId(product.id); }}
                onClick={() => setSelectedProduct(product)}
                className="group relative flex min-w-0 flex-col items-center rounded-[1rem] border border-slate-200 bg-white px-2 py-3 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
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
                  className="mt-2 rounded-full px-2.5 py-0.5 text-[9px] font-black text-white"
                  style={{ backgroundColor: activeStrip.color }}
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
      />
    </>
  );
}
