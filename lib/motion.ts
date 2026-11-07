/** Shared motion constants. Every tween on the site draws from these. */

export const DUR = { xs: 0.2, sm: 0.45, md: 0.8, lg: 1.1, xl: 1.6 } as const;

export const EASE = {
  out: "expo.out",
  inOut: "power2.inOut",
  /** Same curve as --ease-out-expo, for framer-motion. */
  bezier: [0.16, 1, 0.3, 1] as [number, number, number, number],
} as const;

export const STAGGER = { tight: 0.06, base: 0.1, loose: 0.16 } as const;

export const DIST = { reveal: 28 } as const;

export const START = { reveal: "top 85%", clip: "top 82%" } as const;

/**
 * gsap.matchMedia conditions. All three are always registered together: a
 * lone condition never fires its callback when it doesn't match, which once
 * silently killed every mobile animation on this site.
 */
export const MQ = {
  desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 767.98px) and (prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
} as const;

export type MotionConditions = { desktop: boolean; mobile: boolean; reduce: boolean };
