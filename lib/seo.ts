import type { Metadata } from "next";
import { site } from "./site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · 46 Years of Building Trust`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "construction company Kurnool",
    "civil contractors Andhra Pradesh",
    "residential construction",
    "commercial construction",
    "centering contractors",
    site.name,
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: `${site.name} · 46 Years of Building Trust`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · 46 Years of Building Trust`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

/** schema.org GeneralContractor / LocalBusiness structured data. */
export const constructionJsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: site.name,
  description: site.description,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  foundingDate: String(new Date().getFullYear() - site.yearsOfExperience),
  areaServed: {
    "@type": "City",
    name: site.location.city,
  },
  address: {
    "@type": "PostalAddress",
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
