import { useRef, useState, useEffect } from "react";
import { scrollTo } from "@/lib/motion";
import { BREAKPOINTS, ANIMATION } from "./hero.constants";

export interface HeroScrollState {
  progress: number;
  isMobile: boolean;
  isCompact: boolean;
  mockScale: number;
}

export function useHeroScroll(): HeroScrollState {
  const [progress, setProgress] = useState(0);
  const [screenWidth, setScreenWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  // Refs so event handlers always read current values without stale closures
  const progressRef = useRef(0);
  const doneRef = useRef(false);
  const touchYRef = useRef(0);
  const isMobileRef = useRef(
    typeof window !== "undefined"
      ? window.innerWidth < BREAKPOINTS.mobile
      : false
  );

  // Track screen width for responsive derivations
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setScreenWidth(w);
      isMobileRef.current = w < BREAKPOINTS.mobile;
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Wheel + touch scroll handling for the split-reveal animation.
  // preventDefault is intentional — we hijack scroll only while the
  // hero is revealing (progress < 1 && !doneRef). Once done, scroll
  // is released so the rest of the page scrolls normally.
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (doneRef.current || isMobileRef.current) return;
      e.preventDefault();

      // Normalise delta across deltaMode values
      const delta =
        e.deltaMode === 1
          ? e.deltaY * 40
          : e.deltaMode === 2
            ? e.deltaY * 600
            : e.deltaY;

      const next = Math.max(
        0,
        Math.min(1, progressRef.current + delta / ANIMATION.scrollSpeed)
      );
      progressRef.current = next;
      setProgress(next);
      if (next >= 1) doneRef.current = true;
    };

    const onTouchStart = (e: TouchEvent) => {
      touchYRef.current = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (doneRef.current || isMobileRef.current) return;
      e.preventDefault();

      const dy = touchYRef.current - e.touches[0].clientY;
      touchYRef.current = e.touches[0].clientY;

      const next = Math.max(
        0,
        Math.min(1, progressRef.current + dy / ANIMATION.touchSpeed)
      );
      progressRef.current = next;
      setProgress(next);
      if (next >= 1) doneRef.current = true;
    };

    // Re-enable the reveal when the user scrolls back to the very top
    const onScroll = () => {
      if (doneRef.current && window.scrollY === 0) {
        doneRef.current = false;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Custom event fired by CTA buttons to trigger an animated split then scroll
  useEffect(() => {
    const onSplitAndGo = (e: Event) => {
      const targetId = (e as CustomEvent<string>).detail;

      // Skip animation if already done or on mobile
      if (doneRef.current || isMobileRef.current) {
        scrollTo(targetId);
        return;
      }

      const startTime = performance.now();
      const startProg = progressRef.current;

      const frame = (now: number) => {
        const t = Math.min((now - startTime) / ANIMATION.duration, 1);
        const eased = 1 - Math.pow(1 - t, 3); // cubic ease-out
        const next = startProg + (1 - startProg) * eased;
        progressRef.current = next;
        setProgress(next);

        if (t < 1) {
          requestAnimationFrame(frame);
        } else {
          progressRef.current = 1;
          doneRef.current = true;
          setProgress(1);
          setTimeout(() => scrollTo(targetId), ANIMATION.revealDelay);
        }
      };

      requestAnimationFrame(frame);
    };

    window.addEventListener("noor:splitAndGo", onSplitAndGo);
    return () => window.removeEventListener("noor:splitAndGo", onSplitAndGo);
  }, []);

  const isMobile = screenWidth < BREAKPOINTS.mobile;
  const isCompact = screenWidth < BREAKPOINTS.compact;

  // Scale the app mockup proportionally between compact and wide breakpoints
  const mockScale =
    screenWidth >= BREAKPOINTS.wide
      ? 1
      : Math.max(
          0.62,
          0.62 +
            ((screenWidth - BREAKPOINTS.mobile) /
              (BREAKPOINTS.wide - BREAKPOINTS.mobile)) *
              0.38
        );

  return { progress, isMobile, isCompact, mockScale };
}
