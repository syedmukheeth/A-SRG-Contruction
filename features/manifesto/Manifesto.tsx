import { SplitLines } from "@/components/motion/SplitLines";
import { site, tel } from "@/lib/site";
import { ScrubRule } from "./ScrubRule";

const thisYear = new Date().getFullYear();

const ledger = [
  { k: "Builds", v: "Houses, shops, multi-storey blocks" },
  { k: "Scope", v: "Footings to handover, or structure alone" },
  { k: "Around", v: [site.location.city, ...site.location.nearbyTowns.slice(0, 3)].join(", ") },
];

/** The bridge out of the hero: one span of years, and what it adds up to. */
export function Manifesto() {
  return (
    <section
      id="manifesto"
      data-tone="dark"
      aria-labelledby="manifesto-title"
      className="relative overflow-hidden bg-night text-plaster"
    >
      <div aria-hidden className="grain pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <p className="marker text-ember">Since {site.established}</p>

        <div
          aria-label={`${site.established} to ${thisYear}`}
          role="img"
          className="font-display mt-8 flex items-center gap-4 text-[clamp(3.6rem,15vw,14rem)] leading-[0.8] md:gap-8"
        >
          <span className="text-ember">{site.established}</span>
          <ScrubRule className="block h-[3px] flex-1 md:h-1" />
          <span>{thisYear}</span>
        </div>

        <div className="mt-16 grid gap-12 border-t border-plaster/15 pt-12 md:mt-24 md:grid-cols-12 md:gap-8">
          <SplitLines
            id="manifesto-title"
            lines={[`${site.yearsOfExperience} years.`, "One firm.", "One owner."]}
            accent={2}
            accentClassName="text-ember"
            className="font-display text-display md:col-span-7"
          />
          <div className="md:col-span-5 md:pt-3">
            <p className="text-lg leading-relaxed text-plaster/80 md:text-xl">
              The number on this page is {site.ownerShort}&rsquo;s own. When a slab is poured, he is
              out on the deck where he can see every bay.
            </p>
            <dl className="mt-10 border-t border-plaster/15">
              {ledger.map((row) => (
                <div key={row.k} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-plaster/15 py-4">
                  <dt className="stamp text-plaster/55">{row.k}</dt>
                  <dd className="text-plaster/90">{row.v}</dd>
                </div>
              ))}
            </dl>
            <a href={tel(site.phone)} className="link-u mt-8 inline-block font-mono text-sm uppercase tracking-[0.08em] text-plaster hover:text-ember">
              Ring {site.ownerShort} · {site.phone.replace("+91 ", "")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
