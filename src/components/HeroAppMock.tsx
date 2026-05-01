import { motion } from "framer-motion";
import { EASE_SPRING } from "@/lib/motion";

export default function HeroAppMock({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: EASE_SPRING }}
      style={{ position: "relative" }}
    >
      <div
        style={{
          position: "absolute",
          top: -32,
          right: -32,
          bottom: -32,
          left: -32,
          borderRadius: 48,
          pointerEvents: "none",
          zIndex: 1,
          background:
            "radial-gradient(ellipse,rgba(79,209,197,0.13) 0%,transparent 70%)",
        }}
      />

      <motion.div
        whileHover={{
          y: -4,
          boxShadow:
            "0 32px 80px rgba(0,0,0,0.1), 0 8px 24px rgba(79,209,197,0.12)",
        }}
        transition={{ duration: 0.3, ease: EASE_SPRING }}
        style={{
          background: "var(--card-active)",
          borderRadius: 22,
          border: "1px solid var(--card-border)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.07),0 4px 16px rgba(0,0,0,0.04)",
          position: "relative",
          zIndex: 2,
          overflow: "hidden",
        }}
      >
        {/* App header */}
        <div
          style={{
            borderBottom: "1px solid rgba(229,231,235,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "linear-gradient(135deg, #F0FDF8 0%, #E8FBF6 100%)",
            padding: compact ? "12px 16px 10px" : "18px 22px 16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img
              src={`${import.meta.env.BASE_URL}logo-primary.png`}
              alt="Noor"
              style={{
                height: compact ? 32 : 48,
                width: "auto",
                objectFit: "contain",
              }}
            />
            <div>
              <div
                style={{
                  fontWeight: 900,
                  color: "var(--t-h)",
                  letterSpacing: "-0.5px",
                  lineHeight: 1.1,
                  fontSize: compact ? 12 : 15,
                }}
              >
                Noor AI
              </div>
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: "#1D9E75",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                Career Companion
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div
                className="animate-pulse-dot"
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: 9999,
                  background: "#1D9E75",
                }}
              />
              <span style={{ fontSize: 10, color: "#1D9E75", fontWeight: 700 }}>
                AI Online
              </span>
            </div>
            <div
              style={{
                padding: "3px 10px",
                borderRadius: 9999,
                background: "white",
                border: "1px solid #BBF7D0",
                fontSize: 10,
                fontWeight: 700,
                color: "#1D9E75",
              }}
            >
              Student
            </div>
          </div>
        </div>

        {/* Chat body */}
        <div style={{ padding: compact ? "12px 16px 14px" : "16px 22px 20px" }}>
          <div
            style={{
              background: "var(--card)",
              borderRadius: "12px 12px 12px 3px",
              marginBottom: 10,
              padding: compact ? "8px 10px" : "12px 14px",
            }}
          >
            <p
              style={{
                color: "var(--t-b)",
                lineHeight: 1.6,
                fontWeight: 500,
                fontSize: compact ? 11 : 12.5,
              }}
            >
              Hi! I&apos;m Noor 👋 I&apos;m here to help you find the study path
              that fits you best. What subjects do you enjoy the most right now?
            </p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                background: "#1D9E75",
                borderRadius: "12px 12px 3px 12px",
                maxWidth: "80%",
                padding: compact ? "7px 10px" : "10px 14px",
              }}
            >
              <p
                style={{
                  color: "white",
                  lineHeight: 1.6,
                  fontWeight: 500,
                  fontSize: compact ? 11 : 12.5,
                }}
              >
                I love biology and I&apos;m okay at maths. Not sure what to do
                with that though...
              </p>
            </div>
          </div>

          <div
            style={{
              background: "var(--card)",
              borderRadius: "12px 12px 12px 3px",
              marginBottom: 12,
              padding: compact ? "8px 10px" : "12px 14px",
            }}
          >
            <p
              style={{
                color: "var(--t-b)",
                lineHeight: 1.6,
                fontWeight: 500,
                fontSize: compact ? 11 : 12.5,
              }}
            >
              That&apos;s a great combination! Based on your interests,
              you&apos;d thrive in the{" "}
              <strong style={{ color: "#1D9E75" }}>Mind & Health Heroes</strong>{" "}
              domain — think <strong>medicine, psychology, biotech</strong>.
              Want to see your personalised Study Pathway Card? 🌟
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              marginBottom: 12,
            }}
          >
            {["🧬 Biology", "🧠 Psychology", "📐 Mathematics"].map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "4px 11px",
                  borderRadius: 9999,
                  background: "#F0FDF4",
                  color: "#1D9E75",
                  fontSize: 11,
                  fontWeight: 700,
                  border: "1px solid #BBF7D0",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Study Pathway Card */}
          <div
            style={{
              borderRadius: 12,
              border: "1px solid #BBF7D0",
              marginBottom: 12,
              background: "linear-gradient(135deg, #F0FDF4 0%, #E6FFFA 100%)",
              padding: compact ? "9px 10px" : "12px 14px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 800, color: "#065F46" }}>
                📋 Study Pathway Card
              </span>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: "#1D9E75",
                  background: "white",
                  border: "1px solid #BBF7D0",
                  borderRadius: 9999,
                  padding: "2px 8px",
                }}
              >
                READY
              </span>
            </div>
            <div
              style={{
                fontWeight: 800,
                color: "#0F172A",
                marginBottom: 6,
                fontSize: compact ? 11.5 : 13.5,
              }}
            >
              Mind & Health Heroes
            </div>
            <div
              style={{
                display: "flex",
                gap: 4,
                flexWrap: "wrap",
                marginBottom: 8,
              }}
            >
              {["Biology", "Psychology", "Math", "Chemistry"].map((s) => (
                <span
                  key={s}
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#1D9E75",
                    background: "white",
                    border: "1px solid #BBF7D0",
                    borderRadius: 6,
                    padding: "2px 8px",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 5,
              }}
            >
              <span style={{ fontSize: 10, color: "#6B7280", fontWeight: 600 }}>
                Career match confidence
              </span>
              <span style={{ fontSize: 11, fontWeight: 800, color: "#1D9E75" }}>
                87%
              </span>
            </div>
            <div
              style={{
                height: 4,
                borderRadius: 2,
                background: "#D1FAE5",
                overflow: "hidden",
              }}
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "87%" }}
                transition={{ duration: 1.4, delay: 1.0, ease: EASE_SPRING }}
                style={{
                  height: "100%",
                  borderRadius: 2,
                  background: "linear-gradient(90deg, #1D9E75, #87D5CF)",
                }}
              />
            </div>
          </div>

          <div
            style={{
              borderRadius: 10,
              background: "#FFFBEB",
              border: "1px solid #FDE68A",
              marginBottom: 12,
              padding: compact ? "7px 9px" : "10px 12px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 700, color: "#92400E" }}>
                Skills Progress
              </span>
              <span style={{ fontSize: 11, fontWeight: 800, color: "#92400E" }}>
                3 / 11 domains
              </span>
            </div>
            <div
              style={{
                height: 5,
                borderRadius: 3,
                background: "#FDE68A",
                overflow: "hidden",
              }}
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "27%" }}
                transition={{ duration: 1.2, delay: 0.8, ease: EASE_SPRING }}
                style={{
                  height: "100%",
                  borderRadius: 3,
                  background: "linear-gradient(90deg, #F59E0B, #F97316)",
                }}
              />
            </div>
          </div>

          {/* Typing indicator */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 4,
                padding: "8px 12px",
                background: "var(--card)",
                borderRadius: "12px 12px 12px 3px",
                alignItems: "center",
              }}
            >
              <div
                className="animate-typing-dot-1"
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: 9999,
                  background: "#9CA3AF",
                }}
              />
              <div
                className="animate-typing-dot-2"
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: 9999,
                  background: "#9CA3AF",
                }}
              />
              <div
                className="animate-typing-dot-3"
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: 9999,
                  background: "#9CA3AF",
                }}
              />
            </div>
            <span
              style={{ fontSize: 10, color: "var(--t-s)", fontWeight: 600 }}
            >
              Noor is analysing next steps…
            </span>
          </div>

          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              background: "var(--in-bg)",
              borderRadius: 10,
              padding: "10px 12px",
              border: "1px solid var(--in-border)",
            }}
          >
            <span
              style={{
                flex: 1,
                fontSize: 12,
                color: "var(--t-s)",
                fontWeight: 500,
              }}
            >
              Ask Noor anything...
            </span>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                background: "#1D9E75",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 2L11 13"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 2L15 22L11 13L2 9L22 2Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating badges — hidden in compact (tablet) mode */}
      {!compact && (
        <>
          {/* Floating badge 1 */}
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.9, ease: EASE_SPRING }}
            className="animate-float-dot"
            style={{
              position: "absolute",
              top: -18,
              right: 20,
              zIndex: 3,
              background: "var(--card-active)",
              borderRadius: 12,
              padding: "8px 14px",
              boxShadow: "0 4px 20px var(--card-shadow)",
              border: "1px solid var(--card-border)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 18 }}>🔥</span>
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: "var(--t-h)",
                  lineHeight: 1,
                }}
              >
                3-day streak
              </div>
              <div
                style={{
                  fontSize: 9,
                  color: "var(--t-s)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginTop: 2,
                }}
              >
                Keep going!
              </div>
            </div>
          </motion.div>

          {/* Floating badge 2 */}
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.1, ease: EASE_SPRING }}
            className="animate-float-dot"
            style={{
              position: "absolute",
              bottom: 60,
              left: -32,
              zIndex: 3,
              background: "var(--card-active)",
              borderRadius: 12,
              padding: "8px 14px",
              boxShadow: "0 4px 20px var(--card-shadow)",
              border: "1px solid var(--card-border)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              animationDelay: "-3s",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: "#F59E0B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 14 }}>⭐</span>
            </div>
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: "var(--t-h)",
                  lineHeight: 1,
                }}
              >
                120 pts
              </div>
              <div
                style={{
                  fontSize: 9,
                  color: "var(--t-s)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginTop: 2,
                }}
              >
                This week
              </div>
            </div>
          </motion.div>

          {/* Floating badge 3 */}
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.3, ease: EASE_SPRING }}
            className="animate-float-dot"
            style={{
              position: "absolute",
              top: "40%",
              right: -30,
              zIndex: 3,
              borderRadius: 12,
              padding: "10px 14px",
              boxShadow: "0 6px 24px rgba(29,158,117,0.32)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "linear-gradient(135deg, #1D9E75, #87D5CF)",
              animationDelay: "-6s",
            }}
          >
            <span style={{ fontSize: 16 }}>🧠</span>
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: "white",
                  lineHeight: 1,
                }}
              >
                AI matched
              </div>
              <div
                style={{
                  fontSize: 9,
                  color: "rgba(255,255,255,0.82)",
                  fontWeight: 700,
                  marginTop: 2,
                }}
              >
                3 career paths
              </div>
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
