"use client";

import { useParallax } from "@/hooks/useParallax";

export function Parallax({ amount = 10, className, children }: { amount?: number; className?: string; children: React.ReactNode }) {
  const ref = useParallax<HTMLDivElement>(amount);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
