import { chapters, handoverVideo, type Chapter } from "@/lib/site";
import { LedgerPhoto } from "@/components/ui/LedgerPhoto";
import { Reveal } from "@/components/Reveal";
import { HandoverVideo } from "./HandoverVideo";

const total = chapters.length;

function ChapterBlock({ chapter, index }: { chapter: Chapter; index: number }) {
  const [lead, second] = chapter.photos;
  return (
    <article
      id={`stage-${chapter.id}`}
      className="mx-auto grid max-w-[1440px] gap-10 border-t border-rule px-5 py-16 md:grid-cols-12 md:gap-8 md:px-10 md:py-24"
    >
      <div className="md:col-span-4">
        <div className="md:sticky md:top-28">
          <p className="marker">{chapter.label}</p>
          <p className="stamp mt-2">
            Stage {index + 1} of {total}
          </p>
          <h3 className="font-display mt-6 text-[clamp(2.4rem,5vw,4.25rem)] leading-[0.9] text-ink">
            {chapter.title}
          </h3>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-ink-soft">{chapter.body}</p>
        </div>
      </div>

      <Reveal className="space-y-10 md:col-span-8">
        <LedgerPhoto photo={lead} sizes="(max-width: 768px) 100vw, 66vw" />
        {second && (
          <LedgerPhoto
            photo={second}
            sizes="(max-width: 768px) 100vw, 30vw"
            className={second.height > second.width ? "md:ml-auto md:w-[46%]" : "md:ml-auto md:w-[70%]"}
          />
        )}
      </Reveal>
    </article>
  );
}

function LightsOn({ chapter, index }: { chapter: Chapter; index: number }) {
  const [photo] = chapter.photos;
  return (
    <article id={`stage-${chapter.id}`} className="bg-night text-plaster">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 md:grid-cols-12 md:gap-8 md:px-10 md:py-28">
        <div className="md:col-span-4">
          <p className="marker text-ember">{chapter.label}</p>
          <p className="stamp mt-2 text-plaster/60">
            Stage {index + 1} of {total}
          </p>
          <h3 className="font-display mt-6 text-[clamp(3rem,8vw,7rem)] leading-[0.85] text-plaster">
            {chapter.title}
          </h3>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-plaster/80">{chapter.body}</p>
        </div>
        <Reveal className="grid gap-8 md:col-span-8 md:grid-cols-5">
          <div className="md:col-span-3">
            <HandoverVideo {...handoverVideo} />
          </div>
          <LedgerPhoto
            photo={photo}
            sizes="(max-width: 768px) 100vw, 26vw"
            tone="night"
            className="md:col-span-2 md:self-end"
            caption="Same house at dusk"
          />
        </Reveal>
      </div>
    </article>
  );
}

export function Story() {
  return (
    <section id="story" aria-labelledby="story-title" className="border-t border-rule">
      <div className="mx-auto max-w-[1440px] px-5 pb-6 pt-20 md:px-10 md:pt-28">
        <p className="marker">How a building goes up</p>
        <h2 id="story-title" className="font-display mt-6 max-w-[14ch] text-display text-ink">
          From red soil to lights on.
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-12">
          <p className="max-w-xl text-lg leading-relaxed text-ink-soft md:col-span-6">
            Five stages, photographed on ASRG sites in Kurnool. Where the camera stamped a
            date on the photo, it is printed under it.
          </p>
          <ol className="stamp flex flex-wrap gap-x-6 gap-y-2 md:col-span-6 md:justify-end md:self-end">
            {chapters.map((c, i) => (
              <li key={c.id}>
                <a href={`#stage-${c.id}`} className="hover:text-laterite-deep">
                  {i + 1}. {c.label}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {chapters.map((c, i) =>
        c.id === "lights-on" ? (
          <LightsOn key={c.id} chapter={c} index={i} />
        ) : (
          <ChapterBlock key={c.id} chapter={c} index={i} />
        ),
      )}
    </section>
  );
}
