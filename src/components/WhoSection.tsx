import React, { useRef, useState } from "react";

const CARDS = [
  {
    emoji: "🎒",
    role: "Students",
    subtitle: "Grade 9–12 Students",
    desc: "Get a personalised study plan and unlock gamified skill missions tied to your actual future, not just exam results.",
    accent: "var(--accent)",
  },
  {
    emoji: "🧭",
    role: "Schools",
    subtitle: "Counsellors & Heads of Year",
    desc: "Stop repeating the same meeting. Let Noor handle initial guidance so you can focus on the students who truly need you.",
    accent: "#4FD1C5",
  },
  {
    emoji: "🏫",
    role: "Leadership",
    subtitle: "School Leaders",
    desc: "Get a clear cohort view: who's confident, who needs support, which career domains are trending in your school this year.",
    accent: "var(--accent-2)",
  },
  {
    emoji: "👨‍👩‍👧",
    role: "Parents",
    subtitle: "Parents & Families",
    desc: "See your child's pathway, skill progress, and subject choices in one place, with AI-backed clarity, not guesswork.",
    accent: "var(--accent-amber)",
  },
];

type Card = (typeof CARDS)[number];

const mix = (color: string, pct: number) => `color-mix(in srgb, ${color} ${pct}%, transparent)`;

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Same card as the "Meet Noor" solution cards: 3D tilt, cursor sheen,
// ghost number, popped-forward icon badge and accent underline.
const WhoCard: React.FC<{ card: Card; index: number }> = ({ card, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [spot, setSpot] = useState({ x: 50, y: 50 });
  const [hovering, setHovering] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setSpot({ x: px * 100, y: py * 100 });
    if (prefersReducedMotion()) return;
    setRot({ x: (0.5 - py) * 9, y: (px - 0.5) * 11 });
  };

  const handleLeave = () => {
    setRot({ x: 0, y: 0 });
    setHovering(false);
  };

  return (
    <div
      className="shrink-0 w-[78%] snap-center sm:w-auto sm:shrink h-full opacity-0 translate-y-[30px] scale-[0.97] animate-fade-up-scale"
      style={{ perspective: 1200, animationDelay: `${0.2 + index * 0.15}s` }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={handleLeave}
        className="group relative h-full rounded-[28px] bg-[var(--card-bg)] backdrop-blur-sm border border-[var(--card-border)] p-[26px] 3xl:p-8 text-left overflow-hidden"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg) translateY(${hovering ? -8 : 0}px)`,
          transition: "transform 0.5s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.4s",
          boxShadow: hovering
            ? `0 28px 52px -16px ${mix(card.accent, 25)}, 0 6px 20px rgba(0,0,0,0.08)`
            : "0 2px 14px rgba(0,0,0,0.05)",
        }}
      >
        {/* cursor-tracking sheen */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: hovering ? 1 : 0,
            background: `radial-gradient(460px circle at ${spot.x}% ${spot.y}%, rgba(255,255,255,0.16), transparent 45%)`,
          }}
        />

        {/* icon badge — pops forward in 3D */}
        <div
          className="relative w-14 h-14 rounded-2xl flex items-center justify-center text-[1.6rem] mb-5"
          style={{
            background: `linear-gradient(135deg, ${mix(card.accent, 15)}, ${mix(card.accent, 4)})`,
            border: `1px solid ${mix(card.accent, 25)}`,
            transform: "translateZ(50px)",
            boxShadow: hovering ? `0 14px 28px -8px ${mix(card.accent, 40)}` : "none",
            transition: "box-shadow 0.4s",
          }}
        >
          {card.emoji}
        </div>

        {/* role badge */}
        <div
          className="relative inline-block px-3 py-1 rounded-full text-[11px] font-extrabold tracking-[0.06em] mb-3 border"
          style={{
            color: card.accent,
            background: mix(card.accent, 8),
            borderColor: mix(card.accent, 20),
            transform: "translateZ(30px)",
          }}
        >
          {card.role}
        </div>

        <h3
          className="relative text-[1.08rem] font-bold text-[var(--text-h)] mb-2"
          style={{ transform: "translateZ(30px)" }}
        >
          {card.subtitle}
        </h3>

        <p
          className="relative text-[0.9rem] leading-[1.65] text-[var(--text-b)]"
          style={{ transform: "translateZ(20px)" }}
        >
          {card.desc}
        </p>

        {/* accent underline — extends on hover */}
        <div
          className="absolute left-[26px] right-[26px] bottom-0 h-[2px] rounded-full origin-left"
          style={{
            background: `linear-gradient(90deg, ${card.accent}, transparent)`,
            transform: `translateZ(4px) scaleX(${hovering ? 1 : 0.28})`,
            transition: "transform 0.4s ease",
          }}
        />
      </div>
    </div>
  );
};

export default function WhoSection() {
  return (
    <section
      id="who"
      className="py-28 px-[clamp(24px,5vw,64px)] text-center transition-[background] duration-300"
    >
      {/* Header */}
      <div className="max-w-[700px] 3xl:max-w-[820px] mx-auto mb-14">
        <h2 className="font-display text-[clamp(1.75rem,3.2vw,2.6rem)] 3xl:text-[3rem] 4xl:text-[3.3rem] font-medium leading-[1.3] text-[var(--text-h)] mb-5">
          Designed for <em className="italic">everyone</em> inside the school ecosystem.
        </h2>

        <p className="text-[1.05rem] 3xl:text-[1.15rem] leading-[1.75] text-[var(--text-b)]">
          Whether you're a student, parent, counsellor, or school leader, Noor was built with your needs in mind.
        </p>
      </div>

      {/* Cards grid — same layout as the Solution cards */}
      <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-[clamp(24px,5vw,64px)] px-[clamp(24px,5vw,64px)] pb-1 gap-5 text-left sm:mx-auto sm:px-0 sm:pb-0 sm:overflow-visible sm:grid sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 3xl:gap-7 max-w-[1320px] 3xl:max-w-[1800px] 4xl:max-w-[2000px]">
        {CARDS.map((card, i) => (
          <WhoCard key={card.role} card={card} index={i} />
        ))}
      </div>
    </section>
  );
}
