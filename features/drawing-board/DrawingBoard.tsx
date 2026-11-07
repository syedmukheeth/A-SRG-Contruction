import Image from "next/image";
import { renders, villaRow } from "@/lib/site";

export function DrawingBoard() {
  return (
    <section aria-labelledby="board-title" className="bg-plaster-deep">
      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="marker">On the drawing board</p>
            <h2 id="board-title" className="font-display mt-6 text-display text-ink">
              Before the first footing.
            </h2>
          </div>
          <div className="max-w-md space-y-4 text-lg leading-relaxed text-ink-soft md:col-span-5 md:self-end">
            <p>
              Elevations are settled as design renders before anything is dug, so the owner
              sees the house before paying for it.
            </p>
            <p className="stamp text-ink">
              From the ASRG flyer: villas {villaRow.villas.join(", ")} · {villaRow.plot} plots
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-12">
          {renders.map((r, i) => (
            <figure key={r.src} className={i === 0 ? "md:col-span-7" : "md:col-span-5 md:mt-24"}>
              <div className="relative overflow-hidden" style={{ aspectRatio: `${r.width} / ${r.height}` }}>
                <Image
                  src={r.src}
                  alt={r.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="object-cover"
                />
                <span className="absolute left-0 top-0 bg-ink px-3 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-plaster">
                  Design render, not a photo
                </span>
              </div>
              <figcaption className="stamp mt-3">{r.stamp}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
