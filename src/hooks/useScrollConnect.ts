import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Drives the single pinned "story" experience: scrubs a tall wrapper (sized
 * `totalSteps` viewport-heights by the caller) and reports scroll position as
 * a continuous `stepFloat` (0 = top of step 0, 1.5 = halfway through step 1,
 * etc.) via a plain callback — never React state, so scrolling never
 * triggers a re-render. The caller writes stepFloat straight into DOM/ref
 * state itself, same pattern as usePinnedReveal/useScrubReveal above.
 *
 * Respects prefers-reduced-motion by skipping the scrub entirely and calling
 * onReducedMotion once instead — the caller is expected to render a normal,
 * non-scroll-jacked fallback in that case.
 */
export function useStoryScroll(
  wrapperRef: RefObject<HTMLElement | null>,
  totalSteps: number,
  onUpdate: (stepFloat: number) => void,
  onReducedMotion: () => void
) {
  const updateRef = useRef(onUpdate);
  updateRef.current = onUpdate;
  const reducedRef = useRef(onReducedMotion);
  reducedRef.current = onReducedMotion;

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reducedRef.current();
      return;
    }

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => updateRef.current(self.progress * totalSteps),
      });
      return () => trigger.kill();
    }, wrapperRef);

    return () => ctx.revert();
  }, [wrapperRef, totalSteps]);
}

/**
 * Every pin/scrub trigger below caches its start/end as pixel offsets at
 * creation time. That cache goes stale whenever something changes layout
 * height *after* a trigger was created without GSAP knowing — e.g. a
 * React.lazy() section (like the 3D hero) mounting later and inserting a
 * pin-spacer well after sections below it already measured their positions
 * against a shorter page, or a web font swapping in and reflowing text.
 * GSAP's own autoRefreshEvents (resize/load/visibilitychange) don't cover
 * either case, so this watches real document height and web-font loading
 * directly and re-syncs every existing ScrollTrigger when either fires.
 * Mount once, at the app root.
 */
export function useScrollTriggerAutoRefresh() {
  useEffect(() => {
    let frame = 0;
    const refresh = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const observer = new ResizeObserver(refresh);
    observer.observe(document.body);

    document.fonts?.ready?.then(refresh);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);
}

/**
 * Pins a section for `pinVh` of extra scroll: it morphs in from below,
 * holds fully visible, then morphs back out as the next section takes over.
 * Only safe for sections that fit comfortably within one viewport — pinning
 * taller content would freeze the scroll while clipping whatever doesn't fit.
 */
export function usePinnedReveal(ref: RefObject<HTMLElement | null>, pinVh = 60) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 0, y: 70, scale: 0.94 });

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: `+=${pinVh}%`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          const enter = gsap.utils.clamp(0, 1, p / 0.3);
          const exit = gsap.utils.clamp(0, 1, (p - 0.72) / 0.28);
          gsap.set(el, {
            opacity: enter * (1 - exit),
            y: (1 - enter) * 70 - exit * 40,
            scale: 0.94 + enter * 0.06 - exit * 0.05,
          });
        },
      });

      return () => trigger.kill();
    }, ref);

    return () => ctx.revert();
  }, [ref, pinVh]);
}

/**
 * Scrub-linked fade/rise/scale for sections too tall to pin without clipping
 * content — keeps the same morph language as the pinned sections (matching
 * timing/easing) without ever freezing the scroll.
 */
export function useScrubReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 0, y: 70, scale: 0.97 });

      gsap.to(el, {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top 90%", end: "top 35%", scrub: 1 },
      });

      // Fades fully to 0 (not a residual value) and finishes well before the
      // element's bottom actually reaches the viewport edge. A following
      // section can be a hard pin (usePinnedReveal), which freezes at
      // "top top" independent of this element's own exit timing — any
      // leftover opacity here would show through as ghosting during that
      // handoff, so this needs to be fully invisible with margin to spare,
      // not just mostly faded.
      gsap.to(el, {
        opacity: 0,
        y: -40,
        scale: 0.98,
        ease: "none",
        scrollTrigger: { trigger: el, start: "bottom 85%", end: "bottom 25%", scrub: 1 },
      });
    }, ref);

    return () => ctx.revert();
  }, [ref]);
}
