import { memo } from "react";
import { motion } from "framer-motion";
import { stagger, fadeUp } from "@/lib/motion";
import { HeroCTA } from "./HeroCTA";
import { HeroChips } from "./HeroChips";
import { HeroTrustBar } from "./HeroTrustBar";
import type { HeroVariantProps } from "./hero.constants";

type HeroContentProps = HeroVariantProps & {
  /** Show the "AI Career & Skills Companion for Schools" badge (mobile only) */
  showBadge?: boolean;
};

export const HeroContent = memo(function HeroContent({
  compact = false,
  mobile = false,
  showBadge = false,
}: HeroContentProps) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={stagger}
      style={
        mobile
          ? {
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }
          : {}
      }
    >
      {/* Heading */}
      <motion.h1
        variants={fadeUp}
        style={{
          fontFamily: "Instrument Serif, serif",
          color: "var(--t-h)",
          width: "100%",
          fontSize: mobile
            ? "clamp(36px, 10vw, 52px)"
            : compact
              ? "clamp(26px, 3.2vw, 44px)"
              : "clamp(34px, 4.5vw, 58px)",
          lineHeight: mobile ? 1.1 : 1.12,
          letterSpacing: mobile ? "-0.025em" : "-0.02em",
          marginBottom: compact ? 14 : 20,
        }}
      >
        Noor{" "}
        <em
          style={{
            color: mobile ? "#1D9E75" : "var(--a)",
            fontStyle: "italic",
          }}
        >
          AI Career &amp; Skills
        </em>
        <br />
        Companion for Schools
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        variants={fadeUp}
        style={{
          color: "var(--t-b)",
          fontWeight: mobile ? 400 : 500,
          lineHeight: 1.75,
          fontSize: mobile
            ? 16
            : compact
              ? "clamp(12px, 1vw, 14px)"
              : "clamp(15px, 1.1vw, 17px)",
          maxWidth: compact && !mobile ? 340 : 520,
          marginBottom: mobile ? 36 : compact ? 24 : 38,
        }}
      >
        An AI-powered advisor that helps students aged 14–18 choose the right
        subjects, discover their strengths, and build the skills that actually
        matter for their future.
      </motion.p>

      <HeroCTA compact={compact} mobile={mobile} />
      <HeroChips compact={compact} centered={mobile} />
      <HeroTrustBar centered={mobile} />
    </motion.div>
  );
});
