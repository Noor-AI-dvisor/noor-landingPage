import ProblemSection from "@/components/ProblemSection";
import { HeroMobile } from "./HeroMobile";
import { HeroReveal } from "./HeroReveal";
import { useHeroScroll } from "./useHeroScroll";

export default function HeroSection() {
  const { progress, isMobile, isCompact, mockScale } = useHeroScroll();

  if (isMobile) {
    return (
      <div style={{ position: "relative", zIndex: 20 }}>
        <HeroMobile compact={isCompact} />
        <ProblemSection />
      </div>
    );
  }

  return (
    <HeroReveal
      progress={progress}
      compact={isCompact}
      mockScale={mockScale}
    />
  );
}
