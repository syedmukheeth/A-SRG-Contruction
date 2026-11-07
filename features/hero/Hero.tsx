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

        {/* Viewfinder corners frame the photo as the subject. */}
        <span aria-hidden className="hero-corners pointer-events-none absolute inset-x-6 bottom-6 top-24 hidden md:block lg:inset-x-10 lg:bottom-10 lg:top-28" />
        <div aria-hidden className="hero-veil absolute -inset-1 bg-night" />
      </div>

      {/* Callout on Jeelani, outside the clipped frame so its label can reach
          into the dark. The inner box has the photo's own aspect, so the
          percentages land on him at any viewport size. */}
      <div
        aria-hidden
        data-hero-callout
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[min(calc(100svh*0.703),56vw)] min-w-[460px] md:block"
      >
        <div className="absolute inset-y-0 left-1/2 aspect-[720/1024] h-full -translate-x-1/2">
          {/* Offsets live in the keyframes' transform, not translate-* utilities, so they don't stack. */}
          <span className="hero-ring absolute left-[56.5%] top-[35%] block aspect-square w-[23%] rounded-full border-2 border-ember" />
          <span className="hero-leader absolute right-[55%] top-[35%] block h-0.5 w-[30%] origin-right bg-ember" />
          <span className="hero-tag absolute right-[86%] top-[35%] pr-3 text-right">
            <span className="stamp block whitespace-nowrap text-plaster">{site.ownerShort}</span>
            <span className="stamp block whitespace-nowrap text-plaster/60">Owner · on site</span>
          </span>
        </div>
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

        <div className="mt-7 grid gap-6 md:mt-9 lg:grid-cols-[minmax(0,24rem)_minmax(0,27rem)] lg:items-end lg:gap-10">
          <div className="hero-fade flex items-start gap-4" style={{ animationDelay: "420ms" }}>
            <Mark draw className="mt-1 hidden h-10 w-10 shrink-0 text-ember sm:block" />
            <p className="text-base leading-relaxed text-plaster/80 md:text-lg">
              {site.owner} has built houses, shops and multi-storey blocks across{" "}
              {site.location.city} for {site.yearsOfExperience} years. When the slab is poured,
              he is out on the deck.
            </p>
          </div>

          {/* Direct line: the number itself is the headline of this block. */}
          <div
            className="hero-fade border border-plaster/15 bg-night/85 p-5 md:p-6"
            style={{ animationDelay: "560ms" }}
          >
            <p className="stamp text-plaster/60">Direct line · {site.ownerShort}</p>
            <a
              href={tel(site.phone)}
              className="group mt-3 flex items-center gap-3 text-plaster transition-colors hover:text-ember"
            >
              <PhoneIcon className="h-6 w-6 shrink-0 text-ember md:h-7 md:w-7" />
              <span className="font-display text-[clamp(2.2rem,3.6vw,3.2rem)] leading-none tracking-[0.01em]">
                {number}
              </span>
            </a>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Button href={tel(site.phone)} className="justify-center px-4">
                <PhoneIcon className="h-4 w-4" />
                Call
              </Button>
              <Button href={whatsappHref} variant="paper" className="justify-center px-4">
                <WhatsAppIcon className="h-[18px] w-[18px] text-[#1faa59]" />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>

      <HeroMotion />
    </section>
  );
}
