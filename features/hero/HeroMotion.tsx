"use client";

import { useEffect } from "react";
import { gsap, queueRefresh } from "@/lib/gsap";
import { MQ } from "@/lib/motion";

/** Desktop-only scroll scrub for the server-rendered hero. Renders nothing. */
export function HeroMotion() {
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const mm = gsap.matchMedia(hero);

    mm.add(MQ, (ctx) => {
      const { desktop } = ctx.conditions as { desktop: boolean };
      if (!desktop) return;

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true, invalidateOnRefresh: true },
      });
      tl.to("[data-hero-line]", { yPercent: -22, opacity: 0.35, stagger: 0.04 }, 0)
        .to("[data-hero-photo]", { yPercent: 12, scale: 1.05 }, 0)
        .to("[data-hero-callout]", { yPercent: 12, opacity: 0, ease: "power1.in" }, 0)
        .to("[data-hero-dim]", { opacity: 0.75 }, 0);
    });

    queueRefresh();
    return () => mm.revert();
  }, []);

  return null;
}
