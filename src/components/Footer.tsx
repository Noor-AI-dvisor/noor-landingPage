import logo from "../assets/images/logo-horizontal.png";
import logoDark from "../assets/images/logo-horizontal-dark.png";

export default function Footer({ theme }: { theme: "light" | "dark" }) {
  return (
    <footer className="relative z-10 border-t border-[var(--divider)] px-[clamp(24px,8vw,120px)] py-[clamp(32px,5vh,56px)]">
      <div className="flex flex-col lg:flex-row items-center lg:items-center justify-center lg:justify-between gap-4 lg:gap-5 text-center lg:text-left">
        <div className="flex flex-col items-center lg:items-start gap-1 w-fit">
          <img
            src={theme === "dark" ? logoDark : logo}
            alt="Noor"
            className="h-12 w-auto object-contain"
          />
          <p className="text-[12px] text-[var(--t-s)] font-display italic">
            From curiosity to capability.
          </p>
        </div>

        <p className="order-3 lg:order-none text-[12px] text-[var(--t-s)] font-semibold">
          © 2026 Noor · Student-safe &amp; private.
        </p>

        <div className="flex gap-6">
          {["Privacy", "Terms", "Contact"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-[13px] text-[var(--t-b)] font-semibold no-underline transition-colors duration-200 hover:text-[var(--a)]"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
