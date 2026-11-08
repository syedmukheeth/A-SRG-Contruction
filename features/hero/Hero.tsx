import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Mark } from "@/components/brand/Logo";
import { site, heroPortrait, coordinates, tel, whatsappHref } from "@/lib/site";
import { HeroMotion } from "./HeroMotion";

const lines = [
  { text: "Built in", accent: false },
  { text: `${site.location.city},`, accent: false },
  { text: `since ${site.established}.`, accent: true },
] as const;

const number = site.phone.replace("+91 ", "");

/**
 * Server-rendered, full-viewport night stage. The headline is the LCP element,
 * so its reveal stays pure CSS. The portrait is only 720px wide, so on desktop
 * it fills a column locked to its own proportions instead of the whole screen;
 * that also keeps the callout ring on Jeelani at every viewport size.
 */
export function Hero() {
  return (
    <section
      id="hero"
      data-tone="dark"
      aria-labelledby="hero-title"
      className="relative isolate min-h-[100svh] overflow-hidden bg-night text-plaster md:h-[100svh] md:min-h-[680px]"
    >
      <div aria-hidden className="hero-rules pointer-events-none absolute inset-0 hidden md:block" />

      <div className="absolute inset-0 overflow-hidden md:left-auto md:w-[min(calc(100svh*0.703),56vw)] md:min-w-[460px]">
        <div data-hero-photo className="absolute inset-0 will-change-transform">
          <div className="hero-kenburns absolute inset-0">
            <Image
              src={heroPortrait.src}
              alt={heroPortrait.alt}
              fill
              preload
              quality={85}
              sizes="(max-width: 767px) 100vw, 56vw"
              className="object-cover object-[46%_22%] md:object-center"
            />
          </div>
          <div aria-hidden className="hero-shade absolute -inset-1" />
        </div>

        <div aria-hidden className="hero-veil absolute -inset-1 bg-night" />
      </div>


      <div aria-hidden className="grain pointer-events-none absolute inset-0" />
      <div aria-hidden data-hero-dim className="pointer-events-none absolute inset-0 bg-night opacity-0" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] flex-col px-5 pb-8 pt-24 md:h-full md:min-h-0 md:px-10 md:pb-10 md:pt-28">
        <p className="hero-fade stamp hidden flex-wrap gap-x-3 text-plaster/70 md:flex md:max-w-[52%]">
          <span>
            {site.ownerShort} · {site.ownerTitle}
          </span>
          <span aria-hidden className="text-ember">
            /
          </span>
          <span>{coordinates}</span>
        </p>

        <h1
          id="hero-title"
          className="font-display mt-auto text-[clamp(3.2rem,min(11vw,15svh),10.5rem)] leading-[0.84] md:max-w-[11ch]"
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

        <div className="mt-7 max-w-xl md:mt-9">
          <div className="hero-fade flex items-start gap-4" style={{ animationDelay: "420ms" }}>
            <Mark draw className="mt-1 hidden h-10 w-10 shrink-0 text-ember sm:block" />
            <p className="text-base leading-relaxed text-plaster/80 md:text-lg">
              {site.owner} has built houses, shops and multi-storey blocks across{" "}
              {site.location.city} for {site.yearsOfExperience} years. When the slab is poured,
              he is out on the deck.
            </p>
          </div>

          {/* One action per button: the Call button carries the number, so nothing repeats. */}
          <div
            className="hero-fade mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:pl-14"
            style={{ animationDelay: "560ms" }}
          >
            <Button href={tel(site.phone)} className="justify-center py-3.5">
              <PhoneIcon className="h-4 w-4" />
              Call
              <span className="font-display whitespace-nowrap text-lg leading-none tracking-[0.03em]">{number}</span>
            </Button>
            <Button href={whatsappHref} variant="light" className="justify-center py-3.5">
              <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
              WhatsApp
            </Button>
          </div>
        </div>
      </div>

      <HeroMotion />
    </section>
  );
}
