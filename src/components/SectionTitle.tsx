interface Props {
  eyebrow: string;
  title: string;
}

export default function SectionTitle({ eyebrow, title }: Props) {
  return (
    <div className="mb-4 px-2">
      <p className="mb-1 text-[10px] font-black uppercase tracking-[0.28em] text-slate-400">{eyebrow}</p>
      <h2 className="text-xl font-black tracking-tight text-slate-950 md:text-3xl">{title}</h2>
    </div>
  );
}
