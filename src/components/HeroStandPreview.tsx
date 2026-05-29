import { AnimatePresence, motion } from "framer-motion";
import { getStandCopy } from "../data/translations";
import type { Stand } from "../types";
import type { Language } from "../types";

interface Props {
  stand: Stand | null;
  language: Language;
}

export default function HeroStandPreview({ stand, language }: Props) {
  if (!stand) return null;
  const standCopy = getStandCopy(stand, language);

  return (
    <section className="relative flex min-h-[360px] w-full items-center justify-center overflow-visible">
      <motion.div
        className="absolute h-[380px] w-[380px] rounded-full opacity-20 blur-3xl"
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
          className="relative z-10 max-h-[380px] w-auto object-contain drop-shadow-2xl md:max-h-[440px]"
          draggable="false"
        />
      </AnimatePresence>

      <div className="absolute bottom-8 h-10 w-96 rounded-full bg-black/10 blur-2xl" />
    </section>
  );
}
