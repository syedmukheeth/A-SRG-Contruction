import { gallery } from "@/lib/site";
import { GalleryTile } from "./GalleryTile";

export function Gallery() {
  return (
    <section id="gallery" className="relative w-full px-6 py-32 md:px-12 lg:px-20">
      <div className="mx-auto max-w-[1400px]">
        <p className="eyebrow mb-6">Materials & craft</p>
        <h2 className="mb-16 font-display text-giant uppercase leading-[0.9] text-text">
          Concrete. Steel.
          <br />
          <span className="text-copper">Glass. Wood.</span>
        </h2>

        <div className="grid auto-rows-[200px] grid-cols-2 gap-4 sm:grid-cols-4">
          {gallery.map((item) => (
            <GalleryTile key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
