import { useState } from "react";
import { strips, STRIP_PRODUCT_DEMO } from "../data/strips";
import type { StripProduct } from "../data/strips";
import StripProductModal from "./StripProductModal";
import type { Language } from "../types";

const base = import.meta.env.BASE_URL;
const LOGO_SRC = `${base}assets/logo.png`;

interface Props {
  language: Language;
}

export default function StripsSectionV2({ language }: Props) {
  const [selectedProduct, setSelectedProduct] = useState<StripProduct | null>(null);

  const activeStrip = strips[0];

  return (
    <>
      {/* Título + imagen placeholder */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
        <div className="flex-shrink-0 md:w-[300px]">
          <h2 className="text-4xl font-black tracking-tight text-slate-950 dark:text-white md:text-5xl">
            Tiras para<br />supermercado
          </h2>
          <p className="mt-1.5 text-base font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Strips Supermarket
          </p>
        </div>

        {/* Placeholder imagen — sustituir por <img> cuando llegue el archivo */}
        <div
          className="flex flex-1 items-center justify-center overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800"
          style={{ aspectRatio: "21 / 8", minHeight: 120 }}
        >
          <div className="flex flex-col items-center gap-2 text-slate-300 dark:text-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <span className="text-xs font-medium">Imagen próximamente</span>
          </div>
        </div>
      </div>

      {/* Fila de productos — logo + productos, 1 línea, scroll horizontal */}
      <div
        className="overflow-x-auto py-1 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex gap-3">
          {/* Primer cuadrado: logo de la empresa */}
          <div className="flex w-[120px] flex-none flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <img
              src={LOGO_SRC}
              alt="Novedades Leiva"
              className="max-h-[72px] w-full object-contain"
            />
          </div>

          {/* Cuadrados de productos */}
          {activeStrip.products.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => setSelectedProduct(product)}
              className="group flex w-[120px] flex-none flex-col items-center rounded-2xl border border-slate-200 bg-white px-2 py-3 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800"
            >
              <span
                className="mb-1 max-w-full truncate text-[9px] font-black"
                style={{ color: activeStrip.color }}
              >
                {product.ref}
              </span>
              <div className="relative flex h-[80px] w-full items-center justify-center">
                <div
                  className="absolute inset-x-2 inset-y-2 rounded-full opacity-0 blur-xl transition group-hover:opacity-30"
                  style={{ backgroundColor: activeStrip.color }}
                />
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  draggable="false"
                  onError={(e) => {
                    e.currentTarget.src = STRIP_PRODUCT_DEMO(activeStrip.color, activeStrip.label);
                  }}
                  className="relative z-10 max-h-[72px] w-auto object-contain drop-shadow-lg"
                />
              </div>
              <div
                className="mt-2 rounded-full px-2.5 py-0.5 text-[9px] font-black text-white shadow-sm"
                style={{ background: activeStrip.gradient }}
              >
                {activeStrip.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      <StripProductModal
        product={selectedProduct}
        strip={activeStrip}
        onClose={() => setSelectedProduct(null)}
        language={language}
      />
    </>
  );
}
