export default function Logo() {
  return (
    <div className="fixed left-5 top-5 z-30 flex flex-col items-start gap-1 rounded-xl border border-white/60 bg-white/70 px-4 py-2 shadow-lg shadow-slate-200/60 backdrop-blur-md md:left-6">
      <p className="text-[9px] font-black uppercase tracking-[0.28em] text-slate-400">Import – Export</p>
      <div className="flex items-center gap-3">
        <img
          src="/assets/logo.png"
          alt="Novedades Leiva S.L."
          className="h-10 w-10 object-contain mix-blend-multiply"
        />
        <div className="flex flex-col leading-none">
          <p className="text-[9px] font-black uppercase tracking-[0.28em] text-slate-400">Desde</p>
          <p className="text-2xl font-black leading-none text-[#202020]">1996</p>
        </div>
      </div>
    </div>
  );
}
