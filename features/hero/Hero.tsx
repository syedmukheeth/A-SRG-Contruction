import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { site, heroPhoto, tel, whatsappHref } from "@/lib/site";

const lines = ["Built in", "Kurnool,"] as const;

/**
 * Server-rendered hero. The headline is the LCP element, so its reveal is pure
 * CSS (.hero-line) and starts on first paint. The last line drops into the sky
 * of the site photo below it.
 */
export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-24 md:pt-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="hero-fade stamp flex justify-between border-b border-rule pb-3">
          <span>
            {site.name} · {site.location.city}, {site.location.region}
          </span>
          <span className="hidden sm:block">
            {site.ownerShort} · {site.ownerTitle}
          </span>
        </div>

        <h1 className="font-display relative z-10 mt-6 text-hero text-ink md:mt-8">
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.04em]">
              <span className="hero-line block" style={{ animationDelay: `${i * 80}ms` }}>
                {line}
              </span>
            </span>
          ))}
          <span className="-mb-[0.38em] block overflow-hidden pb-[0.04em] md:-mb-[0.5em]">
            <span className="hero-line block text-laterite" style={{ animationDelay: "160ms" }}>
              since {site.established}.
            </span>
          </span>
        </h1>
      </div>

      <div className="hero-photo relative aspect-[4/3] w-full sm:aspect-[16/8] lg:aspect-[1600/598]">
        <Image
          src={heroPhoto.src}
          alt={heroPhoto.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_60%]"
        />
      </div>

      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <p className="stamp mt-3">{heroPhoto.stamp} · column cages curing on an ASRG site</p>

        <div className="mt-10 grid gap-8 pb-16 md:mt-14 md:grid-cols-[1fr_auto] md:items-end md:pb-24">
          <p className="hero-fade max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl" style={{ animationDelay: "350ms" }}>
            A construction company in {site.location.city} run by {site.owner} for{" "}
            {site.yearsOfExperience} years. Houses, shops and multi-storey blocks, from the
            footings to the day the lights come on.
          </p>
          <div className="hero-fade flex flex-wrap gap-3" style={{ animationDelay: "450ms" }}>
            <Button href={tel(site.phone)}>Call {site.phone.replace("+91 ", "")}</Button>
            <Button href={whatsappHref} variant="line">
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
