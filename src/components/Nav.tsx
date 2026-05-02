import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/images/logo-horizontal.png";
import logoDark from "../assets/images/logo-horizontal-dark.png";

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
      const y = window.scrollY;
      setShowBackTop(y > 400);

      // Update active nav based on scroll position
      const sections = NAV_ITEMS.map((item) =>
        document.getElementById(item.id),
      );
      let current = 0;
      sections.forEach((sec, i) => {
        if (sec) {
          const top = sec.getBoundingClientRect().top;
          if (top <= 120) current = i;
        }
      });
      setActiveIdx(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Update pill highlight
  useEffect(() => {
    const pill = pillRefs.current[activeIdx];
    const container = pillsRef.current;
    if (pill && container) {
      const containerRect = container.getBoundingClientRect();
      const pillRect = pill.getBoundingClientRect();
      setHighlightStyle({
        left: pillRect.left - containerRect.left,
        width: pillRect.width,
      });
    }
  }, [activeIdx]);

  const handleNavClick = (id: string, idx: number) => {
    setActiveIdx(idx);
    setDrawerOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav className="nav">
        {/* Logo */}
        <div className="nav-logo" onClick={handleBackToTop}>
          {theme === "dark" ? (
            <img src={logoDark} alt="Noor" className="nav-logo-icon" />
          ) : (
            <img src={logo} alt="Noor" className="nav-logo-icon" />
          )}
        </div>

        {/* Desktop pill nav */}
        <div className="nav-pills" ref={pillsRef}>
          <div
            className="nav-pill-highlight"
            style={{ left: highlightStyle.left, width: highlightStyle.width }}
          />
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.id}
              ref={(el) => {
                pillRefs.current[i] = el;
              }}
              className={`nav-pill${activeIdx === i ? " active" : ""}`}
              onClick={() => handleNavClick(item.id, i)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right controls */}
        <div className="nav-right">
          <button
            className="theme-btn"
            onClick={toggleTheme}
            title="Toggle theme"
          >
            {theme === "dark" ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
          <button
            className="nav-cta"
            onClick={() => {
              const el = document.getElementById("early-access");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Get Early Access →
          </button>
          <button
            className={`hamburger${drawerOpen ? " open" : ""}`}
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

      {/* Mobile drawer backdrop */}
      <div
        className={`mobile-drawer-backdrop${drawerOpen ? " open" : ""}`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Mobile drawer */}
      <div className={`mobile-drawer${drawerOpen ? " open" : ""}`}>
        <div className="mobile-drawer-header">
          <div className="nav-logo">
            <div className="nav-logo-icon">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <circle cx="7.5" cy="7.5" r="3" fill="white" />
                <path
                  d="M7.5 1v2M7.5 12v2M1 7.5h2M12 7.5h2M3.05 3.05l1.41 1.41M10.54 10.54l1.41 1.41M10.54 3.05l-1.41 1.41M4.46 10.54l-1.41 1.41"
                  stroke="white"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="nav-logo-text">Noor</span>
          </div>
          <button
            className="mobile-drawer-close"
            onClick={() => setDrawerOpen(false)}
          >
            ✕
          </button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 24,
          }}
        >
          <span style={{ fontSize: "0.85rem", color: "var(--text-b)" }}>
            {theme === "dark" ? "Dark mode" : "Light mode"}
          </span>
          <button className="theme-btn" onClick={toggleTheme}>
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>

        <div className="mobile-nav-items">
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.id}
              className="mobile-nav-item"
              onClick={() => handleNavClick(item.id, i)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          className="mobile-cta"
          onClick={() => {
            setDrawerOpen(false);
            const el = document.getElementById("early-access");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Get Early Access →
        </button>
      </div>

      {/* Back to top */}
      <button
        className={`back-to-top${showBackTop ? " visible" : ""}`}
        onClick={handleBackToTop}
        aria-label="Back to top"
      >
        ↑
      </button>
    </>
  );
};

export default Nav;
