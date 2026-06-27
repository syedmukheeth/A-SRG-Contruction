"use client";

import { useCountUp } from "@/hooks/useCountUp";

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
}

export function StatCounter({ value, suffix = "", label }: StatCounterProps) {
  const ref = useCountUp<HTMLSpanElement>(value, { suffix });

  return (
    <div className="group relative border-t border-text/10 pt-8">
      <span
        ref={ref}
        className="font-display text-[clamp(4rem,11vw,9rem)] font-extrabold leading-none tabular-nums text-text transition-colors duration-500 group-hover:text-copper"
      >
        0{suffix}
      </span>
      <p className="mt-4 max-w-[16ch] font-mono text-xs uppercase tracking-[0.2em] text-muted">
        {label}
      </p>
    </div>
  );
}
