import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp, FileSpreadsheet, FileText, Package, X } from "lucide-react";
import { useState } from "react";
import { getStandCopy } from "../data/translations";
import { downloadExcel, downloadPDF } from "../utils/downloadSheet";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import type { Stand, Language, TranslationCopy, Product } from "../types";

interface Props {
  stand: Stand | null;
  closeModal: () => void;
  language: Language;
  t: TranslationCopy;
}

export default function StandModal({ stand, closeModal, language, t }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
          className="relative flex max-h-[95vh] w-full max-w-[1440px] flex-col overflow-y-auto rounded-[2rem] border border-slate-200 bg-white shadow-2xl md:grid md:h-[92vh] md:overflow-hidden md:grid-cols-[0.30fr_0.70fr]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Barra cierre fija en móvil */}
          <div className="sticky top-0 z-30 flex justify-end bg-white/90 px-4 py-2.5 backdrop-blur-md md:hidden">
            <button
              type="button"
              onClick={closeModal}
              className="rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>
          </div>

          {/* Botón cierre desktop (absoluto) */}
          <button
            type="button"
            onClick={closeModal}
            className="absolute right-5 top-5 z-20 hidden rounded-full bg-white p-2.5 text-slate-500 shadow-lg transition hover:scale-110 hover:text-slate-950 md:block"
            aria-label="Cerrar"
          >
            <X size={22} />
          </button>

          {/* Panel imagen */}
          <aside className="relative flex flex-col items-center justify-center border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white p-4 md:max-h-none md:justify-start md:overflow-hidden md:border-b-0 md:border-r md:p-6">
            <div
              className="absolute -left-32 top-12 h-72 w-72 rounded-full opacity-15 blur-3xl"
              style={{ backgroundColor: stand.color }}
            />
            <div className="absolute bottom-10 right-[-100px] h-64 w-64 rounded-full bg-green-200/30 blur-3xl" />
            <div className="flex w-full flex-1 items-center justify-center">
              <img
                src={stand.image}
                alt={standCopy.title}
                className="relative z-10 w-full max-w-[220px] object-contain drop-shadow-2xl md:max-h-[55vh] md:max-w-full"
              />
            </div>

            {/* Ficha del expositor — solo desktop */}
            {stand.standRef && (
              <div className="relative z-10 mt-4 w-full rounded-2xl border border-slate-200 bg-white/80 p-4 backdrop-blur-sm">
                <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Ficha expositor
                </p>
                <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-[11px]">
                  {([
                    [t.standRef,        stand.standRef],
                    [t.standTipo,       stand.tipo],
                    [t.standNumRefs,    stand.numRefs],
                    [t.standTotalUnits, stand.totalUnits],
                    [t.standSides,      stand.sides],
                    [t.standDims,       stand.standAlto != null
                      ? `${stand.standAlto} × ${stand.standLargo} × ${stand.standAncho} cm`
                      : undefined],
                    [t.standPrice,      stand.priceStand],
                    [t.standPriceUnit,  stand.pricePerUnit],
                  ] as [string, string | number | undefined][])
                    .filter(([, v]) => v != null)
                    .map(([label, value]) => (
                      <div key={label}>
                        <p className="font-black uppercase tracking-wider text-slate-400">{label}</p>
                        <p className={`mt-0.5 font-black ${label === t.standPrice || label === t.standPriceUnit ? "text-[#169b22]" : "text-slate-800"}`}>
                          {value}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </aside>

          {/* Panel productos */}
          <section className="flex flex-col p-4 md:min-h-0 md:overflow-hidden md:p-8">
            <div className="mb-4 md:mb-5">
              <div className="mb-3 flex items-center gap-3">
                <span className="h-4 w-4 rounded-full shadow" style={{ backgroundColor: stand.color }} />
                <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">
                  {stand.numRefs ?? stand.products.length} {t.references}
                </p>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-slate-950 md:text-5xl">{standCopy.title}</h2>
              <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-slate-500 md:mt-3 md:text-base">
                {standCopy.desc}
              </p>
            </div>

            <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3 md:mb-4">
              <h3 className="flex items-center gap-2 text-sm font-black text-slate-800 md:text-lg">
                <Package size={20} className="text-slate-400" /> {t.included}
              </h3>
              <span className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-500 md:inline-flex">
                5 {t.columns} × {Math.ceil(stand.products.length / 5)} {t.rows}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pr-1 md:min-h-0 md:flex-1 md:overflow-y-auto md:pr-3 md:[scrollbar-color:#169b22_#e2e8f0] md:[scrollbar-width:thin] lg:grid-cols-5">
              {stand.products.map((product) => (
                <ProductCard key={product.id} product={product} t={t} onClick={() => setSelectedProduct(product)} />
              ))}
            </div>

            {/* Botón descarga — sticky abajo en móvil, flujo normal en desktop */}
            <div className="sticky bottom-0 z-10 mt-4 bg-white/95 pt-3 pb-1 backdrop-blur-sm md:relative md:mt-5 md:bg-transparent md:pb-0">
              <div className="flex justify-end border-t border-slate-100 pt-4">
                <div className="relative w-full md:w-auto">
                  {menuOpen && (
                    <div className="absolute bottom-full mb-2 right-0 w-full md:w-56 rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden z-10">
                      <button
                        onClick={() => { downloadPDF(stand, standCopy.title); setMenuOpen(false); }}
                        className="flex w-full items-center gap-3 px-5 py-3.5 text-sm font-black text-slate-700 hover:bg-slate-50 transition"
                      >
                        <FileText size={18} className="text-slate-400 shrink-0" />
                        {t.downloadPDF}
                      </button>
                      <div className="h-px bg-slate-100" />
                      <button
                        onClick={() => { downloadExcel(stand, standCopy.title); setMenuOpen(false); }}
                        className="flex w-full items-center gap-3 px-5 py-3.5 text-sm font-black text-[#169b22] hover:bg-green-50 transition"
                      >
                        <FileSpreadsheet size={18} className="shrink-0" />
                        {t.downloadExcel}
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => setMenuOpen(o => !o)}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#ffe100] bg-[#169b22] px-6 py-3 font-black text-white shadow-lg transition hover:-translate-y-1 hover:bg-[#087a18] md:w-auto"
                  >
                    {t.downloadSheet}
                    <ChevronUp
                      size={18}
                      className={`transition-transform duration-200 ${menuOpen ? "rotate-0" : "rotate-180"}`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Modal de detalle de producto */}
          <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} t={t} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
