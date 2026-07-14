"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";

/**
 * Layered villa elevation for the build story. Each <g data-layer="...">
 * is revealed beat-by-beat by the parent Journey timeline:
 * blueprint → foundation → steel → walls → roof → glass → finish.
 * Purely presentational. Memoized: the parent re-renders on every beat
 * change and this SVG subtree must not be reconciled each time.
 */
export const BuildingVilla = memo(function BuildingVilla({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 1000 600"
      className={cn("w-full", className)}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* ground */}
      <line x1="40" y1="470" x2="960" y2="470" stroke="#2a2d33" strokeWidth={2} />

      {/* 0, blueprint wireframe (thin copper, self-draws) */}
      <g data-layer="blueprint" stroke="#c7853e" strokeOpacity={0.4} strokeWidth={1.1}>
        <path data-draw d="M320 470 V200 H620 V470" />
        <path data-draw d="M350 200 V150 H590 V200" />
        <path data-draw d="M620 470 V300 H820 V470" />
        <line data-draw x1="320" y1="300" x2="620" y2="300" />
        <line data-draw x1="620" y1="330" x2="820" y2="330" />
        <path data-draw d="M460 470 V395 H520 V470" />
      </g>

      {/* 1, foundation */}
      <g data-layer="foundation">
        <rect x="300" y="458" width="540" height="16" fill="#15171b" stroke="#2c2f36" />
        <rect x="330" y="470" width="24" height="20" fill="#101216" />
        <rect x="586" y="470" width="24" height="20" fill="#101216" />
        <rect x="780" y="470" width="24" height="20" fill="#101216" />
      </g>

      {/* 2, steel structure */}
      <g data-layer="steel" stroke="#c7853e" strokeWidth={3}>
        <line x1="340" y1="458" x2="340" y2="200" />
        <line x1="600" y1="458" x2="600" y2="200" />
        <line x1="470" y1="458" x2="470" y2="200" />
        <line x1="660" y1="458" x2="660" y2="300" />
        <line x1="800" y1="458" x2="800" y2="300" />
        <line x1="330" y1="300" x2="610" y2="300" />
        <line x1="330" y1="200" x2="610" y2="200" />
        <line x1="650" y1="300" x2="810" y2="300" />
      </g>

      {/* 3, walls */}
      <g data-layer="walls">
        <rect x="320" y="200" width="300" height="270" fill="#1b1d22" stroke="#2c2f36" />
        <rect x="350" y="150" width="240" height="50" fill="#1b1d22" stroke="#2c2f36" />
        <rect x="620" y="300" width="200" height="170" fill="#191b20" stroke="#2c2f36" />
        <g stroke="#ffffff" strokeOpacity={0.04}>
          <line x1="320" y1="245" x2="620" y2="245" />
          <line x1="320" y1="290" x2="620" y2="290" />
          <line x1="320" y1="335" x2="620" y2="335" />
          <line x1="320" y1="380" x2="620" y2="380" />
          <line x1="320" y1="425" x2="620" y2="425" />
          <line x1="620" y1="345" x2="820" y2="345" />
          <line x1="620" y1="390" x2="820" y2="390" />
          <line x1="620" y1="435" x2="820" y2="435" />
        </g>
      </g>

      {/* 4, roof / parapet */}
      <g data-layer="roof">
        <rect x="338" y="138" width="264" height="16" fill="#101216" stroke="#2c2f36" />
        <rect x="308" y="190" width="324" height="14" fill="#101216" stroke="#2c2f36" />
        <rect x="612" y="292" width="216" height="12" fill="#101216" stroke="#2c2f36" />
      </g>

      {/* 5, glass / windows */}
      <g data-layer="glass">
        <rect x="375" y="158" width="80" height="30" fill="#0d0f13" stroke="#3a3d44" />
        <rect x="485" y="158" width="80" height="30" fill="#0d0f13" stroke="#3a3d44" />
        <rect x="360" y="230" width="120" height="120" fill="#0d0f13" stroke="#3a3d44" />
        <line x1="420" y1="230" x2="420" y2="350" stroke="#3a3d44" />
        <line x1="360" y1="290" x2="480" y2="290" stroke="#3a3d44" />
        <rect x="650" y="330" width="140" height="110" fill="#0d0f13" stroke="#3a3d44" />
        <line x1="697" y1="330" x2="697" y2="440" stroke="#3a3d44" />
        <line x1="744" y1="330" x2="744" y2="440" stroke="#3a3d44" />
        <rect x="460" y="395" width="60" height="75" fill="#0d0f13" stroke="#3a3d44" />
      </g>

      {/* 6, finish: warm light + landscape */}
      <g data-layer="finish">
        <g fill="#f3c98b">
          <rect x="375" y="158" width="80" height="30" opacity={0.85} />
          <rect x="485" y="158" width="80" height="30" opacity={0.85} />
          <rect x="360" y="230" width="120" height="120" opacity={0.7} />
          <rect x="650" y="330" width="140" height="110" opacity={0.75} />
          <rect x="460" y="395" width="60" height="75" opacity={0.9} />
        </g>
        <g stroke="#6f7a6a" strokeWidth={2}>
          <line x1="230" y1="470" x2="230" y2="400" />
          <circle cx="230" cy="385" r="26" fill="#11160f" />
          <line x1="880" y1="470" x2="880" y2="410" />
          <circle cx="880" cy="396" r="22" fill="#11160f" />
        </g>
        <ellipse cx="560" cy="470" rx="380" ry="40" fill="#c7853e" opacity={0.07} />
      </g>
    </svg>
  );
});
