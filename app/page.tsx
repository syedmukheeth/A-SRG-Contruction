import Image from "next/image";
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
import { Footer } from "@/features/footer";
import { Section } from "@/components/Section";
import { Marquee } from "@/components/Marquee";
import { site, faqs } from "@/lib/site";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

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
              A SRG Construction has shaped homes, workplaces and civic landmarks
              across Kurnool for nearly half a century: civil contracting,
              centering works, residential and commercial builds, delivered with
              the same standard since day one.
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
                A SRG Construction delivers in {site.location.city}.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Experience />
      <Marquee />
      <Services />
      <Process />
      <Projects />
      <Gallery />
      <Testimonials />
      <Faq />
      <Contact />
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
