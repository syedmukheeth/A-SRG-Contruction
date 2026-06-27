"use client";

import { useState } from "react";
import { gsap } from "@/lib/gsap";
import { site } from "@/lib/site";

const FIELDS = [
  { name: "name", label: "Your name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone", type: "tel" },
] as const;

/**
 * Blueprint-paper contact. Client-only for this milestone — wiring to
 * Resend lands later. Submit shows an in-place confirmation.
 */
export function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    gsap.fromTo(
      "#contact-confirm",
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
    );
  };

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden px-6 py-40 md:px-12 lg:px-20"
    >
      <div className="blueprint-grid absolute inset-0 opacity-50" />
      <div className="relative mx-auto grid max-w-[1300px] gap-16 lg:grid-cols-2">
        <div>
          <p className="eyebrow mb-6">Start here</p>
          <h2 className="font-display text-giant uppercase leading-[0.88] text-text">
            Build my
            <br />
            <span className="text-copper">dream.</span>
          </h2>
          <p className="mt-8 max-w-sm text-muted">
            Tell us about the land, the brief, the deadline. We&apos;ll bring 46
            years to the table.
          </p>
          <div className="mt-12 space-y-2 font-mono text-sm text-muted">
            <p>{site.email}</p>
            <p>
              {site.location.city}, {site.location.region}
            </p>
          </div>
        </div>

        {sent ? (
          <div
            id="contact-confirm"
            className="flex flex-col justify-center rounded-lg border border-copper/40 bg-ink-2/60 p-10"
          >
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-copper">
              Received
            </span>
            <p className="mt-4 font-display text-3xl font-bold uppercase text-text">
              We&apos;ll be in touch.
            </p>
            <p className="mt-3 text-muted">
              Your enquiry is logged. Expect a call within one working day.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col gap-8">
            {FIELDS.map((f) => (
              <label key={f.name} className="group block">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                  {f.label}
                </span>
                <input
                  required
                  type={f.type}
                  name={f.name}
                  className="mt-3 w-full border-b border-text/20 bg-transparent pb-3 text-lg text-text outline-none transition-colors placeholder:text-muted/40 focus:border-copper"
                  placeholder="—"
                />
              </label>
            ))}
            <label className="block">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                Your project
              </span>
              <textarea
                required
                name="message"
                rows={3}
                className="mt-3 w-full resize-none border-b border-text/20 bg-transparent pb-3 text-lg text-text outline-none transition-colors placeholder:text-muted/40 focus:border-copper"
                placeholder="—"
              />
            </label>
            <button
              type="submit"
              data-cursor="cta"
              className="mt-4 self-start rounded-full bg-copper px-10 py-5 font-mono text-xs uppercase tracking-[0.25em] text-ink transition-colors hover:bg-text"
            >
              Build My Dream
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
