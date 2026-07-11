"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { Project } from "@/lib/site";

/**
 * Near-fullscreen project slab. The media layer parallaxes against the
 * frame as it scrolls; meta labels read like an architectural drawing sheet.
 */
export function ProjectRow({ project, index }: { project: Project; index: number }) {
  const frame = useRef<HTMLDivElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const flip = index % 2 === 1;

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        media.current,
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: frame.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, frame);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <div
      ref={frame}
      className={`grid items-center gap-8 lg:grid-cols-12 ${
        flip ? "" : ""
      }`}
    >
      {/* media */}
      <div
        className={`group relative h-[60vh] overflow-hidden rounded-lg border border-text/10 lg:col-span-8 lg:h-[80vh] ${
          flip ? "lg:order-2" : ""
        }`}
      >
        <div ref={media} className="absolute inset-x-0 -top-[12%] h-[124%]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover soft-img"
          />
          <div className="blueprint-grid absolute inset-0 opacity-20 mix-blend-soft-light" />
          <div className="absolute inset-0 bg-ink/20" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-ink/80 to-transparent" />
        </div>
        <span className="absolute left-5 top-5 z-10 font-mono text-[11px] uppercase tracking-[0.25em] text-text/90">
          {project.category}
        </span>
      </div>

      {/* meta */}
      <div className={`lg:col-span-4 ${flip ? "lg:order-1" : ""}`}>
        <span className="font-mono text-sm text-copper">
          {String(index + 1).padStart(2, "0")} / {project.year}
        </span>
        <h3 className="mt-4 font-display text-4xl font-bold uppercase leading-none text-text md:text-5xl">
          {project.title}
        </h3>
        <dl className="mt-8 space-y-3 border-t border-text/10 pt-6 font-mono text-xs uppercase tracking-[0.15em] text-muted">
          <div className="flex justify-between">
            <dt>Location</dt>
            <dd className="text-text">{project.location}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Scope</dt>
            <dd className="text-text">{project.area}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
