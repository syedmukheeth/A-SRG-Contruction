"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

const LINKS = [
  { label: "Services", href: "/services", section: null },
  { label: "Why Us", href: "/best-construction-in-kurnool", section: null },
  { label: "Work", href: "/#projects", section: "projects" },
  { label: "Process", href: "/#process", section: "process" },
  { label: "Studio", href: "/#about", section: "about" },
  { label: "Insights", href: "/blog", section: null },
] as const;

/** Home-page anchors the scrollspy watches, in document order. */
const SECTIONS = ["about", "process", "projects"] as const;

/** Minimal fixed nav that gains a hairline once the user scrolls. */
export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const railRef = useRef<HTMLSpanElement>(null);

  const onHome = pathname === "/";
  // Derived, not reset in an effect: the last observed section stays in state
  // when the user navigates away, and is simply ignored off the home page.
  const activeSection = onHome ? active : null;

  /* Scroll state + read-progress rail. The rail is written straight to the
     DOM as a transform so a scroll never costs a React render. */
  useEffect(() => {
    let ticking = false;
    const measure = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (railRef.current) {
        const max =
          document.documentElement.scrollHeight - window.innerHeight;
        railRef.current.style.transform = `scaleX(${
          max > 0 ? Math.min(1, y / max) : 0
        })`;
      }
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        measure();
        ticking = false;
      });
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* Scrollspy: marks the nav link for the section currently under the nav bar.
     rootMargin pulls the detection band to the upper third of the viewport so
     a section counts as "active" while it is being read, not when it exits. */
  useEffect(() => {
    if (!onHome) return;
    const nodes = SECTIONS.map((id) => document.getElementById(id)).filter(
      (n): n is HTMLElement => Boolean(n),
    );
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5] },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [onHome]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled || open
          ? "border-b border-text/10 bg-ink/95"
          : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 md:px-12">
        <Link
          href="/#hero"
          className="group flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <span className="relative h-9 w-9 overflow-hidden rounded-full border border-copper/30 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 md:h-10 md:w-10">
            <Image
              src="/images/brand/logo-mark-round.png"
              alt={site.name}
              fill
              sizes="40px"
              priority
              className="object-cover"
            />
          </span>
          <span className="font-display text-lg font-bold uppercase tracking-tight text-text">
            ASRG<span className="text-copper">.</span>
          </span>
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {LINKS.map((l) => {
            const isActive = l.section
              ? activeSection === l.section
              : pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "group relative font-mono text-xs uppercase tracking-[0.18em] transition-colors hover:text-text",
                  isActive ? "text-text" : "text-muted",
                )}
              >
                {l.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-px w-full bg-copper transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100",
                    isActive ? "origin-left scale-x-100" : "origin-right scale-x-0",
                  )}
                />
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/#contact"
            className="group relative hidden overflow-hidden rounded-full border border-copper/50 px-5 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-copper transition-colors duration-500 hover:text-ink sm:inline-block"
          >
            <span className="absolute inset-0 z-0 origin-left scale-x-0 bg-copper transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100" />
            <span className="relative z-10">{site.yearsOfExperience} yrs · Build</span>
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav-panel"
            onClick={() => setOpen((v) => !v)}
            className="relative z-10 flex h-11 w-11 flex-col items-center justify-center gap-[6px] rounded-full border border-text/15 md:hidden"
          >
            <span
              className={cn(
                "block h-px w-5 bg-text transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                open && "translate-y-[3.5px] rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-px w-5 bg-text transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                open && "-translate-y-[3.5px] -rotate-45",
              )}
            />
          </button>
        </div>
      </nav>

      {/* Read-progress rail: how much of the page is left, at a glance.
          Pinned to top-20 (the nav bar's own height) rather than bottom-0 so it
          stays on the bar instead of dropping to the foot of the open menu. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-20 block h-px bg-copper/15"
      >
        <span
          ref={railRef}
          className="scroll-rail block h-full w-full scale-x-0 bg-copper"
        />
      </span>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-text/10 bg-ink/95 md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-8">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={
                      !l.section && pathname === l.href ? "true" : undefined
                    }
                    className={cn(
                      "flex items-center justify-between border-b border-text/10 py-4 font-display text-2xl uppercase transition-colors active:text-copper",
                      !l.section && pathname === l.href
                        ? "text-copper"
                        : "text-text",
                    )}
                  >
                    {l.label}
                    <span aria-hidden className="font-mono text-sm text-copper">
                      →
                    </span>
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="mt-6 rounded-full border border-copper/50 px-5 py-3 text-center font-mono text-xs uppercase tracking-[0.2em] text-copper active:bg-copper active:text-ink"
              >
                {site.yearsOfExperience} yrs · Start a build
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
