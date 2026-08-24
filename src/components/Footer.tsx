import logo from "../assets/images/logo-horizontal.png";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--divider)] px-[clamp(24px,8vw,120px)] py-[clamp(28px,5vh,40px)]">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Noor" className="h-9 w-auto object-contain" />
          <span className="hidden sm:inline text-[13px] font-semibold text-[var(--t-b)]">
            AI Career &amp; Skills Companion for Schools
          </span>
        </div>

        <p className="text-[12.5px] text-[var(--t-s)] font-medium text-center">
          © 2026 Noor. Noor means &lsquo;light&rsquo; in Arabic.
        </p>
      </div>
    </footer>
  );
}
