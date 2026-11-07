"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { site, tel as telHref, whatsappHref as wa } from "@/lib/site";

const tel = telHref(site.phone);

/**
 * Phone-only sticky bar with the two actions a construction enquiry actually
 * ends in: a call and a WhatsApp message. Hidden until the hero has scrolled
 * past so it never covers the hero CTAs, and hidden from md up where the
 * floating WhatsApp bubble and the nav CTA already cover it.
 */
export function MobileActionBar() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setShown(window.scrollY > window.innerHeight * 0.6);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "action-bar fixed inset-x-0 bottom-0 z-[70] bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden",
        shown ? "translate-y-0" : "translate-y-full",
      )}
      // Kept out of the tab order and off the a11y tree while it is off-screen:
      // every link here is already reachable from the contact section.
      inert={!shown}
    >
      <div className="grid grid-cols-2">
        <a
          href={tel}
          className="flex items-center justify-center gap-2.5 py-4 font-mono text-xs uppercase tracking-[0.06em] text-plaster active:bg-ink-soft"
        >
          <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 fill-ember">
            <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.6a1 1 0 0 1-.25 1l-2.22 2.2Z" />
          </svg>
          Call now
        </a>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 bg-laterite py-4 font-mono text-xs uppercase tracking-[0.06em] text-plaster active:bg-laterite-deep"
        >
          <svg viewBox="0 0 32 32" aria-hidden className="h-4 w-4 fill-plaster">
            <path d="M16.004 3.2c-7.07 0-12.8 5.73-12.8 12.8 0 2.26.6 4.44 1.73 6.37L3.2 28.8l6.6-1.7a12.74 12.74 0 0 0 6.2 1.6h.005c7.07 0 12.8-5.73 12.8-12.8s-5.73-12.7-12.8-12.7zm0 23.32h-.004a10.5 10.5 0 0 1-5.36-1.47l-.385-.23-3.92 1.02 1.05-3.82-.25-.39a10.48 10.48 0 0 1-1.61-5.62c0-5.8 4.72-10.52 10.52-10.52 2.81 0 5.45 1.1 7.44 3.08a10.44 10.44 0 0 1 3.08 7.45c0 5.8-4.72 10.5-10.52 10.5zm5.77-7.88c-.31-.16-1.85-.91-2.14-1.02-.29-.1-.5-.16-.71.16-.21.31-.81 1.01-.99 1.22-.18.21-.36.23-.67.08-.31-.16-1.3-.48-2.48-1.53-.92-.82-1.53-1.83-1.72-2.14-.18-.31-.02-.48.14-.63.14-.14.31-.36.47-.55.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.62-.52-.53-.71-.54h-.6c-.21 0-.55.08-.83.39-.29.31-1.09 1.07-1.09 2.6s1.12 3.02 1.28 3.23c.16.21 2.2 3.36 5.33 4.71.74.32 1.32.51 1.77.65.75.24 1.43.2 1.97.13.6-.09 1.85-.76 2.11-1.49.26-.73.26-1.36.18-1.49-.07-.13-.28-.21-.6-.36z" />
          </svg>
          WhatsApp
        </a>
      </div>
    </div>
  );
}
