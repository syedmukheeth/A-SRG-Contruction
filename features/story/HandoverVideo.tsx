"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface HandoverVideoProps {
  src: string;
  poster: string;
  label: string;
}

/**
 * Muted loop that only plays while on screen. Nothing downloads until it is
 * close to the viewport (preload="none"), and reduced-motion users get the
 * poster with a play button instead of autoplay.
 */
export function HandoverVideo({ src, poster, label }: HandoverVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || reduced) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <figure>
      <div className="relative aspect-[848/478] overflow-hidden bg-black">
        <video
          ref={ref}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          aria-label={label}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className="h-full w-full object-cover"
        />
        {!playing && reduced && (
          <button
            type="button"
            onClick={() => ref.current?.play()}
            className="absolute inset-0 flex items-center justify-center bg-black/20 font-mono text-xs uppercase tracking-[0.08em] text-plaster"
          >
            ▶ Play walkthrough
          </button>
        )}
      </div>
      <figcaption className="stamp mt-3 flex justify-between gap-4 text-plaster/70">
        <span className="text-plaster">Handover walkthrough</span>
        <span>Filmed at handover</span>
      </figcaption>
    </figure>
  );
}
