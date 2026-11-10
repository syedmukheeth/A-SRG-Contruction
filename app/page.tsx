import type { Metadata, Viewport } from "next";
import { Hero } from "@/features/hero";
import { Manifesto } from "@/features/manifesto";
import { Story } from "@/features/story";
import { Work } from "@/features/work";
import { DrawingBoard } from "@/features/drawing-board";
import { Owner } from "@/features/owner";
import { Services } from "@/features/services";
import { Traders } from "@/features/traders";
import { Faq } from "@/features/faq";
import { site, faqs } from "@/lib/site";
import { breadcrumbNode, faqNode, pageGraph } from "@/lib/schema";
import { titleDefault } from "@/lib/seo";

const title = titleDefault;
// Written for the search result: who, what, where, since when, how to reach.
const description = `${site.name}: construction company and builders in ${site.location.city}, ${site.location.region} since ${site.established}. House construction, commercial buildings, civil and centering work. Call ${site.phone}.`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title,
    description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  themeColor: "#15161a",
};

const homeJsonLd = pageGraph([breadcrumbNode([{ name: "Home", url: site.url }]), faqNode(faqs)]);

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Story />
      <Work />
      <Owner />
      <DrawingBoard />
      <Services />
      <Traders />
      <Faq />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }} />
    </>
  );
}
