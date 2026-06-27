import { site } from "@/lib/site";

// Deterministic star field (avoids hydration mismatch).
const STARS = [
  [8, 18], [16, 9], [24, 26], [33, 14], [41, 30], [52, 8], [61, 22],
  [69, 12], [77, 28], [85, 16], [92, 24], [12, 34], [38, 6], [74, 6],
  [88, 36], [4, 27], [47, 19], [57, 33],
] as const;

const WINDOWS = [
  { x: 120, y: 250, w: 34, h: 30 },
  { x: 168, y: 250, w: 34, h: 30 },
  { x: 120, y: 200, w: 34, h: 26 },
  { x: 168, y: 200, w: 34, h: 26 },
  { x: 320, y: 270, w: 40, h: 44 },
  { x: 372, y: 270, w: 40, h: 44 },
  { x: 250, y: 300, w: 28, h: 50 }, // door
] as const;

/** Peaceful nighttime villa, lights glowing — the premium ending. */
export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-gradient-to-b from-ink to-[#06080d]">
      {/* stars */}
      <div className="absolute inset-x-0 top-0 h-1/2">
        {STARS.map(([left, top], i) => (
          <span
            key={i}
            className="absolute h-px w-px rounded-full bg-text/70"
            style={{ left: `${left}%`, top: `${top}%` }}
          />
        ))}
      </div>

      {/* villa silhouette */}
      <svg
        viewBox="0 0 560 360"
        className="relative mx-auto block w-full max-w-[1100px]"
        fill="none"
      >
        {/* glow */}
        <ellipse cx="280" cy="360" rx="320" ry="120" fill="#c7853e" opacity="0.06" />
        {/* ground */}
        <line x1="0" y1="360" x2="560" y2="360" stroke="#1e1e1e" strokeWidth="2" />
        {/* villa mass */}
        <path
          d="M90 360 V180 H230 V120 H360 V200 H470 V360 Z"
          fill="#0b0d12"
          stroke="#1b1f27"
          strokeWidth="1.5"
        />
        <path d="M70 184 L160 120 L250 184" fill="#0b0d12" stroke="#1b1f27" strokeWidth="1.5" />
        {/* glowing windows */}
        <g>
          {WINDOWS.map((w, i) => (
            <rect
              key={i}
              x={w.x}
              y={w.y}
              width={w.w}
              height={w.h}
              rx="2"
              fill="#f3c98b"
              className="footer-window"
              style={{ animationDelay: `${i * 0.4}s` }}
            />
          ))}
        </g>
      </svg>

      {/* nav + legal */}
      <div className="relative mx-auto flex max-w-[1300px] flex-col gap-10 px-6 pb-14 pt-10 md:flex-row md:items-end md:justify-between md:px-12">
        <div>
          <p className="font-display text-2xl font-bold uppercase text-text">
            {site.name}
            <span className="text-copper">.</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted">{site.tagline}</p>
        </div>
        <div className="flex gap-12 font-mono text-xs uppercase tracking-[0.18em] text-muted">
          <a href="#projects" className="transition-colors hover:text-copper">Work</a>
          <a href="#process" className="transition-colors hover:text-copper">Process</a>
          <a href="#contact" className="transition-colors hover:text-copper">Contact</a>
        </div>
      </div>
      <div className="relative border-t border-text/10 px-6 py-6 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted/60 md:px-12">
        © {new Date().getFullYear()} {site.name} · {site.location.city},{" "}
        {site.location.region} · BuildOS™
      </div>
    </footer>
  );
}
