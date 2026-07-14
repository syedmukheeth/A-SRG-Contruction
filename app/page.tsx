import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/features/hero";
import { Journey } from "@/features/journey";
import { Experience } from "@/features/experience";
import { Services } from "@/features/services";
import { Process } from "@/features/process";
import { Projects } from "@/features/projects";
import { Gallery } from "@/features/gallery";
import { Testimonials } from "@/features/testimonials";
import { Faq } from "@/features/faq";
import { Contact } from "@/features/contact";
import { Section } from "@/components/Section";
import { Marquee } from "@/components/Marquee";
import { site, faqs, services } from "@/lib/site";
import { breadcrumbNode, faqNode, pageGraph } from "@/lib/schema";

export const metadata: Metadata = {
  title: `ASRG Construction Kurnool | Best Construction Company in ${site.location.region}`,
  description: site.description,
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: `ASRG Construction Kurnool | Best Construction Company`,
    description: site.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `ASRG Construction Kurnool | Best Construction Company`,
    description: site.description,
    images: ["/opengraph-image"],
  },
};

const homeJsonLd = pageGraph([
  breadcrumbNode([{ name: "Home", url: site.url }]),
  faqNode(faqs),
]);

export default function Home() {
  return (
    <>
      <Hero />

      <Journey />

      <Section id="about" className="surface-concrete" revealChildren>
        <div className="mx-auto grid max-w-[1300px] gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="eyebrow mb-8">
              Est. {new Date().getFullYear() - site.yearsOfExperience} ·{" "}
              {site.location.city}
            </p>
            <h2 className="font-display text-giant uppercase leading-[0.95] text-text">
              We don&apos;t build houses.
              <br />
              <span className="text-copper">We build legacies.</span>
            </h2>
            <p className="mt-10 max-w-xl text-lg text-muted">
              ASRG Construction has shaped homes, workplaces and civic landmarks
              across Kurnool for nearly half a century: civil contracting,
              centering works, residential and commercial builds, delivered with
              the same standard since day one.
            </p>
            <p className="mt-6 max-w-xl text-muted">
              Headquartered at {site.location.address}, {site.location.city},
              ASRG Construction builds across {site.location.region}. For
              landmark projects, the team mobilises statewide. Every project,
              from a single villa to a multi-storey commercial block, runs
              through the same eight-stage process, the same site team, and the
              same dated schedule agreed before the first foundation is dug.
            </p>
          </div>

          <div className="relative">
            <div className="relative aspect-3/4 w-full max-w-sm overflow-hidden rounded-lg border border-copper/30">
              <Image
                src={site.ownerImage}
                alt={`${site.owner}, ${site.ownerTitle} at ${site.name}`}
                fill
                sizes="(max-width: 1024px) 100vw, 24rem"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-ink/80 to-transparent" />
            </div>
            <div className="mt-6">
              <p className="font-display text-2xl font-bold uppercase text-text">
                {site.owner}
              </p>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-copper">
                {site.ownerTitle}
              </p>
              <p className="mt-3 max-w-sm font-mono text-sm text-muted">
                {site.yearsOfExperience} years on site, hands on every project
                ASRG Construction delivers in {site.location.city}.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Experience />
      <Marquee />
      <Services />

      <Section id="local" className="surface-concrete" revealChildren>
        <div className="mx-auto max-w-[1300px]">
          <p className="eyebrow mb-6">Where we build</p>
          <h2 className="font-display text-giant uppercase leading-[0.9] text-text">
            A construction company
            <br />
            <span className="text-copper">in Kurnool, built statewide.</span>
          </h2>
          <p className="mt-8 max-w-2xl text-lg text-muted">
            As a construction company in Kurnool, ASRG Construction is the team
            homeowners and businesses across Andhra Pradesh call first for
            residential construction, commercial construction, civil
            contracting, centering works, renovation and villa construction.
            Every service below links to a full breakdown of scope, process
            and delivered work.
          </p>
          <p className="mt-4 max-w-2xl text-muted">
            Searching for a construction company near you in Kurnool? Our site
            team also covers Nandyal, Adoni and the wider Kurnool district for
            civil contracting and residential builds.
          </p>
          <ul className="mt-12 grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex items-center justify-between border-b border-text/10 py-4 font-mono text-sm uppercase tracking-[0.12em] text-muted transition-colors hover:text-copper"
                >
                  {s.title} in {site.location.city}
                  <span className="text-copper transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Process />
      <Projects />
      <Gallery />
      <Testimonials />
      <Faq />
      <Contact />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
    </>
  );
}
