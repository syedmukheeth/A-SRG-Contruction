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
        <div className="mx-auto max-w-[1100px]">
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
