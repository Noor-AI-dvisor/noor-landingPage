import { memo } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { CHIPS, type HeroBaseProps } from "./hero.constants";

type HeroChipsProps = HeroBaseProps & {
  centered?: boolean;
};

export const HeroChips = memo(function HeroChips({
  compact = false,
  centered = false,
}: HeroChipsProps) {
  return (
    <motion.div
      variants={fadeUp}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: compact ? 10 : 20,
        marginTop: compact ? 20 : 36,
        ...(centered && { justifyContent: "center" }),
      }}
    >
      {CHIPS.map((chip) => (
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
  );
});
