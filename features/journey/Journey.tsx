"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { BuildingVilla } from "./BuildingVilla";

const BEATS = [
  { layer: "blueprint", n: "01", t: "Blueprint", l: "Every legacy starts as a single line." },
  { layer: "foundation", n: "02", t: "Foundation", l: "Concrete meets earth. The ground is set." },
  { layer: "steel", n: "03", t: "Structure", l: "Steel rises. Beams lock into place." },
  { layer: "walls", n: "04", t: "Walls", l: "Walls climb, course by course." },
  { layer: "roof", n: "05", t: "Roof", l: "The shell closes. Shelter takes shape." },
  { layer: "glass", n: "06", t: "Glass", l: "Light pours in. The house breathes." },
  { layer: "finish", n: "07", t: "Handover", l: "Lights on. A house becomes a home." },
] as const;

// Deterministic dust positions.
const DUST = [
  [14, 30], [27, 62], [38, 22], [49, 74], [61, 40],
  [70, 66], [82, 28], [90, 58], [20, 48], [55, 18],
  [76, 80], [33, 84],
] as const;

export function Journey() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const lastIdx = useRef(-1);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = stage.current;
    if (!root) return;

    const layer = (name: string) =>
      root.querySelector<SVGGElement>(`[data-layer="${name}"]`);
    const built = ["foundation", "steel", "walls", "roof", "glass", "finish"];
    const blueprintStrokes =
      layer("blueprint")?.querySelectorAll<SVGGeometryElement>("[data-draw]");

    if (reduced) {
      blueprintStrokes?.forEach((p) => gsap.set(p, { strokeDashoffset: 0 }));
      built.forEach((b) => {
        const el = layer(b);
        if (el) gsap.set(el, { autoAlpha: 1, scaleY: 1, y: 0 });
      });
      return;
    }

    const ctx = gsap.context(() => {
      // initial states
      blueprintStrokes?.forEach((p) => {
        const len = p.getTotalLength?.() ?? 300;
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      built.forEach((b) => {
        const el = layer(b);
        if (!el) return;
        const isRoof = b === "roof";
        gsap.set(el, {
          autoAlpha: 0,
          willChange: "transform, opacity",
          transformOrigin: "center bottom",
          ...(isRoof ? { y: -28 } : { scaleY: 0 }),
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          pin: stage.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const i = Math.min(
              BEATS.length - 1,
              Math.floor(self.progress * BEATS.length),
            );
            if (i !== lastIdx.current) {
              lastIdx.current = i;
              setActive(i); // only re-render React on an actual beat change
            }
          },
        },
      });

      // beat 0, blueprint draws
      if (blueprintStrokes && blueprintStrokes.length) {
        tl.to(blueprintStrokes, {
          strokeDashoffset: 0,
          duration: 1,
          ease: "none",
          stagger: 0.05,
        });
      }
      // beats 1–6, built layers
      built.forEach((b) => {
        const el = layer(b);
        if (!el) return;
        const isRoof = b === "roof";
        tl.to(el, {
          autoAlpha: 1,
          ...(isRoof ? { y: 0 } : { scaleY: 1 }),
          duration: 1,
          ease: isRoof ? "power3.out" : "power2.out",
        });
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  const visibleBeat = reduced ? BEATS.length - 1 : active;

  return (
    <section
      ref={section}
      id="journey"
      aria-label="How we build"
      className={
        reduced ? "relative w-full" : "relative h-[300dvh] w-full md:h-[520dvh]"
      }
    >
      <div
        ref={stage}
        className="relative flex h-dvh w-full flex-col items-center justify-center overflow-hidden"
      >
        <div className="blueprint-grid absolute inset-0 opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--ink)_88%)]" />

        {/* dust */}
        {!reduced &&
          DUST.map(([l, t], i) => (
            <span
              key={i}
              className="absolute h-[3px] w-[3px] rounded-full bg-copper/30"
              style={{
                left: `${l}%`,
                top: `${t}%`,
                animation: `dust ${6 + (i % 4)}s ease-in-out ${i * 0.3}s infinite`,
              }}
            />
          ))}

        {/* eyebrow */}
        <span className="eyebrow absolute left-6 top-24 md:left-12">
          From concrete to dreams
        </span>

        {/* villa */}
        <div className="relative w-[92vw] max-w-[1100px]">
          <BuildingVilla />
        </div>

        {/* caption */}
        <div className="pointer-events-none absolute bottom-16 left-6 right-6 md:left-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:gap-6">
            <span className="font-mono text-sm text-copper">
              {BEATS[visibleBeat].n}
              <span className="text-muted"> / 07</span>
            </span>
            <div>
              <h2 className="font-display text-4xl font-bold uppercase leading-none text-text sm:text-5xl md:text-7xl">
                {BEATS[visibleBeat].t}
              </h2>
              <p className="mt-3 max-w-md text-muted">{BEATS[visibleBeat].l}</p>
            </div>
          </div>
        </div>

        {/* progress ticks */}
        <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col gap-3 md:flex md:right-12">
          {BEATS.map((b, i) => (
            <span
              key={b.n}
              className={`h-6 w-px transition-colors duration-300 ${
                i <= visibleBeat ? "bg-copper" : "bg-text/15"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
