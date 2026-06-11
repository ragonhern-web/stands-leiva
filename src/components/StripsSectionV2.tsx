import { useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { strips, STRIP_PRODUCT_DEMO } from "../data/strips";
import type { Language } from "../types";

interface Props {
  language: Language;
}

export default function StripsSectionV2({ language: _language }: Props) {
  const [activeStripId, setActiveStripId] = useState(strips[0].id);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const activeStrip = strips.find((s) => s.id === activeStripId) ?? strips[0];

  return (
    <section>
      {/* Cabecera */}
      <div className="mb-6 px-2">
        <SectionTitle
          eyebrow="TIRAS PROMOCIONALES"
          title="Tiras para supermercado"
        />
        <p className="mt-2 max-w-xl text-sm font-medium leading-relaxed text-slate-400">
          Tiras expositoras de precio único para lineales de supermercado.
          Disponibles en tres gamas de precio: 1€, 2€ y 3€.
        </p>
      </div>

      {/* Selector de tipo */}
      <div className="mb-6 flex gap-2 px-2">
        {strips.map((strip) => (
          <button
            key={strip.id}
            type="button"
            onClick={() => setActiveStripId(strip.id)}
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

      {/* Grid de productos */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
        {activeStrip.products.map((product) => {
          const isHovered = hoveredId === product.id;
          return (
            <button
              key={product.id}
              type="button"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative flex min-w-0 flex-col items-center rounded-[1.5rem] border border-slate-200 bg-white/90 px-2 py-4 shadow-xl shadow-slate-300/35 transition hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Badge nombre/ref */}
              <span
                className="relative z-30 mb-1 max-w-full truncate rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-black shadow-sm transition group-hover:-translate-y-1"
                style={{ color: activeStrip.color }}
              >
                {product.name}
              </span>

              {/* Imagen animada */}
              <motion.div
                animate={{
                  scale: isHovered ? 1.12 : 1,
                  y: isHovered ? -6 : 0,
                  opacity: isHovered ? 1 : 0.84,
                }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
                className="relative flex h-[140px] w-full items-end justify-center md:h-[160px]"
              >
                {/* Glow de color */}
                <div
                  className="absolute inset-x-3 bottom-6 top-8 rounded-full opacity-0 blur-2xl transition group-hover:opacity-35"
                  style={{ backgroundColor: activeStrip.color }}
                />

                <img
                  src={product.image}
                  alt={product.name}
                  draggable="false"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = STRIP_PRODUCT_DEMO(
                      activeStrip.color,
                      activeStrip.label
                    );
                  }}
                  className="relative z-10 h-full max-h-[135px] w-auto object-contain drop-shadow-2xl md:max-h-[155px]"
                />

                {/* Sombra suelo */}
                <div className="absolute bottom-[-8px] h-6 w-20 rounded-full bg-black/15 blur-xl" />
              </motion.div>

              {/* Badge precio */}
              <div
                className="relative z-30 mt-3 rounded-full px-3 py-1 text-[10px] font-black text-white"
                style={{ backgroundColor: activeStrip.color }}
              >
                {activeStrip.label}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
