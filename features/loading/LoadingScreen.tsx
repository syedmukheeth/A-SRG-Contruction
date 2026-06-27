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
            {/* house body */}
            <path d="M40 160 V70 H200 V160" />
            {/* roof */}
            <path d="M28 78 L120 22 L212 78" />
            {/* door */}
            <path d="M104 160 V112 H136 V160" />
            {/* windows */}
            <path d="M58 92 H86 V118 H58 Z" />
            <path d="M154 92 H182 V118 H154 Z" />
            {/* window mullions */}
            <line x1="72" y1="92" x2="72" y2="118" />
            <line x1="168" y1="92" x2="168" y2="118" />
            {/* measurement tick */}
            <line x1="40" y1="172" x2="200" y2="172" />
          </svg>

          <div className="relative mt-10 flex w-[42vw] max-w-[360px] items-end justify-between">
            <span className="eyebrow">{site.name}</span>
            <span className="font-mono text-4xl font-medium tabular-nums text-text">
              {pct}
              <span className="text-copper">%</span>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
