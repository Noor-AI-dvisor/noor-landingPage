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

      {/* Cards grid — full width, 4 equal columns on large screens */}
      <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-[clamp(24px,5vw,64px)] px-[clamp(24px,5vw,64px)] pb-1 gap-5 text-left sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible sm:grid sm:grid-cols-2 xl:grid-cols-4">
        {CARDS.map((card, i) => (
          <div
            key={card.role}
            className="shrink-0 w-[78%] snap-center sm:w-auto relative bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[18px] p-8 text-left overflow-hidden shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_44px_rgba(0,0,0,0.12)] opacity-0 translate-y-[30px] scale-[0.97] animate-fade-up-scale"
            style={{ animationDelay: `${0.2 + i * 0.15}s` }}
          >
            {/* Accent bar */}
            <div
              className="absolute left-0 top-0 bottom-0 w-[3px] rounded-[18px_0_0_18px]"
              style={{ background: `linear-gradient(180deg, ${card.accent}, transparent)` }}
            />

            {/* Icon */}
            <div
              className="w-[58px] h-[58px] rounded-[14px] flex items-center justify-center text-[1.75rem] mb-5 border"
              style={{ background: `${card.accent}15`, borderColor: `${card.accent}30` }}
            >
              {card.emoji}
            </div>

            {/* Role badge */}
            <div
              className="inline-block px-3 py-1 rounded-full text-[11px] font-extrabold tracking-[0.06em] mb-3.5 border"
              style={{ color: card.accent, background: `${card.accent}12`, borderColor: `${card.accent}25` }}
            >
              {card.role}
            </div>

            <h3 className="text-[16px] font-bold text-[var(--text-h)] mb-2.5">{card.subtitle}</h3>
            <p className="text-[14px] leading-[1.72] text-[var(--text-b)]">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
