"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGsap } from "@/hooks/useGsap";

/** A rule that draws itself across as the band scrolls through (desktop); static elsewhere. */
export function ScrubRule({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGsap(ref, ({ desktop, mobile }, el) => {
    const bar = el.firstElementChild;
    if (!bar) return;
    if (desktop) {
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 90%", end: "top 35%", scrub: true, invalidateOnRefresh: true },
        },
      );
    } else if (mobile) {
      gsap.from(bar, { scaleX: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
    }
  });

  return (
    <span ref={ref} aria-hidden className={className}>
      <span className="block h-full w-full origin-left bg-ember" />
    </span>
  );
}
