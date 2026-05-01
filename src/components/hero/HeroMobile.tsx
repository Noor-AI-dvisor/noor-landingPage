import { memo } from "react";
import { HeroContent } from "./HeroContent";
import type { HeroBaseProps } from "./hero.constants";

export const HeroMobile = memo(function HeroMobile({
  compact = false,
}: HeroBaseProps) {
  return (
    <section
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

      <HeroContent mobile compact={compact} showBadge />
    </section>
  );
});
