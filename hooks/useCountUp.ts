"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Counts an element's number from 0 → target when it scrolls into view.
 * Writes directly to textContent (no re-render). Respects reduced motion.
 */
export function useCountUp<T extends HTMLElement>(
  target: number,
  { duration = 2, suffix = "" }: { duration?: number; suffix?: string } = {},
) {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduced) {
      el.textContent = `${target}${suffix}`;
      return;
    }

    const obj = { v: 0 };
    el.textContent = `0${suffix}`;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () =>
        gsap.to(obj, {
          v: target,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = `${Math.round(obj.v)}${suffix}`;
          },
        }),
    });

    return () => st.kill();
  }, [target, duration, suffix, reduced]);

  return ref;
}
