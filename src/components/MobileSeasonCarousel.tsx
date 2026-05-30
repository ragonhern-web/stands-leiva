import { motion } from "framer-motion";
import { getStandCopy } from "../data/translations";
import type { Stand, Language } from "../types";

interface Props {
  stands: Stand[];
  selectedId: string;
  setSelectedId: (id: string) => void;
  openModal: (stand: Stand) => void;
  setPreviewStand: (stand: Stand) => void;
  language: Language;
}

export default function MobileSeasonCarousel({
  stands,
  selectedId,
  setSelectedId,
  openModal,
  setPreviewStand,
  language,
}: Props) {
  const activeIndex = Math.max(0, stands.findIndex((s) => s.id === selectedId));

  const visibleStands = [-1, 0, 1].map((offset) => {
    const index = (activeIndex + offset + stands.length) % stands.length;
    return { stand: stands[index], offset };
  });

  function move(direction: number) {
    const nextIndex = (activeIndex + direction + stands.length) % stands.length;
    const next = stands[nextIndex];
    setSelectedId(next.id);
    setPreviewStand(next);
  }

  const active = stands[activeIndex];

  return (
    <div className="md:hidden rounded-[2rem] border border-slate-200 bg-white/90 px-4 py-6 shadow-xl shadow-slate-300/40">
      <div className="mb-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => move(-1)}
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black shadow-sm"
        >
          ←
        </button>
        <div className="min-w-0 text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">{active.label}</p>
          <p className="truncate text-lg font-black text-slate-950">{getStandCopy(active, language).title}</p>
        </div>
        <button
          type="button"
          onClick={() => move(1)}
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black shadow-sm"
        >
          →
        </button>
      </div>

      <div className="relative flex h-[290px] items-center justify-center overflow-hidden">
        {visibleStands.map(({ stand, offset }) => {
          const isCenter = offset === 0;
          return (
            <motion.button
              key={stand.id}
              type="button"
              onClick={() => (isCenter ? openModal(stand) : move(offset))}
              className="absolute flex flex-col items-center"
              animate={{
                x: offset * 118,
                scale: isCenter ? 1.1 : 0.72,
                opacity: isCenter ? 1 : 0.45,
                zIndex: isCenter ? 20 : 10,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
            >
              <span
                className="mb-3 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-black shadow-sm"
                style={{ color: stand.color }}
              >
                {stand.label}
              </span>
              <img
                src={stand.image}
                alt={getStandCopy(stand, language).title}
                className="h-[230px] w-auto object-contain drop-shadow-2xl"
                draggable="false"
              />
            </motion.button>
          );
        })}
      </div>

      {/* Indicadores de posición */}
      <div className="mt-4 flex justify-center gap-1.5">
        {stands.map((stand) => (
          <button
            key={stand.id}
            type="button"
            onClick={() => {
              setSelectedId(stand.id);
              setPreviewStand(stand);
            }}
            className={`h-2 rounded-full transition-all ${stand.id === selectedId ? "w-7" : "w-2"}`}
            style={{ backgroundColor: stand.id === selectedId ? stand.color : "#cbd5e1" }}
            aria-label={stand.label}
          />
        ))}
      </div>
    </div>
  );
}
