import { useCallback, useEffect, useRef, useState } from "react";
import RibbonScene, { type StoryProgress } from "../hero3d/RibbonScene";
import EarlyAccessForm from "../EarlyAccessForm";
import AppMock from "../AppMock";
import { useStoryScroll } from "../../hooks/useScrollConnect";
import {
  PROBLEM_ITEMS,
  SOLUTION_FEATURES,
  DOMAIN_TAGS,
  WHO_CARDS,
  EARLY_ACCESS_BENEFITS,
} from "../../data/sections";
import { GraduationCapIcon, BoltIcon, TrophyIcon, FlameIcon, BrainIcon, StarIcon } from "../Icons";
import "./story.css";

const STEP_VH = 85;
const TOTAL_STEPS = 17; // 1 hero + 4 problem + 4 solution + 4 who + 4 early-access

const PROBLEM_START = 1;
const SOLUTION_START = 5;
const WHO_START = 9;
const EARLY_START = 13;

// index into SECTION_OF_STEP/STAGE arrays: 0 hero, 1 problem, 2 solution, 3 who, 4 early
const SECTION_OF_STEP = [0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4];
const LAST_STEP_OF_SECTION = [0, 4, 8, 12, 16];
const SECTION_START_STEP = [0, PROBLEM_START, SOLUTION_START, WHO_START, EARLY_START];

const NAV_DOTS = [
  { label: "Hero", id: "home" },
  { label: "Problem", id: "problem" },
  { label: "Solution", id: "solution-wrap" },
  { label: "Who", id: "who" },
  { label: "Start", id: "early-access" },
];

const CHIPS = [
  { Icon: GraduationCapIcon, label: "Ages 14–18" },
  { Icon: BoltIcon, label: "10-min missions" },
  { Icon: TrophyIcon, label: "11 skill domains" },
];

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

// Panels are spaced 1 step apart; dividing by 0.55 (instead of 1) keeps the
// visual cross-dissolve brief so adjacent panels don't sit half-opaque over
// each other for most of the scroll. Pointer-events instead use the raw
// distance so exactly one panel — whichever is nearer — stays interactive
// across its *entire* step, with no dead zone where neither responds.
//
// CROSSFADE_HOLD carves out a plateau around diff===0 where opacity is
// pinned at 1: without it, opacity was a pure |diff| tent (1 - |diff|/0.55)
// that only touched 1 for a single instantaneous diff value before the exit
// ramp started falling again immediately — the element was never actually at
// rest, which read as a flicker/never-fully-settles effect rather than a
// clean appear-hold-disappear. Enter now finishes (opacity 1) at
// diff === -CROSSFADE_HOLD and exit only starts falling at
// diff === +CROSSFADE_HOLD, a real non-overlapping gap between the two.
const CROSSFADE_SPAN = 0.55;
const CROSSFADE_HOLD = 0.18;

// The hero's AppMock preview reuses applyCrossfade's own tent (same
// CROSSFADE_HOLD/CROSSFADE_SPAN shape) rather than a separate opacity
// system, but scaled onto its own local timeline via APPMOCK_SPEED — the
// tent's natural width (2 * CROSSFADE_SPAN = 1.1 stepFloat units) doesn't
// fit inside the hero panel's own ~0.85-unit usable window otherwise. With
// APPMOCK_CENTER = 0.44 and APPMOCK_SPEED = 1.35: opacity is 0 at stepFloat
// 0 (no bleed-through under the headline on load), rises through the
// headline's own fade-out (which starts at CROSSFADE_HOLD = 0.18), reaches
// full opacity right around stepFloat 0.3 — where RibbonScene's own
// BOOK_SETTLE_BLEND settles the book — holds through ~0.57 (by which point
// the headline/text panel has fully faded via its own unrelated panel-level
// crossfade), then fades back out well before the Problem panel reaches its
// own hold at stepFloat 0.82.
const APPMOCK_CENTER = 0.44;
const APPMOCK_SPEED = 1.35;

