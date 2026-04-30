import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { EASE_OUT, stagger, fadeUp } from "@/lib/motion";
import { useTheme } from "@/lib/theme";

const LIGHT_ITEMS = [
  { n: "01", title: "AI-guided conversation",     color: "#4FD1C5", icon: "💬",
    desc: "Students chat with Noor in a friendly, structured way and receive a personalised Study Pathway Card — subjects, career themes, and key skills.",
    detail: "Noor asks 12–15 carefully designed questions covering academic preferences, personal strengths, extracurricular interests, and career aspirations. The conversation adapts based on each response — no forms, no boxes to tick. About 5 minutes and feels completely natural." },
  { n: "02", title: "Career domains that feel real", color: "#1D9E75", icon: "🌐",
    desc: "Noor groups futures into teen-friendly domains (Tech Wizards, Creators & Storytellers, Mind & Health Heroes) — not a long job list.",
    detail: "Instead of 800 job titles, Noor maps futures into 12 engaging career domains designed for Gen Z. Each includes real career examples, salary ranges, and the skills employers actually look for — making the future feel tangible, not abstract." },
  { n: "03", title: "Gamified skills journeys",    color: "#F59E0B", icon: "⭐",
    desc: "Short 10-minute missions, badges, and progress bars — each tied to the 11 employability skills students will actually need.",
    detail: "Every mission is built around evidence-based learning science: spaced repetition, active recall, and immediate feedback. Students earn real credentials they can add to their portfolio. Missions are tied to career domains so every minute is purposeful." },
  { n: "04", title: "Counsellor dashboard",       color: "#2B43BD", icon: "📊",
    desc: "Counsellors see who's ready, who needs help, and which career domains are trending — without extra admin work.",
    detail: "Real-time cohort analytics: confidence levels per year group, popular career domains, students who haven't completed their assessment, and flags for students needing additional support — all visible in under 60 seconds." },
];

const DARK_ITEMS = [
  { ...LIGHT_ITEMS[0], color: "#38C9BC" },
  { ...LIGHT_ITEMS[1], color: "#25C48A" },
  { ...LIGHT_ITEMS[2], color: "#FFC933" },
  { ...LIGHT_ITEMS[3], color: "#4F6FE8" },
];

export default function SolutionSection() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, amount: 0.25 });
  const { theme }  = useTheme();
  const items      = theme === "dark" ? DARK_ITEMS : LIGHT_ITEMS;

  return (
    <section
      id="solution"
      ref={sectionRef}
      style={{
        background: "transparent",
        borderTop: "1px solid var(--divider)",
        position: "relative",
        zIndex: 10,
        padding: "clamp(72px,10vh,112px) clamp(24px,8vw,120px)",
      }}
    >
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={stagger}>

        <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "clamp(52px,7vh,80px)" }}>
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
            Our Solution
          </span>
          <h2
            style={{
              fontFamily: "Instrument Serif, serif",
              fontSize: "clamp(32px,4.2vw,56px)",
              color: "var(--t-h)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            Meet <em style={{ color: "var(--a)", fontStyle: "italic" }}>Noor</em> — your school&apos;s AI guidance companion.
          </h2>
          <p
            style={{
              fontSize: "clamp(15px,1.15vw,17px)",
              color: "var(--t-b)",
              maxWidth: 560,
              margin: "0 auto",
              lineHeight: 1.75,
              fontWeight: 500,
            }}
          >
            Noor means <span style={{ color: "var(--a)", fontWeight: 700 }}>&ldquo;light&rdquo;</span> in Arabic. Our mission is to illuminate every student&apos;s path — using AI, data, and personalised learning.
          </p>
          <p style={{ fontSize: 11, color: "var(--t-s)", fontWeight: 600, marginTop: 12 }}>
            Click any card to learn more
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))",
            gap: "clamp(14px,2vw,22px)",
          }}
        >
          {items.map((item, i) => (
            <motion.div
              key={item.n}
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.65, delay: 0.2 + i * 0.15, ease: [0.25, 1, 0.5, 1] }}
              whileHover={{ y: -3, boxShadow: `0 14px 36px ${item.color}22`, borderColor: `${item.color}40` }}
              onClick={() => setExpanded(expanded === item.n ? null : item.n)}
              style={{
                borderRadius: 18,
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                padding: "clamp(26px,3.5vh,36px) clamp(22px,2.5vw,28px)",
                background: expanded === item.n ? "var(--card-active)" : "var(--card)",
                border: `1.5px solid ${expanded === item.n ? item.color + "45" : "var(--card-border)"}`,
                boxShadow: expanded === item.n ? `0 8px 28px ${item.color}18` : "0 2px 16px var(--card-shadow)",
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
                  background: `linear-gradient(180deg,${item.color} 0%,${item.color}45 100%)`,
                  opacity: expanded === item.n ? 1 : 0.4,
                  transition: "opacity 0.3s",
                }}
              />
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, paddingLeft: 8 }}>
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 13,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    border: "1px solid",
                    background: `${item.color}18`,
                    borderColor: `${item.color}28`,
                  }}
                >
                  {item.icon}
                </div>
                <span
                  style={{
                    fontSize: 36,
                    fontWeight: 900,
                    lineHeight: 1,
                    letterSpacing: "-2px",
                    userSelect: "none",
                    color: `${item.color}35`,
                  }}
                >
                  {item.n}
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
                {item.title}
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
                {item.desc}
              </p>
              <AnimatePresence>
                {expanded === item.n && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.32, ease: EASE_OUT }}
                    style={{ overflow: "hidden" }}
                  >
                    <div
                      style={{
                        marginTop: 14,
                        paddingTop: 14,
                        paddingLeft: 8,
                        borderTop: "1px solid",
                        borderColor: `${item.color}22`,
                      }}
                    >
                      <p
                        style={{
                          fontSize: "clamp(12px,0.85vw,13px)",
                          color: "var(--t-b)",
                          lineHeight: 1.75,
                          fontWeight: 500,
                        }}
                      >
                        {item.detail}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 14, paddingLeft: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: item.color }}>
                  {expanded === item.n ? "Show less" : "Learn more"}
                </span>
                <motion.svg
                  width="11" height="11" viewBox="0 0 24 24" fill="none"
                  animate={{ rotate: expanded === item.n ? 180 : 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <path d="M6 9l6 6 6-6" stroke={item.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
              </div>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}
