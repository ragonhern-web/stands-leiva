import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { strips, STRIP_DEMO, STRIP_PRODUCT_DEMO } from "../data/strips";
import type { Language } from "../types";

interface Props {
  language: Language;
}

export default function StripsSectionV2({ language: _language }: Props) {
  const [activeStripId, setActiveStripId] = useState(strips[0].id);
  const [previewSrc, setPreviewSrc] = useState(strips[0].template);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const activeStrip = strips.find((s) => s.id === activeStripId) ?? strips[0];

  function handleChangeStrip(id: string) {
    const next = strips.find((s) => s.id === id) ?? strips[0];
    setActiveStripId(next.id);
    setPreviewSrc(next.template);
    setHoveredId(null);
  }

  return (
    <section>
      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[0.38fr_0.62fr]">

        {/* ── Columna izquierda: título + preview sticky ── */}
        <div className="flex flex-col gap-5 px-2 md:p-4 lg:sticky lg:top-6 lg:self-start">

          {/* Eyebrow */}
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-slate-400">
            TIRAS PROMOCIONALES
          </p>

          {/* Título */}
          <h2 className="text-5xl font-black tracking-tight text-slate-950 md:text-6xl">
            Tiras para<br />supermercado
          </h2>

          {/* Descripción */}
          <p className="max-w-sm text-base font-medium leading-relaxed text-slate-500">
            Tiras expositoras de precio único para lineales de supermercado.
            Disponibles en tres gamas de precio:
          </p>

          {/* Selector 1€ / 2€ / 3€ */}
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

          {/* Preview de la tira / producto */}
          <div className="flex min-h-[260px] items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.img
                key={previewSrc}
                src={previewSrc}
                alt={`Tira ${activeStrip.label}`}
                draggable="false"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                onError={(e) => {
                  e.currentTarget.src = STRIP_DEMO(activeStrip.color, activeStrip.label);
                }}
                className="max-h-[300px] w-auto max-w-full object-contain drop-shadow-2xl"
              />
            </AnimatePresence>
          </div>
        </div>

        {/* ── Columna derecha: grid de productos estilo temporada ── */}
        <div
          className="rounded-[1.75rem] border border-slate-200 bg-white/90 px-4 py-5 shadow-xl shadow-slate-300/40"
          onMouseLeave={() => {
            setPreviewSrc(activeStrip.template);
            setHoveredId(null);
          }}
        >
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-12">
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
                  className="group relative flex min-w-0 flex-col items-center rounded-[1rem] border border-slate-200 bg-white px-1 py-3 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Ref / nombre */}
                  <span
                    className="mb-1 max-w-full truncate text-[8px] font-black transition group-hover:-translate-y-0.5"
                    style={{ color: activeStrip.color }}
                  >
                    {product.ref}
                  </span>

                  {/* Imagen + glow + sombra suelo */}
                  <motion.div
                    animate={{
                      scale: isHovered ? 1.14 : 1,
                      y: isHovered ? -5 : 0,
                      opacity: isHovered ? 1 : 0.84,
                    }}
                    transition={{ type: "spring", stiffness: 280, damping: 24 }}
                    className="relative flex h-[76px] w-full items-end justify-center"
                  >
                    {/* Glow de color */}
                    <div
                      className="absolute inset-x-1 bottom-4 top-4 rounded-full opacity-0 blur-xl transition group-hover:opacity-40"
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
                      className="relative z-10 max-h-[68px] w-auto object-contain drop-shadow-xl"
                    />

                    {/* Sombra suelo */}
                    <div className="absolute bottom-[-6px] h-4 w-10 rounded-full bg-black/15 blur-lg" />
                  </motion.div>

                  {/* Badge precio */}
                  <div
                    className="mt-2 rounded-full px-2 py-0.5 text-[8px] font-black text-white"
                    style={{ backgroundColor: activeStrip.color }}
                  >
                    {activeStrip.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
