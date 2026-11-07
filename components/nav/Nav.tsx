"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { site, tel } from "@/lib/site";
import { EASE } from "@/lib/motion";
import { ScrollTrigger } from "@/lib/gsap";
import { Logo } from "@/components/brand/Logo";

const LINKS = [
  { label: "The build", href: "/#story", section: "story" },
  { label: "Work", href: "/#work", section: "work" },
  { label: "Services", href: "/services", section: null },
  { label: "Jeelani", href: "/#jeelani", section: "jeelani" },
  { label: "Why ASRG", href: "/best-construction-in-kurnool", section: null },
  { label: "Guides", href: "/blog", section: null },
] as const;

/** Home-page anchors the scrollspy watches, in document order. */
const SECTIONS = ["story", "work", "jeelani"] as const;

/** Where the bar sits, in page px: the probe line for the tone check. */
const PROBE = 36;

export function Nav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  // Every page that opens on a dark section starts dark, so there's no flash.
  const [darkAt, setDarkAt] = useState<{ path: string; dark: boolean } | null>(null);
  const railRef = useRef<HTMLSpanElement>(null);

  const activeSection = onHome ? active : null;
  const dark = darkAt?.path === pathname ? darkAt.dark : onHome;
  const onDark = dark && !open;

  /* Scroll state, tone and read-progress rail. Dark-section bounds are cached
     and only re-measured on resize/refresh, so a scroll costs no layout read. */
  useEffect(() => {
    let ranges: [number, number][] = [];
    let ticking = false;

    const cache = () => {
      ranges = Array.from(document.querySelectorAll<HTMLElement>('[data-tone="dark"]')).map((el) => {
        const r = el.getBoundingClientRect();
        return [r.top + window.scrollY, r.bottom + window.scrollY];
      });
    };
    const measure = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const probe = y + PROBE;
      const isDark = ranges.some(([a, b]) => probe >= a && probe < b);
      setDarkAt((prev) => (prev?.path === pathname && prev.dark === isDark ? prev : { path: pathname, dark: isDark }));
      if (railRef.current) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        railRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
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
    const onResize = () => {
      cache();
      onScroll();
    };

    const settle = requestAnimationFrame(onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("load", onResize);
    ScrollTrigger.addEventListener("refresh", onResize);
    return () => {
      cancelAnimationFrame(settle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
      ScrollTrigger.removeEventListener("refresh", onResize);
    };
  }, [pathname]);

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
      data-nav-tone={onDark ? "dark" : "light"}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        open
          ? "border-rule bg-plaster"
          : onDark
            ? scrolled
              ? "border-plaster/10 bg-night"
              : "border-transparent"
            : scrolled
              ? "border-rule bg-plaster"
              : "border-transparent",
      )}
    >
      <nav className="mx-auto flex h-18 max-w-[1440px] items-center justify-between px-5 md:px-10">
        <Link
          href="/"
          aria-label={`${site.name}, home`}
          className={cn("transition-colors", onDark ? "text-plaster" : "text-ink")}
          onClick={() => setOpen(false)}
        >
          <Logo markClassName={onDark ? "text-ember" : "text-laterite"} />
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
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
                  "relative py-1 text-[15px] font-medium transition-colors",
                  onDark
                    ? isActive
                      ? "text-plaster"
                      : "text-plaster/70 hover:text-plaster"
                    : isActive
                      ? "text-ink"
                      : "text-ink-soft hover:text-ink",
                )}
              >
                {l.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-0.5 w-full transition-transform duration-300",
                    onDark ? "bg-ember" : "bg-laterite",
                    isActive ? "scale-x-100" : "scale-x-0",
                  )}
                  style={{ transformOrigin: "left" }}
                />
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={tel(site.phone)}
            className={cn(
              "hidden items-center gap-2 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.06em] transition-colors sm:inline-flex",
              onDark ? "bg-plaster text-ink hover:bg-ember hover:text-night" : "bg-ink text-plaster hover:bg-laterite",
            )}
          >
            Call {site.phone.replace("+91 ", "")}
          </a>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav-panel"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "flex h-11 w-11 flex-col items-center justify-center gap-[6px] border lg:hidden",
              onDark ? "border-plaster/30" : "border-ink/25",
            )}
          >
            {[open && "translate-y-[4px] rotate-45", open && "-translate-y-[4px] -rotate-45"].map((cls, i) => (
              <span
                key={i}
                className={cn(
                  "block h-0.5 w-5 transition-transform duration-300",
                  onDark ? "bg-plaster" : "bg-ink",
                  cls,
                )}
              />
            ))}
          </button>
        </div>
      </nav>

      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-18 block h-0.5">
        <span
          ref={railRef}
          className={cn("scroll-rail block h-full w-full scale-x-0", onDark ? "bg-ember" : "bg-laterite")}
        />
      </span>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: EASE.bezier }}
            className="overflow-hidden border-b border-rule bg-plaster lg:hidden"
          >
            <div className="flex flex-col px-5 py-6">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display flex items-center justify-between border-b border-rule py-4 text-3xl text-ink active:text-laterite"
                >
                  {l.label}
                  <span aria-hidden className="font-mono text-base text-laterite-deep">
                    →
                  </span>
                </Link>
              ))}
              <a
                href={tel(site.phone)}
                className="mt-6 bg-laterite px-5 py-4 text-center font-mono text-sm uppercase tracking-[0.06em] text-plaster"
              >
                Call {site.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
