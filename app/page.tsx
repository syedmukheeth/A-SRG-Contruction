import type { Metadata } from "next";
import { Hero } from "@/features/hero";
import { Story } from "@/features/story";
import { Work } from "@/features/work";
import { DrawingBoard } from "@/features/drawing-board";
import { Owner } from "@/features/owner";
import { Services } from "@/features/services";
import { Traders } from "@/features/traders";
import { Faq } from "@/features/faq";
import { site, faqs } from "@/lib/site";
import { breadcrumbNode, faqNode, pageGraph } from "@/lib/schema";

const title = `ASRG Construction Kurnool | Construction Company & Civil Contractor since ${site.established}`;

export const metadata: Metadata = {
  title: { absolute: title },
  description: site.description,
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title,
    description: site.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    images: ["/opengraph-image"],
  },
};

const homeJsonLd = pageGraph([breadcrumbNode([{ name: "Home", url: site.url }]), faqNode(faqs)]);

export default function Home() {
  return (
    <>
      <Hero />
      <Story />
      <Work />
      <DrawingBoard />
      <Owner />
      <Services />
      <Traders />
      <Faq />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }} />
    </>
  );
}
