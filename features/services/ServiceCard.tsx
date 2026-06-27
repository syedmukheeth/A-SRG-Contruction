"use client";

import Image from "next/image";
import type { Service } from "@/lib/site";

/**
 * Service card. The project photograph is always visible but desaturated;
 * on hover it warms into full colour and the summary rises in — restrained,
 * editorial, premium.
 */
export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <article
      data-cursor="image"
      className="group relative aspect-[4/5] overflow-hidden rounded-lg border border-text/10 bg-ink-2"
    >
      {/* photo — always visible, grayscale at rest, colour on hover */}
      <Image
        src={service.image}
        alt={service.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover soft-img group-hover:scale-105"
      />

      {/* tint — lifts on hover; plus bottom gradient for text */}
      <div className="absolute inset-0 bg-ink/45 transition-colors duration-700 group-hover:bg-ink/15" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-ink via-ink/40 to-transparent" />
      <div className="blueprint-grid-fine absolute inset-0 opacity-15 mix-blend-soft-light" />

      {/* content */}
      <div className="relative flex h-full flex-col justify-between p-6">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em]">
          <span className="text-copper">{String(index + 1).padStart(2, "0")}</span>
          <span className="text-muted transition-colors group-hover:text-copper">
            {service.blueprint}
          </span>
        </div>
        <div>
          <h3 className="font-display text-2xl font-bold uppercase leading-none text-text">
            {service.title}
          </h3>
          <p className="mt-3 max-h-0 overflow-hidden text-sm text-muted opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:text-text group-hover:opacity-100">
            {service.summary}
          </p>
        </div>
      </div>
    </article>
  );
}
