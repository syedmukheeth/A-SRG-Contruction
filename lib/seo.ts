import type { Metadata } from "next";
import { site } from "./site";

const titleDefault = `${site.name} · 46 Years of Building Trust`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: titleDefault,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "construction company Kurnool",
    "civil contractors Andhra Pradesh",
    "residential construction",
    "commercial construction",
    "centering contractors",
    "building contractors Kurnool",
    site.name,
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
    title: titleDefault,
    description: site.description,
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
};

/** schema.org GeneralContractor / LocalBusiness structured data. */
export const constructionJsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": `${site.url}/#organization`,
  name: site.name,
  legalName: site.legalName,
  description: site.description,
  url: site.url,
  image: `${site.url}${site.ownerImage}`,
  logo: `${site.url}/favicon.ico`,
  email: site.email,
  telephone: site.phone,
  priceRange: "₹₹",
  foundingDate: String(new Date().getFullYear() - site.yearsOfExperience),
  founder: {
    "@type": "Person",
    name: site.owner,
    jobTitle: site.ownerTitle,
  },
  areaServed: {
    "@type": "City",
    name: site.location.city,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: site.location.address,
    addressLocality: site.location.city,
    addressRegion: site.location.region,
    addressCountry: site.location.country,
  },
  knowsAbout: [
    "Civil Contracting",
    "Centering Works",
    "Residential Construction",
    "Commercial Construction",
  ],
} as const;
