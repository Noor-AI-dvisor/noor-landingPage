import EarlyAccessForm from "./EarlyAccessForm";
import { CheckIcon } from "./Icons";
import { useReveal } from "../hooks/useReveal";
// Reuses story.css's column/checklist classes directly — see the note in
// HeroMobile.tsx for why (they're self-contained, no dependency on
// ScrollStory's pinned-panel layout).
import "./story/story.css";

// Duplicated from ScrollStory.tsx's own EARLY_ACCESS_CHECKLIST rather than
// imported from it — importing a named export from ScrollStory.tsx would
// statically pull GSAP and the whole scroll-jacking module into the mobile
// bundle, defeating the React.lazy() split that keeps it desktop-only.
const EARLY_ACCESS_CHECKLIST = [
  "Personalised AI guidance for every student",
  "Counsellor dashboard with real-time cohort insights",
  "Gamified skills journeys across 11 career domains",
  "Instant Study Pathway Card generation",
];

export default function EarlyAccessMobile() {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <section
      id="early-access"
      ref={ref}
      className="lg:hidden px-6 py-20 relative overflow-hidden bg-transparent"
    >
      {/* .story-columns--early's own default is a 2-column grid (built for
          ScrollStory's much wider desktop panel) — !grid-cols-1 forces this
          instance to always stay single-column, unconditionally, regardless
          of viewport width within this component's <1024px mounting range;
          see the note above .story-columns--early in story.css for why a
          shared media-query breakpoint can't do this instead. */}
      <div className="story-columns story-columns--early !grid-cols-1 max-w-[560px] mx-auto">
        <div
          className={`story-early-left transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="story-eyebrow">
            <span aria-hidden="true">✦</span> Limited Early Access
          </span>
          <h2 className="story-early-title !text-[clamp(28px,7vw,40px)]">
            Ready to bring{" "}
            <span className="story-title-highlight story-early-title-accent">
              Noor
            </span>{" "}
            to your school?
          </h2>
          <p className="story-early-sub">
            We're running free Demos with selected schools right now. Be
            among the first to see Noor in action — no commitment required.
          </p>
          <div className="story-early-checklist">
            {EARLY_ACCESS_CHECKLIST.map((item) => (
              <div className="story-early-check-item" key={item}>
                <span className="story-early-check-icon">
                  <CheckIcon className="w-3 h-3" />
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`transition-all duration-700 ease-out delay-150 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <EarlyAccessForm />
        </div>
      </div>
    </section>
  );
}
