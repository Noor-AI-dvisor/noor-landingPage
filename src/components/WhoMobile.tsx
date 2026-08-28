import { WHO_CARDS } from "../data/sections";
import { useReveal } from "../hooks/useReveal";
// Reuses story.css's header/card classes directly — see the note in
// HeroMobile.tsx for why (they're self-contained, no dependency on
// ScrollStory's pinned-panel layout).
import "./story/story.css";

export default function WhoMobile() {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <section
      id="who"
      ref={ref}
      className="lg:hidden px-6 py-20 relative overflow-hidden bg-transparent"
    >
      <div
        className={`story-header !max-w-[560px] transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <span className="story-eyebrow">Who It's For</span>
        <h2 className="story-title !text-[clamp(28px,7vw,40px)]">
          Designed for{" "}
          <span className="story-title-highlight">everyone</span> in the
          school ecosystem
        </h2>
        <p className="story-sub">
          Whether you're a student, parent, counsellor, or leader.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-[560px] mx-auto">
        {WHO_CARDS.map((card, i) => (
          <div
            className={`story-card story-who-card transition-all duration-700 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: visible ? `${i * 90}ms` : "0ms" }}
            key={card.role}
          >
            <div
              className="story-who-icon"
              style={{
                background: `${card.accent}15`,
                borderColor: `${card.accent}30`,
              }}
            >
              <card.Icon className="w-7 h-7" style={{ color: card.accent }} />
            </div>
            <div
              className="story-card-badge"
              style={{
                color: card.accent,
                background: `${card.accent}12`,
              }}
            >
              {card.role}
            </div>
            <h3 className="story-card-title">{card.subtitle}</h3>
            <p className="story-card-desc">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
