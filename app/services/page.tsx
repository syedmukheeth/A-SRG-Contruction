import Link from "next/link";
import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { ServiceCard } from "@/features/services/ServiceCard";
import { site, services } from "@/lib/site";
import { breadcrumbNode, pageGraph } from "@/lib/schema";

const url = `${site.url}/services`;
const title = `Construction Services in ${site.location.city}, ${site.location.region}`;
const description = `Every construction service ASRG Construction offers in ${site.location.city} and across ${site.location.region}: residential and commercial construction, civil contracting, centering works, renovation and consultation.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url,
    siteName: site.name,
    title: `Services · ${site.name}`,
    description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Services · ${site.name}`,
    description,
    images: ["/opengraph-image"],
  },
};

const jsonLd = pageGraph([
  breadcrumbNode([
    { name: "Home", url: site.url },
    { name: "Services", url },
  ]),
]);

export default function ServicesIndex() {
  return (
    <article>
      <Section className="pt-40">
        <div className="mx-auto max-w-[1300px]">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">
              <li>
                <Link href="/" className="hover:text-copper">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-text">Services</li>
            </ol>
          </nav>

          <p className="eyebrow mb-6">What we build</p>
          <h1 className="font-display text-giant uppercase leading-[0.9] text-text">
            Construction services
            <br />
            <span className="text-copper">
              in {site.location.city}, {site.location.region}.
            </span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted">
            {site.name} runs six disciplines under one team: residential
            construction, commercial construction, civil contracting, centering
            works, renovation and consultation. Every service page below
            breaks down exactly what&apos;s included, how the build process
            applies to that service, and the local {site.location.city} context
            that shapes it.
          </p>

          <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} />
            ))}
          </div>
        </div>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}
