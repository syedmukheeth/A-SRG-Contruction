"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { site, tel } from "@/lib/site";

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

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const railRef = useRef<HTMLSpanElement>(null);

  const onHome = pathname === "/";
  const activeSection = onHome ? active : null;

  /* Scroll state + read-progress rail, written straight to the DOM so a
     scroll never costs a React render. */
  useEffect(() => {
    let ticking = false;
    const measure = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
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
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

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
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open ? "border-b border-rule bg-plaster" : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex h-18 max-w-[1440px] items-center justify-between px-5 md:px-10">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="relative h-9 w-9 overflow-hidden rounded-full">
            <Image
              src="/images/brand/logo-mark-round.png"
              alt=""
              fill
              sizes="36px"
              priority
              className="object-cover"
            />
          </span>
          <span className="font-display text-xl leading-none text-ink">
            ASRG <span className="text-laterite">Construction</span>
          </span>
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
                  "relative py-1 text-[15px] font-medium transition-colors hover:text-ink",
                  isActive ? "text-ink" : "text-ink-soft",
                )}
              >
                {l.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-0.5 w-full bg-laterite transition-transform duration-300",
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
            className="hidden items-center gap-2 bg-ink px-4 py-2.5 font-mono text-xs uppercase tracking-[0.06em] text-plaster transition-colors hover:bg-laterite sm:inline-flex"
          >
            Call {site.phone.replace("+91 ", "")}
          </a>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav-panel"
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-[6px] border border-ink/25 lg:hidden"
          >
            <span
              className={cn(
                "block h-0.5 w-5 bg-ink transition-transform duration-300",
                open && "translate-y-[4px] rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-5 bg-ink transition-transform duration-300",
                open && "-translate-y-[4px] -rotate-45",
              )}
            />
          </button>
        </div>
      </nav>

      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-18 block h-0.5">
        <span ref={railRef} className="scroll-rail block h-full w-full scale-x-0 bg-laterite" />
      </span>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
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
