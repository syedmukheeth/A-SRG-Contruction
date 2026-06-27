"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials, type Testimonial } from "@/lib/site";

/**
 * Luxury-villa testimonial cards. Click a villa and it opens into a
 * cinematic story panel (shared-layout expand) with the owner's quote.
 */
export function Testimonials() {
  const [active, setActive] = useState<Testimonial | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section id="testimonials" className="relative w-full px-6 py-32 md:px-12 lg:px-20">
      <div className="mx-auto max-w-[1400px]">
        <p className="eyebrow mb-6">In their words</p>
        <h2 className="mb-16 font-display text-giant uppercase leading-[0.9] text-text">
          Families who
          <br />
          <span className="text-copper">stayed.</span>
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <motion.button
              key={t.id}
              type="button"
              layoutId={`villa-${t.id}`}
              onClick={() => setActive(t)}
              data-cursor="cta"
              className="group flex flex-col overflow-hidden rounded-lg border border-text/10 bg-ink-2 text-left"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={t.image}
                  alt={`${t.project} — ${t.owner}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover soft-img group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-ink/30" />
              </div>
              <div className="flex items-center justify-between p-6">
                <div>
                  <p className="font-display text-lg font-bold uppercase text-text">
                    {t.owner}
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                    {t.project}
                  </p>
                </div>
                <span className="font-mono text-xs text-copper">Read +</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setActive(null)}
              className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
            />
            <motion.div
              layoutId={`villa-${active.id}`}
              className="relative z-10 w-full max-w-2xl overflow-hidden rounded-xl border border-copper/30 bg-ink-2"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={active.image}
                  alt={`${active.project} — ${active.owner}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 42rem"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-ink/30" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-ink-2 to-transparent" />
              </div>
              <div className="p-10">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-copper">
                  {active.project} · {active.year}
                </span>
                <blockquote className="mt-6 font-display text-2xl font-medium leading-snug text-text md:text-3xl">
                  “{active.quote}”
                </blockquote>
                <p className="mt-8 font-mono text-sm uppercase tracking-[0.18em] text-muted">
                  — {active.owner}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close story"
                onClick={() => setActive(null)}
                data-cursor="cta"
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-text/20 text-text transition-colors hover:border-copper hover:text-copper"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
