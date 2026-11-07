"use client";

import { useEffect, useRef } from "react";
import { gsap, queueRefresh } from "@/lib/gsap";
import { DIST, DUR, START, STAGGER } from "@/lib/motion";
import { useReducedMotion } from "./useReducedMotion";

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
  y = DIST.reveal,
  duration = DUR.lg,
  delay = 0,
  start = START.reveal,
  stagger = STAGGER.base,
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
        ease: "expo.out",
        scrollTrigger: { trigger: el, start },
      });
    }, el);

    return () => ctx.revert();
  }, [y, duration, delay, start, stagger, children, reduced]);

  // Keep ScrollTrigger in sync after the very first paint.
  useEffect(() => {
    queueRefresh();
  }, []);

  return ref;
}
