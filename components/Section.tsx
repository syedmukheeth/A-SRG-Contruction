"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  className?: string;
  /** Reveal direct children with a stagger instead of the section as a whole. */
  revealChildren?: boolean;
  children: React.ReactNode;
}

/**
 * Cinematic section wrapper: full-width, generous vertical rhythm,
 * scroll-revealed. Keeps transitions between sections soft (no hard jumps).
 */
export function Section({
  id,
  className,
  revealChildren = false,
  children,
}: SectionProps) {
  const ref = useScrollReveal<HTMLElement>({ children: revealChildren });

  return (
    <section
      id={id}
      ref={ref}
      className={cn("relative w-full px-6 py-32 md:px-12 lg:px-20", className)}
    >
      {children}
    </section>
  );
}
