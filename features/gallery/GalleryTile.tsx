"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/lib/site";

const spanClass: Record<string, string> = {
  tall: "row-span-2",
  wide: "sm:col-span-2",
};

export function GalleryTile({ item }: { item: GalleryItem }) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner.current,
        { yPercent: -8 },
        {
          yPercent: 8,
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
      className={cn(
        "group relative overflow-hidden rounded-lg border border-text/10",
        spanClass[item.span] ?? "",
      )}
    >
      <div
        ref={inner}
        className="absolute inset-x-0 top-[-8%] h-[116%] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
      >
        <Image
          src={item.image}
          alt={item.caption}
          fill
          sizes="(max-width: 640px) 50vw, 25vw"
          className="object-cover soft-img"
        />
        <div className="blueprint-grid-fine absolute inset-0 opacity-20 mix-blend-soft-light" />
        <div className="absolute inset-0 bg-ink/25 transition-colors duration-500 group-hover:bg-ink/10" />
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 h-1/2 bg-linear-to-t from-ink/85 to-transparent" />
      <span className="absolute bottom-4 left-4 z-10 translate-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-text/90 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
        {item.caption}
      </span>
    </div>
  );
}
