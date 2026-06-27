"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type CursorMode = "default" | "cta" | "image";

const coarsePointerQuery = "(pointer: coarse)";

function subscribeToCoarsePointer(onChange: () => void) {
  const query = window.matchMedia(coarsePointerQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getCoarsePointerSnapshot() {
  return window.matchMedia(coarsePointerQuery).matches;
}

/**
 * Architectural crosshair cursor.
 * - default: thin crosshair + center dot
 * - cta (data-cursor="cta"): expands into a filled magnet ring
 * - image (data-cursor="image"): becomes a "BLUEPRINT" measurement tag
 * Disabled on coarse pointers and reduced-motion.
 */
export function CustomCursor() {
  const root = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<CursorMode>("default");
  const reduced = useReducedMotion();
  const coarsePointer = useSyncExternalStore(
    subscribeToCoarsePointer,
    getCoarsePointerSnapshot,
    () => true,
  );
  const enabled = !reduced && !coarsePointer;

  // Wire pointer tracking only after the cursor element has rendered.
  useEffect(() => {
    const el = root.current;
    if (!enabled || !el) return;
    document.body.dataset.customCursor = "on";

    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-cursor]",
      );
      setMode((target?.dataset.cursor as CursorMode) ?? "default");
    };

    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      delete document.body.dataset.customCursor;
    };
  }, [enabled]);

  if (!enabled) return null;

  const isCta = mode === "cta";
  const isImage = mode === "image";

  return (
    <div
      ref={root}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform"
    >
      <div
        className="relative flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          width: isCta ? 72 : isImage ? 96 : 36,
          height: isCta ? 72 : isImage ? 32 : 36,
        }}
      >
        {/* crosshair (default) */}
        {!isCta && !isImage && (
          <>
            <span className="absolute inset-0 rounded-full border border-copper/60" />
            <span className="absolute left-1/2 top-[-6px] h-[10px] w-px -translate-x-1/2 bg-copper" />
            <span className="absolute left-1/2 bottom-[-6px] h-[10px] w-px -translate-x-1/2 bg-copper" />
            <span className="absolute top-1/2 left-[-6px] h-px w-[10px] -translate-y-1/2 bg-copper" />
            <span className="absolute top-1/2 right-[-6px] h-px w-[10px] -translate-y-1/2 bg-copper" />
            <span className="h-[5px] w-[5px] rounded-full bg-copper shadow-[0_0_8px_rgba(199,133,62,0.9)]" />
          </>
        )}

        {/* cta magnet ring */}
        {isCta && (
          <span className="absolute inset-0 rounded-full border border-copper bg-copper/15 backdrop-blur-[1px]" />
        )}

        {/* image blueprint tag */}
        {isImage && (
          <span className="absolute inset-0 flex items-center justify-center rounded-sm border border-copper/70 bg-ink/70 px-2 font-mono text-[9px] uppercase tracking-[0.25em] text-copper backdrop-blur-[1px]">
            Blueprint
          </span>
        )}
      </div>
    </div>
  );
}
