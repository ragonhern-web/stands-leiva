import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import Logo from "./components/Logo";
import LanguageSelector from "./components/LanguageSelector";
import SectionTitle from "./components/SectionTitle";
import TimelineRow from "./components/TimelineRow";
import HeroStandPreview from "./components/HeroStandPreview";
import StandModal from "./components/StandModal";

import { copy } from "./data/translations";
import { seasonalStands, allYearStands, brand } from "./data/stands";
import type { Language, Stand } from "./types";

export default function App() {
  const [selectedStand, setSelectedStand] = useState<Stand | null>(null);
  const [activeSeason, setActiveSeason] = useState("jul");
  const [activeAllYear, setActiveAllYear] = useState("balones");
  const [previewStand, setPreviewStand] = useState<Stand>(seasonalStands[6]);
  const [language, setLanguage] = useState<Language>("es");

  const t = copy[language] ?? copy.es;
  const heroAccent = useMemo(
    () => seasonalStands.find((s) => s.id === activeSeason)?.color ?? brand.green,
    [activeSeason]
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8fafc] font-sans text-slate-800">
      <Logo />
      <LanguageSelector language={language} setLanguage={setLanguage} />

      {/* Fondos decorativos */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,1),rgba(247,255,247,0.9)_42%,rgba(248,250,252,1)_76%)]" />
      <div
        className="pointer-events-none fixed left-1/2 top-20 h-72 w-[720px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: heroAccent }}
      />

      {/* Hero */}
      <section className="relative z-10 mx-auto mt-24 grid w-full max-w-[1500px] grid-cols-1 items-center gap-2 px-4 md:mt-10 md:grid-cols-[0.38fr_0.62fr] md:px-6">
        <div className="flex flex-col justify-center p-2 text-center md:p-4 md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex flex-col items-center gap-2 md:items-start"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.32em] text-slate-400">
              Import – Export
            </p>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-lg shadow-slate-200/70">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#169b22] text-white shadow-inner">
                <span className="text-xl font-black" aria-hidden="true">L</span>
              </div>
              <div>
                <p className="text-base font-black leading-none tracking-tight text-[#169b22]">NOVEDADES</p>
                <p className="text-xl font-black leading-none text-[#202020]">LEIVA</p>
              </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.32em] text-slate-400">
              Desde 1996
            </p>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-3 text-[10px] font-black uppercase tracking-[0.32em] text-slate-400"
          >
            {t.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl"
          >
            {t.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-3 max-w-lg text-sm font-medium leading-relaxed text-slate-500 md:mx-0 md:text-base"
          >
            {t.heroText}
          </motion.p>
        </div>

        <HeroStandPreview stand={previewStand} language={language} />
      </section>

      {/* Catálogo */}
      <main className="relative z-10 mx-auto mt-4 flex w-full max-w-[1500px] flex-col gap-6 px-3 pb-10 md:-mt-2 md:px-6">
        <section className="-mt-4">
          <SectionTitle eyebrow={t.monthlyEyebrow} title={t.monthlyTitle} />
          <TimelineRow
            stands={seasonalStands}
            type="season"
            selectedId={activeSeason}
            setSelectedId={setActiveSeason}
            openModal={setSelectedStand}
            setPreviewStand={setPreviewStand}
            language={language}
          />
        </section>

        <section>
          <SectionTitle eyebrow={t.permanentEyebrow} title={t.permanentTitle} />
          <TimelineRow
            stands={allYearStands}
            type="year"
            selectedId={activeAllYear}
            setSelectedId={setActiveAllYear}
            openModal={setSelectedStand}
            setPreviewStand={setPreviewStand}
            language={language}
          />
        </section>
      </main>

      <StandModal
        stand={selectedStand}
        closeModal={() => setSelectedStand(null)}
        language={language}
        t={t}
      />
    </div>
  );
}
