"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MagneticButton } from "@/components/MagneticButton";
import { site, stats } from "@/lib/site";
import { BlueprintVilla } from "./BlueprintVilla";

// Kept to ~15 characters per line: --text-mega clamps to 2.6rem on phones, where
// a longer line overflows the viewport. The brand sits on its own smaller line
// above, so the h1 still names the company and the city for brand searches.
const HEADLINE = [`${site.yearsOfExperience} YEARS`, "OF CONSTRUCTION", "IN KURNOOL"];

/** Above-the-fold proof line — the three numbers a buyer screens on first. */
const TRUST = [
  `${site.yearsOfExperience} yrs on site`,
  `${stats[1].value}${stats[1].suffix} projects delivered`,
  `${site.location.city}, ${site.location.region}`,
];

export function Hero() {
  const reduced = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);
  const villaWrap = useRef<HTMLDivElement>(null);

  /* The headline intro is pure CSS (.hero-line / .hero-fade in globals.css).
     It used to be a GSAP SplitText timeline gated on the loading screen; with
     the splash gone there is nothing to hide a JS- and font-dependent reveal,
     so an unstyled flash would land straight on the LCP element. CSS animates
     from first paint, needs no font metrics, and survives a JS failure. */

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

    // Both conditions are needed: gsap.matchMedia only runs the handler when
    // at least one condition matches, so a lone isDesktop query means the
    // mobile branch never executes (no draw-in, windows never light up).
    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767.98px)",
      },
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
            .to(glows, { opacity: 0.35, duration: 1.5, stagger: 0.1 }, ">-1")
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
            .to(glows, { opacity: 0.35, duration: 0.8, stagger: 0.05 }, ">-0.4");
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

        {/* headline + CTAs */}
        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          <h1
            ref={headline}
            aria-label={`${site.name} — ${HEADLINE.join(" ")}`}
            className="font-display text-mega uppercase text-text"
          >
            <span
              className="eyebrow hero-fade mb-5 block"
              aria-hidden="true"
              style={{ animationDelay: "0.05s" }}
            >
              {site.name}
            </span>
            {HEADLINE.map((line, i) => (
              <span key={i} className="block overflow-hidden" aria-hidden="true">
                <span
                  className="hero-line block"
                  style={{ animationDelay: `${0.12 + i * 0.11}s` }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <div
            className="hero-fade mt-8 flex flex-col items-center gap-4 sm:mt-10 sm:flex-row sm:gap-5"
            style={{ animationDelay: "0.5s" }}
          >
            <MagneticButton href="#contact">Build Your Dream</MagneticButton>
            <MagneticButton href="#projects" variant="ghost">
              Explore Projects
            </MagneticButton>
          </div>

          <ul
            className="hero-fade mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted sm:mt-9 sm:gap-x-6 sm:text-[11px]"
            style={{ animationDelay: "0.68s" }}
          >
            {TRUST.map((item, i) => (
              <li key={item} className="flex items-center gap-4 sm:gap-6">
                {i > 0 && (
                  <span aria-hidden className="text-copper/40">
                    /
                  </span>
                )}
                {item}
              </li>
            ))}
          </ul>
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
