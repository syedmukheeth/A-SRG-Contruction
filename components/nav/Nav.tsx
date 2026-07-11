"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

const LINKS = [
  { label: "Work", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Studio", href: "#about" },
] as const;

/** Minimal fixed nav that gains a hairline + blur once the user scrolls. */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled
          ? "border-b border-text/10 bg-ink/70 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 md:px-12">
        <a
          href="#hero"
          className="font-display text-lg font-bold uppercase tracking-tight text-text"
        >
          A SRG<span className="text-copper">.</span>
        </a>

        <div className="hidden items-center gap-10 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative font-mono text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:text-text"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-copper transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100" />
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="group relative overflow-hidden rounded-full border border-copper/50 px-5 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-copper transition-colors duration-500 hover:text-ink"
        >
          <span className="absolute inset-0 z-0 origin-left scale-x-0 bg-copper transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100" />
          <span className="relative z-10">{site.yearsOfExperience} yrs · Build</span>
        </a>
      </nav>
    </header>
  );
}
