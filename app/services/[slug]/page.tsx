import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { MagneticButton } from "@/components/MagneticButton";
import { site, services } from "@/lib/site";
import { buildServiceMetadata } from "@/lib/seo";
import { breadcrumbNode, faqNode, serviceNode, pageGraph } from "@/lib/schema";
import {
  serviceContent,
  getServiceBySlug,
  getFeaturedProjects,
  getFaqsByQuestions,
} from "@/lib/serviceContent";

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { robots: { index: false, follow: false } };
  return buildServiceMetadata(service);
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  const content = serviceContent[slug];
  if (!service || !content) notFound();

  const featuredProjects = getFeaturedProjects(content.featured.projectIds);
  const pageFaqs = getFaqsByQuestions(content.faqQuestions);
  const relatedServices = content.related
    .map((relSlug) => services.find((s) => s.slug === relSlug))
    .filter((s): s is (typeof services)[number] => Boolean(s));

  const jsonLd = pageGraph([
    breadcrumbNode([
      { name: "Home", url: site.url },
      { name: "Services", url: `${site.url}/services` },
      { name: service.title, url: `${site.url}/services/${service.slug}` },
    ]),
    serviceNode(service),
    ...(pageFaqs.length ? [faqNode(pageFaqs)] : []),
  ]);

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
              <li>
                <Link href="/services" className="hover:text-copper">
                  Services
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-text">{service.title}</li>
            </ol>
          </nav>

          <p className="eyebrow mb-6">{service.blueprint}</p>
          <h1 className="font-display text-giant uppercase leading-[0.9] text-text">
            {service.title}
            <br />
            <span className="text-copper">
              in {site.location.city}, {site.location.region}
            </span>
          </h1>

          <div className="mt-12 max-w-3xl space-y-6 text-lg text-muted">
            {content.intro.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section className="surface-concrete">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="font-display text-3xl font-bold uppercase text-text md:text-4xl">
            What&apos;s included
          </h2>
          <ul className="mt-8 grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
            {content.included.map((item) => (
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
            Our process for {service.title.toLowerCase()}
          </h2>
          <p className="mt-6 max-w-3xl text-muted">{content.process}</p>
          <p className="mt-4">
            <Link
              href="/#process"
              className="font-mono text-xs uppercase tracking-[0.18em] text-copper hover:underline"
            >
              See all eight build stages →
            </Link>
          </p>
        </div>
      </Section>

      <Section className="surface-concrete">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="font-display text-3xl font-bold uppercase text-text md:text-4xl">
            Building in {site.location.city} &amp; {site.location.region}
          </h2>
          <p className="mt-6 max-w-3xl text-muted">{content.local}</p>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-[1100px]">
          <h2 className="font-display text-3xl font-bold uppercase text-text md:text-4xl">
            Featured work
          </h2>
          {featuredProjects.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
              {featuredProjects.map((project) => (
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
          ) : (
            <p className="mt-6 max-w-3xl text-muted">{content.featured.note}</p>
          )}
        </div>
      </Section>

      {pageFaqs.length > 0 && (
        <Section className="surface-concrete">
          <div className="mx-auto max-w-[1100px]">
            <h2 className="font-display text-3xl font-bold uppercase text-text md:text-4xl">
              {service.title} FAQs
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
          </div>
        </Section>
      )}

      <Section>
        <div className="mx-auto max-w-[1100px]">
          <h2 className="font-display text-3xl font-bold uppercase text-text md:text-4xl">
            Related services
          </h2>
          <ul className="mt-8 flex flex-wrap gap-4">
            {relatedServices.map((rel) => (
              <li key={rel.slug}>
                <Link
                  href={`/services/${rel.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-text/20 px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:border-copper hover:text-copper"
                >
                  {rel.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="surface-concrete">
        <div className="mx-auto flex max-w-[1100px] flex-col items-start gap-8">
          <h2 className="font-display text-giant uppercase leading-[0.9] text-text">
            Start your
            <br />
            <span className="text-copper">{service.title.toLowerCase()}.</span>
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
