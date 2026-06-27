"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faqs } from "@/lib/site";
import { MagneticButton } from "@/components/MagneticButton";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative w-full px-6 py-32 md:px-12 lg:px-20">
      <div className="mx-auto grid max-w-[1300px] gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow mb-6">Answers</p>
          <h2 className="font-display text-giant uppercase leading-[0.9] text-text">
            Before
            <br />
            <span className="text-copper">you ask.</span>
          </h2>
          <p className="mt-8 max-w-xs text-muted">
            Still unsure? Talk to the team that has answered these for 46 years.
          </p>
          <div className="mt-10">
            <MagneticButton href="#contact" variant="ghost">
              Ask us directly
            </MagneticButton>
          </div>
        </div>

        <ul className="divide-y divide-text/10 border-y border-text/10">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  data-cursor="cta"
                  className="flex w-full items-center justify-between gap-6 py-7 text-left"
                >
                  <span className="font-display text-xl font-semibold uppercase text-text md:text-2xl">
                    {item.q}
                  </span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-copper/50 text-copper transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-7 text-muted">{item.a}</p>
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
