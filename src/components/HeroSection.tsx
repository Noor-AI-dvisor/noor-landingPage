import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { EASE_SPRING, stagger, fadeUp, scrollTo } from "@/lib/motion";
import SectionBadge from "@/components/SectionBadge";
import WhoSection from "./WhoSection";
import HeroAppMock from "./HeroAppMock";

function HeroInner({
  compact = false,
  noConstrainHeight = false,
  isMobile = false,
}: {
  compact?: boolean;
  noConstrainHeight?: boolean;
  isMobile?: boolean;
}) {
  return (
    <section
      style={{
        position: "relative",
        zIndex: 10,
        background: "var(--hero-bg)",
        height: noConstrainHeight ? "auto" : "100dvh",
        paddingTop: noConstrainHeight
          ? "calc(64px + clamp(40px, 6vh, 72px))"
          : "calc(64px + clamp(56px, 9vh, 104px))",
        paddingBottom: noConstrainHeight
          ? "clamp(48px, 6vh, 72px)"
          : "clamp(64px, 9vh, 104px)",
        paddingLeft: compact ? "clamp(16px, 4vw, 48px)" : "clamp(24px, 8vw, 120px)",
        paddingRight: compact ? "clamp(16px, 4vw, 48px)" : "clamp(24px, 8vw, 120px)",
        display: "grid",
        gridTemplateColumns: compact
          ? "1fr 1fr"
          : "repeat(auto-fit, minmax(min(100%, 520px), 1fr))",
        gap: compact ? "clamp(16px, 3vw, 40px)" : "clamp(56px, 7vw, 112px)",
        alignItems: "center",
        overflowY: noConstrainHeight ? "visible" : "hidden",
        ...(isMobile && { display: "flex", flexDirection: "column", alignItems: "center" }),
      }}
    >
      {/* Left */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={stagger}
        style={isMobile ? { display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" } : {}}
      >
        <motion.div variants={fadeUp}>
          <SectionBadge
            label={compact ? "AI Career + Skills for Schools" : "AI Career + Skills Companion for Schools"}
          />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          style={{
            fontWeight: 900,
            color: "var(--t-h)",
            width: "100%",
            fontSize: compact ? "clamp(26px, 3.2vw, 44px)" : "clamp(38px, 4.8vw, 64px)",
            lineHeight: 1.04,
            letterSpacing: compact ? "-1.5px" : "-2.5px",
            marginBottom: compact ? 14 : 22,
          }}
        >
          Noor <span className="animate-shimmer">AI Career & Skills</span>
          <br />
          Companion for Schools
        </motion.h1>

        <motion.p
          variants={fadeUp}
          style={{
            color: "var(--t-b)",
            fontWeight: 500,
            lineHeight: 1.78,
            fontSize: compact ? "clamp(12px, 1vw, 14px)" : "clamp(15px, 1.15vw, 17px)",
            maxWidth: compact ? 340 : 480,
            marginBottom: compact ? 24 : 38,
            ...(isMobile && { margin: "0 auto", marginBottom: compact ? 24 : 38 }),
          }}
        >
          An AI-powered advisor that helps students aged 14–18 choose the right
          subjects, discover their strengths, and build the skills that actually
          matter for their future.
        </motion.p>

        <motion.div
          variants={fadeUp}
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            ...(isMobile && { justifyContent: "center" }),
          }}
        >
          <motion.button
            onClick={() => scrollTo("early-access")}
            whileHover={{ scale: 1.03, boxShadow: "0 10px 28px rgba(29,158,117,0.4)" }}
            whileTap={{ scale: 0.97 }}
            style={{
              border: "none",
              background: "#1D9E75",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 800,
              color: "white",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(29,158,117,0.3)",
              borderRadius: 10,
              padding: compact ? "11px 22px" : "15px 34px",
              fontSize: compact ? 12 : 14,
            }}
          >
            Request a free demo →
          </motion.button>
          <motion.button
            onClick={() => scrollTo("solution")}
            whileHover={{ borderColor: "#1D9E75", color: "#1D9E75", background: "#F0FDF4" }}
            whileTap={{ scale: 0.97 }}
            style={{
              border: "1.5px solid var(--card-border)",
              background: "var(--card-active)",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 700,
              color: "var(--t-b)",
              cursor: "pointer",
              borderRadius: 10,
              padding: compact ? "11px 22px" : "15px 34px",
              fontSize: compact ? 12 : 14,
            }}
          >
            See How It Works
          </motion.button>
        </motion.div>

        <motion.div
          variants={fadeUp}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: compact ? 10 : 20,
            marginTop: compact ? 20 : 36,
            ...(isMobile && { justifyContent: "center" }),
          }}
        >
          {[
            { icon: "🎓", text: "Ages 14–18" },
            { icon: "⚡", text: "10-min missions" },
            { icon: "🏆", text: "11 skill domains" },
          ].map((chip) => (
            <div
              key={chip.text}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                borderRadius: 9999,
                background: "var(--card-active)",
                border: "1px solid var(--card-border)",
                padding: compact ? "5px 10px" : "6px 14px",
              }}
            >
              <span style={{ fontSize: compact ? 12 : 14 }}>{chip.icon}</span>
              <span style={{ fontWeight: 700, color: "var(--t-b)", fontSize: compact ? 10 : 12 }}>
                {chip.text}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          style={{
            display: "flex",
            gap: 8,
            marginTop: 16,
            flexWrap: "wrap",
            ...(isMobile && { justifyContent: "center" }),
          }}
        >
          {[
            { label: "Personalised pathways", color: "#4FD1C5" },
            { label: "Real-time AI", color: "#1D9E75" },
            { label: "Career intelligence", color: "#2B43BD" },
          ].map((b) => (
            <div
              key={b.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 12px",
                borderRadius: 9999,
                background: `${b.color}0f`,
                border: `1px solid ${b.color}28`,
              }}
            >
              <div style={{ width: 5, height: 5, borderRadius: 9999, background: b.color }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: b.color }}>
                {b.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Right – App mockup */}
      {!isMobile && <HeroAppMock compact={compact} />}
    </section>
  );
}

export default function HeroSection() {
  const [progress, setProgress] = useState(0);
  const [screenWidth, setScreenWidth] = useState(1200);
  const progressRef = useRef(0);
  const doneRef = useRef(false);
  const touchYRef = useRef(0);
  const isMobileRef = useRef(false);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setScreenWidth(w);
      isMobileRef.current = w < 1024;
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (doneRef.current || isMobileRef.current) return;
      e.preventDefault();
      const raw =
        e.deltaMode === 1 ? e.deltaY * 40 : e.deltaMode === 2 ? e.deltaY * 600 : e.deltaY;
      const next = Math.max(0, Math.min(1, progressRef.current + raw / 500));
      progressRef.current = next;
      setProgress(next);
      if (next >= 1) doneRef.current = true;
    };

    const onTouchStart = (e: TouchEvent) => {
      touchYRef.current = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (doneRef.current || isMobileRef.current) return;
      e.preventDefault();
      const dy = touchYRef.current - e.touches[0].clientY;
      touchYRef.current = e.touches[0].clientY;
      const next = Math.max(0, Math.min(1, progressRef.current + dy / 300));
      progressRef.current = next;
      setProgress(next);
      if (next >= 1) doneRef.current = true;
    };

    const onScroll = () => {
      if (doneRef.current && window.scrollY === 0) {
        doneRef.current = false;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const onSplitAndGo = (e: Event) => {
      const targetId = (e as CustomEvent<string>).detail;

      if (doneRef.current || isMobileRef.current) {
        scrollTo(targetId);
        return;
      }

      const startTime = performance.now();
      const startProg = progressRef.current;
      const DURATION = 700;

      const frame = (now: number) => {
        const t = Math.min((now - startTime) / DURATION, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const next = startProg + (1 - startProg) * eased;
        progressRef.current = next;
        setProgress(next);
        if (t < 1) {
          requestAnimationFrame(frame);
        } else {
          progressRef.current = 1;
          doneRef.current = true;
          setProgress(1);
          setTimeout(() => scrollTo(targetId), 150);
        }
      };
      requestAnimationFrame(frame);
    };

    window.addEventListener("noor:splitAndGo", onSplitAndGo);
    return () => window.removeEventListener("noor:splitAndGo", onSplitAndGo);
  }, []);

  const isMobile = screenWidth < 1024;
  const isCompact = screenWidth < 1060;

  if (isMobile) {
    return (
      <div style={{ position: "relative", zIndex: 20 }}>
        <HeroInner compact={false} noConstrainHeight isMobile={isMobile} />
        <WhoSection />
      </div>
    );
  }

  const revealOpacity = Math.max(0, (progress - 0.1) / 0.9);
  const revealScale = 0.92 + progress * 0.08;
  const revealRadius = (1 - progress) * 28;

  return (
    <div style={{ height: "100dvh", position: "relative", zIndex: 20, overflow: "hidden" }}>
      {/* Reveal layer — Who section teaser */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 1,
          background: "var(--pg)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          padding: "clamp(24px,8vw,120px)",
          opacity: revealOpacity,
          transform: `scale(${revealScale})`,
          transformOrigin: "center center",
          borderRadius: revealRadius,
        }}
      >
        <WhoSection />
      </div>

      {/* Left door */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 2,
          willChange: "transform",
          clipPath: "inset(0 50% 0 0)",
          transform: `translateX(${-progress * 50}%)`,
        }}
      >
        <HeroInner compact={isCompact} isMobile={isMobile} />
      </div>

      {/* Right door */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 2,
          willChange: "transform",
          clipPath: "inset(0 0 0 50%)",
          transform: `translateX(${progress * 50}%)`,
        }}
      >
        <HeroInner compact={isCompact} />
      </div>
    </div>
  );
}
