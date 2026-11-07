"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { gsap } from "@/lib/gsap";
import { DUR, START } from "@/lib/motion";
import { useGsap } from "@/hooks/useGsap";

/**
 * Wipes its child up into view (clip-path on the wrapper, settle-scale on the
 * child), once. Runs on phones too; nothing happens under reduced motion.
 */
export function ClipReveal({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGsap(ref, ({ reduce }, el) => {
    if (reduce) return;
    const inner = el.firstElementChild;
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: START.clip, once: true } });
    tl.fromTo(
      el,
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: DUR.lg, ease: "expo.out" },
    );
    if (inner) tl.fromTo(inner, { scale: 1.12 }, { scale: 1, duration: DUR.xl, ease: "expo.out" }, 0);
  });

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <div>{children}</div>
    </div>
  );
}
