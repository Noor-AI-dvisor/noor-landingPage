import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_SPRING } from "@/lib/motion";
import { useTheme } from "@/lib/theme";

const NAV_ITEMS = [
  { label: "The Problem", id: "problem" },
  { label: "Our Solution", id: "solution" },
  { label: "Who It's For", id: "who-its-for" },
] as const;

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <motion.line
        x1="2" y1="4" x2="16" y2="4"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
        animate={open ? { y1: 9, y2: 9, rotate: 45, originX: "50%", originY: "50%" } : { y1: 4, y2: 4, rotate: 0 }}
        transition={{ duration: 0.22 }}
      />
      <motion.line
        x1="2" y1="9" x2="16" y2="9"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.line
        x1="2" y1="14" x2="16" y2="14"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
        animate={open ? { y1: 9, y2: 9, rotate: -45, originX: "50%", originY: "50%" } : { y1: 14, y2: 14, rotate: 0 }}
        transition={{ duration: 0.22 }}
      />
    </svg>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [showTop, setShowTop] = useState(false);
  const [showPill, setShowPill] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const lastY = useRef(0);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setVisible(y < lastY.current || y < 80);
      setShowTop(y > 400);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      setShowPill(window.innerWidth >= 1024);
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.35 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNav = (id: string) => {
    setMenuOpen(false);
    window.dispatchEvent(new CustomEvent("noor:splitAndGo", { detail: id }));
  };

  return (
    <>
      <motion.nav
        animate={{ y: visible ? 0 : -72 }}
        transition={{ duration: 0.28, ease: EASE_SPRING }}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(16px, 5vw, 72px)",
          background: scrolled ? "var(--nav-bg-s)" : "var(--nav-bg)",
          backdropFilter: "blur(22px) saturate(180%)",
          WebkitBackdropFilter: "blur(22px) saturate(180%)",
          borderBottom: `1px solid ${scrolled ? "var(--nav-border-s)" : "var(--nav-border)"}`,
          boxShadow: scrolled ? "0 1px 24px var(--nav-shadow-s)" : "none",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ background: "transparent", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", flexShrink: 0 }}
        >
          <img
            src={`${import.meta.env.BASE_URL}logo-horizontal.png`}
            alt="Noor"
            style={{ height: 32, width: "auto", maxWidth: 140, objectFit: "contain" }}
          />
        </button>

        {/* Pill nav — desktop only */}
        {showPill && (
          <div
            style={{
              display: "flex", alignItems: "center", borderRadius: 9999,
              padding: "3px 4px", gap: 2,
              backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)",
              border: "1px solid var(--nav-border-s)", background: "var(--nav-pill)",
            }}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  style={{
                    border: "none", cursor: "pointer",
                    fontFamily: "Montserrat, sans-serif",
                    padding: "6px 14px", borderRadius: 9999, whiteSpace: "nowrap",
                    transition: "none",
                    background: isActive ? "var(--nav-item-act)" : "transparent",
                    fontWeight: isActive ? 700 : 500,
                    fontSize: 12.5,
                    color: isActive ? "var(--nav-txt-act)" : "var(--nav-txt)",
                    boxShadow: isActive ? "0 1px 6px rgba(0,0,0,0.09)" : "none",
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          {/* Theme toggle */}
          <motion.button
            onClick={toggle}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            style={{
              width: 36, height: 36, borderRadius: 9999,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, cursor: "pointer",
              border: "1px solid var(--nav-border-s)",
              background: "var(--nav-pill)", color: "var(--t-b)",
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
                transition={{ duration: 0.2 }}
                style={{ display: "flex" }}
              >
                {theme === "light" ? <MoonIcon /> : <SunIcon />}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          {/* CTA — desktop */}
          {!showPill ? null : (
            <motion.button
              onClick={() => handleNav("early-access")}
              whileHover={{ scale: 1.04, boxShadow: "0 6px 22px rgba(29,158,117,0.38)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "9px 22px", borderRadius: 9999, border: "none",
                background: "var(--a)", fontFamily: "Montserrat, sans-serif",
                fontWeight: 700, fontSize: 13, color: "white",
                cursor: "pointer", boxShadow: "0 2px 12px rgba(29,158,117,0.28)",
                whiteSpace: "nowrap",
              }}
            >
              Get Early Access →
            </motion.button>
          )}

          {/* Hamburger — mobile only */}
          {!showPill && (
            <motion.button
              onClick={() => setMenuOpen((o) => !o)}
              whileTap={{ scale: 0.92 }}
              style={{
                width: 36, height: 36, borderRadius: 9999,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, cursor: "pointer",
                border: "1px solid var(--nav-border-s)",
                background: menuOpen ? "var(--a)" : "var(--nav-pill)",
                color: menuOpen ? "white" : "var(--t-b)",
              }}
            >
              <HamburgerIcon open={menuOpen} />
            </motion.button>
          )}
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: "fixed", inset: 0, zIndex: 48,
                background: "rgba(0,0,0,0.35)",
                backdropFilter: "blur(2px)",
                WebkitBackdropFilter: "blur(2px)",
              }}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              style={{
                position: "fixed", top: 0, right: 0, bottom: 0,
                width: "min(300px, 85vw)",
                zIndex: 49,
                background: "var(--nav-bg-s)",
                backdropFilter: "blur(28px) saturate(180%)",
                WebkitBackdropFilter: "blur(28px) saturate(180%)",
                borderLeft: "1px solid var(--nav-border-s)",
                boxShadow: "-8px 0 40px rgba(0,0,0,0.12)",
                display: "flex",
                flexDirection: "column",
                padding: "80px 28px 40px",
                gap: 4,
              }}
            >
              {/* Nav items */}
              {NAV_ITEMS.map((item, i) => {
                const isActive = active === item.id;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.1, duration: 0.28 }}
                    onClick={() => handleNav(item.id)}
                    style={{
                      border: "none", cursor: "pointer", textAlign: "left",
                      fontFamily: "Montserrat, sans-serif",
                      padding: "14px 16px", borderRadius: 12,
                      background: isActive ? "var(--lb-bg)" : "transparent",
                      fontWeight: isActive ? 700 : 500,
                      fontSize: 15,
                      color: isActive ? "var(--a)" : "var(--t-h)",
                      borderLeft: isActive ? "3px solid var(--a)" : "3px solid transparent",
                    }}
                  >
                    {item.label}
                  </motion.button>
                );
              })}

              {/* Divider */}
              <div style={{ height: 1, background: "var(--divider)", margin: "16px 0" }} />

              {/* CTA */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.28 }}
                onClick={() => handleNav("early-access")}
                style={{
                  border: "none", cursor: "pointer",
                  padding: "14px 20px", borderRadius: 12,
                  background: "var(--a)",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 700, fontSize: 14,
                  color: "white",
                  boxShadow: "0 4px 16px rgba(29,158,117,0.3)",
                  textAlign: "center",
                }}
              >
                Request a free demo →
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="back-to-top"
            initial={{ opacity: 0, y: 14, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.85 }}
            transition={{ duration: 0.3, ease: EASE_SPRING }}
            whileHover={{ scale: 1.1, boxShadow: "0 8px 24px rgba(29,158,117,0.2)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              position: "fixed", bottom: 28, right: 28, zIndex: 40,
              width: 46, height: 46, borderRadius: 9999,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              border: "1px solid var(--divider)",
              background: "var(--card-active)",
              boxShadow: "0 4px 16px var(--card-shadow)",
              color: "var(--a)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
