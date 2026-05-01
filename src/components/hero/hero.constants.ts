// ─── Breakpoints ─────────────────────────────────────────────────────────────
export const BREAKPOINTS = {
  mobile: 1048,
  compact: 1200,
  wide: 1344,
} as const;

// ─── Animation timing ─────────────────────────────────────────────────────────
export const ANIMATION = {
  /** Wheel delta divisor — controls how fast the split reveal progresses */
  scrollSpeed: 500,
  /** Touch delta divisor — slightly faster on touch to feel responsive */
  touchSpeed: 300,
  /** Duration (ms) for the programmatic splitAndGo animation */
  duration: 700,
  /** Delay (ms) before scrollTo fires after the split completes */
  revealDelay: 150,
} as const;

// ─── Shared content data ──────────────────────────────────────────────────────
export const CHIPS = [
  { icon: "🎓", text: "Ages 14–18" },
  { icon: "⚡", text: "10-min missions" },
  { icon: "🏆", text: "11 skill domains" },
] as const;

export const TRUST_ITEMS = [
  { label: "Personalised pathways", color: "#4FD1C5" },
  { label: "Real-time AI", color: "#1D9E75" },
  { label: "Career intelligence", color: "#2B43BD" },
] as const;

// ─── Shared prop types ────────────────────────────────────────────────────────
export type HeroBaseProps = {
  compact?: boolean;
};

export type HeroVariantProps = HeroBaseProps & {
  /** true when rendered inside the mobile layout */
  mobile?: boolean;
};
