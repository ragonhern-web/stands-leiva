import { AnimatePresence, motion } from "framer-motion";
import { getStandCopy } from "../data/translations";
import type { Stand, Language } from "../types";

interface Props {
  stand: Stand | null;
  language: Language;
}

export default function HeroStandPreview({ stand, language }: Props) {
  if (!stand) return null;
  const standCopy = getStandCopy(stand, language);

  return (
    <section className="relative flex min-h-[300px] w-full items-center justify-center overflow-visible md:min-h-[360px]">
      <motion.div
        className="absolute h-[300px] w-[300px] rounded-full opacity-20 blur-3xl md:h-[380px] md:w-[380px]"
        animate={{ backgroundColor: stand.color }}
        transition={{ duration: 0.25 }}
      />

      <AnimatePresence mode="wait">
        <motion.img
          key={stand.id}
          src={stand.image}
          alt={standCopy.title}
          initial={{ opacity: 0, scale: 0.86, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
          className="relative z-10 max-h-[300px] w-auto object-contain drop-shadow-2xl md:max-h-[440px]"
          draggable="false"
        />
      </AnimatePresence>

      <div className="absolute bottom-8 h-10 w-72 rounded-full bg-black/10 blur-2xl md:w-96" />
    </section>
  );
}
