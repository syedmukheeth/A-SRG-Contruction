"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

/** Fades and lifts its direct children in as they scroll into view. */
export function Reveal({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useScrollReveal<HTMLDivElement>({ children: true, y: 28, stagger: 0.12 });
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
