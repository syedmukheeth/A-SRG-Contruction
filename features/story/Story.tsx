import { chapters, handoverVideo, type Chapter } from "@/lib/site";
import { LedgerPhoto } from "@/components/ui/LedgerPhoto";
import { Reveal } from "@/components/Reveal";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { HandoverVideo } from "./HandoverVideo";
import { StoryRail } from "./StoryRail";
import { LightsUp } from "./LightsUp";

const total = chapters.length;
const num = (i: number) => String(i + 1).padStart(2, "0");

function ChapterBlock({ chapter, index }: { chapter: Chapter; index: number }) {
  const [lead, second] = chapter.photos;
  return (
    <article
      id={`stage-${chapter.id}`}
      className="mx-auto grid max-w-[1440px] gap-10 px-5 py-16 md:grid-cols-12 md:gap-8 md:px-10 md:py-28"
    >
      <div className="md:col-span-4">
        <div className="md:sticky md:top-40">
          <span aria-hidden className="numeral-outline font-display block text-[clamp(5rem,9vw,8.5rem)] leading-[0.8]">
            {num(index)}
          </span>
          <p className="marker mt-6">{chapter.label}</p>
          <SplitLines
            as="h3"
            lines={[chapter.title]}
            className="font-display mt-5 text-[clamp(2.4rem,4.6vw,4.25rem)] leading-[0.9] text-ink"
          />
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-ink-soft">{chapter.body}</p>
          <p className="stamp mt-6">
            Stage {index + 1} of {total}
          </p>
        </div>
      </div>

      <div className="space-y-10 md:col-span-8">
        <ClipReveal>
          <LedgerPhoto photo={lead} sizes="(max-width: 768px) 100vw, 66vw" />
        </ClipReveal>
        {second && (
          <Reveal className={second.height > second.width ? "md:ml-auto md:w-[46%]" : "md:ml-auto md:w-[70%]"}>
            <LedgerPhoto photo={second} sizes="(max-width: 768px) 100vw, 30vw" />
          </Reveal>
        )}
      </div>
    </article>
  );
}

function LightsOn({ chapter, index }: { chapter: Chapter; index: number }) {
  const [photo] = chapter.photos;
  return (
    <article id={`stage-${chapter.id}`} data-tone="dark" className="relative bg-night text-plaster">
      <div aria-hidden className="grain pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-[1440px] gap-10 px-5 py-20 md:grid-cols-12 md:gap-8 md:px-10 md:py-32">
        <div className="md:col-span-4">
          <span aria-hidden className="numeral-outline numeral-outline--night font-display block text-[clamp(5rem,9vw,8.5rem)] leading-[0.8]">
            {num(index)}
          </span>
          <p className="marker mt-6 text-ember">{chapter.label}</p>
          <SplitLines
            as="h3"
            lines={[chapter.title]}
            className="font-display mt-5 text-[clamp(3rem,8vw,7rem)] leading-[0.85] text-plaster"
          />
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-plaster/80">{chapter.body}</p>
          <p className="stamp mt-6 text-plaster/60">
            Stage {index + 1} of {total}
          </p>
        </div>
        <div className="grid gap-8 md:col-span-8 md:grid-cols-5">
          <ClipReveal className="md:col-span-3">
            <HandoverVideo {...handoverVideo} />
          </ClipReveal>
          <LightsUp className="md:col-span-2 md:self-end">
            <LedgerPhoto photo={photo} sizes="(max-width: 768px) 100vw, 26vw" tone="night" caption="Same house at dusk" />
          </LightsUp>
        </div>
      </div>
    </article>
  );
}

export function Story() {
  return (
    <section id="story" aria-labelledby="story-title">
      <div className="mx-auto max-w-[1440px] px-5 pb-14 pt-24 md:px-10 md:pb-20 md:pt-36">
        <p className="marker">How a building goes up</p>
        <SplitLines
          id="story-title"
          lines={["From red soil", "to lights on."]}
          accent={1}
          accentClassName="text-laterite"
          className="font-display mt-6 text-display text-ink"
        />
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">
          Five stages, photographed on ASRG sites in Kurnool. Where the camera stamped a date on
          the photo, it is printed under it.
        </p>
      </div>

      <div className="relative">
        <StoryRail items={chapters.map(({ id, label }) => ({ id, label }))} />
        {chapters.map((c, i) =>
          c.id === "lights-on" ? (
            <div key={c.id}>
              {/* Dusk: the page itself goes dark before the lights come on. */}
              <div aria-hidden className="h-40 bg-gradient-to-b from-plaster to-night md:h-64" />
              <LightsOn chapter={c} index={i} />
            </div>
          ) : (
            <ChapterBlock key={c.id} chapter={c} index={i} />
          ),
        )}
      </div>
    </section>
  );
}
