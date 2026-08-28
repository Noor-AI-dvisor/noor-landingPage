import { SOLUTION_FEATURES } from "../data/sections";
import { SolutionVisual } from "./SolutionVisual";
import { useReveal } from "../hooks/useReveal";
// Reuses story.css's header/card classes directly — see the note in
// HeroMobile.tsx for why (they're self-contained, no dependency on
// ScrollStory's pinned-panel layout). .story-card--split in particular
// already collapses to a single column under 900px on its own.
import "./story/story.css";

export default function SolutionMobile() {
  const header = useReveal<HTMLDivElement>();
  // Each feature block gets its OWN reveal (rather than one trigger for the
  // whole section, staggered by delay like Problem/Who's shorter card
  // grids): Solution's 4 blocks are each tall enough that the last one can
  // sit well below the viewport when the section top first appears, so a
  // single section-level trigger would have already finished animating it
  // by the time it's actually scrolled into view. SOLUTION_FEATURES has a
  // fixed length (4), so calling the hook a fixed number of times is safe.
  const reveals = [
    useReveal<HTMLDivElement>(),
    useReveal<HTMLDivElement>(),
    useReveal<HTMLDivElement>(),
    useReveal<HTMLDivElement>(),
  ];

  return (
    <section
      id="solution-wrap"
      className="lg:hidden px-6 py-20 relative overflow-hidden bg-transparent"
    >
      <div
        ref={header.ref}
        className={`story-header transition-all duration-700 ease-out ${
          header.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <span className="story-eyebrow">Our Solution</span>
        <h2 className="story-title !text-[clamp(28px,7vw,40px)]">
          Your school's AI guidance{" "}
          <span className="story-title-highlight">companion</span>
        </h2>
        <p className="story-sub">Noor means 'light' in Arabic.</p>
      </div>

      <div className="flex flex-col gap-10 max-w-[560px] mx-auto">
        {SOLUTION_FEATURES.map((f, i) => {
          const { ref, visible } = reveals[i];
          return (
            <div
              className={`story-card story-card--split transition-all duration-700 ease-out ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              ref={ref}
              key={`solution-${f.num}`}
            >
              <div>
                <div className="story-feature-num">{f.num}</div>
                <h3 className="story-card-title">{f.title}</h3>
                <p className="story-card-desc">{f.desc}</p>
                <p className="story-card-more">{f.more}</p>
              </div>
              <SolutionVisual index={i} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
