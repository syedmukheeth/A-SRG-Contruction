"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGsap } from "./useGsap";

/** Desktop-only scrubbed vertical drift. Phones and reduced motion stay still. */
export function useParallax<T extends HTMLElement>(yPercent = 10) {
  const ref = useRef<T>(null);
  useGsap(
    ref,
    ({ desktop }, el) => {
      if (!desktop) return;
      gsap.fromTo(
        el,
        { yPercent: -yPercent },
        {
          yPercent,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
        },
      );
    },
    [yPercent],
  );
  return ref;
}
