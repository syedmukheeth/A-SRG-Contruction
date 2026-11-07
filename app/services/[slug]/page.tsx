import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/Button";
import { LedgerPhoto } from "@/components/ui/LedgerPhoto";
import { site, services, tel } from "@/lib/site";
import { buildServiceMetadata } from "@/lib/seo";
import { breadcrumbNode, faqNode, serviceNode, pageGraph } from "@/lib/schema";
import {
  serviceContent,
  getServiceBySlug,
  getFeaturedProjects,
  getPhotos,
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

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  const content = serviceContent[slug];
  if (!service || !content) notFound();

  const projects = getFeaturedProjects(content.projectIds);
  const photos = getPhotos(content.photoSrcs);
  const pageFaqs = getFaqsByQuestions(content.faqQuestions);
  const related = content.related
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
      <PageHeader
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
        marker={`${service.title} · ${site.location.city}`}
        title={
          <>
            {service.title} in <span className="text-laterite">{site.location.city}.</span>
          </>
        }
      >
        {content.intro.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </PageHeader>

      {(projects.length > 0 || photos.length > 0) && (
        <section className="px-5 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-[1280px]">
            <p className="marker">{projects.length ? "Built by ASRG" : "From ASRG sites"}</p>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {projects.map((p) => (
                <LedgerPhoto
                  key={p.id}
                  photo={{
                    src: p.image,
                    alt: `${p.title}${p.storeys ? `, ${p.storeys}` : ""}, a ${p.category.toLowerCase()} building by ${site.name} in ${site.location.city}`,
                    width: p.width,
                    height: p.height,
                  }}
                  aspect="4 / 5"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  caption={[p.title, p.storeys].filter(Boolean).join(" · ")}
                />
              ))}
              {photos.map((photo, i) => (
                <LedgerPhoto
                  key={photo.src}
                  photo={photo}
                  aspect={i === 0 && !projects.length ? "16 / 9" : "4 / 5"}
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className={i === 0 && !projects.length ? "md:col-span-2" : undefined}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-rule px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="font-display text-title text-ink">What&apos;s included</h2>
            <ul className="mt-8 border-t border-ink">
              {content.included.map((item) => (
                <li key={item} className="flex gap-4 border-b border-rule py-4 text-ink-soft">
                  <span aria-hidden className="mt-2.5 h-0.5 w-4 shrink-0 bg-laterite" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <h2 className="font-display text-title text-ink">How it runs</h2>
            <p className="mt-8 text-lg leading-relaxed text-ink-soft">{content.process}</p>
            <Link href="/#story" className="link-u mt-6 inline-block font-medium">
              Follow a build from ground to handover
            </Link>
          </div>
        </div>
      </section>

      {pageFaqs.length > 0 && (
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
          </div>
        </section>
      )}

      <section className="border-t border-rule px-5 py-16 md:px-10 md:py-20">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="stamp mb-4">Related</p>
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {related.map((rel) => (
                <li key={rel.slug}>
                  <Link href={`/services/${rel.slug}`} className="link-u text-lg font-medium">
                    {rel.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Button href={tel(site.phone)}>Call about {service.title.toLowerCase()}</Button>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </article>
  );
}
