import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { MARK_SIZE, MARK_STROKE, markPaths, plumbPaths } from "@/lib/brand/mark";

interface MarkProps {
  className?: string;
  /** Plumb bob under the lintel. Drop it below ~24px. */
  detail?: boolean;
  /** CSS stroke draw-on, once, on first paint. */
  draw?: boolean;
  title?: string;
}

export function Mark({ className, detail = true, draw, title }: MarkProps) {
  return (
    <svg
      viewBox={`0 0 ${MARK_SIZE} ${MARK_SIZE}`}
      className={cn("shrink-0 overflow-visible", draw && "logo-draw", className)}
      {...(title ? { role: "img", "aria-label": title } : { "aria-hidden": true })}
    >
      {title && <title>{title}</title>}
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={MARK_STROKE}
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit={4}
      >
        <path d={markPaths.plinth} pathLength={1} />
        <path d={markPaths.columns} pathLength={1} />
        <path d={markPaths.lintel} pathLength={1} />
      </g>
      {detail && (
        <g className="logo-plumb">
          <path d={plumbPaths.line} fill="none" stroke="currentColor" strokeWidth={1.4} />
          <path d={plumbPaths.bob} fill="currentColor" />
        </g>
      )}
    </svg>
  );
}

interface LogoProps {
  className?: string;
  /** Colour of the mark only; the wordmark follows currentColor. */
  markClassName?: string;
  /** Second line under ASRG. */
  sub?: string;
}

/** Mark + stacked wordmark. Live text, so it is the accessible name of its link. */
export function Logo({ className, markClassName, sub = "Construction" }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Mark className={cn("h-9 w-9", markClassName)} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.7rem] leading-[0.8] tracking-[0.01em]">ASRG</span>
        <span className="mt-1 font-mono text-[0.58rem] uppercase leading-none tracking-[0.32em]">{sub}</span>
      </span>
    </span>
  );
}

/** Round seal: mark inside a ring of mono type. Decorative, browser-rendered only. */
export function Seal({ className, id = "asrg-seal" }: { className?: string; id?: string }) {
  const ring = `${site.name} · ${site.location.city} · Est. ${site.established} · `;
  return (
    <svg viewBox="0 0 120 120" aria-hidden className={cn("shrink-0", className)}>
      <defs>
        <path id={`${id}-ring`} d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
      </defs>
      <circle cx="60" cy="60" r="58" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <circle cx="60" cy="60" r="34" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <text
        fill="currentColor"
        style={{ fontFamily: "var(--font-plex-mono), monospace", fontSize: "8.4px", letterSpacing: "0.22em" }}
      >
        <textPath href={`#${id}-ring`} textLength={272} lengthAdjust="spacing">
          {ring.toUpperCase()}
        </textPath>
      </text>
      <g transform="translate(42 40) scale(0.75)">
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth={MARK_STROKE}
          strokeLinecap="butt"
          strokeLinejoin="miter"
        >
          <path d={markPaths.plinth} />
          <path d={markPaths.columns} />
          <path d={markPaths.lintel} />
        </g>
        <path d={plumbPaths.line} fill="none" stroke="currentColor" strokeWidth={1.4} />
        <path d={plumbPaths.bob} fill="currentColor" />
      </g>
    </svg>
  );
}
