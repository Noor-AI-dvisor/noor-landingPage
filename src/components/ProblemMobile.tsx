import { PROBLEM_ITEMS } from "../data/sections";
import { useReveal } from "../hooks/useReveal";
// Reuses story.css's header/card classes directly — see the note in
// HeroMobile.tsx for why (they're self-contained, no dependency on
// ScrollStory's pinned-panel layout).
import "./story/story.css";

export default function ProblemMobile() {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <section
      id="problem"
      ref={ref}
      className="lg:hidden px-6 py-20 relative overflow-hidden bg-transparent"
    >
      <div
        className={`story-header !max-w-[560px] transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <span className="story-eyebrow">The Problem</span>
        <h2 className="story-title !text-[clamp(28px,7vw,40px)]">
          Subject choice is{" "}
          <span className="story-title-highlight">broken</span> — and
          schools know it.
        </h2>
        <p className="story-sub">
          Students make life-defining decisions with one meeting, a PDF
          booklet, and a guess.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-[720px] mx-auto">
        {PROBLEM_ITEMS.map((item, i) => (
          <div
            className={`story-card transition-all duration-700 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: visible ? `${i * 90}ms` : "0ms" }}
            key={item.label}
          >
            <div
              className="story-card-index"
              style={{
                color:
                  item.tilt === "l"
                    ? "rgba(15,168,143,0.14)"
                    : "rgba(58,159,192,0.16)",
              }}
            >
              0{i + 1}
            </div>
            <div
              className="story-card-badge"
              style={{
                background:
                  item.tilt === "l"
                    ? "rgba(15,168,143,0.1)"
                    : "rgba(58,159,192,0.12)",
                color: item.color,
              }}
            >
              <item.Icon className="w-3.5 h-3.5" style={{ color: item.color }} />
              {item.label}
            </div>
            <h3 className="story-card-title">{item.title}</h3>
            <p className="story-card-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
