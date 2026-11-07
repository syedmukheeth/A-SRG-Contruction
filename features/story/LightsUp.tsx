"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGsap } from "@/hooks/useGsap";

/** The dusk photo starts in shadow and its lights come up as it scrolls in. */
export function LightsUp({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGsap(ref, ({ reduce }, el) => {
    if (reduce) return;
    const shade = el.querySelector("[data-shade]");
    if (!shade) return;
    gsap.fromTo(
      shade,
      { opacity: 0.88 },
      { opacity: 0, duration: 2.2, ease: "power2.inOut", scrollTrigger: { trigger: el, start: "top 70%", once: true } },
    );
  });

  return (
    <div ref={ref} className={className}>
      <div className="relative">
        {children}
        <div data-shade aria-hidden className="pointer-events-none absolute inset-x-0 top-0 bottom-8 bg-night opacity-0" />
      </div>
    </div>
  );
}
