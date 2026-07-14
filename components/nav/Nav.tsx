"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

const LINKS = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/#projects" },
  { label: "Process", href: "/#process" },
  { label: "Studio", href: "/#about" },
  { label: "Insights", href: "/blog" },
] as const;

/** Minimal fixed nav that gains a hairline + blur once the user scrolls. */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          ? "border-b border-text/10 bg-ink/70 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 md:px-12">
        <Link
          href="/"
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
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group relative font-mono text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:text-text"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-copper transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100" />
            </Link>
          ))}
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

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-text/10 bg-ink/95 backdrop-blur-md md:hidden"
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
                    className="block border-b border-text/10 py-4 font-display text-2xl uppercase text-text transition-colors active:text-copper"
                  >
                    {l.label}
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
