import { DOMAIN_TAGS } from "../data/sections";

// The 4 feature mockups shown next to each Solution card's copy — shared
// between the desktop ScrollStory panel and the mobile stacked layout
// (SolutionMobile.tsx), which is why this lives in its own file rather than
// inside ScrollStory.tsx: a mobile component importing it from there would
// statically pull in GSAP and the whole scroll-jacking module, defeating
// the React.lazy() split that keeps ScrollStory out of the mobile bundle.
export function SolutionVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="rounded-[26px] p-[26px] bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] shadow-glass flex flex-col gap-3.5">
        <div className="self-end max-w-[80%] px-[16px] py-[12px] rounded-[16px_16px_4px_16px] bg-gradient-to-br from-accent to-accent-soft text-white text-[14px] leading-[1.55] font-medium">
          I like designing things but I'm not sure that's a real job…
        </div>
        <div className="self-start max-w-[85%] px-[16px] py-[12px] rounded-[16px_16px_16px_4px] bg-white/85 border border-[var(--border)] text-[14px] leading-[1.55] text-[var(--text-b)]">
          That's a great starting point. Design shows up in more careers than
          most people think — want to see three that connect to subjects you're
          already taking?
        </div>
        <div className="flex gap-2 flex-wrap">
          {["Product design", "Architecture", "Game art"].map((t) => (
            <span
              key={t}
              className="px-[13px] py-[7px] rounded-full bg-[var(--accent-dim)] text-accent text-[12px] font-bold"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="relative rounded-[26px] p-6 bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] shadow-glass">
        <div
          className="h-[220px] rounded-2xl flex flex-col items-center justify-center gap-2 text-center"
          style={{
            background:
              "linear-gradient(150deg, rgba(15,168,143,0.14), rgba(58,159,192,0.1))",
          }}
        >
          <div className="text-[48px] font-extrabold text-gradient leading-none">
            11
          </div>
          <div className="text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--text-light)]">
            Career domains explored
          </div>
        </div>
        <div className="absolute -bottom-[18px] left-6 right-6 flex gap-2 flex-wrap justify-center">
          {DOMAIN_TAGS.map((t) => (
            <span
              key={t}
              className="px-4 py-[9px] rounded-full bg-white/90 backdrop-blur-md border border-white text-[12px] font-bold text-[var(--text-h)] shadow-[0_10px_24px_-10px_rgba(13,90,80,0.3)]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    );
  }
  if (index === 2) {
    return (
      <div className="rounded-[26px] p-[26px] bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] shadow-glass flex flex-col gap-[18px]">
        <div className="flex justify-between items-center gap-3">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-accent">
              Mission · 10 min
            </div>
            <div className="text-[16px] font-bold mt-1 text-[var(--text-h)]">
              Pitch an idea in 60 seconds
            </div>
          </div>
          <div className="px-[14px] py-2 rounded-full bg-[var(--accent-dim)] text-accent text-[13px] font-extrabold whitespace-nowrap">
            +120 pts
          </div>
        </div>
        <div className="h-[10px] rounded-full bg-[var(--accent-dim)] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent to-accent-soft"
            style={{ width: "68%" }}
          />
        </div>
        <div className="flex gap-3.5 items-center flex-wrap">
          <span
            className="w-[46px] h-[46px] rounded-full flex items-center justify-center text-white font-extrabold text-[12px] shadow-[0_8px_18px_-6px_var(--accent-glow-h)]"
            style={{
              background:
                "radial-gradient(circle at 32% 30%, #8ff0da, var(--accent))",
            }}
          >
            Co
          </span>
          <span
            className="w-[46px] h-[46px] rounded-full flex items-center justify-center text-white font-extrabold text-[12px] shadow-[0_8px_18px_-6px_rgba(58,159,192,0.5)]"
            style={{
              background:
                "radial-gradient(circle at 32% 30%, #c9f2ff, var(--accent-2))",
            }}
          >
            Cr
          </span>
          <span
            className="w-[46px] h-[46px] rounded-full flex items-center justify-center font-extrabold text-[12px] text-[var(--text-light)]"
            style={{
              background: "rgba(14,47,44,0.06)",
              border: "1.5px dashed var(--border-s)",
            }}
          >
            Ct
          </span>
          <span className="text-[13px] font-semibold text-[var(--text-b)]">
            Communication · Creativity · Critical thinking
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-[26px] p-[26px] bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] shadow-glass flex flex-col gap-5">
      <div className="flex gap-2 flex-wrap">
        <span className="px-[14px] py-[7px] rounded-full bg-gradient-to-br from-accent to-accent-soft text-white text-[12px] font-bold">
          Year 10
        </span>
        <span className="px-[14px] py-[7px] rounded-full bg-[var(--accent-dim)] text-accent text-[12px] font-bold">
          Option group B
        </span>
        <span className="px-[14px] py-[7px] rounded-full bg-[var(--accent-dim)] text-accent text-[12px] font-bold">
          At-risk
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3.5">
        <div className="p-4 rounded-2xl bg-white/80 border border-[var(--border)]">
          <div className="text-[26px] font-extrabold tracking-[-0.02em] text-[var(--text-h)]">
            72%
          </div>
          <div className="text-[12px] font-semibold text-[var(--text-b)] mt-0.5">
            Cohort confidence
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-white/80 border border-[var(--border)]">
          <div className="text-[26px] font-extrabold tracking-[-0.02em] text-[var(--text-h)]">
            14
          </div>
          <div className="text-[12px] font-semibold text-[var(--text-b)] mt-0.5">
            Students flagged
          </div>
        </div>
      </div>
      <div className="flex items-end gap-[10px] h-[90px] px-1">
        {[45, 62, 55, 82, 70, 92].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-[8px] rounded-b-[4px]"
            style={{
              height: `${h}%`,
              background:
                h > 75
                  ? "linear-gradient(180deg, var(--accent-soft), var(--accent))"
                  : `rgba(15,168,143,${0.22 + h / 300})`,
            }}
          />
        ))}
      </div>
      <div className="text-[12px] font-semibold text-[var(--text-b)]">
        Engagement by domain · last 6 weeks
      </div>
    </div>
  );
}
