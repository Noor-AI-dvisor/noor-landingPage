const CARDS = [
  {
    emoji: "🎒",
    role: "Students",
    subtitle: "Grade 9–12 Students",
    desc: "Get a personalised study plan and unlock gamified skill missions tied to your actual future — not just exam results.",
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
    desc: "See your child's pathway, skill progress, and subject choices in one place — with AI-backed clarity, not guesswork.",
    accent: "var(--accent-amber)",
  },
];

export default function WhoSection() {
  return (
    <section id="who" className="who-section upgraded">
      <div className="who-header-block">
        <span className="who-eyebrow">Who It’s For</span>

        <h2 className="who-h2">
          Designed for <em>everyone</em> inside the school ecosystem.
        </h2>

        <p className="who-body">
          Whether you're a student, parent, counsellor, or school leader — Noor
          was built with your needs in mind.
        </p>
      </div>

      <div className="who-grid">
        {CARDS.map((card, i) => (
          <div
            key={card.role}
            className="who-card"
            style={{ animationDelay: `${0.2 + i * 0.15}s` }}
          >
            <div
              className="who-accent-bar"
              style={{
                background: `linear-gradient(180deg, ${card.accent}, transparent)`,
              }}
            />

            <div
              className="who-icon"
              style={{
                background: `${card.accent}15`,
                borderColor: `${card.accent}30`,
              }}
            >
              {card.emoji}
            </div>

            <div
              className="who-role"
              style={{
                color: card.accent,
                background: `${card.accent}12`,
                borderColor: `${card.accent}25`,
              }}
            >
              {card.role}
            </div>

            <h3>{card.subtitle}</h3>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
