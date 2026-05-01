import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { EASE_SPRING, stagger, fadeUp, scrollTo } from "@/lib/motion";
import ProblemSection from "./ProblemSection";
import HeroAppMock from "./HeroAppMock";

const TRUST_ITEMS = [
  ["🎯", "Personalised pathways"],
  ["🤖", "Real-time AI"],
  ["🌍", "Career intelligence"],
] as const;

function HeroMobile(compact = false, isMobile = true) {
  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={stagger}
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "88px 24px 64px",
        background:
          "radial-gradient(ellipse 90% 65% at 50% 0%, #E1F9F6 0%, var(--pg) 68%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative blobs */}
      <div
        style={{
          position: "absolute",
          top: -60,
          right: -60,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "#9FE1CB1a",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: -80,
          width: 240,
          height: 240,
          borderRadius: "50%",
          background: "#2B43BD0a",
          pointerEvents: "none",
        }}
      />

      {/* Badge */}
      <motion.div variants={fadeUp} style={{ marginBottom: 24 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            background: "var(--card-active)",
            border: "1.5px solid #9FE1CB",
            borderRadius: 100,
            padding: "6px 14px",
            fontSize: 12,
            fontWeight: 700,
            color: "#1D9E75",
            letterSpacing: "0.02em",
            boxShadow: "0 2px 8px #9FE1CB44",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#1D9E75",
              flexShrink: 0,
            }}
          />
          AI Career &amp; Skills Companion for Schools
        </div>
      </motion.div>

      {/* H1 */}
      <motion.h1
        variants={fadeUp}
        style={{
          fontFamily: "Instrument Serif, serif",
          fontSize: "clamp(36px, 10vw, 52px)",
          lineHeight: 1.1,
          letterSpacing: "-0.025em",
          color: "var(--t-h)",
          marginBottom: 20,
        }}
      >
        Noor{" "}
        <em style={{ color: "#1D9E75", fontStyle: "italic" }}>
          AI Career &amp; Skills
        </em>
        <br />
        Companion for Schools
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        variants={fadeUp}
        style={{
          fontSize: 16,
          color: "var(--t-b)",
          lineHeight: 1.75,
          marginBottom: 36,
          maxWidth: 520,
          fontWeight: 400,
        }}
      >
        An AI-powered advisor that helps students aged 14–18 choose the right
        subjects, discover their strengths, and build the skills that actually
        matter for their future.
      </motion.p>

      {/* CTAs */}
      <motion.div
        variants={fadeUp}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          marginBottom: 28,
        }}
      >
        <motion.button
          onClick={() => scrollTo("early-access")}
          whileHover={{ scale: 1.02, boxShadow: "0 8px 24px #1D9E7555" }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: "linear-gradient(135deg, #1D9E75, #16876A)",
            color: "white",
            padding: "15px 28px",
            borderRadius: 12,
            fontSize: 16,
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 18px #1D9E7544",
            textAlign: "center",
          }}
        >
          Request a free demo →
        </motion.button>
        <motion.button
          onClick={() => scrollTo("solution")}
          whileHover={{ borderColor: "#1D9E75", color: "#1D9E75" }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: "var(--card-active)",
            color: "var(--t-h)",
            padding: "15px 24px",
            borderRadius: 12,
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer",
            border: "1.5px solid #9FE1CB",
            textAlign: "center",
          }}
        >
          See How It Works ↓
        </motion.button>
      </motion.div>

      {/* Perks */}
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
              background: "var(--card)",
              border: "1px solid var(--card-border)",
              padding: compact ? "5px 10px" : "6px 14px",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow: "0 2px 16px var(--card-shadow)",
            }}
          >
            <span style={{ fontSize: compact ? 12 : 14 }}>{chip.icon}</span>
            <span
              style={{
                fontWeight: 700,
                color: "var(--t-b)",
                fontSize: compact ? 10 : 12,
              }}
            >
              {chip.text}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Trust bar */}
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
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: 9999,
                background: b.color,
              }}
            />
            <span style={{ fontSize: 11, fontWeight: 700, color: b.color }}>
              {b.label}
            </span>
          </div>
        ))}
      </motion.div>
    </motion.section>
  );
}

