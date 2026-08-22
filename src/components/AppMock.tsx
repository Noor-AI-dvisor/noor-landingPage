import React from "react";
import logo from "../assets/images/logo-primary.png";

interface AppMockProps {
  compact?: boolean;
}

const AppMock: React.FC<AppMockProps> = ({ compact = false }) => {
  return (
    <div
      className={`bg-[var(--glass-bg-strong)] backdrop-blur-2xl border border-[var(--glass-border)] rounded-[18px] overflow-hidden text-[13px] transition-all duration-300 ${
        compact
          ? "mt-8 shadow-glass"
          : "w-full shadow-glass-interactive hover:-translate-y-1"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-[14px] border-b border-[var(--border)] bg-[var(--mint-bg)] transition-[background] duration-300">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Noor" className="w-8 h-8 rounded-lg" />
          <div>
            <div className="font-bold text-[13px] text-[var(--text-h)] leading-[1.15]">Noor AI</div>
            <div className="text-[9px] font-semibold tracking-[0.09em] uppercase text-accent">Career Companion</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-[5px] text-[11px] font-semibold text-accent">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-[pulse_2s_infinite]" />
            AI Online
          </div>
          <div className="px-[10px] py-1 rounded-full bg-[var(--accent-dim)] text-accent text-[10px] font-bold border border-[rgba(29,158,117,0.2)]">
            Student
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-3">
        {/* AI message */}
        <div className="flex items-start gap-2.5">
          <div className="px-[13px] py-[10px] rounded-[4px_12px_12px_12px] text-[12.5px] leading-[1.55] text-[var(--text-h)] bg-[var(--mint-bg)] max-w-[88%] transition-[background] duration-300">
            Hi! I'm Noor 👋 I'm here to help you find the study path that fits you best. What subjects do you enjoy most right now?
          </div>
        </div>

        {/* User message */}
        <div className="flex justify-end">
          <div className="px-[13px] py-[10px] rounded-[12px_12px_4px_12px] text-[12.5px] leading-[1.55] bg-accent text-white max-w-[88%]">
            I love biology and I'm okay at maths. Not sure what to do with that though...
          </div>
        </div>

        {/* AI message */}
        <div className="flex items-start gap-2.5">
          <div className="px-[13px] py-[10px] rounded-[4px_12px_12px_12px] text-[12.5px] leading-[1.55] text-[var(--text-h)] bg-[var(--mint-bg)] max-w-[88%] transition-[background] duration-300">
            That's a great combination! Based on your interests, you'd thrive in the{" "}
            <strong style={{ color: "var(--accent)" }}>Mind &amp; Health Heroes</strong>{" "}
            domain — think <strong>medicine, psychology, biotech</strong>. Want to see your personalised Study Pathway Card?
          </div>
        </div>

        {/* Subject chips */}
        <div className="flex flex-wrap gap-[7px]">
          {["🧬 Biology", "🧠 Psychology", "📐 Mathematics"].map((chip) => (
            <div key={chip} className="flex items-center gap-[5px] px-[11px] py-[5px] rounded-full text-[11px] font-semibold bg-[rgba(29,158,117,0.08)] text-accent border border-[rgba(29,158,117,0.18)]">
              {chip}
            </div>
          ))}
        </div>

        {/* Pathway card */}
        <div className="bg-[var(--mint-bg)] rounded-xl px-[14px] py-3 border border-[rgba(29,158,117,0.15)] transition-[background] duration-300">
          <div className="flex items-center justify-between mb-2 text-[11px] text-[var(--text-b)] font-medium">
            <span>📋 Study Pathway Card</span>
            <span className="px-[9px] py-[3px] rounded-full text-[10px] font-bold bg-[rgba(29,158,117,0.1)] text-accent">READY</span>
          </div>
          <div className="text-[13px] font-bold text-[var(--text-h)] mb-2">Mind &amp; Health Heroes</div>
          <div className="flex flex-wrap gap-[5px] mb-2.5">
            {["Biology", "Psychology", "Math", "Chemistry"].map((tag) => (
              <div key={tag} className="px-[9px] py-[3px] rounded-[5px] text-[10px] font-semibold bg-[rgba(29,158,117,0.08)] text-[var(--text-b)] border border-[var(--border)]">
                {tag}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mb-[5px] text-[10.5px] text-[var(--text-b)]">
            <span>Career match confidence</span>
            <span className="font-bold text-accent">87%</span>
          </div>
          <div className="h-[5px] bg-[rgba(29,158,117,0.12)] rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-accent" style={{ width: "87%" }} />
          </div>
        </div>

        {/* Skills progress (desktop only) */}
        {!compact && (
          <div className="bg-[var(--amber-bg)] rounded-xl px-[14px] py-[11px] border border-[rgba(245,158,11,0.2)] transition-[background] duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11.5px] font-bold text-[#b45309]">Skills Progress</span>
              <span className="text-[11.5px] font-bold text-[#b45309]">3 / 11 domains</span>
            </div>
            <div className="h-[5px] bg-[rgba(245,158,11,0.18)] rounded-full overflow-hidden">
              <div className="h-full w-[27%] rounded-full bg-[#f59e0b]" />
            </div>
          </div>
        )}

        {/* Input row */}
        <div className="flex items-center gap-2 px-0.5">
          <div className="flex-1 bg-[var(--pill-bg)] border border-[var(--border-s)] rounded-[10px] px-[13px] py-[9px] text-[12px] text-[var(--text-light)] font-sans transition-[background] duration-300">
            Ask Noor anything...
          </div>
          <button className="w-[34px] h-[34px] rounded-[9px] bg-accent border-none flex items-center justify-center cursor-pointer shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppMock;
