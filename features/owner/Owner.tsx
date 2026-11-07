import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { LedgerPhoto } from "@/components/ui/LedgerPhoto";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { Parallax } from "@/components/motion/Parallax";
import { site, projects, tel, whatsappHref } from "@/lib/site";

const mansion = projects.find((p) => p.id === "jeelani-mansion");

export function Owner() {
  return (
    <section id="jeelani" aria-labelledby="owner-title" className="border-t border-rule bg-plaster-deep/40">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 md:grid-cols-12 md:gap-8 md:px-10 md:py-36">
        <div className="relative md:col-span-5">
          {mansion && (
            <ClipReveal className="md:ml-10">
              <LedgerPhoto
                photo={{
                  src: mansion.image,
                  alt: `${mansion.title}, a ${mansion.storeys} building in ${site.location.city} with its name lit on the facade`,
                  width: mansion.width,
                  height: mansion.height,
                }}
                aspect="3 / 4"
                position="50% 78%"
                sizes="(max-width: 768px) 100vw, 36vw"
                caption={`${mansion.title} · ${mansion.storeys}`}
              />
            </ClipReveal>
          )}
          <Parallax amount={14} className="relative z-10 -mt-24 mr-auto w-[46%] max-w-[230px] md:absolute md:-bottom-10 md:left-0 md:mt-0">
            <figure className="bg-plaster p-2 shadow-[0_24px_60px_-20px_rgb(28_27_25/0.45)]">
              <div className="relative aspect-[2/3] overflow-hidden">
                <Image
                  src={site.ownerImage}
                  alt={`${site.owner}, ${site.ownerTitle.toLowerCase()} and owner of ${site.name}`}
                  fill
                  sizes="230px"
                  className="object-cover"
                />
              </div>
              <figcaption className="stamp mt-2 text-[0.62rem]">{site.ownerShort}</figcaption>
            </figure>
          </Parallax>
        </div>

        <div className="md:col-span-6 md:col-start-7 md:pt-4">
          <p className="marker">The man on the slab</p>
          <SplitLines
            id="owner-title"
            lines={site.owner.split(" ")}
            accent={1}
            accentClassName="text-laterite"
            className="font-display mt-6 text-display text-ink"
          />
          <p lang="te" className="mt-5 font-telugu text-xl text-ink-soft">
            {site.ownerTelugu}
          </p>

          <dl className="mt-12 grid grid-cols-3 border-y border-rule">
            {[
              { k: "Building since", v: site.established },
              { k: `Years in ${site.location.city}`, v: site.yearsOfExperience },
              { k: "Jeelani Mansion", v: mansion?.storeys ?? "" },
            ].map((row, i) => (
              <div key={row.k} className={i ? "border-l border-rule py-5 pl-4 md:pl-6" : "py-5 pr-4"}>
                <dt className="stamp">{row.k}</dt>
                <dd className="font-display mt-2 text-[clamp(2.2rem,4vw,3.4rem)] leading-none text-laterite">{row.v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 max-w-lg space-y-4 text-lg leading-relaxed text-ink-soft">
            <p>
              {site.owner} has run {site.name} in {site.location.city} for {site.yearsOfExperience}{" "}
              years. When a slab is poured he is on the deck, and the phone number on this site is
              his.
            </p>
            <p>
              The five-storey block with his name lit across the front is in {site.location.city}.
              So is every other building on this page.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={tel(site.phone)}>Call {site.ownerShort}</Button>
            <Button href={whatsappHref} variant="line">
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
