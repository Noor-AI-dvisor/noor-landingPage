import { memo } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { TRUST_ITEMS } from "./hero.constants";

type HeroTrustBarProps = {
  centered?: boolean;
};

export const HeroTrustBar = memo(function HeroTrustBar({
  centered = false,
}: HeroTrustBarProps) {
  return (
    <motion.div
      variants={fadeUp}
      style={{
        display: "flex",
        gap: 8,
        marginTop: 16,
        flexWrap: "wrap",
        ...(centered && { justifyContent: "center" }),
      }}
    >
      {TRUST_ITEMS.map((item) => (
        <div
          key={item.label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 12px",
            borderRadius: 9999,
            background: `${item.color}0f`,
            border: `1px solid ${item.color}28`,
          }}
        >
          <div
            style={{
              width: 5,
              height: 5,
              borderRadius: 9999,
              background: item.color,
            }}
          />
          <span style={{ fontSize: 11, fontWeight: 700, color: item.color }}>
            {item.label}
          </span>
        </div>
      ))}
    </motion.div>
  );
});