function HeroInner({
  compact = false,
  noConstrainHeight = false,
  isMobile = false,
  mockScale = 1,
}: {
  compact?: boolean;
  noConstrainHeight?: boolean;
  isMobile?: boolean;
  mockScale?: number;
}) {
  return (
    <section
      style={{
        position: "relative",
        zIndex: 10,
        background: isMobile ? "var(--pg)" : "var(--hero-bg)",
        height: noConstrainHeight ? "auto" : "100dvh",
        paddingTop: noConstrainHeight
          ? "calc(64px + clamp(40px, 6vh, 72px))"
          : "calc(64px + clamp(56px, 9vh, 104px))",
        paddingBottom: noConstrainHeight
          ? "clamp(48px, 6vh, 72px)"
          : "clamp(64px, 9vh, 104px)",
        paddingLeft: compact
          ? "clamp(16px, 4vw, 48px)"
          : "clamp(24px, 8vw, 120px)",
        paddingRight: compact
          ? "clamp(16px, 4vw, 48px)"
          : "clamp(24px, 8vw, 120px)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: compact ? "clamp(16px, 3vw, 40px)" : "clamp(40px, 5vw, 80px)",
        alignItems: "center",
        overflowY: noConstrainHeight ? "visible" : "hidden",
        ...(isMobile && {
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }),
      }}
    >
      {/* Left */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={stagger}
        style={
          isMobile
            ? {
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }
            : {}
        }
      >
        <motion.h1
          variants={fadeUp}
          style={{
            fontFamily: "Instrument Serif, serif",
            color: "var(--t-h)",
            width: "100%",
            fontSize: compact
              ? "clamp(26px, 3.2vw, 44px)"
              : "clamp(34px, 4.5vw, 58px)",
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            marginBottom: compact ? 14 : 20,
          }}
        >
          Noor{" "}
          <em style={{ color: "var(--a)", fontStyle: "italic" }}>
            AI Career & Skills
          </em>
          <br />
          Companion for Schools
        </motion.h1>

        <motion.p
          variants={fadeUp}
          style={{
            color: "var(--t-b)",
            fontWeight: 500,
            lineHeight: 1.75,
            fontSize: compact
              ? "clamp(12px, 1vw, 14px)"
              : "clamp(15px, 1.1vw, 17px)",
            maxWidth: compact ? 340 : 520,
            marginBottom: compact ? 24 : 38,
            ...(isMobile && {
              margin: "0 auto",
              marginBottom: compact ? 24 : 38,
            }),
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
            whileHover={{
              scale: 1.03,
              boxShadow: "0 10px 28px rgba(29,158,117,0.4)",
            }}
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
              ...(isMobile && { marginTop: 20 }),
            }}
          >
            Request a free demo →
          </motion.button>
          <motion.button
            onClick={() => scrollTo("solution")}
            whileHover={{
              borderColor: "#1D9E75",
              color: "#1D9E75",
              background: "#F0FDF4",
            }}
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
              ...(isMobile && { marginTop: 20 }),
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
                background: "var(--card)",
                border: "1px solid var(--card-border)",
                padding: compact ? "5px 10px" : "6px 14px",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxShadow: "0 2px 16px var(--card-shadow)",
              }}
            >
              <span style={{ fontSize: compact ? 12 : 14 }}>{chip.icon}</span>
              <span
                style={{
                  fontWeight: 700,
                  color: "var(--t-b)",
                  fontSize: compact ? 10 : 12,
                }}
              >
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
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: 9999,
                  background: b.color,
                }}
              />
              <span style={{ fontSize: 11, fontWeight: 700, color: b.color }}>
                {b.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Right – App mockup */}
      {!isMobile && (
        <div style={{ zoom: mockScale, transformOrigin: "center right" }}>
          <HeroAppMock compact={compact} />
        </div>
      )}
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
      isMobileRef.current = w < 1048;
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
        e.deltaMode === 1
          ? e.deltaY * 40
          : e.deltaMode === 2
            ? e.deltaY * 600
            : e.deltaY;
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

  const isMobile = screenWidth < 1048;
  const isCompact = screenWidth < 1200;
  const mockScale =
    screenWidth >= 1344
      ? 1
      : Math.max(0.62, 0.62 + ((screenWidth - 1048) / (1344 - 1048)) * 0.38);

  if (isMobile) {
    return (
      <div style={{ position: "relative", zIndex: 20 }}>
        <HeroMobile compact={isCompact} isMobile={isMobile} />
        <ProblemSection />
      </div>
    );
  }

  const revealOpacity = Math.max(0, (progress - 0.1) / 0.9);
  const revealScale = 0.92 + progress * 0.08;
  const revealRadius = (1 - progress) * 28;

  return (
    <div
      style={{
        height: "100dvh",
        position: "relative",
        zIndex: 20,
        overflow: "hidden",
      }}
    >
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
        <ProblemSection />
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
        <HeroInner
          compact={isCompact}
          isMobile={isMobile}
          mockScale={mockScale}
        />
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
        <HeroInner compact={isCompact} mockScale={mockScale} />
      </div>
    </div>
  );
}
