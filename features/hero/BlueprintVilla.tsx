"use client";

import { cn } from "@/lib/utils";

/**
 * Luxury-villa architectural elevation, drawn as a blueprint.
 * Strokes tagged data-draw self-draw on scroll; data-glow elements
 * light up once the structure is complete. Purely presentational —
 * animation is orchestrated by the parent Hero.
 */
export function BlueprintVilla({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 500"
      className={cn("text-copper", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.1}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* ground */}
      <line data-draw x1="20" y1="430" x2="780" y2="430" strokeWidth={1.4} />

      {/* main two-storey volume */}
      <path data-draw d="M150 430 V190 H520 V430" />
      {/* upper setback / parapet */}
      <path data-draw d="M180 190 V120 H470 V190" />
      {/* flat roof slab lines */}
      <line data-draw x1="170" y1="120" x2="480" y2="120" />
      <line data-draw x1="140" y1="190" x2="530" y2="190" />

      {/* right glass wing */}
      <path data-draw d="M520 430 V250 H700 V430" />
      <line data-draw x1="520" y1="250" x2="700" y2="250" />

      {/* columns (portico) */}
      <line data-draw x1="200" y1="300" x2="200" y2="430" strokeWidth={1.4} />
      <line data-draw x1="250" y1="300" x2="250" y2="430" strokeWidth={1.4} />
      <line data-draw x1="200" y1="300" x2="250" y2="300" />

      {/* entrance door */}
      <path data-draw d="M310 430 V330 H370 V430" />
      <line data-draw x1="340" y1="330" x2="340" y2="430" />

      {/* upper windows (storey 2) */}
      <path data-draw d="M200 150 H300 V178 H200 Z" />
      <path data-draw d="M340 150 H440 V178 H340 Z" />

      {/* ground-floor picture windows */}
      <path data-draw d="M410 250 H500 V330 H410 Z" />
      <line data-draw x1="455" y1="250" x2="455" y2="330" />

      {/* glass-wing curtain wall */}
      <path data-draw d="M545 280 H680 V410 H545 Z" />
      <line data-draw x1="590" y1="280" x2="590" y2="410" />
      <line data-draw x1="635" y1="280" x2="635" y2="410" />
      <line data-draw x1="545" y1="345" x2="680" y2="345" />

      {/* simple trees / landscape marks */}
      <path data-draw d="M745 430 V360" />
      <circle data-draw cx="745" cy="345" r="22" />
      <path data-draw d="M95 430 V375" />
      <circle data-draw cx="95" cy="360" r="18" />

      {/* dimension annotations (lighter) */}
      <g stroke="currentColor" strokeWidth={0.6} opacity={0.55}>
        <line data-draw x1="150" y1="95" x2="520" y2="95" />
        <line data-draw x1="150" y1="88" x2="150" y2="102" />
        <line data-draw x1="520" y1="88" x2="520" y2="102" />
        <line data-draw x1="60" y1="190" x2="60" y2="430" />
        <line data-draw x1="53" y1="190" x2="67" y2="190" />
        <line data-draw x1="53" y1="430" x2="67" y2="430" />
      </g>

      {/* glow surfaces — windows light up at completion */}
      <g fill="currentColor" stroke="none">
        <rect data-glow x="200" y="150" width="100" height="28" opacity="0" />
        <rect data-glow x="340" y="150" width="100" height="28" opacity="0" />
        <rect data-glow x="410" y="250" width="90" height="80" opacity="0" />
        <rect data-glow x="545" y="280" width="135" height="130" opacity="0" />
      </g>
    </svg>
  );
}
