export default function Logo() {
  return (
    <div className="fixed left-6 top-5 z-30 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-lg shadow-slate-200/70">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#169b22] text-white shadow-inner">
        <span className="text-xl font-black" aria-hidden="true">L</span>
      </div>
      <div>
        <p className="text-base font-black leading-none tracking-tight text-[#169b22]">NOVEDADES</p>
        <p className="text-xl font-black leading-none text-[#202020]">LEIVA</p>
      </div>
    </div>
  );
}
