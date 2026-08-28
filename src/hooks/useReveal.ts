import { useEffect, useRef, useState } from "react";

/**
 * One-shot fade/rise-in reveal for the mobile stacked layout: cheap
 * IntersectionObserver-based equivalent of what ScrollStory's scroll-jacked
 * panels get from applySectionFade/applyStackCard — normal-flow sections
 * have no scroll-driven step math to hang an entrance off, so this instead
 * flips `visible` once when the element crosses into the viewport (and
 * never back), which callers turn into an opacity/translate transition.
 * Respects prefers-reduced-motion by starting (and staying) visible.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}
