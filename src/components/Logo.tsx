export default function Logo() {
  return (
    <div className="fixed left-5 top-5 z-30 flex flex-col items-start gap-1 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-lg shadow-slate-200/70 md:left-6">
      <p className="text-[9px] font-black uppercase tracking-[0.28em] text-slate-400">Import – Export</p>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#169b22] text-white shadow-inner">
          <span className="text-xl font-black" aria-hidden="true">L</span>
        </div>
        <div>
          <p className="text-base font-black leading-none tracking-tight text-[#169b22]">NOVEDADES</p>
          <p className="text-xl font-black leading-none text-[#202020]">LEIVA</p>
        </div>
      </div>
      <p className="text-[9px] font-black uppercase tracking-[0.28em] text-slate-400">Desde 1996</p>
    </div>
  );
}
