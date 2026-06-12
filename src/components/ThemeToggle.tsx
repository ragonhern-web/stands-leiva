import { Sun, Moon } from "lucide-react";
import type { Theme } from "../types";

interface Props {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

export default function ThemeToggle({ theme, setTheme }: Props) {
  return (
    <div className="flex items-center overflow-hidden rounded-full border border-slate-200 bg-white shadow-lg shadow-slate-200/70">
      <button
        type="button"
        onClick={() => setTheme("light")}
        aria-label="Modo claro"
        className={`flex h-[38px] w-10 items-center justify-center transition-colors duration-200 ${
          theme === "light"
            ? "bg-amber-50 text-amber-500"
            : "text-slate-400 hover:text-slate-600"
        }`}
      >
        <Sun size={15} strokeWidth={2.5} />
      </button>
      <div className="h-5 w-px bg-slate-200" />
      <button
        type="button"
        onClick={() => setTheme("dark")}
        aria-label="Modo oscuro"
        className={`flex h-[38px] w-10 items-center justify-center transition-colors duration-200 ${
          theme === "dark"
            ? "bg-slate-800 text-amber-300"
            : "text-slate-400 hover:text-slate-600"
        }`}
      >
        <Moon size={15} strokeWidth={2.5} />
      </button>
    </div>
  );
}
