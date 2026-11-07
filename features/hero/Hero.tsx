import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Mark } from "@/components/brand/Logo";
import { site, heroPortrait, coordinates, tel, whatsappHref } from "@/lib/site";
import { HeroMotion } from "./HeroMotion";

const lines = [
  { text: "Built in", accent: false },
  { text: `${site.location.city},`, accent: false },
  { text: `since ${site.established}.`, accent: true },
] as const;

/**
 * Server-rendered, full-viewport night stage. The headline is the LCP element,
 * so its reveal stays pure CSS. The portrait is only 720px wide, so on desktop
 * it fills a column sized to its own pixels instead of the whole screen.
 */
export function Hero() {
  return (
    <section
      id="hero"
      data-tone="dark"
      aria-labelledby="hero-title"
      className="relative isolate h-[100svh] min-h-[640px] overflow-hidden bg-night text-plaster"
    >
      {/* Site-board rules: the 12-column grid, drawn faintly. */}
      <div aria-hidden className="hero-rules pointer-events-none absolute inset-0 hidden md:block" />

      <div className="absolute inset-0 md:left-auto md:w-[min(calc(100svh*0.72),54vw)]">
        <div data-hero-photo className="absolute inset-0 will-change-transform">
          <div className="hero-kenburns absolute inset-0">
            <Image
              src={heroPortrait.src}
              alt={heroPortrait.alt}
              fill
              preload
              quality={85}
              sizes="(max-width: 767px) 100vw, 54vw"
              className="object-cover object-[46%_30%]"
            />
          </div>
        </div>
        <div aria-hidden className="hero-shade absolute inset-0" />
        <div aria-hidden className="hero-veil absolute inset-0 bg-night" />
        <p className="hero-fade stamp absolute bottom-10 right-28 hidden text-right text-plaster/75 md:block" style={{ animationDelay: "900ms" }}>
          <span className="block text-plaster">{site.owner}</span>
          {heroPortrait.stamp}
        </p>
      </div>

      <div aria-hidden className="grain pointer-events-none absolute inset-0" />
      <div aria-hidden data-hero-dim className="pointer-events-none absolute inset-0 bg-night opacity-0" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col px-5 pb-7 pt-24 md:px-10 md:pb-10 md:pt-28">
        <div className="hero-fade stamp flex justify-between gap-4 border-b border-plaster/15 pb-3 text-plaster/70">
          <span>
            {site.ownerShort} · {site.ownerTitle}
          </span>
          <span className="hidden sm:block">
            {coordinates} · {site.location.city}
          </span>
        </div>

        <h1
          id="hero-title"
          className="font-display mt-auto text-[clamp(3.3rem,min(12vw,17svh),11.5rem)] leading-[0.84] md:max-w-[11ch]"
        >
          {lines.map((line, i) => (
            <span key={line.text} data-hero-line className="block overflow-hidden pb-[0.04em]">
              <span
                className={line.accent ? "hero-line block text-ember" : "hero-line block"}
                style={{ animationDelay: `${120 + i * 90}ms` }}
              >
                {line.text}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-7 grid gap-6 md:mt-10 md:grid-cols-[minmax(0,34rem)_1fr] md:items-end">
          <div className="hero-fade" style={{ animationDelay: "420ms" }}>
            <div className="flex items-start gap-4">
              <Mark draw className="mt-1 hidden h-10 w-10 text-ember sm:block" />
              <p className="max-w-md text-base leading-relaxed text-plaster/80 md:text-lg">
                {site.owner} has built houses, shops and multi-storey blocks across{" "}
                {site.location.city} for {site.yearsOfExperience} years. When the slab is poured,
                he is out on the deck.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={tel(site.phone)}>Call {site.phone.replace("+91 ", "")}</Button>
              <Button href={whatsappHref} variant="light">
                WhatsApp
              </Button>
            </div>
          </div>

          <a
            href="#manifesto"
            className="hero-fade stamp hidden items-center gap-3 justify-self-start text-plaster/60 hover:text-plaster md:inline-flex"
            style={{ animationDelay: "700ms" }}
          >
            <span aria-hidden className="relative block h-10 w-px overflow-hidden bg-plaster/20">
              <span className="scroll-cue absolute inset-x-0 top-0 block h-full bg-ember" />
            </span>
            Scroll · the story
          </a>
        </div>
      </div>

      <HeroMotion />
    </section>
  );
}
