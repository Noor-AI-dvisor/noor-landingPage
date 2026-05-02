import React from "react";
import logo from "../assets/images/logo-primary.png";

interface AppMockProps {
  compact?: boolean;
}

const AppMock: React.FC<AppMockProps> = ({ compact = false }) => {
  const wrapClass = compact ? "app-mock-mobile" : "app-mock";

  return (
    <div className={wrapClass}>
      {/* Header */}
      <div className="mock-header">
        <div className="mock-logo">
          <img src={logo} alt="Noor" className="mock-logo-icon" />
          <div>
            <div className="mock-logo-text">Noor AI</div>
            <div className="mock-logo-sub">Career Companion</div>
          </div>
        </div>
        <div className="mock-header-right">
          <div className="mock-status">
            <div className="mock-status-dot" />
            AI Online
          </div>
          <div className="mock-badge">Student</div>
        </div>
      </div>

      {/* Body */}
      <div className="mock-body">
        <div className="mock-msg">
          <div className="mock-msg-bubble ai">
            Hi! I'm Noor 👋 I'm here to help you find the study path that fits
            you best. What subjects do you enjoy most right now?
          </div>
        </div>
        <div className="mock-msg" style={{ justifyContent: "flex-end" }}>
          <div className="mock-msg-bubble user">
            I love biology and I'm okay at maths. Not sure what to do with that
            though...
          </div>
        </div>
        <div className="mock-msg">
          <div className="mock-msg-bubble ai">
            That's a great combination! Based on your interests, you'd thrive in
            the{" "}
            <strong style={{ color: "var(--accent)" }}>
              Mind &amp; Health Heroes
            </strong>{" "}
            domain — think <strong>medicine, psychology, biotech</strong>. Want
            to see your personalised Study Pathway Card?
          </div>
        </div>

        <div className="mock-subject-chips">
          <div className="mock-subject-chip">🧬 Biology</div>
          <div className="mock-subject-chip">🧠 Psychology</div>
          <div className="mock-subject-chip">📐 Mathematics</div>
        </div>

        <div className="mock-pathway">
          <div className="mock-pathway-head">
            <span>📋 Study Pathway Card</span>
            <span
              style={{
                padding: "3px 9px",
                borderRadius: "999px",
                fontSize: "10px",
                fontWeight: 700,
                background: "rgba(29,158,117,0.1)",
                color: "var(--accent)",
              }}
            >
              READY
            </span>
          </div>
          <div className="mock-pathway-title">Mind &amp; Health Heroes</div>
          <div className="mock-pathway-tags">
            <div className="mock-tag">Biology</div>
            <div className="mock-tag">Psychology</div>
            <div className="mock-tag">Math</div>
            <div className="mock-tag">Chemistry</div>
          </div>
          <div className="mock-confidence">
            <span>Career match confidence</span>
            <span style={{ fontWeight: 700, color: "var(--accent)" }}>87%</span>
          </div>
          <div className="mock-bar-wrap">
            <div className="mock-bar-fill" style={{ width: "87%" }} />
          </div>
        </div>

        {!compact && (
          <div className="mock-skills">
            <div className="mock-skills-head">
              <span className="mock-skills-label">Skills Progress</span>
              <span className="mock-skills-val">3 / 11 domains</span>
            </div>
            <div className="mock-skills-bar-wrap">
              <div className="mock-skills-bar-fill" />
            </div>
          </div>
        )}

        <div className="mock-input-row">
          <div className="mock-input">Ask Noor anything...</div>
          <button className="mock-send">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppMock;
