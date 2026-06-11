import { useState } from "react";
import { Package } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { strips } from "../data/strips";
import type { Language } from "../types";

interface Props {
  language: Language;
}

export default function StripsSection({ language: _language }: Props) {
  const [activeStripId, setActiveStripId] = useState(strips[0].id);
  const activeStrip = strips.find((s) => s.id === activeStripId) ?? strips[0];
  const [previewSrc, setPreviewSrc] = useState(activeStrip.template);

  function handleChangeStrip(id: string) {
    const next = strips.find((s) => s.id === id) ?? strips[0];
    setActiveStripId(next.id);
    setPreviewSrc(next.template);
  }

  return (
    <section>
      {/* Cabecera + pestañas */}
      <div className="mb-4 flex flex-col gap-3 px-2 md:flex-row md:items-end md:justify-between">
        <SectionTitle eyebrow="TIRAS PROMOCIONALES" title="Tiras para supermercado" />

        <div className="flex gap-2 px-2 pb-1 md:pb-3">
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

      {/* Panel principal */}
      <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-5 shadow-xl shadow-slate-300/40 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">

          {/* Izquierda: imagen de la tira */}
          <aside className="relative flex min-h-[480px] items-center justify-center overflow-hidden rounded-[1.5rem] bg-gradient-to-b from-slate-50 to-white p-4">
            <div
              className="absolute h-64 w-64 rounded-full opacity-10 blur-3xl transition-colors duration-500"
              style={{ backgroundColor: activeStrip.color }}
            />
            {previewSrc ? (
              <img
                key={previewSrc}
                src={previewSrc}
                alt={`Tira ${activeStrip.label}`}
                draggable="false"
                className="relative z-10 max-h-[460px] w-auto object-contain drop-shadow-2xl"
              />
            ) : (
              <Package className="h-16 w-16 text-slate-300" />
            )}
          </aside>

          {/* Derecha: grid de productos */}
          <div
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            onMouseLeave={() => setPreviewSrc(activeStrip.template)}
          >
            {activeStrip.products.map((product) => (
              <button
                key={product.id}
                type="button"
                onMouseEnter={() => setPreviewSrc(product.preview)}
                onClick={() => setPreviewSrc(product.preview)}
                className="group rounded-2xl border border-slate-200 bg-white p-3 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Imagen del producto */}
                <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-slate-50 p-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                    className="h-full w-full object-contain transition group-hover:scale-105"
                  />
                </div>

                {/* Nombre */}
                <p className="mt-2 line-clamp-2 text-center text-[10px] font-black leading-tight text-slate-700">
                  {product.name}
                </p>

                {/* Badge precio */}
                <div
                  className="mt-2 rounded-xl py-1 text-center text-[10px] font-black text-white"
                  style={{ backgroundColor: activeStrip.color }}
                >
                  {activeStrip.label}
                </div>
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
