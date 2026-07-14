"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { useLoad } from "@/components/providers/LoadProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MagneticButton } from "@/components/MagneticButton";
import { site } from "@/lib/site";
import { BlueprintVilla } from "./BlueprintVilla";

const HEADLINE = ["46 YEARS", "OF CONSTRUCTION", "EXPERIENCE"];

export function Hero() {
  const { isLoaded } = useLoad();
  const reduced = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);
  const villaWrap = useRef<HTMLDivElement>(null);

  /* Headline intro, fires once the loader has lifted. */
  useEffect(() => {
    if (!isLoaded || !headline.current) return;
    if (reduced) {
      gsap.set(headline.current.querySelectorAll(".line-inner"), {
        yPercent: 0,
        opacity: 1,
      });
      return;
    }
    const split = new SplitText(headline.current.querySelectorAll(".line-inner"), {
      type: "lines",
      linesClass: "split-line",
      accessible: false,
    });
    gsap.set(split.lines, { yPercent: 110 });
    gsap.to(split.lines, {
      yPercent: 0,
      duration: 1.1,
      ease: "power4.out",
      stagger: 0.12,
      delay: 0.1,
    });
    return () => split.revert();
  }, [isLoaded, reduced]);

  /* Scroll-scrubbed blueprint build. */
  useEffect(() => {
    if (reduced) {
      const wrap = villaWrap.current;
      if (wrap) {
        gsap.set(wrap.querySelectorAll("[data-draw]"), { strokeDashoffset: 0 });
        gsap.set(wrap.querySelectorAll("[data-glow]"), { opacity: 0.22 });
      }
      return;
    }

    const mm = gsap.matchMedia();

    mm.add(
      { isDesktop: "(min-width: 768px)" },
      (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean };
        const draws = villaWrap.current!.querySelectorAll<SVGGeometryElement>(
          "[data-draw]",
        );
        const glows = villaWrap.current!.querySelectorAll("[data-glow]");

        draws.forEach((p) => {
          const len = p.getTotalLength?.() ?? 300;
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        });

        if (isDesktop) {
          // Full pinned scroll-scrub build on tablet/desktop.
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.5,
              pin: stage.current,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          tl.to(draws, {
            strokeDashoffset: 0,
            duration: 6,
            ease: "none",
            stagger: 0.04,
          })
            .to(glows, { opacity: 0.28, duration: 1.5, stagger: 0.1 }, ">-1")
            .to(
              headline.current,
              { yPercent: -18, opacity: 0.85, duration: 2, ease: "none" },
              0,
            );
        } else {
          // Mobile: no pin (fights native scroll), a single triggered
          // draw-in instead of a scroll-scrubbed one.
          gsap.timeline({
            scrollTrigger: {
              trigger: section.current,
              start: "top 70%",
              once: true,
              invalidateOnRefresh: true,
            },
          })
            .to(draws, {
              strokeDashoffset: 0,
              duration: 1.6,
              ease: "power2.out",
              stagger: 0.03,
            })
            .to(glows, { opacity: 0.28, duration: 0.8, stagger: 0.05 }, ">-0.4");
        }
      },
    );

    return () => mm.revert();
  }, [reduced]);

  return (
    <section
      ref={section}
      id="hero"
      className="relative h-dvh w-full md:h-[240dvh]"
      aria-label="Hero"
    >
      <div
        ref={stage}
        className="relative flex h-dvh w-full items-center justify-center overflow-hidden"
      >
        {/* blueprint grid + vignette */}
        <div className="blueprint-grid absolute inset-0 opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,var(--ink)_85%)]" />

        {/* villa drawing */}
        <div
          ref={villaWrap}
          className="absolute inset-0 flex items-center justify-center"
        >
          <BlueprintVilla className="w-[88vw] max-w-[1100px]" />
        </div>

        {/* annotation (desktop only, avoid colliding with headline on phones) */}
        <span className="eyebrow absolute left-6 top-28 hidden md:left-12 md:block">
          {site.name}
        </span>

        {/* headline + CTAs */}
        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          <h1
            ref={headline}
            aria-label={HEADLINE.join(" ")}
            className="font-display text-mega uppercase text-text"
          >
            {HEADLINE.map((line, i) => (
              <span key={i} className="block overflow-hidden" aria-hidden="true">
                <span className="line-inner block">{line}</span>
              </span>
            ))}
          </h1>

          <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row">
            <MagneticButton href="#contact">Build Your Dream</MagneticButton>
            <MagneticButton href="#projects" variant="ghost">
              Explore Projects
            </MagneticButton>
          </div>
        </div>

        {/* scroll cue */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
          <span className="eyebrow">Scroll to build</span>
          <span className="h-8 w-px animate-pulse bg-copper/60" />
        </div>
      </div>
    </section>
  );
}
