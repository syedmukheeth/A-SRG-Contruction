import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { MagneticButton } from "@/components/MagneticButton";
import { site, services, stats } from "@/lib/site";
import {
  bestConstructionContent as content,
  bestConstructionSharedFaqs,
  bestConstructionProjects,
} from "@/lib/bestConstruction";
import { breadcrumbNode, faqNode, webPageNode, pageGraph } from "@/lib/schema";

const { city, region } = site.location;

const url = `${site.url}/best-construction-in-kurnool`;
// Carries the exact "best construction company in Kurnool" phrase and the brand,
// so this one page serves the whole "best construction / best construction
// company in Kurnool" query family instead of splitting it with the blog.
const title = `Best Construction Company in ${city} | ${site.name}`;
const description = `Looking for the best construction in ${city}? ASRG Construction has delivered ${stats[1].value}${stats[1].suffix} residential and commercial projects across ${city}, ${region} over ${site.yearsOfExperience} years, with stage-linked billing and a dated schedule agreed before work starts.`;

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
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
      <Section className="pt-40">
        <div className="mx-auto max-w-[1100px]">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">
              <li>
                <Link href="/" className="hover:text-copper">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-text">Best Construction in {city}</li>
            </ol>
          </nav>

          <p className="eyebrow mb-6">
            Est. {new Date().getFullYear() - site.yearsOfExperience} · {city}
          </p>
          <h1 className="font-display text-giant uppercase leading-[0.9] text-text">
            Best construction
            <br />
            <span className="text-copper">
              in {city}, {region}.
            </span>
          </h1>

          <div className="mt-12 max-w-3xl space-y-6 text-lg text-muted">
            {content.intro.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <dl className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="border-t border-copper/30 pt-5">
                <dt className="font-display text-4xl font-bold text-copper">
                  {stat.value}
                  {stat.suffix}
                </dt>
                <dd className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-muted">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-14">
            <MagneticButton href="/#contact">Talk to the team</MagneticButton>
          </div>
        </div>
      </Section>

      <Section className="surface-concrete">
        <div className="mx-auto max-w-[1100px]">
          <p className="eyebrow mb-6">What &ldquo;best&rdquo; has to mean</p>
          <h2 className="font-display text-3xl font-bold uppercase text-text md:text-4xl">
            Six things that separate a builder from a contractor
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
            {content.pillars.map((pillar) => (
              <div key={pillar.title} className="border-t border-text/10 pt-6">
                <h3 className="font-display text-xl font-semibold uppercase text-text">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-muted">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-[1100px]">
          <h2 className="font-display text-3xl font-bold uppercase text-text md:text-4xl">
            Proof, not adjectives
          </h2>
          <p className="mt-6 max-w-3xl text-muted">
            Three delivered builds in {city}, each a different brief and scale,
            all run by the same core team.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {bestConstructionProjects.map((project) => (
              <figure
                key={project.id}
                className="overflow-hidden rounded-lg border border-text/10"
              >
                <div className="relative aspect-4/3">
                  <Image
                    src={project.image}
                    alt={`${project.title}, a ${project.category.toLowerCase()} project (${project.area}) by ASRG Construction in ${project.location}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="p-4 font-mono text-xs uppercase tracking-[0.15em] text-muted">
                  {project.title} · {project.area} · {project.year}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-8">
            <Link
              href="/#projects"
              className="font-mono text-xs uppercase tracking-[0.18em] text-copper hover:underline"
            >
              See all delivered work →
            </Link>
          </p>
        </div>
      </Section>

      <Section className="surface-concrete">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="font-display text-3xl font-bold uppercase text-text md:text-4xl">
            Take this checklist to any {city} contractor
          </h2>
          <p className="mt-6 max-w-3xl text-muted">
            Including us. The answers tell you more than any advertisement in{" "}
            {city} will.
          </p>
          <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
            {content.checklist.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 border-b border-text/10 pb-4 text-muted"
              >
                <span className="mt-1 text-copper">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-[1100px]">
          <h2 className="font-display text-3xl font-bold uppercase text-text md:text-4xl">
            Where we build
          </h2>
          <p className="mt-6 max-w-3xl text-muted">{content.coverage}</p>
          <ul className="mt-12 grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex items-center justify-between border-b border-text/10 py-4 font-mono text-sm uppercase tracking-[0.12em] text-muted transition-colors hover:text-copper"
                >
                  {s.title} in {city}
                  <span className="text-copper transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="surface-concrete">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="font-display text-3xl font-bold uppercase text-text md:text-4xl">
            Best construction in {city}: FAQs
          </h2>
          <dl className="mt-8 space-y-8">
            {pageFaqs.map((f) => (
              <div key={f.q}>
                <dt className="font-display text-xl font-semibold uppercase text-text">
                  {f.q}
                </dt>
                <dd className="mt-2 max-w-2xl text-muted">{f.a}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-10">
            <Link
              href="/blog/choosing-a-civil-contractor-andhra-pradesh"
              className="font-mono text-xs uppercase tracking-[0.18em] text-copper hover:underline"
            >
              Read: how to choose a civil contractor in {region} →
            </Link>
          </p>
        </div>
      </Section>

      <Section>
        <div className="mx-auto flex max-w-[1100px] flex-col items-start gap-8">
          <h2 className="font-display text-giant uppercase leading-[0.9] text-text">
            Judge us on
            <br />
            <span className="text-copper">the answers.</span>
          </h2>
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <MagneticButton href="/#contact">Talk to the team</MagneticButton>
            <a
              href={`tel:${site.phone.replace(/\s+/g, "")}`}
              className="font-mono text-sm text-muted hover:text-copper"
            >
              {site.phone}
            </a>
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
