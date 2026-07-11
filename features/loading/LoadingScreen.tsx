"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { useLoad } from "@/components/providers/LoadProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { site } from "@/lib/site";

/**
 * Cinematic loader: a luxury-villa wireframe draws itself while a
 * percentage counts to 100, then the panel lifts away to reveal the hero.
 */
export function LoadingScreen() {
  const { setLoaded } = useLoad();
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [pct, setPct] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (reduced) {
      const frame = requestAnimationFrame(() => setLoaded(true));
      return () => cancelAnimationFrame(frame);
    }

    const paths = svgRef.current?.querySelectorAll<SVGPathElement>("path, line");
    const counter = { v: 0 };

    const tl = gsap.timeline({
      onComplete: () => setVisible(false),
    });

    if (paths) {
      paths.forEach((p) => {
        const len = "getTotalLength" in p ? p.getTotalLength() : 200;
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      tl.to(paths, {
        strokeDashoffset: 0,
        duration: 1.6,
        ease: "power2.inOut",
        stagger: 0.12,
      });
    }

    tl.to(
      counter,
      {
        v: 100,
        duration: 2,
        ease: "power1.inOut",
        onUpdate: () => setPct(Math.round(counter.v)),
      },
      0,
    );

    return () => {
      tl.kill();
    };
  }, [reduced, setLoaded]);

  return (
    <AnimatePresence onExitComplete={() => setLoaded(true)}>
      {visible && !reduced && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="blueprint-grid-fine absolute inset-0 opacity-40" />

          <svg
            ref={svgRef}
            viewBox="0 0 240 180"
            className="relative w-[42vw] max-w-[360px] text-copper"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.25}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* ground line */}
            <line x1="10" y1="160" x2="230" y2="160" />
            {/* skyline mark: stepped tower silhouette, echoes the SRG building icon */}
            <path d="M60 160 V96 H92 V160" />
            <path d="M92 160 V60 H140 V160" />
            <path d="M140 160 V84 H180 V160" />
            <path d="M108 60 L116 44 L124 60" />
            {/* tower windows */}
            <line x1="76" y1="112" x2="76" y2="144" />
            <line x1="108" y1="76" x2="108" y2="144" />
            <line x1="124" y1="76" x2="124" y2="144" />
            <line x1="160" y1="100" x2="160" y2="144" />
            {/* measurement tick */}
            <line x1="60" y1="172" x2="180" y2="172" />
          </svg>

          <div className="relative mt-10 flex w-[42vw] max-w-[360px] flex-col gap-1">
            <div className="flex items-end justify-between">
              <span className="eyebrow">{site.name}</span>
              <span className="font-mono text-4xl font-medium tabular-nums text-text">
                {pct}
                <span className="text-copper">%</span>
              </span>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              {site.owner} · {site.ownerTitle}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
