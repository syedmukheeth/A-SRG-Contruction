import { site } from "@/lib/site";

/** Blueprint-paper contact. Direct phone/email/WhatsApp, no form. */
export function Contact() {
  const waHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    `Hi ${site.name}, I'd like to enquire about a project.`,
  )}`;

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden px-6 py-24 md:px-12 md:py-40 lg:px-20"
    >
      <div className="blueprint-grid absolute inset-0 opacity-50" />
      <div className="relative mx-auto grid max-w-[1300px] gap-16 md:grid-cols-2">
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
            <p>{site.location.address}</p>
            <p>
              {site.location.city}, {site.location.region}
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-8">
          <a
            href={`tel:${site.phone.replace(/\s+/g, "")}`}
            className="group flex items-center justify-between border-b border-text/20 pb-6 transition-colors hover:border-copper"
          >
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                Call us
              </span>
              <p className="mt-3 font-display text-3xl font-bold text-text transition-colors group-hover:text-copper">
                {site.phone}
              </p>
              <p className="mt-1 font-mono text-sm text-muted">{site.phoneAlt}</p>
            </div>
            <span className="font-mono text-copper transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>

          <a
            href={`mailto:${site.email}`}
            className="group flex items-center justify-between border-b border-text/20 pb-6 transition-colors hover:border-copper"
          >
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                Email us
              </span>
              <p className="mt-3 font-display text-2xl font-bold text-text transition-colors group-hover:text-copper">
                {site.email}
              </p>
            </div>
            <span className="font-mono text-copper transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-3 self-start rounded-full bg-copper px-10 py-5 font-mono text-xs uppercase tracking-[0.25em] text-ink transition-colors hover:bg-text"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
