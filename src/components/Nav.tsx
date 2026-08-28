import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/images/logo-horizontal.png";
import { STORY_STEPS, scrollToSection } from "../lib/storyScroll";

const NAV_ITEMS = [
  // id is the section's own start anchor, used only for scroll-spy
  // highlighting (so the pill activates the moment the section is entered
  // during normal scrolling); step is where a *click* actually jumps to —
  // for Problem and Who that's past where their own scroll-driven card
  // reveal has already finished, not the section's very first step,
  // otherwise a click lands with only the first card shown, still waiting
  // on manual scroll to reveal the rest.
  { label: "Home", id: "home", step: STORY_STEPS.home },
  { label: "The Problem", id: "problem", step: STORY_STEPS.problemReveal },
  { label: "Our Solution", id: "solution-wrap", step: STORY_STEPS.solution },
  { label: "Who It's For", id: "who", step: STORY_STEPS.whoReveal },
];

const Nav: React.FC = () => {
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

  const handleNavClick = (idx: number) => {
    const item = NAV_ITEMS[idx];
    setActiveIdx(idx);
    setDrawerOpen(false);
    scrollToSection(item.id, item.step);
  };

  const handleBackToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* ── Nav bar (floating centered pill) */}
      <header className="fixed top-0 left-0 right-0 z-[1000] flex justify-center px-4 pt-4">
        <nav className="flex items-center gap-3 pl-3 pr-3 py-2 rounded-full bg-[rgba(255,255,255,0.3)] backdrop-blur-2xl backdrop-saturate-150 border border-[rgba(255,255,255,0.35)] shadow-nav-glass w-full max-w-[880px]">

          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer select-none group shrink-0" onClick={handleBackToTop}>
            <img
              src={logo}
              alt="Noor"
              className="h-8 w-auto rounded-md shrink-0 transition-shadow duration-200 group-hover:shadow-[0_4px_16px_var(--accent-glow-h)]"
            />
          </div>

          {/* Desktop pill nav */}
          <div
            className="hidden lg:flex items-center bg-[var(--pill-bg)] border border-[var(--border-s)] rounded-full p-1 relative gap-0.5 ml-2"
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
                onClick={() => handleNavClick(i)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3 ml-auto">
            <button
              className="hidden lg:block px-[22px] py-[10px] bg-gradient-to-br from-accent to-accent-soft text-white border-none rounded-full font-sans text-[13px] font-bold cursor-pointer tracking-[0.01em] shadow-[0_10px_24px_-8px_var(--accent-glow-h)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
              onClick={() => scrollToSection("early-access", STORY_STEPS.earlyAccess)}
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
      </header>

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
          <img src={logo} alt="Noor" className="h-8 w-auto rounded-md" />
          <button
            className="w-8 h-8 rounded-full border border-[var(--border-s)] bg-transparent text-[var(--text-h)] text-lg cursor-pointer flex items-center justify-center transition-colors hover:text-accent"
            onClick={() => setDrawerOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Nav items */}
        <div className="flex flex-col gap-2">
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.id}
              className="px-4 py-3.5 rounded-xl border-none bg-transparent text-base font-medium text-[var(--text-h)] cursor-pointer text-left transition-all duration-200 hover:bg-[rgba(15,168,143,0.1)] hover:text-accent"
              onClick={() => handleNavClick(i)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          className="mt-6 px-4 py-3.5 bg-gradient-to-br from-accent to-accent-soft text-white border-none rounded-full text-base font-bold cursor-pointer text-center transition-opacity hover:opacity-90"
          onClick={() => {
            setDrawerOpen(false);
            scrollToSection("early-access", STORY_STEPS.earlyAccess);
          }}
        >
          Get Early Access →
        </button>
      </div>

      {/* ── Back to top */}
      <button
        className={`fixed bottom-7 right-7 w-11 h-11 rounded-full bg-gradient-to-br from-accent to-accent-soft text-white border-none cursor-pointer flex items-center justify-center text-lg shadow-[0_16px_36px_-10px_var(--accent-glow-h)] z-[900] transition-all duration-300 hover:-translate-y-0.5 ${
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
