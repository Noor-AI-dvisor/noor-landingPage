import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger, EASE_SPRING } from "@/lib/motion";
import { useTheme } from "@/lib/theme";

const BENEFITS = [
  "Personalised AI guidance for every student",
  "Counsellor dashboard with real-time cohort insights",
  "Gamified skills journeys across 11 career domains",
  "Instant Study Pathway Card generation",
];

const LIGHT_AVATARS = [
  { bg: "#1D9E75", emoji: "🏫" },
  { bg: "#2B43BD", emoji: "🎓" },
  { bg: "#87D5CF", emoji: "🌍" },
  { bg: "#F59E0B", emoji: "⭐" },
];

const DARK_AVATARS = [
  { bg: "#25C48A", emoji: "🏫" },
  { bg: "#4F6FE8", emoji: "🎓" },
  { bg: "#38C9BC", emoji: "🌍" },
  { bg: "#FFC933", emoji: "⭐" },
];

export default function EarlyAccessSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);
  const { theme } = useTheme();
  const avatars = theme === "dark" ? DARK_AVATARS : LIGHT_AVATARS;

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    const subject = encodeURIComponent("Early Access Request — Noor AI");
    const body = encodeURIComponent(
      `Contact email: ${email}\n\nInterested in a free Demo.`,
    );
    window.location.href = `mailto:nooraiadvisor@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section
      id="early-access"
      style={{
        background: "transparent",
        borderTop: "1px solid var(--divider)",
        position: "relative",
        zIndex: 10,
        padding: "clamp(80px,12vh,140px) clamp(24px,6vw,100px)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))",
          gap: "clamp(48px,8vw,96px)",
          alignItems: "center",
        }}
      >
        {/* Left: Copy */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
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
                marginBottom: 28,
              }}
            >
              Limited Early Access
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "Instrument Serif, serif",
              fontSize: "clamp(36px,4.8vw,64px)",
              color: "var(--t-h)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              marginBottom: 24,
            }}
          >
            Ready to bringge
            <br />
            <em style={{ color: "var(--a)", fontStyle: "italic" }}>Noor</em> to
            your school?
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{
              fontSize: "clamp(14px,1.05vw,16px)",
              color: "var(--t-b)",
              lineHeight: 1.8,
              maxWidth: 400,
              marginBottom: 36,
              fontWeight: 500,
            }}
          >
            We&apos;re running free Demos with selected schools right now. Be
            among the first to see Noor in action — no commitment required.
          </motion.p>

          <motion.div
            variants={fadeUp}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            {BENEFITS.map((b) => (
              <div
                key={b}
                style={{ display: "flex", alignItems: "center", gap: 20 }}
              >
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                    flexShrink: 0,
                    background: "var(--lb-bg)",
                    border: "1px solid var(--lb-br)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                    <path
                      d="M1 4.5l3 3 6-6"
                      stroke="var(--a)"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span
                  style={{
                    fontSize: 14,
                    color: "var(--t-b)",
                    fontWeight: 500,
                    lineHeight: 1.4,
                  }}
                >
                  {b}
                </span>
              </div>
            ))}
          </motion.div>

          {/* <motion.div
            variants={fadeUp}
            style={{
              marginTop: 40,
              paddingTop: 32,
              borderTop: "1px solid var(--divider)",
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <div style={{ display: "flex" }}>
              {avatars.map(({ bg, emoji }, i) => (
                <div
                  key={emoji}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 9999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    position: "relative",
                    border: "2.5px solid var(--pg)",
                    background: bg,
                    marginLeft: i === 0 ? 0 : -10,
                    zIndex: avatars.length - i,
                  }}
                >
                  {emoji}
                </div>
              ))}
            </div>
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "var(--t-h)",
                  lineHeight: 1.3,
                }}
              >
                20+ schools exploring early access
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--t-s)",
                  fontWeight: 500,
                  marginTop: 2,
                }}
              >
                Join the waitlist today
              </div>
            </div>
          </motion.div>
         */}
        </motion.div>

        {/* Right: Form card */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: EASE_SPRING, delay: 0.15 }}
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE_SPRING }}
              style={{
                background: "var(--card-active)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderRadius: 28,
                padding: "56px 40px",
                textAlign: "center",
                border: "1px solid var(--card-border)",
                boxShadow:
                  "0 20px 60px rgba(29,158,117,0.1),0 4px 16px var(--card-shadow)",
              }}
            >
              <div style={{ fontSize: 56, marginBottom: 20 }}>🎉</div>
              <h3
                style={{
                  fontFamily: "Instrument Serif, serif",
                  fontSize: 30,
                  color: "var(--t-h)",
                  marginBottom: 12,
                }}
              >
                You&apos;re on the list!
              </h3>
              <p
                style={{ fontSize: 15, color: "var(--t-b)", lineHeight: 1.75 }}
              >
                We&apos;ll reach out within <strong>48 hours</strong> to discuss
                your school&apos;s free Demo. Exciting things ahead!
              </p>
            </motion.div>
          ) : (
            <div
              style={{
                background: "var(--card-active)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderRadius: 28,
                padding: "44px 40px",
                border: "1px solid var(--card-border)",
                boxShadow:
                  "0 20px 60px rgba(29,158,117,0.08),0 4px 20px var(--card-shadow)",
              }}
            >
              <div style={{ textAlign: "center", marginBottom: 32 }}>
                <div style={{ fontSize: 32, marginBottom: 14 }}>🌟</div>
                <h3
                  style={{
                    fontFamily: "Instrument Serif, serif",
                    fontSize: "clamp(22px,2.2vw,28px)",
                    color: "var(--t-h)",
                    lineHeight: 1.2,
                    marginBottom: 8,
                  }}
                >
                  Request your free Demo
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--t-s)",
                    fontWeight: 500,
                    lineHeight: 1.5,
                  }}
                >
                  No credit card · No setup fee · Reply within 48 hrs
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 14 }}
              >
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  style={{
                    width: "100%",
                    padding: "15px 18px",
                    borderRadius: 12,
                    outline: "none",
                    fontSize: 15,
                    fontFamily: "Montserrat, sans-serif",
                    color: "var(--t-h)",
                    background: "var(--in-bg)",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                    border: `1.5px solid ${focused ? "var(--a-teal)" : "var(--in-border)"}`,
                    boxShadow: focused
                      ? "0 0 0 4px rgba(79,209,197,0.12)"
                      : "none",
                  }}
                />
                <motion.button
                  type="submit"
                  whileHover={{
                    y: -2,
                    boxShadow: "0 16px 40px rgba(29,158,117,0.35)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: "100%",
                    padding: "17px 0",
                    borderRadius: 12,
                    color: "white",
                    border: "none",
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "Montserrat, sans-serif",
                    letterSpacing: "0.01em",
                    boxShadow: "0 6px 20px rgba(29,158,117,0.28)",
                    background:
                      "linear-gradient(135deg, #1D9E75 0%, #15896A 100%)",
                  }}
                >
                  Request Free Demo →
                </motion.button>
                <div
                  style={{
                    display: "flex",
                    gap: 14,
                    justifyContent: "center",
                    flexWrap: "wrap",
                    paddingTop: 4,
                  }}
                >
                  {[
                    "✅ No credit card",
                    "📅 Flexible timing",
                    "🤝 Onboarding included",
                  ].map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: 11,
                        color: "var(--t-s)",
                        fontWeight: 600,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
