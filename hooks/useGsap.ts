"use client";

import { useEffect, type DependencyList, type RefObject } from "react";
import { gsap, queueRefresh } from "@/lib/gsap";
import { MQ, type MotionConditions } from "@/lib/motion";

/**
 * Scoped gsap.matchMedia with the desktop / mobile / reduce trio always
 * registered. Everything created in `setup` is reverted on unmount and when
 * the matching condition flips (e.g. resizing across 768px).
 */
export function useGsap<T extends HTMLElement>(
  scope: RefObject<T | null>,
  setup: (c: MotionConditions, el: T) => void | (() => void),
  deps: DependencyList = [],
) {
  useEffect(() => {
    const el = scope.current;
    if (!el) return;
    const mm = gsap.matchMedia(el);
    mm.add(MQ, (ctx) => setup(ctx.conditions as MotionConditions, el));
    queueRefresh();
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
