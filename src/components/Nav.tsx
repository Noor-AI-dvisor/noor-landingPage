import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/images/logo-horizontal.png";
import logoDark from "../assets/images/logo-horizontal-dark.png";
import { SunIcon, MoonIcon } from "./Icons";

interface NavProps {
  theme: string;
  toggleTheme: () => void;
}

const NAV_ITEMS = [
  { label: "Home", id: "home" },
  { label: "The Problem", id: "problem" },
  { label: "Our Solution", id: "solution-wrap" },
  { label: "Who It's For", id: "who" },
];

const Nav: React.FC<NavProps> = ({ theme, toggleTheme }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);
  const [highlightStyle, setHighlightStyle] = useState({ left: 4, width: 0 });
  const pillsRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      setShowBackTop(window.scrollY > 400);
      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
      let current = 0;
      sections.forEach((sec, i) => {
        if (sec && sec.getBoundingClientRect().top <= 120) current = i;
      });
      setActiveIdx(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const updateHighlight = () => {
      const pill = pillRefs.current[activeIdx];
      const container = pillsRef.current;
      if (pill && container) {
        const cr = container.getBoundingClientRect();
        const pr = pill.getBoundingClientRect();
        setHighlightStyle({ left: pr.left - cr.left, width: pr.width });
      }
    };
    updateHighlight();
    window.addEventListener("resize", updateHighlight);
    return () => window.removeEventListener("resize", updateHighlight);
  }, [activeIdx]);

  const handleNavClick = (id: string, idx: number) => {
    setActiveIdx(idx);
    setDrawerOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBackToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* ── Nav bar */}
      <nav className="fixed top-0 left-0 right-0 z-[1000] h-16 px-6 flex items-center justify-between bg-[var(--glass-bg-strong)] backdrop-blur-2xl border-b border-[var(--glass-border)] shadow-nav transition-transform duration-300">

        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer select-none group" onClick={handleBackToTop}>
          <img
            src={theme === "dark" ? logoDark : logo}
            alt="Noor"
            className="h-10 w-auto rounded-lg shrink-0 transition-shadow duration-200 group-hover:shadow-[0_4px_16px_var(--accent-glow-h)]"
          />
        </div>

        {/* Desktop pill nav */}
        <div
          className="hidden lg:flex items-center bg-[var(--pill-bg)] border border-[var(--border-s)] rounded-full p-1 relative gap-0.5"
          ref={pillsRef}
        >
          <div
            className="absolute top-1 h-[calc(100%-8px)] bg-[var(--pill-active)] rounded-full shadow-sm pointer-events-none transition-[left,width] duration-300"
            style={{ left: highlightStyle.left, width: highlightStyle.width }}
          />
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.id}
              ref={(el) => { pillRefs.current[i] = el; }}
              className={`px-4 py-1.5 text-[0.85rem] rounded-full cursor-pointer border-none bg-transparent whitespace-nowrap relative z-10 transition-colors duration-200 ${
                activeIdx === i
                  ? "text-[var(--text-h)] font-semibold"
                  : "text-[var(--text-b)] font-medium hover:text-[var(--text-h)]"
              }`}
              onClick={() => handleNavClick(item.id, i)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <button
            className="w-[38px] h-[38px] rounded-full border border-[var(--border-s)] bg-[var(--pill-bg)] text-[var(--text-b)] cursor-pointer flex items-center justify-center backdrop-blur-sm transition-all duration-200 hover:text-[var(--text-h)] hover:scale-105 active:scale-95"
            onClick={toggleTheme}
            title="Toggle theme"
          >
            {theme === "dark" ? <SunIcon className="w-[15px] h-[15px]" /> : <MoonIcon className="w-[15px] h-[15px]" />}
          </button>

          <button
            className="hidden lg:block px-[22px] py-[9px] bg-accent text-white border-none rounded-full font-sans text-[13px] font-semibold cursor-pointer tracking-[0.01em] shadow-[0_2px_12px_var(--accent-glow)] transition-all duration-200 hover:scale-[1.04] hover:shadow-[0_6px_22px_var(--accent-glow-h)] active:scale-[0.97] whitespace-nowrap"
            onClick={() => document.getElementById("early-access")?.scrollIntoView({ behavior: "smooth" })}
          >
            Get Early Access →
          </button>

          <button
            className={`hamburger lg:hidden${drawerOpen ? " open" : ""}`}
            onClick={() => setDrawerOpen(!drawerOpen)}
            aria-label="Menu"
          >
            <div className="hamburger-lines">
              <span />
              <span />
              <span />
            </div>
          </button>
        </div>
      </nav>

      {/* ── Mobile backdrop */}
      <div
        className={`fixed inset-0 z-[998] bg-black/40 transition-opacity duration-300 lg:hidden ${
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* ── Mobile drawer */}
      <div
        className={`fixed top-0 right-0 w-[min(320px,85vw)] h-screen bg-[var(--glass-bg-strong)] backdrop-blur-2xl border-l border-[var(--glass-border)] z-[999] flex flex-col p-6 transition-transform duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] lg:hidden ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <circle cx="7.5" cy="7.5" r="3" fill="white" />
                <path d="M7.5 1v2M7.5 12v2M1 7.5h2M12 7.5h2M3.05 3.05l1.41 1.41M10.54 10.54l1.41 1.41M10.54 3.05l-1.41 1.41M4.46 10.54l-1.41 1.41" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-display text-[19px] font-medium tracking-[-0.01em] text-[var(--text-h)]">Noor</span>
          </div>
          <button
            className="w-8 h-8 rounded-full border border-[var(--border-s)] bg-transparent text-[var(--text-h)] text-lg cursor-pointer flex items-center justify-center transition-colors hover:text-accent"
            onClick={() => setDrawerOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Theme row */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-[0.85rem] text-[var(--text-b)]">
            {theme === "dark" ? "Dark mode" : "Light mode"}
          </span>
          <button
            className="w-[38px] h-[38px] rounded-full border border-[var(--border-s)] bg-[var(--pill-bg)] text-[var(--text-b)] cursor-pointer flex items-center justify-center"
            onClick={toggleTheme}
          >
            {theme === "dark" ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
          </button>
        </div>

        {/* Nav items */}
        <div className="flex flex-col gap-2">
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.id}
              className="px-4 py-3.5 rounded-xl border-none bg-transparent text-base font-medium text-[var(--text-h)] cursor-pointer text-left transition-all duration-200 hover:bg-[rgba(29,158,117,0.1)] hover:text-accent"
              onClick={() => handleNavClick(item.id, i)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          className="mt-6 px-4 py-3.5 bg-accent text-white border-none rounded-xl text-base font-semibold cursor-pointer text-center transition-opacity hover:opacity-90"
          onClick={() => {
            setDrawerOpen(false);
            document.getElementById("early-access")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Get Early Access →
        </button>
      </div>

      {/* ── Back to top */}
      <button
        className={`fixed bottom-7 right-7 w-11 h-11 rounded-full bg-accent text-white border-none cursor-pointer flex items-center justify-center text-lg shadow-[0_4px_16px_var(--accent-glow)] z-[900] transition-all duration-300 hover:bg-[#179065] hover:shadow-[0_6px_20px_var(--accent-glow-h)] hover:-translate-y-0.5 ${
          showBackTop ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none"
        }`}
        onClick={handleBackToTop}
        aria-label="Back to top"
      >
        ↑
      </button>
    </>
  );
};

export default Nav;
