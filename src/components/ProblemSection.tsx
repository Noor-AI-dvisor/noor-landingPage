import { motion } from "framer-motion";
import { stagger, fadeUp } from "@/lib/motion";

const PROBLEM_ITEMS = [
  { emoji: "😕", title: "Students guess, not choose", accent: "#F97316",
    desc: 'Most teens pick subjects based on friends or "what seems easier" — not a clear link to their strengths or future careers.' },
  { emoji: "⏳", title: "Counsellors are stretched", accent: "#EF4444",
    desc: "One counsellor supports hundreds of students — repeating the same basic conversations instead of doing meaningful guidance." },
  { emoji: "📄", title: "Static tools for dynamic choices", accent: "#8B5CF6",
    desc: "Subject options live in long PDFs. There's no interactive way to test the fit between a student's profile and their future options." },
  { emoji: "📊", title: "Leadership has no visibility", accent: "#3B82F6",
    desc: "School leaders can't easily see which cohorts are confident, which domains are in demand, or who still needs support." },
];

export default function ProblemSection() {
  return (
    <section
      id="problem"
      style={{
        background: "transparent",
        borderTop: "1px solid var(--divider)",
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        padding: "80px 5vw",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto", width: "100%" }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}>

          <motion.div variants={fadeUp} style={{ marginBottom: 64 }}>
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
              The Problem
            </span>
            <h2
              style={{
                fontFamily: "Instrument Serif, serif",
                fontSize: "clamp(34px,4.5vw,58px)",
                color: "var(--t-h)",
                maxWidth: 640,
                lineHeight: 1.12,
                marginBottom: 20,
                letterSpacing: "-0.02em",
              }}
            >
              Subject choice is broken —{" "}
              <em style={{ color: "var(--a)", fontStyle: "italic" }}>and schools know it.</em>
            </h2>
            <p
              style={{
                fontSize: "clamp(15px,1.1vw,17px)",
                color: "var(--t-b)",
                maxWidth: 520,
                lineHeight: 1.75,
                fontWeight: 500,
              }}
            >
              Students make life-defining decisions with one meeting, a PDF booklet, and a guess.
              The current system is failing them — and counsellors.
            </p>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
              gap: 20,
            }}
          >
            {PROBLEM_ITEMS.map((p, i) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -3, boxShadow: `0 12px 32px ${p.accent}22`, borderColor: `${p.accent}35` }}
                style={{
                  background: "var(--card)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  borderRadius: 18,
                  border: "1px solid var(--card-border)",
                  padding: "32px 28px",
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 2px 16px var(--card-shadow)",
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
                    background: `linear-gradient(180deg,${p.accent} 0%,${p.accent}40 100%)`,
                  }}
                />
                <div style={{ fontSize: 32, marginBottom: 20, paddingLeft: 8 }}>{p.emoji}</div>
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: "var(--t-h)",
                    marginBottom: 12,
                    lineHeight: 1.3,
                    paddingLeft: 8,
                  }}
                >
                  {p.title}
                </h3>
                <p style={{ fontSize: 14, color: "var(--t-b)", lineHeight: 1.75, paddingLeft: 8 }}>
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
