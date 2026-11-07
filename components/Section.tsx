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

/** Page section with the site's horizontal gutter, vertical rhythm and a scroll reveal. */
export function Section({ id, className, revealChildren = false, children }: SectionProps) {
  const ref = useScrollReveal<HTMLElement>({ children: revealChildren, y: 24 });

  return (
    <section
      id={id}
      ref={ref}
      className={cn("relative w-full px-5 py-20 md:px-10 md:py-28", className)}
    >
      {children}
    </section>
  );
}
