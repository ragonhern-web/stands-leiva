import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { languages } from "../data/translations";
import type { Language } from "../types";

interface Props {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export default function LanguageSelector({ language, setLanguage }: Props) {
  const [open, setOpen] = useState(false);
  const current = languages[language] ?? languages.es;

  return (
    <div className="fixed right-6 top-5 z-40">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-800 shadow-lg shadow-slate-200/70 transition hover:-translate-y-0.5"
      >
        <span>{current.flag}</span>
        <span>{current.short}</span>
        <ChevronDown size={16} className={`transition ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            className="absolute right-0 mt-3 w-44 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-300/60"
          >
            {(Object.entries(languages) as [Language, typeof languages[Language]][]).map(([key, item]) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setLanguage(key);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-black transition ${
                  language === key ? "bg-green-50 text-[#169b22]" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>{item.flag}</span>
                <span>{item.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
