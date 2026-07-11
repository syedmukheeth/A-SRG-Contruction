"use client";

import { cn } from "@/lib/utils";

/**
 * Luxury-villa architectural elevation, drawn as a blueprint.
 * Strokes tagged data-draw self-draw on scroll; data-glow elements
 * light up once the structure is complete. Purely presentational,
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
      <defs>
        <filter id="villaGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="villaAmbient" cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.16" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ambient ground glow */}
      <ellipse
        data-glow
        cx="420"
        cy="360"
        rx="360"
        ry="180"
        fill="url(#villaAmbient)"
        stroke="none"
        opacity="0"
      />

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
      <line data-draw x1="250" y1="150" x2="250" y2="178" strokeWidth={0.6} />
      <path data-draw d="M340 150 H440 V178 H340 Z" />
      <line data-draw x1="390" y1="150" x2="390" y2="178" strokeWidth={0.6} />

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

      {/* glow surfaces, windows light up at completion */}
      <g fill="currentColor" stroke="none" filter="url(#villaGlow)">
        <rect data-glow x="200" y="150" width="100" height="28" rx="2" opacity="0" />
        <rect data-glow x="340" y="150" width="100" height="28" rx="2" opacity="0" />
        <rect data-glow x="410" y="250" width="90" height="80" rx="2" opacity="0" />
        <rect data-glow x="545" y="280" width="135" height="130" rx="2" opacity="0" />
      </g>
    </svg>
  );
}
