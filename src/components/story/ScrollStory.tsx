import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import EarlyAccessForm from "../EarlyAccessForm";
import AppMock from "../AppMock";
import { SolutionVisual } from "../SolutionVisual";
import { StoryPresence } from "../StoryPresence";
import { useStoryScroll } from "../../hooks/useScrollConnect";
import {
  STORY_TOTAL_STEPS,
  STORY_STEPS,
  scrollToStoryStep,
} from "../../lib/storyScroll";
import {
  PROBLEM_ITEMS,
  SOLUTION_FEATURES,
  WHO_CARDS,
} from "../../data/sections";
import {
  GraduationCapIcon,
  BoltIcon,
  TrophyIcon,
  FlameIcon,
  BrainIcon,
  StarIcon,
  CheckIcon,
} from "../Icons";
import "./story.css";

const STEP_VH = 85;
const TOTAL_STEPS = STORY_TOTAL_STEPS; // 1 hero + 4 problem + 4 solution + 4 who + 4 early-access

const EARLY_ACCESS_CHECKLIST = [
  "Personalised AI guidance for every student",
  "Counsellor dashboard with real-time cohort insights",
  "Gamified skills journeys across 11 career domains",
  "Instant Study Pathway Card generation",
];

const PROBLEM_START = 1;
const SOLUTION_START = 5;
const WHO_START = 9;
const EARLY_START = 13;

// index into SECTION_OF_STEP/STAGE arrays: 0 hero, 1 problem, 2 solution, 3 who, 4 early
const SECTION_OF_STEP = [0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4];
const LAST_STEP_OF_SECTION = [0, 4, 8, 12, 16];
const SECTION_START_STEP = [
  0,
  PROBLEM_START,
  SOLUTION_START,
  WHO_START,
  EARLY_START,
];

const NAV_DOTS = [
  { label: "Hero", id: "home", step: STORY_STEPS.home },
  { label: "Problem", id: "problem", step: STORY_STEPS.problemReveal },
  { label: "Solution", id: "solution-wrap", step: STORY_STEPS.solution },
  { label: "Who", id: "who", step: STORY_STEPS.whoReveal },
  { label: "Start", id: "early-access", step: STORY_STEPS.earlyAccess },
];

const CHIPS = [
  { Icon: GraduationCapIcon, label: "Ages 14–18" },
  { Icon: BoltIcon, label: "10-min missions" },
  { Icon: TrophyIcon, label: "11 skill domains" },
];

// Solution shows 2 cards at a time instead of 1: the 4 features are grouped
// into 2 pairs, each pair rendered side by side and — like the individual
// cards elsewhere — sharing one grid cell with the other pair (see
// .story-card-stack), so the first pair lands, holds, then the second pair
// takes over as activeGroup advances.
const SOLUTION_PAIR_INDICES = [
  [0, 1],
  [2, 3],
];

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

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

function applyCrossfade(el: HTMLElement | null, diff: number, rise = 36) {
  if (!el) return;
  const absDiff = Math.abs(diff);
  const opacity =
    absDiff <= CROSSFADE_HOLD
      ? 1
      : clamp(
          1 - (absDiff - CROSSFADE_HOLD) / (CROSSFADE_SPAN - CROSSFADE_HOLD),
          0,
          1,
        );
  el.style.opacity = String(opacity);
  el.style.transform = `translateY(${-diff * rise}px)`;
  el.style.pointerEvents = absDiff < 0.5 ? "auto" : "none";
}

// Each section boundary gets its own spin "personality" instead of every
// transition looking identical — rotate direction, how much skew stands in
// for a diagonal flip, and how far it scales up from. Sign/magnitude alone
// is enough variety without reaching for real 3D transforms (which would
// fight the panel's own backdrop-blur/box-shadow rendering).
type SpinVariant = { rotate: number; skew: number; scale: number };
const SPIN_PROBLEM: SpinVariant = { rotate: -7, skew: 0, scale: 0.86 };
const SPIN_SOLUTION: SpinVariant = { rotate: 7, skew: 0, scale: 0.86 };
const SPIN_WHO: SpinVariant = { rotate: 0, skew: -8, scale: 0.88 };
const SPIN_EARLY: SpinVariant = { rotate: -4, skew: 6, scale: 0.9 };

