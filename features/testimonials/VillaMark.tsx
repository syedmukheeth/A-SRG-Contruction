/** Small villa silhouette used as the testimonial card "facade". */
export function VillaMark({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" fill="none" aria-hidden>
      <rect width="200" height="120" fill={`${accent}14`} />
      <path d="M50 120 V60 H150 V120" stroke={accent} strokeOpacity="0.5" />
      <path d="M40 64 L100 32 L160 64" stroke={accent} strokeOpacity="0.5" />
      <rect x="70" y="78" width="24" height="24" fill={accent} opacity="0.35" />
      <rect x="106" y="78" width="24" height="24" fill={accent} opacity="0.35" />
    </svg>
  );
}
