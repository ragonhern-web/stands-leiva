import { useState } from "react";
import SectionTitle from "./SectionTitle";
import { strips, STRIP_DEMO, STRIP_PRODUCT_DEMO } from "../data/strips";
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

      {/* Panel principal: grid fuera de cualquier caja */}
      <div className="grid gap-8 lg:grid-cols-[200px_1fr]">

        {/* Izquierda: imagen sticky sin fondo ni caja */}
        <aside className="lg:sticky lg:top-6 lg:self-start flex justify-center">
          <img
            key={previewSrc}
            src={previewSrc}
            alt={`Tira ${activeStrip.label}`}
            draggable="false"
            onError={(e) => { e.currentTarget.src = STRIP_DEMO(activeStrip.color, activeStrip.label); }}
            className="w-full max-w-[200px] h-auto object-contain drop-shadow-2xl"
          />
        </aside>

        {/* Derecha: caja blanca solo alrededor de los productos */}
        <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-5 shadow-xl shadow-slate-300/40 md:p-8">
          <div
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            onMouseLeave={() => setPreviewSrc(activeStrip.template)}
          >
            {activeStrip.products.map((product) => (
              <button
                key={product.id}
                type="button"
                onMouseEnter={() => setPreviewSrc(product.image)}
                onClick={() => setPreviewSrc(product.image)}
                className="group rounded-2xl border border-slate-200 bg-white p-3 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Imagen del producto */}
                <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-slate-50 p-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    onError={(e) => { e.currentTarget.src = STRIP_PRODUCT_DEMO(activeStrip.color, activeStrip.label); }}
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
