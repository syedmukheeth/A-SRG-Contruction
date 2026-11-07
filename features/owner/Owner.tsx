import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { LedgerPhoto } from "@/components/ui/LedgerPhoto";
import { site, chapters, tel } from "@/lib/site";

const onSlab = chapters.flatMap((c) => c.photos).find((p) => p.src.endsWith("jeelani-on-slab.jpg"));

export function Owner() {
  return (
    <section id="jeelani" aria-labelledby="owner-title" className="border-t border-rule">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 md:grid-cols-12 md:gap-8 md:px-10 md:py-28">
        <div className="md:col-span-5">
          <div className="relative aspect-[2/3] w-full max-w-md overflow-hidden bg-plaster-deep">
            <Image
              src={site.ownerImage}
              alt={`${site.owner}, ${site.ownerTitle.toLowerCase()} and owner of ${site.name}`}
              fill
              sizes="(max-width: 768px) 100vw, 36vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="md:col-span-7 md:pt-6">
          <p className="marker">The man on site</p>
          <h2 id="owner-title" className="font-display mt-6 text-display text-ink">
            {site.owner}
          </h2>
          <p lang="te" className="mt-4 font-telugu text-xl text-ink-soft">
            {site.ownerTelugu}
          </p>

          <dl className="mt-10 grid max-w-lg grid-cols-2 border-t border-rule">
            <div className="border-b border-r border-rule py-5 pr-4">
              <dt className="stamp">Building since</dt>
              <dd className="font-display mt-1 text-5xl text-laterite">{site.established}</dd>
            </div>
            <div className="border-b border-rule py-5 pl-5">
              <dt className="stamp">Years in {site.location.city}</dt>
              <dd className="font-display mt-1 text-5xl text-laterite">{site.yearsOfExperience}</dd>
            </div>
          </dl>

          <div className="mt-8 max-w-lg space-y-4 text-lg leading-relaxed text-ink-soft">
            <p>
              {site.owner} has run {site.name} in {site.location.city} for {site.yearsOfExperience}{" "}
              years. When a slab is poured he is on the deck, and the phone number on this
              site is his.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={tel(site.phone)}>Call {site.ownerShort}</Button>
          </div>

          {onSlab && (
            <LedgerPhoto
              photo={onSlab}
              aspect="4 / 3"
              sizes="(max-width: 768px) 100vw, 40vw"
              className="mt-12 max-w-lg"
              caption="On the deck during a pour"
            />
          )}
        </div>
      </div>
    </section>
  );
}
