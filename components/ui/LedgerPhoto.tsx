import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Photo } from "@/lib/site";

interface LedgerPhotoProps {
  photo: Photo;
  sizes: string;
  /** Force a crop; otherwise the photo keeps its own proportions. */
  aspect?: string;
  priority?: boolean;
  className?: string;
  /** Extra caption text after the stamp, e.g. a project title. */
  caption?: React.ReactNode;
  tone?: "light" | "night";
}

/** A photo with its site-diary stamp underneath, like a page in a site log. */
export function LedgerPhoto({
  photo,
  sizes,
  aspect,
  priority,
  className,
  caption,
  tone = "light",
}: LedgerPhotoProps) {
  return (
    <figure className={cn("group", className)}>
      <div
        className="relative overflow-hidden bg-plaster-deep"
        style={{ aspectRatio: aspect ?? `${photo.width} / ${photo.height}` }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
        />
      </div>
      {(photo.stamp || caption) && (
        <figcaption
          className={cn(
            "stamp mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1",
            tone === "night" && "text-plaster/70",
          )}
        >
          {caption && <span className={tone === "night" ? "text-plaster" : "text-ink"}>{caption}</span>}
          {photo.stamp && <span>{photo.stamp}</span>}
        </figcaption>
      )}
    </figure>
  );
}
