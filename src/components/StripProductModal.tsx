import { motion, AnimatePresence } from "framer-motion";
import { X, Package } from "lucide-react";
import { STRIP_PRODUCT_DEMO } from "../data/strips";
import type { StripProduct, StripType } from "../data/strips";
import { copy } from "../data/translations";
import type { Language } from "../types";

interface Props {
  product: StripProduct | null;
  strip: StripType | null;
  onClose: () => void;
  language: Language;
}

export default function StripProductModal({ product, strip, onClose, language }: Props) {
  const t = copy[language] ?? copy.es;
  return (
    <AnimatePresence>
      {product && strip && (
        <motion.div
          key="strip-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cierre */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-slate-500 shadow transition hover:scale-110 hover:text-slate-900"
            >
              <X size={18} />
            </button>

            {/* Imagen */}
            <div className="flex items-center justify-center bg-gradient-to-br from-slate-50 to-white p-8 md:w-3/5">
              {product.image && !product.image.startsWith("data:") ? (
                <img
                  src={product.image}
                  alt={product.name}
                  onError={(e) => {
                    e.currentTarget.src = STRIP_PRODUCT_DEMO(strip.color, strip.label);
                  }}
                  className="max-h-64 w-full object-contain drop-shadow-lg md:max-h-[50vh]"
                />
              ) : (
                <div
                  className="flex h-64 w-full items-center justify-center rounded-2xl text-5xl"
                  style={{ backgroundColor: strip.color + "15" }}
                >
                  <Package size={64} style={{ color: strip.color }} strokeWidth={1.5} />
                </div>
              )}
            </div>

            {/* Datos */}
            <div className="flex flex-col gap-5 overflow-y-auto p-6 md:w-2/5">
              {/* Eyebrow + precio */}
              <div className="flex items-center gap-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  {t.stripsProductEyebrow}
                </p>
                <span
                  className="rounded-full px-3 py-0.5 text-[10px] font-black text-white"
                  style={{ backgroundColor: strip.color }}
                >
                  {strip.label}
                </span>
              </div>

              {/* Referencia */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
                  {t.stripsRef}
                </p>
                <h3 className="mt-1 text-3xl font-black text-slate-900">
                  {product.ref}
                </h3>
              </div>

              {/* Datos de ejemplo */}
              <div className="grid grid-cols-2 gap-3 text-[11px]">
                <div>
                  <p className="font-black uppercase tracking-wider text-slate-400">{t.stripsSalePrice}</p>
                  <div
                    className="mt-1 flex h-8 items-center justify-center rounded-xl font-black text-white"
                    style={{ backgroundColor: strip.color }}
                  >
                    {strip.label}
                  </div>
                </div>
                <div>
                  <p className="font-black uppercase tracking-wider text-slate-400">{t.stripsUnitsPerStrip}</p>
                  <div className="mt-1 flex h-8 items-center justify-center rounded-xl bg-slate-50 font-black text-slate-700">
                    12 uds.
                  </div>
                </div>
                <div>
                  <p className="font-black uppercase tracking-wider text-slate-400">{t.stripsEAN}</p>
                  <div className="mt-1 flex h-8 items-center justify-center rounded-xl bg-slate-50 font-mono text-[10px] font-black text-slate-700">
                    8437000{product.ref}
                  </div>
                </div>
                <div>
                  <p className="font-black uppercase tracking-wider text-slate-400">{t.stripsStock}</p>
                  <div className="mt-1 flex h-8 items-center justify-center rounded-xl bg-slate-50 font-black text-slate-700">
                    240 uds.
                  </div>
                </div>
              </div>

              {/* Descripción de ejemplo */}
              <div>
                <p className="font-black uppercase tracking-wider text-[11px] text-slate-400">
                  {t.stripsDescLabel}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                  {t.stripsProductDescription}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
