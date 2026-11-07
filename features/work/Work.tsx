import { LedgerPhoto } from "@/components/ui/LedgerPhoto";
import { Reveal } from "@/components/Reveal";
import { projects, review, interiors, site, type Project, type Photo } from "@/lib/site";

const altFor = (p: Project) =>
  `${p.title}${p.storeys ? `, ${p.storeys}` : ""}, a ${p.category.toLowerCase()} building by ${site.name} in ${site.location.city}`;

const asPhoto = (p: Project): Photo => ({
  src: p.image,
  alt: altFor(p),
  width: p.width,
  height: p.height,
  stamp: p.stamp,
});

const label = (p: Project) => [p.title, p.storeys, p.category].filter(Boolean).join(" · ");

export function Work() {
  const pair = projects.find((p) => p.beforeImage);
  const rest = projects.filter((p) => p !== pair);

  return (
    <section id="work" aria-labelledby="work-title" className="border-t border-rule">
      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="marker">Finished work</p>
            <h2 id="work-title" className="font-display mt-6 text-display text-ink">
              Standing in {site.location.city} today.
            </h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-ink-soft md:col-span-5 md:self-end">
            Every building here is in {site.location.city}. If you want to see one that is
            close to what you have in mind, call and ask.
          </p>
        </div>

        {pair?.beforeImage && (
          <Reveal className="mt-16 grid gap-6 sm:grid-cols-2 md:mt-20">
            <LedgerPhoto
              photo={{
                src: pair.beforeImage,
                alt: `${pair.title} under construction, before plaster and paint`,
                width: 721,
                height: 1600,
              }}
              aspect="4 / 5"
              sizes="(max-width: 640px) 100vw, 50vw"
              caption="Under construction"
            />
            <LedgerPhoto
              photo={{ ...asPhoto(pair), stamp: undefined }}
              aspect="4 / 5"
              sizes="(max-width: 640px) 100vw, 50vw"
              caption={`Finished · ${label(pair)}`}
            />
          </Reveal>
        )}

        <div className="mt-16 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-10 [&>*]:break-inside-avoid">
          {rest.map((p) => (
            <LedgerPhoto
              key={p.id}
              photo={asPhoto(p)}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              caption={label(p)}
            />
          ))}
        </div>

        <figure className="mt-12 grid gap-8 border-y border-rule py-14 md:grid-cols-12 md:py-20">
          <p className="marker md:col-span-3">What a client said</p>
          <div className="md:col-span-9">
            <blockquote className="font-display text-[clamp(1.9rem,4.2vw,3.6rem)] leading-[0.98] text-ink">
              &ldquo;{review.quote}&rdquo;
            </blockquote>
            <figcaption className="stamp mt-6">
              {review.author} · {review.source} review · {review.date}
            </figcaption>
          </div>
        </figure>

        <div className="mt-16">
          <p className="marker">Inside</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {interiors.map((photo) => (
              <LedgerPhoto key={photo.src} photo={photo} aspect="4 / 3" sizes="(max-width: 768px) 100vw, 33vw" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
