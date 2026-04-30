import type { Variants } from "framer-motion";

export const EASE_SPRING = [0.25, 0.46, 0.45, 0.94] as const;
export const EASE_OUT = [0, 0, 0.2, 1] as const;

export const borderFill: Variants = {
  hover: { scaleX: 1, opacity: 1, transition: { duration: 0.3, ease: EASE_OUT } },
};

export function makeCardVariants(color: string): Variants {
  return {
    hover: {
      boxShadow: `0 8px 32px ${color}28`,
      transition: { duration: 0.25, ease: EASE_OUT },
    },
  };
}

export const stagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_SPRING },
  },
};

export function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}
