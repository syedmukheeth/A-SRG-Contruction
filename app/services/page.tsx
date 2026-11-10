import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ServiceList } from "@/features/services/Services";
import { site } from "@/lib/site";
import { breadcrumbNode, pageGraph } from "@/lib/schema";

const url = `${site.url}/services`;
const title = `Construction Services & Building Contractors in ${site.location.city}`;
const description = `What ASRG Construction builds in ${site.location.city}, ${site.location.region}: house and commercial construction, civil contracting, centering works, renovation and consultation.`;

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
      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        marker="What we take on"
        title={
          <>
            Construction services in <span className="text-laterite">{site.location.city}.</span>
          </>
        }
      >
        <p>
          Six kinds of work, one team. Each page below covers what is included and shows real
          ASRG work for that service.
        </p>
      </PageHeader>

      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1280px]">
          <ServiceList headingLevel="h2" />
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </article>
  );
}
