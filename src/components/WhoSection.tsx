import { BackpackIcon, CompassIcon, BuildingIcon, UsersIcon } from "./Icons";

const CARDS = [
  {
    Icon: BackpackIcon,
    role: "Students",
    subtitle: "Grade 9–12 Students",
    desc: "Get a personalised study plan and unlock gamified skill missions tied to your actual future — not just exam results.",
    accent: "var(--accent)",
  },
  {
    Icon: CompassIcon,
    role: "Schools",
    subtitle: "Counsellors & Heads of Year",
    desc: "Stop repeating the same meeting. Let Noor handle initial guidance so you can focus on the students who truly need you.",
    accent: "var(--accent-2)",
  },
  {
    Icon: BuildingIcon,
    role: "Leadership",
    subtitle: "School Leaders",
    desc: "Get a clear cohort view: who's confident, who needs support, which career domains are trending in your school this year.",
    accent: "#0d6e5f",
  },
  {
    Icon: UsersIcon,
    role: "Parents",
    subtitle: "Parents & Families",
    desc: "See your child's pathway, skill progress, and subject choices in one place — with AI-backed clarity, not guesswork.",
    accent: "var(--accent-amber)",
  },
];

export default function WhoSection() {
  return (
    <section
      id="who"
      className="py-28 px-[clamp(24px,5vw,64px)] bg-transparent text-center"
    >
      {/* Header */}
      <div className="max-w-[700px] mx-auto mb-14">
        <span className="inline-flex items-center gap-2 mb-5 px-[18px] py-[8px] rounded-full bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] shadow-glass text-[0.78rem] font-bold tracking-[0.12em] uppercase text-accent">
          Who It&apos;s For
        </span>

        <h2 className="font-sans text-[clamp(1.75rem,3.2vw,2.6rem)] font-extrabold leading-[1.25] tracking-[-0.02em] text-[var(--text-h)] mb-5">
          Designed for <span className="text-gradient">everyone</span> inside the school ecosystem.
        </h2>

        <p className="text-[1.05rem] leading-[1.75] text-[var(--text-b)]">
          Whether you're a student, parent, counsellor, or school leader — Noor was built with your needs in mind.
        </p>
      </div>

      {/* Cards grid — full width, 4 equal columns on large screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {CARDS.map((card, i) => (
          <div
            key={card.role}
            className="p-[1px] rounded-[26px] transition-transform duration-300 hover:-translate-y-2 opacity-0 translate-y-[30px] scale-[0.97] animate-fade-up-scale"
            style={{
              background: `linear-gradient(165deg, ${card.accent}80, rgba(255,255,255,0.9) 45%, ${card.accent}33)`,
              animationDelay: `${0.2 + i * 0.15}s`,
            }}
          >
            <div className="relative h-full box-border p-8 rounded-[25px] bg-[var(--glass-bg-strong)] backdrop-blur-xl text-left overflow-hidden">
              {/* Radial glow */}
              <div
                className="absolute -top-[50px] -right-[50px] w-[150px] h-[150px] rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, ${card.accent}24, transparent 70%)` }}
              />

              {/* Icon */}
              <div
                className="relative w-[58px] h-[58px] rounded-[16px] flex items-center justify-center mb-5 border"
                style={{ background: `${card.accent}15`, borderColor: `${card.accent}30` }}
              >
                <card.Icon className="w-6 h-6" style={{ color: card.accent }} />
              </div>

              {/* Role badge */}
              <div
                className="relative inline-block px-3 py-1 rounded-full text-[11px] font-extrabold tracking-[0.06em] mb-3.5 border uppercase"
                style={{ color: card.accent, background: `${card.accent}12`, borderColor: `${card.accent}25` }}
              >
                {card.role}
              </div>

              <h3 className="relative text-[16px] font-bold text-[var(--text-h)] mb-2.5">{card.subtitle}</h3>
              <p className="relative text-[14px] leading-[1.72] text-[var(--text-b)]">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
