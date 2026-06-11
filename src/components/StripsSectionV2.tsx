import { useState } from "react";
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

  const activeStrip = strips.find((s) => s.id === activeStripId) ?? strips[0];

  function handleChangeStrip(id: string) {
    const next = strips.find((s) => s.id === id) ?? strips[0];
    setActiveStripId(next.id);
    setPreviewSrc(next.template);
    setHoveredId(null);
  }

  return (
    <>
      {/* ── PARTE 1: Hero (título izq. + preview dcha.) ── */}
      <section className="relative z-10 grid w-full grid-cols-1 items-center gap-2 md:grid-cols-[0.38fr_0.62fr]">

        {/* Izquierda: título + descripción + selector */}
        <div className="flex flex-col justify-center px-2 py-5 text-center md:p-4 md:text-left">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.32em] text-slate-400 md:mb-3">
            TIRAS PROMOCIONALES
          </p>
          <h2 className="text-5xl font-black tracking-tight text-slate-950 md:text-6xl">
            Tiras para<br />supermercado
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base font-medium leading-relaxed text-slate-500 md:mx-0 md:mt-3 md:text-lg">
            Tiras expositoras de precio único para lineales de supermercado.
            Disponibles en tres gamas de precio:
          </p>

          {/* Selector 1€ / 2€ / 3€ */}
          <div className="mt-6 flex justify-center gap-2 md:justify-start">
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
                style={
                  activeStrip.id === strip.id
                    ? { backgroundColor: strip.color }
                    : undefined
                }
              >
                {strip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Derecha: preview de la tira / producto — contenedor fijo sin layout shift */}
        <div className="relative flex min-h-[320px] items-center justify-center px-4 py-6">
          {/* Glow de fondo */}
          <div
            className="pointer-events-none absolute inset-x-8 inset-y-12 rounded-full opacity-20 blur-3xl transition-colors duration-500"
            style={{ backgroundColor: activeStrip.color }}
          />
          {/* Sombra suelo */}
          <div className="absolute bottom-6 h-8 w-40 rounded-full bg-black/10 blur-2xl" />

          {/* Imagen con crossfade rápido — contenedor absoluto para evitar layout shift */}
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
      </section>

      {/* ── PARTE 2: Grid de productos estilo TimelineRow ── */}
      <div
        className="rounded-[1.75rem] border border-slate-200 bg-white/90 px-4 py-5 shadow-xl shadow-slate-300/40"
        onMouseLeave={() => {
          setPreviewSrc(activeStrip.template);
          setHoveredId(null);
        }}
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {activeStrip.products.map((product) => {
            const isHovered = hoveredId === product.id;
            return (
              <button
                key={product.id}
                type="button"
                onMouseEnter={() => {
                  setPreviewSrc(product.image);
                  setHoveredId(product.id);
                }}
                onClick={() => setSelectedProduct(product)}
                className="group relative flex min-w-0 flex-col items-center rounded-[1rem] border border-slate-200 bg-white px-2 py-3 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Ref */}
                <span
                  className="mb-1 max-w-full truncate text-[9px] font-black transition group-hover:-translate-y-0.5"
                  style={{ color: activeStrip.color }}
                >
                  {product.ref}
                </span>

                {/* Imagen + glow + sombra suelo */}
                <motion.div
                  animate={{
                    scale: isHovered ? 1.1 : 1,
                    y: isHovered ? -4 : 0,
                    opacity: isHovered ? 1 : 0.84,
                  }}
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
                    onError={(e) => {
                      e.currentTarget.src = STRIP_PRODUCT_DEMO(
                        activeStrip.color,
                        activeStrip.label
                      );
                    }}
                    className="relative z-10 max-h-[90px] w-auto object-contain drop-shadow-xl"
                  />
                  <div className="absolute bottom-[-6px] h-4 w-12 rounded-full bg-black/12 blur-lg" />
                </motion.div>

                {/* Badge precio */}
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

      {/* Modal de producto */}
      <StripProductModal
        product={selectedProduct}
        strip={activeStrip}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}
