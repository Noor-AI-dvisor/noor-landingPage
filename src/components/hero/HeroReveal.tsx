import { memo, useMemo } from "react";
import ProblemSection from "@/components/ProblemSection";
import { HeroLayout } from "./HeroLayout";
import type { HeroBaseProps } from "./hero.constants";

type HeroRevealProps = HeroBaseProps & {
  progress: number;
  mockScale: number;
};

export const HeroReveal = memo(
  function HeroReveal({ progress, compact, mockScale }: HeroRevealProps) {
    // Derived animation values — computed only when progress changes
    const revealOpacity = useMemo(
      () => Math.max(0, (progress - 0.1) / 0.9),
      [progress]
    );
    const revealScale = useMemo(() => 0.92 + progress * 0.08, [progress]);
    const revealRadius = useMemo(() => (1 - progress) * 28, [progress]);

    return (
      <div
        style={{
          height: "100dvh",
          position: "relative",
          zIndex: 20,
          overflow: "hidden",
        }}
      >
        {/* Background reveal layer — ProblemSection peeks through as doors open */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background: "var(--pg)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            padding: "clamp(24px, 8vw, 120px)",
            opacity: revealOpacity,
            transform: `scale(${revealScale})`,
            transformOrigin: "center center",
            borderRadius: revealRadius,
          }}
        >
          <ProblemSection />
        </div>

        {/* Left door — slides left as progress increases */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            willChange: "transform",
            clipPath: "inset(0 50% 0 0)",
            transform: `translateX(${-progress * 50}%)`,
          }}
        >
          <HeroLayout compact={compact} mockScale={mockScale} />
        </div>

        {/* Right door — slides right as progress increases */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            willChange: "transform",
            clipPath: "inset(0 0 0 50%)",
            transform: `translateX(${progress * 50}%)`,
          }}
        >
          <HeroLayout compact={compact} mockScale={mockScale} />
        </div>
      </div>
    );
  },
  // Re-render only when animation-relevant props change
  (prev, next) =>
    prev.progress === next.progress &&
    prev.compact === next.compact &&
    prev.mockScale === next.mockScale
);
