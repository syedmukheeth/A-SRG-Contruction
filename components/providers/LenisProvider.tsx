"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

let active: Lenis | null = null;

/** Glides to the top through Lenis when it's running, else jumps natively. */
export function scrollToTop() {
  if (active) active.scrollTo(0, { duration: 1.2 });
  else window.scrollTo({ top: 0 });
}

/**
 * Smooth scroll via Lenis, driven by GSAP's ticker so Lenis and
 * ScrollTrigger share a single rAF loop and stay perfectly in sync.
 * Skipped entirely when the user prefers reduced motion.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.1, // lower latency than a fixed duration; snappy yet smooth
      wheelMultiplier: 1,
      smoothWheel: true,
      syncTouch: false, // native scrolling on touch, no jank on mobile
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ScrollTrigger.update);
    active = lenis;

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      active = null;
    };
  }, []);

  return <>{children}</>;
}
