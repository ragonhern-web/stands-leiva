export default function Logo() {
  return (
    <div className="fixed left-5 top-5 z-30 rounded-xl border border-white/60 bg-white/70 px-3 py-2 shadow-lg shadow-slate-200/60 backdrop-blur-md md:left-6">
      <img
        src="/assets/logo.png"
        alt="Novedades Leiva S.L."
        className="h-14 w-auto object-contain"
      />
    </div>
  );
}