// Section-level fade for Problem/Solution/Who: each of these is now ONE
// persistent panel (header + card stack) per section rather than one panel
// per bullet. It fades in gradually during the *previous* section's final
// step (the same timing early-access's own one-sided fade-in already uses
// below) and fades out during its OWN final step — full opacity, no fading
// at all, for every step in between. That's the fix for the header/
// description flickering in and out on every bullet: previously each bullet
// was a full separate panel with its own copy of the header, crossfading
// independently: now the header only ever fades at the section boundary.
// `spin` layers a rotate/skew/scale "square spin" onto the old plain
// translateY-only fade — it's driven by the same opacity value, so exiting
// a section spins it away as the mirror image of how it spun in, rather
// than needing a separate exit animation.
function applySectionFade(
  el: HTMLElement | null,
  stepFloat: number,
  startStep: number,
  spin: SpinVariant,
) {
  if (!el) return;
  const fadeIn = clamp(stepFloat - (startStep - 1), 0, 1);
  const fadeOut = 1 - clamp(stepFloat - (startStep + 3), 0, 1);
  const opacity = Math.min(fadeIn, fadeOut);
  const settled = 1 - opacity;
  const scale = spin.scale + opacity * (1 - spin.scale);
  el.style.opacity = String(opacity);
  el.style.pointerEvents = opacity > 0.6 ? "auto" : "none";
  el.style.transform = `translateY(${settled * 40}px) scale(${scale}) rotate(${settled * spin.rotate}deg) skewX(${settled * spin.skew}deg)`;
}

// Card "stack": all 4 bullet cards in a section occupy the same grid cell
// (see .story-card-stack in story.css) instead of separate crossfading
// panels. As `progress` (a section's activeGroup, 0-3) reaches a card's own
// index it slides/scales up into place, landing at a higher z-index than
// every earlier card — literally stacking on top of it. A card never fades
// back out on its own once it has arrived (no `1 - progress` term anywhere
// below): it just sits there at rest, covered by whichever later card is
// now on top, until the whole section itself fades away.
const STACK_ENTER_SPAN = 0.45;
const STACK_RISE = 44;

function applyStackCard(
  el: HTMLElement | null,
  progress: number,
  index: number,
) {
  if (!el) return;
  const diff = progress - index;
  const enter = clamp((diff + STACK_ENTER_SPAN) / STACK_ENTER_SPAN, 0, 1);
  el.style.opacity = String(enter);
  el.style.transform = `translateY(${(1 - enter) * STACK_RISE}px) scale(${0.95 + enter * 0.05})`;
  el.style.zIndex = String(index + 1);
  el.style.pointerEvents = enter > 0.5 ? "auto" : "none";
}

