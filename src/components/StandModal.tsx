import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Package, X } from "lucide-react";
import { getStandCopy } from "../data/translations";
import ProductCard from "./ProductCard";
import type { Stand, Language, TranslationCopy } from "../types";

interface Props {
  stand: Stand | null;
  closeModal: () => void;
  language: Language;
  t: TranslationCopy;
}

export default function StandModal({ stand, closeModal, language, t }: Props) {
  if (!stand) return null;
  const standCopy = getStandCopy(stand, language);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-md"
        onClick={closeModal}
      >
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          className="relative grid h-[92vh] w-full max-w-[1440px] overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl md:grid-cols-[0.30fr_0.70fr]"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={closeModal}
            className="absolute right-5 top-5 z-20 rounded-full bg-white p-2.5 text-slate-500 shadow-lg transition hover:scale-110 hover:text-slate-950"
            aria-label="Cerrar"
          >
            <X size={22} />
          </button>

          {/* Panel izquierdo: imagen del expositor */}
          <aside className="relative flex items-center justify-center overflow-hidden border-r border-slate-100 bg-gradient-to-b from-slate-50 to-white p-6">
            <div
              className="absolute -left-32 top-12 h-72 w-72 rounded-full opacity-15 blur-3xl"
              style={{ backgroundColor: stand.color }}
            />
            <div className="absolute bottom-10 right-[-100px] h-64 w-64 rounded-full bg-green-200/30 blur-3xl" />
            <div className="flex h-full w-full items-center justify-center">
              <img
                src={stand.image}
                alt={standCopy.title}
                className="relative z-10 max-h-[78vh] max-w-full object-contain drop-shadow-2xl"
              />
            </div>
          </aside>

          {/* Panel derecho: productos */}
          <section className="flex min-h-0 flex-col overflow-hidden p-5 md:p-8">
            <div className="mb-5 pr-12">
              <div className="mb-3 flex items-center gap-3">
                <span className="h-4 w-4 rounded-full shadow" style={{ backgroundColor: stand.color }} />
                <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">{t.references}</p>
              </div>
              <h2 className="text-3xl font-black tracking-tight text-slate-950 md:text-5xl">{standCopy.title}</h2>
              <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-500 md:text-base">
                {standCopy.desc}
              </p>
            </div>

            <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="flex items-center gap-2 text-base font-black text-slate-800 md:text-lg">
                <Package size={20} className="text-slate-400" /> {t.included}
              </h3>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-500">
                {t.columns}
              </span>
            </div>

            <div className="grid min-h-0 flex-1 grid-cols-2 gap-3 overflow-y-auto pr-3 [scrollbar-color:#169b22_#e2e8f0] [scrollbar-width:thin] sm:grid-cols-3 lg:grid-cols-5">
              {stand.products.map((product) => (
                <ProductCard key={product.id} product={product} t={t} />
              ))}
            </div>

            <div className="mt-5 flex justify-end border-t border-slate-100 pt-4">
              <button className="flex items-center gap-2 rounded-2xl border-2 border-[#ffe100] bg-[#169b22] px-6 py-3 font-black text-white shadow-lg transition hover:-translate-y-1 hover:bg-[#087a18]">
                {t.request} <ChevronRight size={20} />
              </button>
            </div>
          </section>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
