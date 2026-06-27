const ITEMS = [
  "Residential",
  "Commercial",
  "Civil Contracting",
  "Centering",
  "Renovation",
  "46 Years",
] as const;

/**
 * Infinite editorial marquee divider. Alternating filled / outlined
 * display type for an architectural, magazine-cover feel.
 */
export function Marquee() {
  const run = [...ITEMS, ...ITEMS];
  return (
    <div
      aria-hidden
      className="relative w-full overflow-hidden border-y border-text/10 py-6"
    >
      <div className="flex w-max animate-[marquee_28s_linear_infinite] whitespace-nowrap">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0">
            {run.map((item, i) => (
              <span
                key={`${copy}-${i}`}
                className={`mx-8 font-display text-4xl font-bold uppercase tracking-tight md:text-6xl ${
                  i % 2 ? "marquee-outline" : "text-text"
                }`}
              >
                {item}
                <span className="mx-8 text-copper">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
