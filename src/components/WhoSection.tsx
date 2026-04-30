import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { stagger, fadeUp } from "@/lib/motion";
import { useTheme } from "@/lib/theme";

const LIGHT_CARDS = [
  { emoji: "🎒", role: "Students",   subtitle: "Grade 9–12 Students",        accent: "#1D9E75",
    desc: "Get a personalised study plan and unlock gamified skill missions tied to your actual future — not just exam results." },
  { emoji: "🧭", role: "Schools",    subtitle: "Counsellors & Heads of Year", accent: "#4FD1C5",
    desc: "Stop repeating the same meeting. Let Noor handle initial guidance so you can focus on the students who truly need you." },
  { emoji: "🏫", role: "Leadership", subtitle: "School Leaders",              accent: "#2B43BD",
    desc: "Get a clear cohort view: who's confident, who needs support, which career domains are trending in your school this year." },
  { emoji: "👨‍👩‍👧", role: "Parents",   subtitle: "Parents & Families",          accent: "#F59E0B",
    desc: "See your child's pathway, skill progress, and subject choices in one place — with AI-backed clarity, not guesswork." },
];

const DARK_CARDS = [
  { ...LIGHT_CARDS[0], accent: "#25C48A" },
  { ...LIGHT_CARDS[1], accent: "#38C9BC" },
  { ...LIGHT_CARDS[2], accent: "#4F6FE8" },
  { ...LIGHT_CARDS[3], accent: "#FFC933" },
];

export default function WhoSection() {
  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, amount: 0.25 });
  const { theme }  = useTheme();
  const cards      = theme === "dark" ? DARK_CARDS : LIGHT_CARDS;

  return (
    <section
      id="who-its-for"
      ref={sectionRef}
      style={{
        background: "transparent",
        borderTop: "1px solid var(--divider)",
        position: "relative",
        zIndex: 10,
        padding: "clamp(72px,10vh,112px) clamp(24px,8vw,120px)",
      }}
    >
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.12 }} variants={stagger}>

        <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "clamp(44px,6vh,68px)" }}>
          <span
            style={{
              display: "inline-block",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--lb-c)",
              background: "var(--lb-bg)",
              border: "1px solid var(--lb-br)",
              borderRadius: 9999,
              padding: "5px 14px",
              marginBottom: 24,
            }}
          >
            Who It&apos;s For
          </span>
          <h2
            style={{
              fontFamily: "Instrument Serif, serif",
              fontSize: "clamp(32px,4.2vw,56px)",
              color: "var(--t-h)",
              letterSpacing: "-0.02em",
              marginBottom: 16,
              lineHeight: 1.1,
            }}
          >
            Designed for{" "}
            <em style={{ color: "var(--a)", fontStyle: "italic" }}>everyone</em>{" "}
            inside the school ecosystem.
          </h2>
          <p
            style={{
              fontSize: "clamp(15px,1.15vw,17px)",
              color: "var(--t-b)",
              fontWeight: 500,
              maxWidth: 500,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Whether you&apos;re a student, parent, counsellor, or school leader — Noor was built with your needs in mind.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,248px),1fr))",
            gap: "clamp(14px,2vw,22px)",
          }}
        >
          {cards.map((card, i) => (
            <motion.div
              key={card.role}
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.65, delay: 0.2 + i * 0.15, ease: [0.25, 1, 0.5, 1] }}
              whileHover={{ y: -3, boxShadow: `0 14px 36px ${card.accent}22`, borderColor: `${card.accent}35` }}
              style={{
                borderRadius: 18,
                background: "var(--card)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid var(--card-border)",
                position: "relative",
                overflow: "hidden",
                cursor: "default",
                boxShadow: "0 2px 16px var(--card-shadow)",
                padding: "clamp(26px,3.5vh,36px) clamp(22px,2.5vw,30px)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: 3,
                  borderTopLeftRadius: 18,
                  borderBottomLeftRadius: 18,
                  background: `linear-gradient(180deg,${card.accent} 0%,${card.accent}45 100%)`,
                }}
              />
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  marginBottom: 16,
                  marginLeft: 8,
                  border: "1px solid",
                  background: `${card.accent}14`,
                  borderColor: `${card.accent}28`,
                }}
              >
                {card.emoji}
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "3px 10px",
                  borderRadius: 9999,
                  marginBottom: 12,
                  marginLeft: 8,
                  border: "1px solid",
                  background: `${card.accent}14`,
                  borderColor: `${card.accent}28`,
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.7px",
                    color: card.accent,
                  }}
                >
                  {card.role}
                </span>
              </div>
              <h3
                style={{
                  fontSize: "clamp(15px,1.2vw,17px)",
                  fontWeight: 800,
                  color: "var(--t-h)",
                  marginBottom: 10,
                  letterSpacing: "-0.2px",
                  lineHeight: 1.3,
                  paddingLeft: 8,
                }}
              >
                {card.subtitle}
              </h3>
              <p
                style={{
                  fontSize: "clamp(13px,0.9vw,14px)",
                  color: "var(--t-b)",
                  lineHeight: 1.75,
                  fontWeight: 500,
                  paddingLeft: 8,
                }}
              >
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}