function applyCrossfade(el: HTMLElement | null, diff: number, rise = 36) {
  if (!el) return;
  const absDiff = Math.abs(diff);
  const opacity =
    absDiff <= CROSSFADE_HOLD
      ? 1
      : clamp(1 - (absDiff - CROSSFADE_HOLD) / (CROSSFADE_SPAN - CROSSFADE_HOLD), 0, 1);
  el.style.opacity = String(opacity);
  el.style.transform = `translateY(${-diff * rise}px)`;
  el.style.pointerEvents = absDiff < 0.5 ? "auto" : "none";
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function SectionRail({
  items,
  activeIndex,
  fillRef,
  dotRef,
}: {
  items: { label: string }[];
  activeIndex: number;
  fillRef: (el: HTMLDivElement | null) => void;
  dotRef?: (el: HTMLDivElement | null, i: number) => void;
}) {
  return (
    <div className="story-rail">
      <div className="story-rail-track">
        <div className="story-rail-fill" ref={fillRef} />
      </div>
      <div className="story-rail-dots">
        {items.map((item, i) => (
          <div
            key={item.label}
            className={`story-rail-dot${i === activeIndex ? " active" : ""}`}
            ref={dotRef ? (el) => dotRef(el, i) : undefined}
          >
            <span className="story-rail-dot-marker">{String(i + 1).padStart(2, "0")}</span>
            <span className="story-rail-dot-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SolutionVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="rounded-[26px] p-[26px] bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] shadow-glass flex flex-col gap-3.5">
        <div className="self-end max-w-[80%] px-[16px] py-[12px] rounded-[16px_16px_4px_16px] bg-gradient-to-br from-accent to-accent-soft text-white text-[14px] leading-[1.55] font-medium">
          I like designing things but I'm not sure that's a real job…
        </div>
        <div className="self-start max-w-[85%] px-[16px] py-[12px] rounded-[16px_16px_16px_4px] bg-white/85 border border-[var(--border)] text-[14px] leading-[1.55] text-[var(--text-b)]">
          That's a great starting point. Design shows up in more careers than most people think — want to see three that connect to subjects you're already taking?
        </div>
        <div className="flex gap-2 flex-wrap">
          {["Product design", "Architecture", "Game art"].map((t) => (
            <span key={t} className="px-[13px] py-[7px] rounded-full bg-[var(--accent-dim)] text-accent text-[12px] font-bold">{t}</span>
          ))}
        </div>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="relative rounded-[26px] p-6 bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] shadow-glass">
        <div className="h-[220px] rounded-2xl flex flex-col items-center justify-center gap-2 text-center" style={{ background: "linear-gradient(150deg, rgba(15,168,143,0.14), rgba(58,159,192,0.1))" }}>
          <div className="text-[48px] font-extrabold text-gradient leading-none">11</div>
          <div className="text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--text-light)]">Career domains explored</div>
        </div>
        <div className="absolute -bottom-[18px] left-6 right-6 flex gap-2 flex-wrap justify-center">
          {DOMAIN_TAGS.map((t) => (
            <span key={t} className="px-4 py-[9px] rounded-full bg-white/90 backdrop-blur-md border border-white text-[12px] font-bold text-[var(--text-h)] shadow-[0_10px_24px_-10px_rgba(13,90,80,0.3)]">{t}</span>
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
            <div className="text-[11px] font-bold uppercase tracking-[0.08em] text-accent">Mission · 10 min</div>
            <div className="text-[16px] font-bold mt-1 text-[var(--text-h)]">Pitch an idea in 60 seconds</div>
          </div>
          <div className="px-[14px] py-2 rounded-full bg-[var(--accent-dim)] text-accent text-[13px] font-extrabold whitespace-nowrap">+120 pts</div>
        </div>
        <div className="h-[10px] rounded-full bg-[var(--accent-dim)] overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-accent to-accent-soft" style={{ width: "68%" }} />
        </div>
        <div className="flex gap-3.5 items-center flex-wrap">
          <span className="w-[46px] h-[46px] rounded-full flex items-center justify-center text-white font-extrabold text-[12px] shadow-[0_8px_18px_-6px_var(--accent-glow-h)]" style={{ background: "radial-gradient(circle at 32% 30%, #8ff0da, var(--accent))" }}>Co</span>
          <span className="w-[46px] h-[46px] rounded-full flex items-center justify-center text-white font-extrabold text-[12px] shadow-[0_8px_18px_-6px_rgba(58,159,192,0.5)]" style={{ background: "radial-gradient(circle at 32% 30%, #c9f2ff, var(--accent-2))" }}>Cr</span>
          <span className="w-[46px] h-[46px] rounded-full flex items-center justify-center font-extrabold text-[12px] text-[var(--text-light)]" style={{ background: "rgba(14,47,44,0.06)", border: "1.5px dashed var(--border-s)" }}>Ct</span>
          <span className="text-[13px] font-semibold text-[var(--text-b)]">Communication · Creativity · Critical thinking</span>
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-[26px] p-[26px] bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] shadow-glass flex flex-col gap-5">
      <div className="flex gap-2 flex-wrap">
        <span className="px-[14px] py-[7px] rounded-full bg-gradient-to-br from-accent to-accent-soft text-white text-[12px] font-bold">Year 10</span>
        <span className="px-[14px] py-[7px] rounded-full bg-[var(--accent-dim)] text-accent text-[12px] font-bold">Option group B</span>
        <span className="px-[14px] py-[7px] rounded-full bg-[var(--accent-dim)] text-accent text-[12px] font-bold">At-risk</span>
      </div>
      <div className="grid grid-cols-2 gap-3.5">
        <div className="p-4 rounded-2xl bg-white/80 border border-[var(--border)]">
          <div className="text-[26px] font-extrabold tracking-[-0.02em] text-[var(--text-h)]">72%</div>
          <div className="text-[12px] font-semibold text-[var(--text-b)] mt-0.5">Cohort confidence</div>
        </div>
        <div className="p-4 rounded-2xl bg-white/80 border border-[var(--border)]">
          <div className="text-[26px] font-extrabold tracking-[-0.02em] text-[var(--text-h)]">14</div>
          <div className="text-[12px] font-semibold text-[var(--text-b)] mt-0.5">Students flagged</div>
        </div>
      </div>
      <div className="flex items-end gap-[10px] h-[90px] px-1">
        {[45, 62, 55, 82, 70, 92].map((h, i) => (
          <div key={i} className="flex-1 rounded-t-[8px] rounded-b-[4px]" style={{ height: `${h}%`, background: h > 75 ? "linear-gradient(180deg, var(--accent-soft), var(--accent))" : `rgba(15,168,143,${0.22 + h / 300})` }} />
        ))}
      </div>
      <div className="text-[12px] font-semibold text-[var(--text-b)]">Engagement by domain · last 6 weeks</div>
    </div>
  );
}

export default function ScrollStory() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const storyRef = useRef<StoryProgress>({ fromStage: 0, toStage: 0, blend: 0, activeGroup: -1 });

  const panelRefs = useRef<(HTMLDivElement | null)[]>(Array(13).fill(null));
  const appMockRef = useRef<HTMLDivElement>(null);
  const railFillRefs = useRef<(HTMLDivElement | null)[]>(Array(13).fill(null));
  const progressDotRefs = useRef<(HTMLButtonElement | null)[]>(Array(NAV_DOTS.length).fill(null));

  const earlyPanelRef = useRef<HTMLDivElement>(null);
  const earlyFillRef = useRef<HTMLDivElement | null>(null);
  const earlyDescRefs = useRef<(HTMLDivElement | null)[]>(Array(4).fill(null));
  const earlyDotRefs = useRef<(HTMLDivElement | null)[]>(Array(4).fill(null));

  const handleUpdate = useCallback((stepFloat: number) => {
    const k = clamp(Math.floor(stepFloat), 0, TOTAL_STEPS - 1);
    const section = SECTION_OF_STEP[k];
    const localT = stepFloat - k;
    const isLastStepOfSection = k === LAST_STEP_OF_SECTION[section] && section < 4;
    const fromStage = section;
    const toStage = isLastStepOfSection ? section + 1 : section;
    const blend = isLastStepOfSection ? localT : 0;

    const story = storyRef.current;
    story.fromStage = fromStage;
    story.toStage = toStage;
    story.blend = blend;
    story.activeGroup = section >= 1 && section <= 3 ? clamp(stepFloat - SECTION_START_STEP[section], 0, 3) : -1;

    for (let i = 0; i <= 12; i++) applyCrossfade(panelRefs.current[i], stepFloat - i);
    applyCrossfade(appMockRef.current, (stepFloat - APPMOCK_CENTER) * APPMOCK_SPEED, 24);

    const setRailFill = (start: number, keys: number[]) => {
      const frac = clamp((stepFloat - start) / 3, 0, 1);
      keys.forEach((idx) => {
        const el = railFillRefs.current[idx];
        if (el) el.style.height = `${frac * 100}%`;
      });
    };
    setRailFill(PROBLEM_START, [1, 2, 3, 4]);
    setRailFill(SOLUTION_START, [5, 6, 7, 8]);
    setRailFill(WHO_START, [9, 10, 11, 12]);

    const earlyEl = earlyPanelRef.current;
    if (earlyEl) {
      const earlyOpacity = clamp(stepFloat - (EARLY_START - 1), 0, 1);
      earlyEl.style.opacity = String(earlyOpacity);
      earlyEl.style.pointerEvents = earlyOpacity > 0.6 ? "auto" : "none";
      earlyEl.style.transform = `translateY(${(1 - earlyOpacity) * 40}px)`;
    }
    const earlyBulletFloat = clamp(stepFloat - EARLY_START, 0, 3);
    if (earlyFillRef.current) earlyFillRef.current.style.height = `${(earlyBulletFloat / 3) * 100}%`;
    const earlyNearest = Math.round(earlyBulletFloat);
    for (let j = 0; j < 4; j++) {
      applyCrossfade(earlyDescRefs.current[j], earlyBulletFloat - j, 14);
      earlyDotRefs.current[j]?.classList.toggle("active", j === earlyNearest);
    }

    progressDotRefs.current.forEach((el, i) => el?.classList.toggle("active", i === section));
  }, []);

  const handleReducedMotion = useCallback(() => {
    setReduced(true);
    storyRef.current = { fromStage: 4, toStage: 4, blend: 0, activeGroup: -1 };
  }, []);

  useStoryScroll(wrapperRef, TOTAL_STEPS, handleUpdate, handleReducedMotion);

  useEffect(() => {
    if (!reduced) return;
    // Static fallback: every panel simply visible, stacked in normal flow (see story-reduced CSS).
    panelRefs.current.forEach((el) => {
      if (!el) return;
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.pointerEvents = "auto";
    });
    if (earlyPanelRef.current) {
      earlyPanelRef.current.style.opacity = "1";
      earlyPanelRef.current.style.transform = "none";
      earlyPanelRef.current.style.pointerEvents = "auto";
    }
    if (appMockRef.current) {
      appMockRef.current.style.opacity = "1";
      appMockRef.current.style.transform = "none";
      appMockRef.current.style.pointerEvents = "auto";
    }
    earlyDescRefs.current.forEach((el) => {
      if (!el) return;
      el.style.opacity = "1";
      el.style.transform = "none";
    });
  }, [reduced]);

  return (
    <section id="home" className={`story-root${reduced ? " story-reduced" : ""}`}>
      <div className="story-wrapper" ref={wrapperRef} style={reduced ? undefined : { height: `${TOTAL_STEPS * STEP_VH}vh` }}>
        <div id="problem" className="story-anchor" style={{ top: `${(PROBLEM_START / TOTAL_STEPS) * 100}%` }} />
        <div id="solution-wrap" className="story-anchor" style={{ top: `${(SOLUTION_START / TOTAL_STEPS) * 100}%` }} />
        <div id="who" className="story-anchor" style={{ top: `${(WHO_START / TOTAL_STEPS) * 100}%` }} />
        <div id="early-access" className="story-anchor" style={{ top: `${(EARLY_START / TOTAL_STEPS) * 100}%` }} />

        <div className="story-stage">
          <div className="story-canvas">
            <RibbonScene storyRef={storyRef} />
          </div>
          <div className="story-grid" aria-hidden="true" />

          {!reduced && (
            <nav className="story-progress-nav" aria-label="Story progress">
              {NAV_DOTS.map((dot, i) => (
                <button
                  key={dot.id}
                  ref={(el) => { progressDotRefs.current[i] = el; }}
                  className={`story-progress-dot${i === 0 ? " active" : ""}`}
                  onClick={() => scrollToId(dot.id)}
                  aria-label={dot.label}
                >
                  <span className="story-progress-dot-tip">{dot.label}</span>
                </button>
              ))}
            </nav>
          )}

          {/* Step 0 — Hero */}
          <div className="story-panel story-panel-hero" ref={(el) => { panelRefs.current[0] = el; }}>
            <div className="story-panel-inner">
              <div className="story-hero-textblock">
                <div className="story-eyebrow-pill">
                  <span className="story-status-dot" />
                  For schools · Ages 14–18
                </div>
                <h1 className="story-hero-title">
                  Noor AI Career &amp; Skills
                  <br />
                  <span>Companion for Schools</span>
                </h1>
                <p className="story-hero-sub">
                  An AI-powered advisor that helps students aged 14–18 choose the right subjects,
                  discover their strengths, and build the skills that actually matter for their future.
                </p>
              </div>
              <div className="story-cta-row">
                <button className="btn-primary" onClick={() => scrollToId("early-access")}>
                  Request a free demo →
                </button>
                <button className="btn-secondary" onClick={() => scrollToId("solution-wrap")}>
                  See How It Works
                </button>
              </div>
              <div className="story-chip-row">
                {CHIPS.map(({ Icon, label }) => (
                  <span key={label} className="story-chip">
                    <Icon className="w-3.5 h-3.5 text-accent shrink-0" />
                    {label}
                  </span>
                ))}
              </div>
              <div className="story-scroll-hint">
                <span>Scroll to explore</span>
                <div className="story-scroll-line" />
              </div>
            </div>
          </div>

          {/* AppMock preview: a sibling of every story-panel (not nested in
              story-panel-hero) so its own crossfade isn't multiplied by the
              hero panel's opacity — nesting it inside meant its compounded
              opacity could never exceed the hero panel's own fading-out
              value, so it never got a real "fully visible" moment. Timing
              (see APPMOCK_CENTER/APPMOCK_SPEED) keeps it fully transparent
              at stepFloat 0, has it take over as the text panel fades out
              (peaking right around the book's own settle point), and fades
              it back out before the Problem panel reaches its own hold. */}
          <div className="story-hero-appmock-layout">
            <div className="story-hero-appmock" ref={appMockRef}>
              <div className="absolute top-[22%] -left-3 bg-[var(--glass-bg-strong)] backdrop-blur-xl border border-[var(--glass-border)] rounded-xl px-[14px] py-[9px] shadow-badge-float flex flex-col text-[11px] z-10 animate-badge-float">
                <div className="font-bold text-[var(--text-h)] flex items-center gap-1.5 text-[12px]">
                  <FlameIcon className="w-3.5 h-3.5 text-[var(--accent-amber)] shrink-0" /> 3-day streak
                </div>
                <div className="text-[9.5px] font-semibold tracking-[0.06em] uppercase text-[var(--text-light)] mt-0.5">Keep going!</div>
              </div>

              <div className="absolute -right-3 top-[45%] bg-[var(--text-h)] text-[var(--bg)] rounded-[10px] px-3 py-2 flex items-center gap-[7px] text-[11px] font-bold shadow-badge-float whitespace-nowrap z-10 animate-badge-float [animation-delay:-3s]">
                <BrainIcon className="w-4 h-4 shrink-0" />
                <div>
                  <div>AI matched</div>
                  <div className="font-medium opacity-65 text-[10px]">3 career paths</div>
                </div>
              </div>

              <div className="absolute -bottom-3 -left-3 bg-[var(--glass-bg-strong)] backdrop-blur-xl border border-[var(--glass-border)] rounded-xl px-[13px] py-2 flex items-center gap-2 shadow-badge-float text-[11px] z-10 animate-badge-float [animation-delay:-1.5s]">
                <div className="w-7 h-7 rounded-lg bg-[#fbe8c8] flex items-center justify-center">
                  <StarIcon className="w-3.5 h-3.5 text-[var(--accent-amber)]" />
                </div>
                <div>
                  <div className="font-bold text-[var(--text-h)] text-[13px]">120 pts</div>
                  <div className="text-[9.5px] font-semibold tracking-[0.06em] uppercase text-[var(--text-light)]">This week</div>
                </div>
              </div>

              <AppMock compact={false} />
            </div>
          </div>

          {/* Steps 1-4 — Problem */}
          {PROBLEM_ITEMS.map((item, i) => (
            <div
              className="story-panel"
              key={`problem-${item.label}`}
              ref={(el) => { panelRefs.current[PROBLEM_START + i] = el; }}
            >
              <div className="story-panel-inner">
                <div className="story-header">
                  <span className="story-eyebrow">The Problem</span>
                  <h2 className="story-title">
                    Subject choice is{" "}
                    <span className="story-title-highlight">broken</span> — and schools know it.
                  </h2>
                  <p className="story-sub">
                    Students make life-defining decisions with one meeting, a PDF booklet, and a guess.
                  </p>
                </div>
                <div className="story-columns">
                  <SectionRail
                    items={PROBLEM_ITEMS}
                    activeIndex={i}
                    fillRef={(el) => { railFillRefs.current[PROBLEM_START + i] = el; }}
                  />
                  <div className={`story-card problem-card tilt-${item.tilt}`}>
                    <div className="story-card-index" style={{ color: item.tilt === "l" ? "rgba(15,168,143,0.14)" : "rgba(58,159,192,0.16)" }}>
                      0{i + 1}
                    </div>
                    <div className="story-card-badge" style={{ background: item.tilt === "l" ? "rgba(15,168,143,0.1)" : "rgba(58,159,192,0.12)", color: item.color }}>
                      <item.Icon className="w-3.5 h-3.5" style={{ color: item.color }} />
                      {item.label}
                    </div>
                    <h3 className="story-card-title">{item.title}</h3>
                    <p className="story-card-desc">{item.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Steps 5-8 — Solution */}
          {SOLUTION_FEATURES.map((f, i) => (
            <div
              className="story-panel"
              key={`solution-${f.num}`}
              ref={(el) => { panelRefs.current[SOLUTION_START + i] = el; }}
            >
              <div className="story-panel-inner">
                <div className="story-header">
                  <span className="story-eyebrow">Our Solution</span>
                  <h2 className="story-title">
                    Your school's AI guidance <span className="story-title-highlight">companion</span>
                  </h2>
                  <p className="story-sub">Noor means 'light' in Arabic.</p>
                </div>
                <div className="story-columns">
                  <SectionRail
                    items={SOLUTION_FEATURES.map((s) => ({ label: s.title }))}
                    activeIndex={i}
                    fillRef={(el) => { railFillRefs.current[SOLUTION_START + i] = el; }}
                  />
                  <div className="story-card story-card--split">
                    <div>
                      <div className="story-feature-num">{f.num}</div>
                      <h3 className="story-card-title">{f.title}</h3>
                      <p className="story-card-desc">{f.desc}</p>
                      <p className="story-card-more">{f.more}</p>
                    </div>
                    <SolutionVisual index={i} />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Steps 9-12 — Who */}
          {WHO_CARDS.map((card, i) => (
            <div
              className="story-panel"
              key={`who-${card.role}`}
              ref={(el) => { panelRefs.current[WHO_START + i] = el; }}
            >
              <div className="story-panel-inner">
                <div className="story-header">
                  <span className="story-eyebrow">Who It's For</span>
                  <h2 className="story-title">
                    Designed for <span className="story-title-highlight">everyone</span> in the school ecosystem
                  </h2>
                  <p className="story-sub">Whether you're a student, parent, counsellor, or leader.</p>
                </div>
                <div className="story-columns">
                  <SectionRail
                    items={WHO_CARDS.map((c) => ({ label: c.role }))}
                    activeIndex={i}
                    fillRef={(el) => { railFillRefs.current[WHO_START + i] = el; }}
                  />
                  <div className="story-card story-who-card">
                    <div className="story-who-icon" style={{ background: `${card.accent}15`, borderColor: `${card.accent}30` }}>
                      <card.Icon className="w-7 h-7" style={{ color: card.accent }} />
                    </div>
                    <div className="story-card-badge" style={{ color: card.accent, background: `${card.accent}12` }}>{card.role}</div>
                    <h3 className="story-card-title">{card.subtitle}</h3>
                    <p className="story-card-desc">{card.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Steps 13-16 — Early access (single persistent panel; only the rail highlight advances) */}
          <div className="story-panel story-panel-early" ref={earlyPanelRef}>
            <div className="story-panel-inner">
              <div className="story-header">
                <span className="story-eyebrow">Limited Early Access</span>
                <h2 className="story-title">
                  Ready to bring <span className="story-title-highlight">Noor</span> to your school?
                </h2>
                <p className="story-sub">Free demos with selected schools — no commitment required.</p>
              </div>
              <div className="story-columns story-columns--early">
                <div>
                  <SectionRail
                    items={EARLY_ACCESS_BENEFITS.map((b) => ({ label: b.title }))}
                    activeIndex={-1}
                    fillRef={(el) => { earlyFillRef.current = el; }}
                    dotRef={(el, i) => { earlyDotRefs.current[i] = el; }}
                  />
                  <div className="story-early-desc-stack">
                    {EARLY_ACCESS_BENEFITS.map((b, j) => (
                      <div
                        className="story-early-desc"
                        key={b.title}
                        ref={(el) => { earlyDescRefs.current[j] = el; }}
                      >
                        {b.desc}
                      </div>
                    ))}
                  </div>
                </div>
                <EarlyAccessForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
