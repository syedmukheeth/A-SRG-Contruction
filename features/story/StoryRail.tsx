"use client";

import { useRef } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { useGsap } from "@/hooks/useGsap";

interface RailItem {
  id: string;
  label: string;
}

/**
 * Sticky chapter rail. Active step and fill are written straight to the DOM
 * from ScrollTrigger callbacks, so scrolling never re-renders React.
 */
export function StoryRail({ items }: { items: readonly RailItem[] }) {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, (_c, rail) => {
    const fill = rail.querySelector<HTMLElement>("[data-fill]");
    const links = Array.from(rail.querySelectorAll<HTMLAnchorElement>("[data-step]"));
    const track = rail.parentElement;
    if (!track) return;

    const setActive = (id: string) => {
      rail.dataset.active = id;
      links.forEach((l) =>
        l.dataset.step === id ? l.setAttribute("aria-current", "step") : l.removeAttribute("aria-current"),
      );
    };
    setActive(items[0].id);

    // Elements, not selector strings: matchMedia scopes selectors to the rail.
    const triggers = items.flatMap((item) => {
      const stage = document.getElementById(`stage-${item.id}`);
      return stage
        ? [
            ScrollTrigger.create({
              trigger: stage,
              start: "top 55%",
              end: "bottom 55%",
              onToggle: (self) => self.isActive && setActive(item.id),
            }),
          ]
        : [];
    });
    triggers.push(
      ScrollTrigger.create({
        trigger: track,
        start: "top top+=120",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (fill) fill.style.transform = `scaleX(${self.progress})`;
        },
      }),
    );
    return () => triggers.forEach((t) => t.kill());
  });

  return (
    <nav
      ref={ref}
      aria-label="Stages of a build"
      className="story-rail sticky top-18 z-30 border-y border-rule bg-plaster transition-colors duration-500"
    >
      <ol className="mx-auto flex max-w-[1440px] items-center gap-6 px-5 py-3 md:justify-between md:px-10">
        {items.map((item, i) => (
          <li key={item.id} className="max-md:[&:not(:has([aria-current]))]:hidden">
            <a
              href={`#stage-${item.id}`}
              data-step={item.id}
              aria-current={i === 0 ? "step" : undefined}
              className="stamp flex items-baseline gap-2 transition-colors hover:text-laterite-deep aria-[current=step]:text-ink"
            >
              <span className="text-laterite-deep">{String(i + 1).padStart(2, "0")}</span>
              {item.label}
              <span className="md:hidden">· of {String(items.length).padStart(2, "0")}</span>
            </a>
          </li>
        ))}
      </ol>
      <span aria-hidden className="absolute inset-x-0 -bottom-px block h-0.5">
        <span data-fill className="block h-full origin-left scale-x-0 bg-laterite will-change-transform" />
      </span>
    </nav>
  );
}
