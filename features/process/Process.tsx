"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { processSteps } from "@/lib/site";

/** Interactive build timeline, a copper progress line grows as you scroll. */
export function Process() {
  const root = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      if (fill.current) gsap.set(fill.current, { scaleY: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        fill.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 0.5,
          },
        },
      );

      gsap.from(".process-step", {
        opacity: 0,
        x: -30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="process" className="relative w-full px-6 py-32 md:px-12 lg:px-20">
      <div className="mx-auto max-w-[1100px]">
        <p className="eyebrow mb-6">The build</p>
        <h2 className="mb-20 font-display text-giant uppercase leading-[0.9] text-text">
          Eight stages.
          <br />
          <span className="text-copper">Zero shortcuts.</span>
        </h2>

        <div ref={root} className="relative pl-10 md:pl-16">
          {/* track */}
          <span className="absolute left-[6px] top-2 h-[calc(100%-1rem)] w-px bg-text/12 md:left-[10px]" />
          {/* fill */}
          <span
            ref={fill}
            className="absolute left-[6px] top-2 h-[calc(100%-1rem)] w-px origin-top bg-copper md:left-[10px]"
          />

          <ul className="space-y-14">
            {processSteps.map((step) => (
              <li key={step.id} className="process-step relative">
                <span className="absolute -left-10 top-1 h-3 w-3 -translate-x-1/2 rounded-full border border-copper bg-ink md:-left-16" />
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-8">
                  <span className="font-mono text-xs text-copper">{step.id}</span>
                  <h3 className="font-display text-3xl font-bold uppercase text-text md:text-4xl">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-2 max-w-md text-muted md:pl-[3.25rem]">
                  {step.note}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
