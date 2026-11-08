"use client";

import { useEffect } from "react";
import { gsap, queueRefresh } from "@/lib/gsap";
import { MQ } from "@/lib/motion";

/** Lifts the footer wordmark out of its mask as the page bottoms out. Renders nothing. */
export function FooterMotion() {
  useEffect(() => {
    const mark = document.querySelector<HTMLElement>("[data-footer-mark]");
    if (!mark) return;
    const mm = gsap.matchMedia();

    mm.add(MQ, (ctx) => {
      const { reduce } = ctx.conditions as { reduce: boolean };
      if (reduce) return;
      gsap.fromTo(
        mark,
        { yPercent: 55 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: { trigger: mark.parentElement, start: "top bottom", end: "bottom bottom", scrub: true, invalidateOnRefresh: true },
        },
      );
    });

    queueRefresh();
    return () => mm.revert();
  }, []);

  return null;
}
