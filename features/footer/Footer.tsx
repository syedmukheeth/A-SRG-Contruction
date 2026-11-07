import Link from "next/link";
import { Mark, Seal } from "@/components/brand/Logo";
import { site, services, traders, tel, whatsappHref, mapsHref } from "@/lib/site";

export function Footer() {
  return (
    <footer id="contact" data-tone="dark" className="relative w-full overflow-hidden bg-ink text-plaster">
      <Seal className="pointer-events-none absolute -right-10 top-12 hidden w-56 text-plaster/25 md:block lg:right-10" />
      <div className="relative mx-auto max-w-[1440px] px-5 pb-10 pt-20 md:px-10 md:pt-28">
        <p className="marker text-ember mb-6">Building in {site.location.city}?</p>
        <a
          href={tel(site.phone)}
          className="font-display block text-[clamp(3rem,11vw,9.5rem)] leading-[0.85] text-plaster transition-colors hover:text-ember"
        >
          {site.phone.replace("+91 ", "")}
        </a>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-sm">
          <a href={tel(site.phoneAlt)} className="text-plaster/80 hover:text-ember">
            Also {site.phoneAlt}
          </a>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="text-plaster/80 hover:text-ember">
            WhatsApp →
          </a>
          <a href={`mailto:${site.email}`} className="text-plaster/80 hover:text-ember">
            {site.email}
          </a>
        </div>

        <div className="mt-20 grid gap-12 border-t border-plaster/15 pt-12 md:grid-cols-2 lg:grid-cols-4">
          {/* NAP block with microdata, matching the root Organization JSON-LD. */}
          <div itemScope itemType="https://schema.org/GeneralContractor">
            <div className="flex items-center gap-3">
              <Mark className="h-10 w-10 text-ember" />
              <p itemProp="name" className="font-display text-2xl leading-none">
                {site.name}
              </p>
            </div>
            <p className="mt-4 text-sm text-plaster/70">
              {site.owner}, {site.ownerTitle.toLowerCase()}. Since {site.established}.
            </p>
            <address
              itemProp="address"
              itemScope
              itemType="https://schema.org/PostalAddress"
              className="mt-5 text-sm not-italic leading-relaxed text-plaster/80"
            >
              <span itemProp="streetAddress" className="block">
                {site.location.address}
              </span>
              <span className="block">
                <span itemProp="addressLocality">{site.location.city}</span>,{" "}
                <span itemProp="addressRegion">{site.location.region}</span>
              </span>
            </address>
            <a href={tel(site.phone)} itemProp="telephone" className="mt-3 block font-mono text-sm text-plaster/80 hover:text-ember">
              {site.phone}
            </a>
            <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block font-mono text-xs uppercase tracking-[0.08em] text-ember hover:underline">
              Open in Maps →
            </a>
          </div>

          <div>
            <p className="stamp text-plaster/60 mb-5">Materials store</p>
            <p className="font-display text-2xl leading-none">{traders.name}</p>
            <p className="mt-3 text-sm text-plaster/80">{traders.what}</p>
            <p className="mt-3 text-sm leading-relaxed text-plaster/80">{traders.address}</p>
            <a href={tel(traders.phone)} className="mt-3 block font-mono text-sm text-plaster/80 hover:text-ember">
              {traders.contact} · {traders.phone}
            </a>
          </div>

          <nav aria-label="Services">
            <p className="stamp text-plaster/60 mb-5">Services in {site.location.city}</p>
            <ul className="space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.id}>
                  <Link href={`/services/${s.slug}`} className="text-plaster/80 hover:text-ember">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer">
            <p className="stamp text-plaster/60 mb-5">More</p>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/#story", label: "How a building goes up" },
                { href: "/#work", label: "Finished work" },
                { href: "/best-construction-in-kurnool", label: `Choosing a builder in ${site.location.city}` },
                { href: "/blog", label: "Guides" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-plaster/80 hover:text-ember">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* pb clears the sticky mobile action bar on phones */}
      <div className="border-t border-plaster/15 px-5 pb-24 pt-6 md:px-10 md:pb-6">
        <div className="stamp text-plaster/55 mx-auto flex max-w-[1440px] flex-col gap-2 md:flex-row md:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name} · {site.location.city}, {site.location.region}
          </span>
          <span>
            Site by{" "}
            <a
              href="https://www.linkedin.com/in/syedmukheeth/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-ember"
            >
              Sampeer Studio
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
