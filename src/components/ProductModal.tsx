import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { getProductDesc } from "../data/productI18n";
import type { Product, TranslationCopy, Language } from "../types";

interface Props {
  product: Product | null;
  onClose: () => void;
  t: TranslationCopy;
  language: Language;
}

export default function ProductModal({ product, onClose, t, language }: Props) {
  return (
    <AnimatePresence>
      {product && (
        <motion.div
          key="product-overlay"
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
            className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl md:flex-row"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-slate-500 shadow transition hover:scale-110 hover:text-slate-900"
            >
              <X size={18} />
            </button>

            {/* Imagen grande */}
            <div className="flex items-center justify-center bg-gradient-to-br from-slate-50 to-white p-6 md:w-3/5">
              {product.image && !product.image.startsWith("data:") ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-64 w-full object-contain drop-shadow-lg md:max-h-[58vh]"
                />
              ) : (
                <div className="flex h-64 w-full items-center justify-center rounded-2xl bg-slate-100 text-slate-300 text-5xl">
                  📦
                </div>
              )}
            </div>

            {/* Datos */}
            <div className="flex flex-col gap-4 overflow-y-auto p-6 md:w-2/5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Referencia</p>
                <h3 className="mt-1 text-2xl font-black text-slate-900">{product.name.match(/Ref\.\d+/)?.[0] ?? product.name}</h3>
              </div>

              {(getProductDesc(product.id, language, product.desc) ?? product.desc) && (
                <p className="text-sm leading-relaxed text-slate-600">
                  {getProductDesc(product.id, language, product.desc) ?? product.desc}
                </p>
              )}

              <div className="grid grid-cols-2 gap-3 text-[11px]">
                {product.units && (
                  <div>
                    <p className="font-black uppercase tracking-wider text-slate-400">{t.units}</p>
                    <div className="mt-1 flex h-8 items-center justify-center rounded-xl bg-[#ffe100] font-black text-black">
                      {product.units}
                    </div>
                  </div>
                )}
                {product.price && (
                  <div>
                    <p className="font-black uppercase tracking-wider text-slate-400">{t.price}</p>
                    <div className="mt-1 flex h-8 items-center justify-center rounded-xl bg-[#169b22] font-black text-white">
                      {product.price}
                    </div>
                  </div>
                )}
                {product.alto != null && (
                  <div>
                    <p className="font-black uppercase tracking-wider text-slate-400">{t.alto}</p>
                    <div className="mt-1 flex h-8 items-center justify-center rounded-xl bg-slate-50 font-black text-slate-700">
                      {product.alto} cm
                    </div>
                  </div>
                )}
                {product.largo != null && (
                  <div>
                    <p className="font-black uppercase tracking-wider text-slate-400">{t.largo}</p>
                    <div className="mt-1 flex h-8 items-center justify-center rounded-xl bg-slate-50 font-black text-slate-700">
                      {product.largo} cm
                    </div>
                  </div>
                )}
                {product.ancho != null && (
                  <div>
                    <p className="font-black uppercase tracking-wider text-slate-400">{t.ancho}</p>
                    <div className="mt-1 flex h-8 items-center justify-center rounded-xl bg-slate-50 font-black text-slate-700">
                      {product.ancho} cm
                    </div>
                  </div>
                )}
                {product.color && !getProductDesc(product.id, language) && (
                  <div className="col-span-2">
                    <p className="font-black uppercase tracking-wider text-slate-400">{t.color}</p>
                    <div className="mt-1 flex min-h-8 items-center justify-center rounded-xl bg-slate-50 px-2 py-1 text-center font-black leading-tight text-slate-700">
                      {product.color}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
