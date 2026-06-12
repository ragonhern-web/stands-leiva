interface Props {
  eyebrow: string;
  title: string;
}

export default function SectionTitle({ eyebrow, title }: Props) {
  return (
    <div className="mb-6 px-2 pt-2 md:mb-4 md:pt-0">
      <p className="mb-2 text-[10px] font-black uppercase tracking-[0.28em] text-slate-400 dark:text-slate-500 md:mb-1">{eyebrow}</p>
      <h2 className="text-xl font-black tracking-tight text-slate-950 dark:text-white md:text-3xl">{title}</h2>
    </div>
  );
}
