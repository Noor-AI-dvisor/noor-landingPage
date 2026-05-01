import { memo } from "react";
import { motion } from "framer-motion";
import { fadeUp, scrollTo } from "@/lib/motion";
import type { HeroVariantProps } from "./hero.constants";

export const HeroCTA = memo(function HeroCTA({
  compact = false,
  mobile = false,
}: HeroVariantProps) {
  const borderRadius = mobile ? 12 : 10;
  const fontSize = mobile ? 16 : compact ? 12 : 14;
  const padding = mobile
    ? undefined // defined per-button below
    : compact
      ? "11px 22px"
      : "15px 34px";

  return (
    <motion.div
      variants={fadeUp}
      style={{
        display: "flex",
        flexDirection: mobile ? "column" : "row",
        gap: mobile ? 12 : 10,
        flexWrap: mobile ? "nowrap" : "wrap",
        marginBottom: mobile ? 28 : 0,
      }}
    >
      <motion.button
        onClick={() => scrollTo("early-access")}
        whileHover={{
          scale: mobile ? 1.02 : 1.03,
          boxShadow: mobile
            ? "0 8px 24px #1D9E7555"
            : "0 10px 28px rgba(29,158,117,0.4)",
        }}
        whileTap={{ scale: 0.97 }}
        style={{
          border: "none",
          background: mobile
            ? "linear-gradient(135deg, #1D9E75, #16876A)"
            : "#1D9E75",
          fontFamily: "Montserrat, sans-serif",
          fontWeight: mobile ? 700 : 800,
          color: "white",
          cursor: "pointer",
          boxShadow: mobile
            ? "0 4px 18px #1D9E7544"
            : "0 4px 16px rgba(29,158,117,0.3)",
          borderRadius,
          padding: mobile ? "15px 28px" : padding,
          fontSize,
          ...(mobile && { textAlign: "center" as const }),
        }}
      >
        Request a free demo →
      </motion.button>

      <motion.button
        onClick={() => scrollTo("solution")}
        whileHover={{
          borderColor: "#1D9E75",
          color: "#1D9E75",
          ...(!mobile && { background: "#F0FDF4" }),
        }}
        whileTap={{ scale: 0.97 }}
        style={{
          border: mobile
            ? "1.5px solid #9FE1CB"
            : "1.5px solid var(--card-border)",
          background: "var(--card-active)",
          fontFamily: "Montserrat, sans-serif",
          fontWeight: mobile ? 600 : 700,
          color: mobile ? "var(--t-h)" : "var(--t-b)",
          cursor: "pointer",
          borderRadius,
          padding: mobile ? "15px 24px" : padding,
          fontSize,
          ...(mobile && { textAlign: "center" as const }),
        }}
      >
        {mobile ? "See How It Works ↓" : "See How It Works"}
      </motion.button>
    </motion.div>
  );
});
