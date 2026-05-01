import { memo } from "react";
import HeroAppMock from "@/components/HeroAppMock";
import { HeroContent } from "./HeroContent";
import type { HeroBaseProps } from "./hero.constants";

type HeroLayoutProps = HeroBaseProps & {
  mockScale?: number;
};

export const HeroLayout = memo(function HeroLayout({
  compact = false,
  mockScale = 1,
}: HeroLayoutProps) {
  return (
    <section
      style={{
        position: "relative",
        zIndex: 10,
        background: "var(--hero-bg)",
        height: "100dvh",
        paddingTop: "calc(64px + clamp(56px, 9vh, 104px))",
        paddingBottom: "clamp(64px, 9vh, 104px)",
        paddingLeft: compact ? "clamp(16px, 4vw, 48px)" : "clamp(24px, 8vw, 120px)",
        paddingRight: compact ? "clamp(16px, 4vw, 48px)" : "clamp(24px, 8vw, 120px)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: compact ? "clamp(16px, 3vw, 40px)" : "clamp(40px, 5vw, 80px)",
        alignItems: "center",
        overflowY: "hidden",
      }}
    >
      <HeroContent compact={compact} />

      {/* App mockup — scaled with transform instead of zoom */}
      <div
        style={{
          transform: `scale(${mockScale})`,
          transformOrigin: "center right",
        }}
      >
        <HeroAppMock compact={compact} />
      </div>
    </section>
  );
});
