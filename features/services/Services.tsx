import Image from "next/image";
import Link from "next/link";
import { services, site } from "@/lib/site";

/** Services as ledger rows: title, one honest line, and a thumbnail of real work. */
export function ServiceList({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <ul className="border-t border-ink">
      {services.map((s) => (
        <li key={s.id} className="border-b border-rule">
          <Link
            href={`/services/${s.slug}`}
            className="group grid grid-cols-[1fr_auto] items-center gap-5 py-6 md:grid-cols-[5.5rem_1fr_1.2fr_auto] md:gap-8 md:py-7"
          >
            <span className="relative hidden aspect-square w-[5.5rem] overflow-hidden bg-plaster-deep md:block">
              <Image src={s.image} alt="" fill sizes="88px" className="object-cover" />
            </span>
            <Heading className="font-display text-[clamp(1.8rem,3.4vw,2.9rem)] leading-[0.95] text-ink transition-colors group-hover:text-laterite">
              {s.title}
            </Heading>
            <p className="col-span-2 row-start-2 max-w-md text-ink-soft md:col-span-1 md:row-start-auto">
              {s.summary}
            </p>
            <span
              aria-hidden
              className="col-start-2 row-start-1 font-mono text-lg text-laterite-deep transition-transform duration-200 group-hover:translate-x-1 md:col-start-auto md:row-start-auto"
            >
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="border-t border-rule">
      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="marker">What we take on</p>
            <h2 id="services-title" className="font-display mt-6 text-display text-ink">
              Six kinds of work.
            </h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-ink-soft md:col-span-5 md:self-end">
            All of it in and around {site.location.city}, all of it by the same team.
          </p>
        </div>
        <div className="mt-14">
          <ServiceList />
        </div>
      </div>
    </section>
  );
}
