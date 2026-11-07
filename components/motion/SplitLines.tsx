"use client";

import { useRef, type ElementType } from "react";
import { gsap } from "@/lib/gsap";
import { DUR, START, STAGGER } from "@/lib/motion";
import { useGsap } from "@/hooks/useGsap";

interface SplitLinesProps {
  /** Pre-split lines: no runtime text measuring, no hydration mismatch. */
  lines: readonly string[];
  as?: ElementType;
  id?: string;
  className?: string;
  /** Index of a line to colour with `accentClassName`. */
  accent?: number;
  accentClassName?: string;
}

/** A heading whose lines rise out of masks as it scrolls into view. Reads as one heading. */
export function SplitLines({ lines, as: Tag = "h2", id, className, accent, accentClassName }: SplitLinesProps) {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, ({ reduce }, el) => {
    if (reduce) return;
    gsap.from(el.querySelectorAll("[data-line]"), {
      yPercent: 105,
      duration: DUR.lg,
      ease: "expo.out",
      stagger: STAGGER.base,
      scrollTrigger: { trigger: el, start: START.reveal, once: true },
    });
  });

  return (
    <Tag ref={ref} id={id} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <span data-line className={i === accent ? `block ${accentClassName ?? ""}` : "block"}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
