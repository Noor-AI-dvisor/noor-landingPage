import { GraduationCapIcon, BoltIcon, TrophyIcon } from "./Icons";
import { STORY_STEPS, scrollToSection } from "../lib/storyScroll";
import { useReveal } from "../hooks/useReveal";
// Reuses story.css's chip/badge/eyebrow classes directly (self-contained,
// no dependency on ScrollStory's pinned-panel layout) so the mobile hero
// reads as the same design system as the desktop one, not an approximation
// of it — see story.css's own "HERO" section for these class definitions.
import "./story/story.css";

const CHIPS = [
  { Icon: GraduationCapIcon, label: "Ages 14–18" },
  { Icon: BoltIcon, label: "10-min missions" },
  { Icon: TrophyIcon, label: "11 skill domains" },
];

export default function HeroMobile() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section
      id="home"
      className="lg:hidden flex flex-col justify-center min-h-screen px-6 pt-[100px] pb-[60px] relative overflow-hidden bg-transparent"
    >
      <div
        ref={ref}
        className={`relative z-10 max-w-[480px] mx-auto w-full transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="story-eyebrow-pill w-fit">
          <span className="story-status-dot" />
          For schools · Ages 14–18
        </div>

        <h1 className="font-sans text-[clamp(1.8rem,6vw,2.8rem)] font-extrabold leading-[1.15] tracking-[-0.02em] mb-4 mt-4 text-[var(--text-h)]">
          Noor <span className="font-hero-accent text-accent">AI Career &amp; Skills</span>
          <br />
          Companion for Schools
        </h1>

        <p className="text-[0.95rem] leading-[1.65] text-[var(--text-b)] mb-7">
          An AI-powered advisor that helps students aged 14–18 choose the
          right subjects, discover their strengths, and build the skills
          that actually matter for their future.
        </p>

        <div className="flex flex-col gap-2.5 mb-6">
          <button
            className="btn-primary text-center"
            onClick={() =>
              scrollToSection("early-access", STORY_STEPS.earlyAccess)
            }
          >
            Request a Free Demo →
          </button>
          <button
            className="btn-secondary text-center"
            onClick={() =>
              scrollToSection("solution-wrap", STORY_STEPS.solution)
            }
          >
            See How It Works
          </button>
        </div>

        <div className="story-chip-row !justify-start mb-4">
          {CHIPS.map(({ Icon, label }) => (
            <span key={label} className="story-chip">
              <Icon className="w-3.5 h-3.5 text-accent shrink-0" />
              {label}
            </span>
          ))}
        </div>

        <div className="story-badge-row !justify-start mb-7">
          <span className="story-mini-badge story-mini-badge--green">
            <span className="story-mini-dot" />
            Personalised pathways
          </span>
          <span className="story-mini-badge story-mini-badge--mint">
            <span className="story-mini-dot" />
            Real-time AI
          </span>
          <span className="story-mini-badge story-mini-badge--purple">
            <span className="story-mini-dot" />
            Career intelligence
          </span>
        </div>
      </div>
    </section>
  );
}
