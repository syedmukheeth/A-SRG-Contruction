"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { useLoad } from "@/components/providers/LoadProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { site, processSteps, stats } from "@/lib/site";

// Deterministic dust positions (mirrors the Journey section's motif).
const DUST = [
  [10, 22], [22, 68], [35, 16], [48, 78], [63, 34],
  [74, 60], [86, 20], [92, 70], [17, 46], [56, 12],
] as const;

/**
 * Cinematic loader: the brand mark ignites, a luxury-villa wireframe draws
 * itself while a percentage counts to 100 against the build's process
 * stages, then the panel lifts away to reveal the hero.
 */
export function LoadingScreen() {
  const { setLoaded } = useLoad();
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [pct, setPct] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const stepIndex = Math.min(
    processSteps.length - 1,
    Math.floor((pct / 100) * processSteps.length),
  );

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

    tl.fromTo(
      logoRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.9, ease: "power3.out" },
    ).to(
      logoRef.current,
      { filter: "drop-shadow(0 0 24px rgba(199,133,62,0.55))", duration: 0.6, ease: "power2.out" },
      "<",
    );

    if (paths) {
      paths.forEach((p) => {
        const len = "getTotalLength" in p ? p.getTotalLength() : 200;
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      tl.to(
        paths,
        {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: "power2.inOut",
          stagger: 0.12,
        },
        0.3,
      );
    }

    tl.to(
      counter,
      {
        v: 100,
        duration: 2.4,
        ease: "power1.inOut",
        onUpdate: () => {
          const v = counter.v;
          setPct(Math.round(v));
          if (barRef.current) barRef.current.style.transform = `scaleX(${v / 100})`;
        },
      },
      0.2,
    );

    tl.fromTo(
      statsRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      2.05,
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
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(199,133,62,0.1)_0%,transparent_55%)]" />

          {/* ambient construction dust */}
          {DUST.map(([l, t], i) => (
            <span
              key={i}
              className="pointer-events-none absolute h-[3px] w-[3px] rounded-full bg-copper/30"
              style={{
                left: `${l}%`,
                top: `${t}%`,
                animation: `dust ${6 + (i % 4)}s ease-in-out ${i * 0.3}s infinite`,
              }}
            />
          ))}

          {/* brand mark */}
          <div ref={logoRef} className="relative h-16 w-16 opacity-0">
            <Image src="/images/brand/logo-mark.png" alt={site.name} fill sizes="64px" />
          </div>

          <svg
            ref={svgRef}
            viewBox="0 0 240 180"
            className="relative mt-6 w-[78vw] max-w-[360px] text-copper sm:w-[52vw] md:w-[42vw]"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.25}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* ground line */}
            <line x1="10" y1="160" x2="230" y2="160" />
            {/* skyline mark: stepped tower silhouette, echoes the ASRG building icon */}
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

          <div className="relative mt-8 w-[78vw] max-w-[360px] sm:w-[52vw] md:w-[42vw]">
            <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              <span>
                {String(stepIndex + 1).padStart(2, "0")} / {processSteps.length}
              </span>
              <span className="text-copper">{processSteps[stepIndex].title}</span>
            </div>

            <div className="mt-4 flex items-end justify-between">
              <span className="eyebrow">{site.name}</span>
              <span className="font-mono text-4xl font-medium tabular-nums text-text">
                {pct}
                <span className="text-copper">%</span>
              </span>
            </div>

            <div className="mt-3 h-px w-full overflow-hidden bg-text/10">
              <div
                ref={barRef}
                className="h-full w-full origin-left scale-x-0 bg-copper"
              />
            </div>

            <div
              ref={statsRef}
              className="mt-4 flex flex-wrap justify-between gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.15em] text-muted opacity-0"
            >
              {stats.map((s) => (
                <span key={s.label}>
                  <span className="text-text">
                    {s.value}
                    {s.suffix}
                  </span>{" "}
                  {s.label}
                </span>
              ))}
            </div>

            <span className="mt-4 block font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              {site.owner} · {site.ownerTitle}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
