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
 * state itself.
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
