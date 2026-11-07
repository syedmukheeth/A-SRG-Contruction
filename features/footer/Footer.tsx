import Link from "next/link";
import { Mark } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { site, services, traders, tel, whatsappHref, mapsHref } from "@/lib/site";

const studio = {
  website: "https://sampeer-studio.vercel.app/",
  instagram: "https://www.instagram.com/syedmukheeth.29/",
};

const more = [
  { href: "/#story", label: "How a building goes up" },
  { href: "/#work", label: "Finished work" },
  { href: "/best-construction-in-kurnool", label: `Choosing a builder in ${site.location.city}` },
  { href: "/blog", label: "Guides" },
];

/* One rhythm for every column: label, heading, body, contact line. */
const label = "stamp mb-5 text-plaster/55";
const heading = "font-display text-2xl leading-none text-plaster";
const body = "text-sm leading-relaxed text-plaster/75";
const contact = "font-mono text-sm text-plaster/85 transition-colors hover:text-ember";
const link = "text-sm text-plaster/75 transition-colors hover:text-ember";

export function Footer() {
  return (
    <footer id="contact" data-tone="dark" className="w-full bg-ink text-plaster">
      <div className="mx-auto max-w-[1440px] px-5 pt-20 md:px-10 md:pt-28">
        <p className="marker mb-6 text-ember">Building in {site.location.city}?</p>
        <a
          href={tel(site.phone)}
          className="font-display block text-[clamp(3rem,11vw,9.5rem)] leading-[0.85] text-plaster transition-colors hover:text-ember"
        >
          {site.phone.replace("+91 ", "")}
        </a>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
          <a href={tel(site.phoneAlt)} className={contact}>
            Also {site.phoneAlt}
          </a>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={contact}>
            WhatsApp →
          </a>
          <a href={`mailto:${site.email}`} className={contact}>
            {site.email}
          </a>
        </div>

        <div className="mt-20 grid gap-x-8 gap-y-12 border-t border-plaster/15 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {/* NAP block with microdata, matching the root Organization JSON-LD. */}
          <div itemScope itemType="https://schema.org/GeneralContractor">
            <p className={label}>Office</p>
            <p itemProp="name" className={heading}>
              {site.name}
            </p>
            <p className={`${body} mt-3`}>
              {site.owner}, {site.ownerTitle.toLowerCase()}, since {site.established}
            </p>
            <address
              itemProp="address"
              itemScope
              itemType="https://schema.org/PostalAddress"
              className={`${body} mt-3 not-italic`}
            >
              <span itemProp="streetAddress" className="block">
                {site.location.address}
              </span>
              <span itemProp="addressLocality">{site.location.city}</span>,{" "}
              <span itemProp="addressRegion">{site.location.region}</span>
            </address>
            <a href={tel(site.phone)} itemProp="telephone" className={`${contact} mt-4 block`}>
              {site.phone}
            </a>
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block font-mono text-xs uppercase tracking-[0.08em] text-ember hover:text-plaster"
            >
              Open in Maps →
            </a>
          </div>

          <div>
            <p className={label}>Materials store</p>
            <p className={heading}>{traders.name}</p>
            <p className={`${body} mt-3`}>{traders.what}</p>
            <p className={`${body} mt-3`}>{traders.address}</p>
            <a href={tel(traders.phone)} className={`${contact} mt-4 block`}>
              {traders.phone}
            </a>
            <p className="stamp mt-3 text-plaster/55">Ask for {traders.contact}</p>
          </div>

          <nav aria-label="Services">
            <p className={label}>Services in {site.location.city}</p>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.id}>
                  <Link href={`/services/${s.slug}`} className={link}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer">
            <p className={label}>More</p>
            <ul className="space-y-3">
              {more.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* pb clears the sticky mobile action bar on phones */}
      <div className="border-t border-plaster/15 px-5 pb-28 pt-8 md:px-10 md:pb-8">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-3">
            <Mark className="h-7 w-7 text-ember" detail={false} />
            <span className="stamp text-plaster/55">
              © {new Date().getFullYear()} {site.name} · {site.location.city}, {site.location.region}
            </span>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-7">
            <p className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
              <span className="stamp text-plaster/55">Created by</span>
              <span className="credit-mark whitespace-nowrap font-serif text-[1.7rem] italic leading-none text-plaster sm:text-[1.85rem]">
                SAMPeer Studio
              </span>
            </p>
            <span aria-hidden className="hidden h-12 w-px bg-plaster/15 lg:block" />
            <div className="flex flex-wrap gap-3">
              <Button href={studio.website} className="py-3.5">
                <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 fill-none stroke-current" strokeWidth={1.6}>
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
                </svg>
                Website
              </Button>
              <Button href={studio.instagram} variant="light" className="py-3.5">
                <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 fill-none stroke-current" strokeWidth={1.6}>
                  <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.3" cy="6.7" r="0.9" className="fill-current stroke-none" />
                </svg>
                Instagram
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