// Section color theme (via data-theme, crossfaded by CSS transition) and
// which of the 3 particles flares while a problem/solution/who bullet is
// active are the only scroll-reactive touches on the presence layer — both
// driven directly from handleUpdate below, same as every other imperative
// DOM write in this file. The shape/motion itself is StoryPresence's own
// continuous CSS, unrelated to scroll.
const SECTION_THEME: Array<"teal" | "blue" | "amber"> = [
  "teal",
  "teal",
  "blue",
  "amber",
  "teal",
];

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
            <span className="story-rail-dot-marker">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="story-rail-dot-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ScrollStory() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  const presenceRootRef = useRef<HTMLDivElement>(null);
  const presenceParticleRefs = useRef<(HTMLElement | null)[]>(
    Array(3).fill(null),
  );

  const heroPanelRef = useRef<HTMLDivElement>(null);
  const progressDotRefs = useRef<(HTMLButtonElement | null)[]>(
    Array(NAV_DOTS.length).fill(null),
  );

  // Problem/Solution/Who: one persistent panel each (header + card stack),
  // replacing the old 4-separate-panels-per-section setup.
  const problemPanelRef = useRef<HTMLDivElement>(null);
  const problemCardRefs = useRef<(HTMLDivElement | null)[]>(
    Array(4).fill(null),
  );
  const problemConnectorRefs = useRef<(HTMLDivElement | null)[]>(
    Array(3).fill(null),
  );

  const solutionPanelRef = useRef<HTMLDivElement>(null);
  const solutionPairRefs = useRef<(HTMLDivElement | null)[]>(
    Array(2).fill(null),
  );

  const whoPanelRef = useRef<HTMLDivElement>(null);
  const whoCardRefs = useRef<(HTMLDivElement | null)[]>(Array(4).fill(null));

  const earlyPanelRef = useRef<HTMLDivElement>(null);
  const earlyFillRef = useRef<HTMLDivElement | null>(null);
  const earlyDescRefs = useRef<(HTMLDivElement | null)[]>(Array(4).fill(null));
  const earlyDotRefs = useRef<(HTMLDivElement | null)[]>(Array(4).fill(null));

  const handleUpdate = useCallback((stepFloat: number) => {
    const k = clamp(Math.floor(stepFloat), 0, TOTAL_STEPS - 1);
    const section = SECTION_OF_STEP[k];
    const localT = stepFloat - k;
    const isLastStepOfSection =
      k === LAST_STEP_OF_SECTION[section] && section < 4;
    const fromStage = section;
    const toStage = isLastStepOfSection ? section + 1 : section;
    const blend = isLastStepOfSection ? localT : 0;

    const activeGroup =
      section >= 1 && section <= 3
        ? clamp(stepFloat - SECTION_START_STEP[section], 0, 3)
        : -1;

    const presenceSection = blend > 0.5 ? toStage : fromStage;
    if (presenceRootRef.current)
      presenceRootRef.current.dataset.theme = SECTION_THEME[presenceSection];
    const nearestParticle = activeGroup >= 0 ? Math.round(activeGroup) % 3 : -1;
    presenceParticleRefs.current.forEach((el, i) =>
      el?.classList.toggle("active", i === nearestParticle),
    );

    applyCrossfade(heroPanelRef.current, stepFloat - 0);

    // A section not yet reached holds its cards at their pre-entrance state
    // (progress -1); one already passed holds them fully settled (progress
    // 3, i.e. every card's own diff >= 0) — only the CURRENTLY active
    // section's cards actually track activeGroup live.
    const sectionProgress = (idx: number) =>
      section < idx ? -1 : section > idx ? 3 : activeGroup;

    const updateSection = (
      panelEl: HTMLDivElement | null,
      startStep: number,
      cardRefs: (HTMLDivElement | null)[],
      sectionIndex: number,
      spin: SpinVariant,
    ) => {
      applySectionFade(panelEl, stepFloat, startStep, spin);
      const progress = sectionProgress(sectionIndex);
      cardRefs.forEach((el, j) => applyStackCard(el, progress, j));
    };

    updateSection(
      problemPanelRef.current,
      PROBLEM_START,
      problemCardRefs.current,
      1,
      SPIN_PROBLEM,
    );
    updateSection(whoPanelRef.current, WHO_START, whoCardRefs.current, 3, SPIN_WHO);

    // Solution: 2 cards at a time — the 4 features are grouped into 2 pairs
    // (see SOLUTION_PAIR_INDICES) that stack on top of each other the same
    // way individual cards do elsewhere, just spaced 2 index-units apart
    // instead of 1 so each pair gets an even share of the section's scroll
    // range.
    applySectionFade(solutionPanelRef.current, stepFloat, SOLUTION_START, SPIN_SOLUTION);
    const solutionProgress = sectionProgress(2);
    solutionPairRefs.current.forEach((el, pairIdx) =>
      applyStackCard(el, solutionProgress, pairIdx * 2),
    );

    // Problem section: a connector line draws in after each card lands,
    // reaching full width by the time the next card finishes its own
    // entrance (applyStackCard) — so the line visibly "leads" from one
    // card into the next rather than appearing all at once.
    const problemProgress = sectionProgress(1);
    problemConnectorRefs.current.forEach((el, i) => {
      if (!el) return;
      const frac = clamp(problemProgress - i, 0, 1);
      el.style.width = `${frac * 100}%`;
    });

    const earlyEl = earlyPanelRef.current;
    if (earlyEl) {
      const earlyOpacity = clamp(stepFloat - (EARLY_START - 1), 0, 1);
      const earlySettled = 1 - earlyOpacity;
      const earlyScale = SPIN_EARLY.scale + earlyOpacity * (1 - SPIN_EARLY.scale);
      earlyEl.style.opacity = String(earlyOpacity);
      earlyEl.style.pointerEvents = earlyOpacity > 0.6 ? "auto" : "none";
      earlyEl.style.transform = `translateY(${earlySettled * 40}px) scale(${earlyScale}) rotate(${earlySettled * SPIN_EARLY.rotate}deg) skewX(${earlySettled * SPIN_EARLY.skew}deg)`;
    }
    const earlyBulletFloat = clamp(stepFloat - EARLY_START, 0, 3);
    if (earlyFillRef.current)
      earlyFillRef.current.style.height = `${(earlyBulletFloat / 3) * 100}%`;
    const earlyNearest = Math.round(earlyBulletFloat);
    for (let j = 0; j < 4; j++) {
      applyCrossfade(earlyDescRefs.current[j], earlyBulletFloat - j, 14);
      earlyDotRefs.current[j]?.classList.toggle("active", j === earlyNearest);
    }

    progressDotRefs.current.forEach((el, i) =>
      el?.classList.toggle("active", i === section),
    );
  }, []);

  const handleReducedMotion = useCallback(() => {
    setReduced(true);
  }, []);

  useStoryScroll(wrapperRef, TOTAL_STEPS, handleUpdate, handleReducedMotion);

  useEffect(() => {
    if (!reduced) return;
    // Static fallback: every panel simply visible, stacked in normal flow
    // (see story-reduced CSS, including the .story-card-stack override that
    // un-stacks the cards back into normal document flow).
    [
      heroPanelRef,
      problemPanelRef,
      solutionPanelRef,
      whoPanelRef,
      earlyPanelRef,
    ].forEach((ref) => {
      const el = ref.current;
      if (!el) return;
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.pointerEvents = "auto";
    });
    [
      ...problemCardRefs.current,
      ...solutionPairRefs.current,
      ...whoCardRefs.current,
      ...earlyDescRefs.current,
    ].forEach((el) => {
      if (!el) return;
      el.style.opacity = "1";
      el.style.transform = "none";
    });
  }, [reduced]);

  return (
    <section
      id="home"
      className={`story-root${reduced ? " story-reduced" : ""}`}
    >
      <div
        className="story-wrapper"
        ref={wrapperRef}
        style={reduced ? undefined : { height: `${TOTAL_STEPS * STEP_VH}vh` }}
      >
        <div
          id="problem"
          className="story-anchor"
          style={{ top: `${(PROBLEM_START / TOTAL_STEPS) * 100}%` }}
        />
        <div
          id="solution-wrap"
          className="story-anchor"
          style={{ top: `${(SOLUTION_START / TOTAL_STEPS) * 100}%` }}
        />
        <div
          id="who"
          className="story-anchor"
          style={{ top: `${(WHO_START / TOTAL_STEPS) * 100}%` }}
        />
        <div
          id="early-access"
          className="story-anchor"
          style={{ top: `${(EARLY_START / TOTAL_STEPS) * 100}%` }}
        />

        <div className="story-stage">
          <StoryPresence
            rootRef={(el) => {
              presenceRootRef.current = el;
            }}
            particleRefs={(el, i) => {
              presenceParticleRefs.current[i] = el;
            }}
          />
          <div className="story-grid" aria-hidden="true" />

          {!reduced && (
            <nav className="story-progress-nav" aria-label="Story progress">
              {NAV_DOTS.map((dot, i) => (
                <button
                  key={dot.id}
                  ref={(el) => {
                    progressDotRefs.current[i] = el;
                  }}
                  className={`story-progress-dot${i === 0 ? " active" : ""}`}
                  onClick={() => scrollToStoryStep(dot.step)}
                  aria-label={dot.label}
                >
                  <span className="story-progress-dot-tip">{dot.label}</span>
                </button>
              ))}
            </nav>
          )}

          {/* Step 0 — Hero: the glass card and the AppMock preview are both
              direct descendants of story-panel-hero, so they share exactly
              the same crossfade opacity (applied to the panel itself below)
              — one section, appearing and disappearing together, rather
              than the AppMock having its own separate delayed reveal. */}
          <div className="story-panel story-panel-hero" ref={heroPanelRef}>
            <div className="story-panel-inner">
              <div className="story-hero-textblock">
                
                <h1 className="story-hero-title">
                  Noor <span>AI Career &amp; Skills</span>
                  <br />
                  Companion for Schools
                </h1>
                <p className="story-hero-sub">
                  An AI-powered advisor that helps students aged 14–18 choose
                  the right subjects, discover their strengths, and build the
                  skills that actually matter for their future.
                </p>
                <div className="story-cta-row">
                  <button
                    className="btn-primary"
                    onClick={() => scrollToStoryStep(STORY_STEPS.earlyAccess)}
                  >
                    Request a free demo →
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => scrollToStoryStep(STORY_STEPS.solution)}
                  >
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
                <div className="story-badge-row">
                  <span className="story-mini-badge story-mini-badge--green">
                    <span className="story-mini-dot" />
                    Personalised pathways
                  </span>
                  <span className="story-mini-badge story-mini-badge--mint">
                    <span className="story-mini-dot" />
                    Real-time AI
                  </span>
                  <span className="story-mini-badge story-mini-badge--purple">
                    <span className="story-mini-dot" />
                    Career intelligence
                  </span>
                </div>
                <div className="story-scroll-hint">
                  <span>Scroll to explore</span>
                  <div className="story-scroll-line" />
                </div>
              </div>
            </div>

            <div className="story-hero-appmock-layout">
              <div className="story-hero-appmock">
                <div className="absolute top-[22%] -left-3 bg-[var(--glass-bg-strong)] backdrop-blur-xl border border-[var(--glass-border)] rounded-xl px-[14px] py-[9px] shadow-badge-float flex flex-col text-[11px] z-10 animate-badge-float">
                  <div className="font-bold text-[var(--text-h)] flex items-center gap-1.5 text-[12px]">
                    <FlameIcon className="w-3.5 h-3.5 text-[var(--accent-amber)] shrink-0" />{" "}
                    3-day streak
                  </div>
                  <div className="text-[9.5px] font-semibold tracking-[0.06em] uppercase text-[var(--text-light)] mt-0.5">
                    Keep going!
                  </div>
                </div>

                <div className="absolute -right-3 top-[45%] bg-[var(--text-h)] text-[var(--bg)] rounded-[10px] px-3 py-2 flex items-center gap-[7px] text-[11px] font-bold shadow-badge-float whitespace-nowrap z-10 animate-badge-float [animation-delay:-3s]">
                  <BrainIcon className="w-4 h-4 shrink-0" />
                  <div>
                    <div>AI matched</div>
                    <div className="font-medium opacity-65 text-[10px]">
                      3 career paths
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-3 -left-3 bg-[var(--glass-bg-strong)] backdrop-blur-xl border border-[var(--glass-border)] rounded-xl px-[13px] py-2 flex items-center gap-2 shadow-badge-float text-[11px] z-10 animate-badge-float [animation-delay:-1.5s]">
                  <div className="w-7 h-7 rounded-lg bg-[#fbe8c8] flex items-center justify-center">
                    <StarIcon className="w-3.5 h-3.5 text-[var(--accent-amber)]" />
                  </div>
                  <div>
                    <div className="font-bold text-[var(--text-h)] text-[13px]">
                      120 pts
                    </div>
                    <div className="text-[9.5px] font-semibold tracking-[0.06em] uppercase text-[var(--text-light)]">
                      This week
                    </div>
                  </div>
                </div>

                <AppMock />
              </div>
            </div>
          </div>

          {/* Steps 1-4 — Problem: one persistent panel; header holds steady
              (see applySectionFade) while the 4 cards land side by side,
              each with a connector line leading into the next, as
              activeGroup advances (see applyStackCard / .story-card-stack). */}
          <div className="story-panel" ref={problemPanelRef}>
            <div className="story-panel-inner">
              <div className="story-header">
                <span className="story-eyebrow">The Problem</span>
                <h2 className="story-title">
                  Subject choice is{" "}
                  <span className="story-title-highlight">broken</span> — and
                  schools know it.
                </h2>
                <p className="story-sub">
                  Students make life-defining decisions with one meeting, a PDF
                  booklet, and a guess.
                </p>
              </div>
              <div className="story-card-stack story-problem-stack">
                {PROBLEM_ITEMS.map((item, i) => (
                  <Fragment key={item.label}>
                    {i > 0 && (
                      <div className="story-problem-connector">
                        <div
                          className="story-problem-connector-fill"
                          ref={(el) => {
                            problemConnectorRefs.current[i - 1] = el;
                          }}
                        />
                      </div>
                    )}
                    <div
                      className="story-card problem-card"
                      ref={(el) => {
                        problemCardRefs.current[i] = el;
                      }}
                    >
                      <div
                        className="story-card-index"
                        style={{
                          color:
                            item.tilt === "l"
                              ? "rgba(15,168,143,0.14)"
                              : "rgba(58,159,192,0.16)",
                        }}
                      >
                        0{i + 1}
                      </div>
                      <div
                        className="story-card-badge"
                        style={{
                          background:
                            item.tilt === "l"
                              ? "rgba(15,168,143,0.1)"
                              : "rgba(58,159,192,0.12)",
                          color: item.color,
                        }}
                      >
                        <item.Icon
                          className="w-3.5 h-3.5"
                          style={{ color: item.color }}
                        />
                        {item.label}
                      </div>
                      <h3 className="story-card-title">{item.title}</h3>
                      <p className="story-card-desc">{item.desc}</p>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Steps 5-8 — Solution: one persistent panel; the 4 feature cards
              are grouped into 2 pairs (see SOLUTION_PAIR_INDICES) that stack
              on top of each other as activeGroup advances (see
              applyStackCard / .story-card-stack) — 2 cards visible at a
              time instead of 1. */}
          <div className="story-panel" ref={solutionPanelRef}>
            <div className="story-panel-inner">
              <div className="story-header">
                <span className="story-eyebrow">Our Solution</span>
                <h2 className="story-title">
                  Your school's AI guidance{" "}
                  <span className="story-title-highlight">companion</span>
                </h2>
                <p className="story-sub">Noor means 'light' in Arabic.</p>
              </div>
              <div className="story-card-stack">
                {SOLUTION_PAIR_INDICES.map((pairIdxs, pairIdx) => (
                  <div
                    className="story-solution-pair"
                    key={`solution-pair-${pairIdx}`}
                    ref={(el) => {
                      solutionPairRefs.current[pairIdx] = el;
                    }}
                  >
                    {pairIdxs.map((i) => {
                      const f = SOLUTION_FEATURES[i];
                      return (
                        <div
                          className="story-card story-card--split"
                          key={`solution-${f.num}`}
                        >
                          <div>
                            <div className="story-feature-num">{f.num}</div>
                            <h3 className="story-card-title">{f.title}</h3>
                            <p className="story-card-desc">{f.desc}</p>
                            <p className="story-card-more">{f.more}</p>
                          </div>
                          <div className="story-solution-visual">
                            <SolutionVisual index={i} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Steps 9-12 — Who */}
          <div className="story-panel" ref={whoPanelRef}>
            <div className="story-panel-inner">
              <div className="story-header">
                <span className="story-eyebrow">Who It's For</span>
                <h2 className="story-title">
                  Designed for{" "}
                  <span className="story-title-highlight">everyone</span> in the
                  school ecosystem
                </h2>
                <p className="story-sub">
                  Whether you're a student, parent, counsellor, or leader.
                </p>
              </div>
              <div className="story-card-stack story-who-stack">
                {WHO_CARDS.map((card, i) => (
                  <div
                    className="story-card story-who-card"
                    key={`who-${card.role}`}
                    ref={(el) => {
                      whoCardRefs.current[i] = el;
                    }}
                  >
                    <div
                      className="story-who-icon"
                      style={{
                        background: `${card.accent}15`,
                        borderColor: `${card.accent}30`,
                      }}
                    >
                      <card.Icon
                        className="w-7 h-7"
                        style={{ color: card.accent }}
                      />
                    </div>
                    <div
                      className="story-card-badge"
                      style={{
                        color: card.accent,
                        background: `${card.accent}12`,
                      }}
                    >
                      {card.role}
                    </div>
                    <h3 className="story-card-title">{card.subtitle}</h3>
                    <p className="story-card-desc">{card.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Steps 13-16 — Early access (single persistent panel).
              Static two-column layout (not the rail/stacked-desc pattern
              the other sections use) to match the original marketing
              design: badge + serif headline + copy + checklist on the
              left, the glass request-a-demo card on the right. */}
          <div className="story-panel story-panel-early" ref={earlyPanelRef}>
            <div className="story-panel-inner">
              <div className="story-columns story-columns--early">
                <div className="story-early-left">
                  <span className="story-eyebrow">
                    <span aria-hidden="true">✦</span> Limited Early Access
                  </span>
                  <h2 className="story-early-title">
                    Ready to bring{" "}
                    <span className="story-title-highlight story-early-title-accent">
                      Noor
                    </span>{" "}
                    to your school?
                  </h2>
                  <p className="story-early-sub">
                    We're running free Demos with selected schools right now. Be
                    among the first to see Noor in action — no commitment
                    required.
                  </p>
                  <div className="story-early-checklist">
                    {EARLY_ACCESS_CHECKLIST.map((item) => (
                      <div className="story-early-check-item" key={item}>
                        <span className="story-early-check-icon">
                          <CheckIcon className="w-3 h-3" />
                        </span>
                        <span>{item}</span>
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
