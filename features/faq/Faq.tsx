"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faqs, site } from "@/lib/site";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-rule">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 md:grid-cols-12 md:gap-8 md:px-10 md:py-28">
        <div className="md:col-span-4">
          <p className="marker">Questions</p>
          <h2 id="faq-title" className="font-display mt-6 text-display text-ink">
            Asked often.
          </h2>
          <p className="mt-6 max-w-xs text-ink-soft">
            Anything else, call {site.phone}.
          </p>
        </div>

        <ul className="border-t border-ink md:col-span-8">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            const id = `faq-${i}`;
            return (
              <li key={item.q} className="border-b border-rule">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={id}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-xl font-semibold text-ink md:text-2xl">{item.q}</span>
                  <span
                    aria-hidden
                    className={`font-mono text-2xl leading-none text-laterite-deep transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={id}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 text-lg leading-relaxed text-ink-soft">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
