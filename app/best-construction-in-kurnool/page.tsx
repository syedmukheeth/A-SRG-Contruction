import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/Button";
import { LedgerPhoto } from "@/components/ui/LedgerPhoto";
import { site, services, tel } from "@/lib/site";
import {
  bestConstructionContent as content,
  bestConstructionSharedFaqs,
  bestConstructionProjects,
} from "@/lib/bestConstruction";
import { breadcrumbNode, faqNode, webPageNode, pageGraph } from "@/lib/schema";

const { city, region } = site.location;

const url = `${site.url}/best-construction-in-kurnool`;
const title = `Best Construction Company in ${city} | ${site.name}`;
const description = `Choosing a construction company in ${city}? ASRG Construction has built in ${city}, ${region} for ${site.yearsOfExperience} years. See the finished buildings, the site photos and a checklist to use with any builder.`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url,
    siteName: site.name,
    title,
    description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  },
};

const pageFaqs = [...content.faq, ...bestConstructionSharedFaqs];

const jsonLd = pageGraph([
  webPageNode({ name: title, description, url }),
  breadcrumbNode([
    { name: "Home", url: site.url },
    { name: `Best Construction in ${city}`, url },
  ]),
  faqNode(pageFaqs),
]);

export default function BestConstructionInKurnool() {
  return (
    <article>
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: `Best construction in ${city}` }]}
        marker={`Since ${site.established} · ${city}`}
        title={
          <>
            The best construction in {city}? <span className="text-laterite">Go and look.</span>
          </>
        }
      >
        {content.intro.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </PageHeader>

      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="font-display text-title text-ink">Six things worth checking</h2>
          <ol className="mt-10 grid gap-x-10 md:grid-cols-2">
            {content.pillars.map((pillar, i) => (
              <li key={pillar.title} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-ink py-7">
                <span className="font-display text-3xl leading-none text-laterite">{i + 1}</span>
                <div>
                  <h3 className="text-xl font-semibold text-ink">{pillar.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{pillar.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-rule px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-title text-ink">Three of them, standing in {city}</h2>
            <Link href="/#work" className="link-u font-medium">
              All finished work
            </Link>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {bestConstructionProjects.map((p) => (
              <LedgerPhoto
                key={p.id}
                photo={{
                  src: p.image,
                  alt: `${p.title}${p.storeys ? `, ${p.storeys}` : ""}, a ${p.category.toLowerCase()} building by ${site.name} in ${city}`,
                  width: p.width,
                  height: p.height,
                }}
                aspect="4 / 5"
                sizes="(max-width: 768px) 100vw, 33vw"
                caption={[p.title, p.storeys, p.category].filter(Boolean).join(" · ")}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-plaster-deep px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="font-display text-title text-ink">Take this list to any builder in {city}</h2>
            <p className="mt-5 text-ink-soft">Including us.</p>
          </div>
          <ul className="border-t border-ink md:col-span-7">
            {content.checklist.map((item) => (
              <li key={item} className="flex gap-4 border-b border-ink/15 py-4 text-lg text-ink">
                <span aria-hidden className="font-mono text-laterite-deep">□</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="font-display text-title text-ink">Where we build</h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">{content.coverage}</p>
          </div>
          <ul className="border-t border-ink md:col-span-6 md:col-start-7">
            {services.map((s) => (
              <li key={s.id} className="border-b border-rule">
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex items-center justify-between py-4 text-lg font-medium text-ink hover:text-laterite-deep"
                >
                  {s.title} in {city}
                  <span aria-hidden className="text-laterite-deep transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-rule px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="font-display text-title text-ink">Questions</h2>
          <dl className="mt-8 grid gap-8 md:grid-cols-2">
            {pageFaqs.map((f) => (
              <div key={f.q} className="border-t border-ink pt-5">
                <dt className="text-xl font-semibold text-ink">{f.q}</dt>
                <dd className="mt-3 text-ink-soft">{f.a}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-14 flex flex-wrap items-center gap-6">
            <Button href={tel(site.phone)}>Call {site.ownerShort}</Button>
            <Link href="/blog/choosing-a-civil-contractor-andhra-pradesh" className="link-u font-medium">
              Guide: choosing a civil contractor in {region}
            </Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </article>
  );
}
