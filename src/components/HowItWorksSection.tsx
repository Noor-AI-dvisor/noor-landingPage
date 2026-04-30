import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { EASE_OUT, stagger, fadeUp } from "@/lib/motion";
import { useTheme } from "@/lib/theme";

const LIGHT_STEPS = [
  { n: "01", label: "Open Noor", icon: "📱", color: "#1D9E75",
    detail: "Accessible from school portal, tablet, or phone — no download needed." },
  { n: "02", label: "AI chat begins", icon: "💬", color: "#4FD1C5",
    detail: "A friendly 5-minute adaptive conversation that uncovers strengths and aspirations in real time." },
  { n: "03", label: "Pathway generated", icon: "📋", color: "#2B43BD",
    detail: "Personalised subject picks, career domain matches, and a confidence score — delivered instantly." },
  { n: "04", label: "Skills missions on", icon: "🏆", color: "#F59E0B",
    detail: "Gamified 10-min missions build portfolio-ready employability skills with badges and progress tracking." },
];

const DARK_STEPS = [
  { ...LIGHT_STEPS[0], color: "#25C48A" },
  { ...LIGHT_STEPS[1], color: "#38C9BC" },
  { ...LIGHT_STEPS[2], color: "#4F6FE8" },
  { ...LIGHT_STEPS[3], color: "#FFC933" },
];

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, amount: 0.25 });
  const { theme }  = useTheme();
  const steps      = theme === "dark" ? DARK_STEPS : LIGHT_STEPS;

  useEffect(() => {
    const id = setInterval(() => setActiveStep((s) => (s + 1) % 4), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      style={{
        background: "transparent",
        borderTop: "1px solid var(--divider)",
        position: "relative",
        zIndex: 10,
        padding: "clamp(72px,10vh,112px) clamp(24px,8vw,120px)",
      }}
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} style={{ textAlign: "center", marginBottom: "clamp(52px,7vh,80px)" }}>
          <span
            style={{
              display: "inline-block",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--ln-c)",
              background: "var(--ln-bg)",
              border: "1px solid var(--ln-br)",
              borderRadius: 9999,
              padding: "5px 14px",
              marginBottom: 24,
            }}
          >
            How It Works
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
            From first chat to{" "}
            <em style={{ color: "var(--a)", fontStyle: "italic" }}>career clarity</em>
            {" "}— in minutes.
          </h2>
          <p
            style={{
              fontSize: "clamp(15px,1.15vw,17px)",
              color: "var(--t-b)",
              maxWidth: 500,
              margin: "0 auto",
              lineHeight: 1.75,
              fontWeight: 500,
            }}
          >
            Noor guides every student through a simple, AI-driven journey —
            personalised from the very first message.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))",
            gap: "clamp(14px,2vw,20px)",
          }}
        >
          {steps.map((step, i) => {
            const isActive = activeStep === i;
            return (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 32, scale: 0.97 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.65, delay: 0.2 + i * 0.15, ease: [0.25, 1, 0.5, 1] }}
                whileHover={{ y: -3 }}
                onClick={() => setActiveStep(i)}
                style={{
                  borderRadius: 18,
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  padding: "clamp(24px,3vh,34px) clamp(20px,2.5vw,26px)",
                  background: isActive ? "var(--card-active)" : "var(--card)",
                  border: `1.5px solid ${isActive ? step.color + "45" : "var(--card-border)"}`,
                  boxShadow: isActive ? `0 8px 28px ${step.color}18` : "0 2px 16px var(--card-shadow)",
                  transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
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
                    background: `linear-gradient(180deg, ${step.color} 0%, ${step.color}45 100%)`,
                    opacity: isActive ? 1 : 0.3,
                    transition: "opacity 0.3s",
                  }}
                />

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, paddingLeft: 8 }}>
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
                      background: isActive ? `${step.color}16` : "var(--card-active)",
                      borderColor: isActive ? `${step.color}28` : "var(--card-border)",
                      transition: "background 0.3s, border-color 0.3s",
                    }}
                  >
                    {step.icon}
                  </div>
                  <span
                    style={{
                      fontSize: 30,
                      fontWeight: 900,
                      lineHeight: 1,
                      letterSpacing: "-1.5px",
                      color: isActive ? `${step.color}50` : "var(--card-border)",
                      transition: "color 0.3s",
                    }}
                  >
                    {step.n}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: "clamp(14px,1.1vw,16px)",
                    fontWeight: 800,
                    marginBottom: 8,
                    lineHeight: 1.3,
                    paddingLeft: 8,
                    color: isActive ? "var(--t-h)" : "var(--t-b)",
                    transition: "color 0.3s",
                  }}
                >
                  {step.label}
                </h3>

                <AnimatePresence mode="wait">
                  {isActive ? (
                    <motion.p
                      key="full"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.22, ease: EASE_OUT }}
                      style={{
                        fontSize: "clamp(12px,0.9vw,13px)",
                        color: "var(--t-b)",
                        lineHeight: 1.7,
                        fontWeight: 500,
                        paddingLeft: 8,
                      }}
                    >
                      {step.detail}
                    </motion.p>
                  ) : (
                    <p
                      key="preview"
                      style={{
                        fontSize: "clamp(12px,0.9vw,13px)",
                        color: "var(--t-s)",
                        lineHeight: 1.7,
                        fontWeight: 500,
                        paddingLeft: 8,
                      }}
                    >
                      {step.detail.substring(0, 46)}…
                    </p>
                  )}
                </AnimatePresence>

                <div style={{ display: "flex", gap: 4, marginTop: 18, paddingLeft: 8 }}>
                  {steps.map((_, di) => (
                    <div
                      key={di}
                      style={{
                        height: 3,
                        borderRadius: 2,
                        transition: "flex 0.4s, background 0.4s",
                        background: di === i ? step.color : "var(--card-border)",
                        flex: di === i ? 2 : 1,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
