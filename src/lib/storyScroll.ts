// Shared with Nav.tsx and ScrollStory.tsx: the pinned story experience maps
// scroll position to a "stepFloat" via GSAP ScrollTrigger's "top top" ->
// "bottom bottom" range, which spans (wrapper height - viewport height) —
// NOT the wrapper's full height. A jump target positioned by simple
// `top: (step/totalSteps)*100%` (a fraction of the *full* wrapper height)
// therefore lands at a different stepFloat than intended, and the gap grows
// with viewport height and how deep into the steps the target sits. This
// computes the exact scrollY for a given step from live layout instead, so
// every jump — nav links, hero CTA, progress dots — lands exactly where it
// means to regardless of viewport size.
export const STORY_TOTAL_STEPS = 17; // 1 hero + 4 problem + 4 solution + 4 who + 4 early-access

// Section content (which cards are visible, which theme is active) is keyed
// off Math.floor(stepFloat), so landing exactly ON an integer step boundary
// is fragile: a sub-pixel scroll rounding error can put the browser a
// fraction of a step short (observed: landing at 4.9996 instead of 5),
// which floors to the *previous* section and renders nothing. +0.05 is far
// too small to be visible (entrance thresholds already saturate right at
// the boundary) but guarantees landing on the correct side of it.
export const STORY_STEPS = {
  home: 0,
  problem: 1 + 0.05,
  solution: 5 + 0.05,
  who: 9 + 0.05,
  // Problem's and Who's 4 cards each stagger in one at a time across their
  // own 4 steps; landing at a section's very first step shows only the
  // first card with the rest still waiting on further scroll. +2.98 sits a
  // hair before the section's own last step — where the last card finishes
  // entering AND the section's own fade-out begins — so the jump lands with
  // all 4 cards already settled while the section is still fully opaque.
  problemReveal: 1 + 2.98,
  whoReveal: 9 + 2.98,
  earlyAccess: 13,
} as const;

export function scrollToStoryStep(step: number) {
  const wrapper = document.querySelector<HTMLElement>(".story-wrapper");
  if (!wrapper) return;
  const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
  const range = wrapper.offsetHeight - window.innerHeight;
  const target = wrapperTop + (step / STORY_TOTAL_STEPS) * range;
  window.scrollTo({ top: Math.max(target, 0), behavior: "smooth" });
}

// Below the 1024px breakpoint, ScrollStory doesn't mount at all — the
// mobile layout is a normal stacked page instead (see App.tsx), so there's
// no .story-wrapper to compute a step against. Nav/CTA click handlers don't
// know which layout is live, so this checks and picks the right strategy:
// the precise step-based jump on desktop, or a plain anchor scrollIntoView
// (matching ids each mobile section sets on its own root element) on
// mobile, where scroll-jacking imprecision was never a concern to begin
// with.
export function scrollToSection(id: string, step: number) {
  const wrapper = document.querySelector<HTMLElement>(".story-wrapper");
  if (wrapper) {
    scrollToStoryStep(step);
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
