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
  const svgRef = useRef<SVGSVGElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const stepNumRef = useRef<HTMLSpanElement>(null);
  const stepTitleRef = useRef<HTMLSpanElement>(null);

  const RING_R = 46;
  const RING_C = 2 * Math.PI * RING_R;

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

    // Kept intentionally snappy: a full-screen opaque loader blocks paint,
    // so every second here directly costs Speed Index / LCP. ~0.9s total.
    // The logo is static by design; only the wireframe, ring and counter move.
    if (paths) {
      paths.forEach((p) => {
        const len = "getTotalLength" in p ? p.getTotalLength() : 200;
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      tl.to(
        paths,
        {
          strokeDashoffset: 0,
          duration: 0.45,
          ease: "power2.inOut",
          stagger: 0.03,
        },
        0.1,
      );
    }

    // Counter writes straight to the DOM: no React re-render per tick.
    tl.to(
      counter,
      {
        v: 100,
        duration: 0.55,
        ease: "power1.inOut",
        onUpdate: () => {
          const v = Math.round(counter.v);
          if (pctRef.current) pctRef.current.textContent = String(v);
          const idx = Math.min(
            processSteps.length - 1,
            Math.floor((v / 100) * processSteps.length),
          );
          if (stepNumRef.current) {
            stepNumRef.current.textContent = String(idx + 1).padStart(2, "0");
          }
          if (stepTitleRef.current) {
            stepTitleRef.current.textContent = processSteps[idx].title;
          }
          if (ringRef.current) {
            ringRef.current.style.strokeDashoffset = `${RING_C * (1 - counter.v / 100)}`;
          }
        },
      },
      0.1,
    );

    tl.fromTo(
      statsRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
      0.45,
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
          transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="blueprint-grid-fine absolute inset-0 opacity-40" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(199,133,62,0.1)_0%,transparent_55%)]" />

          {/* ambient construction dust */}
          {DUST.slice(0, 4).map(([l, t], i) => (
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

          {/* brand mark medallion */}
          <div className="relative flex h-28 w-28 items-center justify-center">
            {/* pulsing halo: pre-baked radial gradient, no live blur filter */}
            <div className="absolute -inset-3 animate-pulse rounded-full bg-[radial-gradient(circle,rgba(199,133,62,0.3)_0%,transparent_70%)]" />

            {/* decorative rotating ring */}
            <div
              className="absolute -inset-2.5 rounded-full border border-dashed border-copper/25"
              style={{ animation: "slow-spin 16s linear infinite" }}
            />

            {/* live progress ring */}
            <svg viewBox="0 0 100 100" className="absolute h-full w-full -rotate-90">
              <circle
                cx="50"
                cy="50"
                r={RING_R}
                fill="none"
                stroke="rgba(248,248,248,0.08)"
                strokeWidth="2"
              />
              <circle
                ref={ringRef}
                cx="50"
                cy="50"
                r={RING_R}
                fill="none"
                stroke="#c7853e"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={RING_C}
                strokeDashoffset={RING_C}
              />
            </svg>

            <div className="relative h-16 w-16 overflow-hidden rounded-full">
              <Image
                src="/images/brand/logo-mark-round.png"
                alt={site.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
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
                <span ref={stepNumRef}>01</span> / {processSteps.length}
              </span>
              <span ref={stepTitleRef} className="text-copper">
                {processSteps[0].title}
              </span>
            </div>

            <div className="mt-4 flex items-end justify-between">
              <span className="eyebrow">{site.name}</span>
              <span className="font-mono text-4xl font-medium tabular-nums text-text">
                <span ref={pctRef}>0</span>
                <span className="text-copper">%</span>
              </span>
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
