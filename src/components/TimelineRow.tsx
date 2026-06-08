import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { getStandCopy, getStandLabel } from "../data/translations";
import { brand } from "../data/stands";
import MobileSeasonCarousel from "./MobileSeasonCarousel";
import type { Stand, Language } from "../types";

interface Props {
  stands: Stand[];
  type: "season" | "year";
  comingSoon?: boolean;
  selectedId: string;
  setSelectedId: (id: string) => void;
  openModal: (stand: Stand) => void;
  setPreviewStand: (stand: Stand) => void;
  language: Language;
}

export default function TimelineRow({
  stands,
  type,
  comingSoon = false,
  selectedId,
  setSelectedId,
  openModal,
  setPreviewStand,
  language,
}: Props) {
  const isSeason = type === "season";
  const activeIndex = Math.max(0, stands.findIndex((s) => s.id === selectedId));
  const progressWidth = isSeason && stands.length > 1 ? `${(activeIndex / (stands.length - 1)) * 100}%` : "0%";
  const activeColor = stands[activeIndex]?.color ?? brand.green;

  function handleEnter(stand: Stand) {
    setSelectedId(stand.id);
    setPreviewStand(stand);
  }

  if (isSeason) {
    return (
      <>
        {/* Carrusel táctil — solo móvil */}
        <MobileSeasonCarousel
          stands={stands}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          openModal={openModal}
          setPreviewStand={setPreviewStand}
          language={language}
        />

        {/* Timeline horizontal — solo desktop */}
        <div className="relative hidden overflow-visible rounded-[1.75rem] border border-slate-200 bg-white/90 px-4 py-5 shadow-xl shadow-slate-300/50 backdrop-blur-xl md:block md:px-6">
          <div className="relative">
            {/* Línea de progreso temporal */}
            <div className="absolute left-[3%] right-[3%] top-[34px] z-0 h-[6px] overflow-visible rounded-full bg-slate-100 shadow-inner">
              <motion.div
                className="absolute bottom-0 left-0 top-0 rounded-full shadow-[0_0_18px_rgba(22,155,34,0.32)]"
                style={{ backgroundColor: activeColor }}
                animate={{ width: progressWidth }}
                transition={{ type: "spring", stiffness: 170, damping: 24 }}
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/60 to-transparent" />
            </div>

            <div className="grid grid-cols-12 gap-2">
              {stands.map((stand) => {
                const active = selectedId === stand.id;
                const standCopy = getStandCopy(stand, language);

                return (
                  <button
                    key={stand.id}
                    type="button"
                    onMouseEnter={() => handleEnter(stand)}
                    onClick={() => openModal(stand)}
                    className="group relative flex min-w-0 flex-col items-center outline-none"
                  >
                    <span
                      className="mb-3 max-w-full truncate rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-black shadow-sm transition group-hover:-translate-y-1 md:text-sm"
                      style={{ color: stand.color }}
                    >
                      {getStandLabel(stand, language)}
                    </span>

                    {/* Nodo del timeline */}
                    <span
                      className="relative z-10 h-6 w-6 rounded-full border-[5px] border-white bg-white shadow-[0_0_0_2px_rgba(15,23,42,0.06),0_8px_20px_rgba(15,23,42,0.16)] transition group-hover:scale-125"
                      style={
                        active
                          ? { boxShadow: `0 0 0 5px ${stand.color}22, 0 0 28px ${stand.color}80` }
                          : undefined
                      }
                    >
                      <span
                        className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                        style={{ backgroundColor: stand.color }}
                      />
                    </span>

                    <motion.div
                      animate={{ scale: active ? 1.22 : 1, y: active ? -12 : 0, opacity: active ? 1 : 0.82 }}
                      transition={{ type: "spring", stiffness: 280, damping: 24 }}
                      className="relative mt-5 flex h-[145px] w-full items-end justify-center md:h-[210px]"
                    >
                      <div
                        className="absolute inset-x-4 bottom-6 top-8 rounded-full opacity-0 blur-2xl transition group-hover:opacity-35"
                        style={{ backgroundColor: stand.color }}
                      />
                      <img
                        src={stand.image}
                        alt={standCopy.title}
                        draggable="false"
                        className="relative z-10 h-full max-h-[140px] w-auto object-contain drop-shadow-2xl md:max-h-[205px]"
                      />
                      <div className="absolute bottom-[-10px] h-7 w-24 rounded-full bg-black/15 blur-xl" />
                    </motion.div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }

  // Expositores todo el año / próximamente: grid 2 columnas en móvil, 9 en desktop
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-9">
      {stands.map((stand) => {
        const active = selectedId === stand.id;
        const standCopy = getStandCopy(stand, language);

        return (
          <button
            key={stand.id}
            type="button"
            onMouseEnter={() => !comingSoon && handleEnter(stand)}
            onClick={() => !comingSoon && openModal(stand)}
            className={`group relative flex min-w-0 flex-col items-center rounded-[1.5rem] border border-slate-200 bg-white/90 px-2 py-4 shadow-xl shadow-slate-300/35 transition ${comingSoon ? "cursor-default" : "hover:-translate-y-2 hover:shadow-2xl"}`}
          >
            {/* Overlay "Próximamente" */}
            {comingSoon && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 rounded-[1.5rem] bg-slate-950/55 backdrop-blur-[3px]">
                <div className="flex items-center justify-center rounded-full bg-white/15 p-2.5 ring-1 ring-white/25">
                  <Clock size={18} className="text-white" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.22em] text-white/90">
                  Próximamente
                </span>
              </div>
            )}

            <span
              className="mb-3 max-w-full truncate rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-black shadow-sm transition group-hover:-translate-y-1 md:text-xs"
              style={{ color: stand.color }}
            >
              {getStandLabel(stand, language)}
            </span>

            <motion.div
              animate={{ scale: active ? 1.16 : 1, y: active ? -8 : 0, opacity: active ? 1 : 0.84 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              className="relative flex h-[170px] w-full items-end justify-center md:h-[210px]"
            >
              <div
                className="absolute inset-x-3 bottom-6 top-8 rounded-full opacity-0 blur-2xl transition group-hover:opacity-35"
                style={{ backgroundColor: stand.color }}
              />
              <img
                src={stand.image}
                alt={standCopy.title}
                draggable="false"
                className="relative z-10 h-full max-h-[165px] w-auto object-contain drop-shadow-2xl md:max-h-[205px]"
              />
              <div className="absolute bottom-[-8px] h-6 w-24 rounded-full bg-black/15 blur-xl" />
            </motion.div>
          </button>
        );
      })}
    </div>
  );
}
