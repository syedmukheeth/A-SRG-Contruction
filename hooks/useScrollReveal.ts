"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "./useReducedMotion";

// One coalesced ScrollTrigger.refresh() per mount batch. A refresh per
// Section instance re-measures every trigger (including both pinned
// sections) a dozen times on load — a large forced-layout cost.
let refreshQueued = false;
function scheduleRefresh() {
  if (refreshQueued) return;
  refreshQueued = true;
  // Double rAF: run after the browser has painted the newly mounted sections.
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      refreshQueued = false;
      ScrollTrigger.refresh();
    }),
  );
}

interface RevealOptions {
  y?: number;
  duration?: number;
  delay?: number;
  start?: string;
  stagger?: number;
  /** Reveal direct children instead of the element itself. */
  children?: boolean;
}

/**
 * Fade + rise reveal driven by ScrollTrigger.
 * Returns a ref to attach to the target. Respects reduced motion.
 */
export function useScrollReveal<T extends HTMLElement>({
  y = 40,
  duration = 1,
  delay = 0,
  start = "top 85%",
  stagger = 0.08,
  children = false,
}: RevealOptions = {}) {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduced) {
      gsap.set(children ? el.children : el, { opacity: 1, y: 0 });
      return;
    }

    const targets = children ? Array.from(el.children) : el;

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y,
        duration,
        delay,
        stagger,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start },
      });
    }, el);

    return () => ctx.revert();
  }, [y, duration, delay, start, stagger, children, reduced]);

  // Keep ScrollTrigger in sync after the very first paint.
  useEffect(() => {
    scheduleRefresh();
  }, []);

  return ref;
}
