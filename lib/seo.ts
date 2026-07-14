import type { Metadata } from "next";
import { site, services, type Service } from "./site";
import { organizationNode, websiteNode, pageGraph } from "./schema";

const titleDefault = "ASRG Construction Kurnool | Best Construction Company in Andhra Pradesh";
const ogDescription = "Best Construction Company in Kurnool, Andhra Pradesh";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: titleDefault,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    site.name,
    "ASRG Construction Kurnool",
    "asrgcontruction",
    "asrgconstruction",
    "Best Construction Company Kurnool",
    "Top Builders Kurnool",
    "Construction Company",
    "Residential Construction",
    "Commercial Construction",
    "Builders",
    "Civil Contractors",
    "Interior Design",
    "Architecture",
    "Construction Company Andhra Pradesh",
    "Construction Company Kurnool",
    "civil contractors Andhra Pradesh",
    "centering contractors",
    "building contractors Kurnool",
    "construction company near me Kurnool",
    "civil contractor Nandyal",
    "building contractors Adoni",
    ...services.map((s) => `${s.title} Kurnool`),
  ],
  authors: [{ name: site.owner }],
  creator: site.owner,
  publisher: site.name,
  applicationName: site.name,
  formatDetection: { telephone: true, email: true, address: true },
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: site.name,
    description: ogDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: titleDefault,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: titleDefault,
    description: site.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "construction",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

/** Root schema.org graph — Organization + WebSite, emitted once in app/layout.tsx. */
export const rootJsonLd = pageGraph([organizationNode(), websiteNode()]);

/** Shared metadata builder for each /services/[slug] page. */
export function buildServiceMetadata(service: Service): Metadata {
  const title = `${service.title} in ${site.location.city}, ${site.location.region}`;
  const description = `${service.summary} ASRG Construction delivers ${service.title.toLowerCase()} across ${site.location.city} and ${site.location.region}, backed by ${site.yearsOfExperience} years of building experience.`;
  const url = `${site.url}/services/${service.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url,
      siteName: site.name,
      title: `${service.title} · ${site.name}`,
      description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} · ${site.name}`,
      description,
      images: ["/opengraph-image"],
    },
  };
}
