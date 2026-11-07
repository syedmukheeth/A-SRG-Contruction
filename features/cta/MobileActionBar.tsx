"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";
import { site, tel as telHref, whatsappHref as wa } from "@/lib/site";

const tel = telHref(site.phone);

/**
 * Phone-only sticky bar with the two actions a construction enquiry actually
 * ends in: a call and a WhatsApp message. Hidden until the hero has scrolled
 * past so it never covers the hero CTAs, and hidden from md up where the
 * nav's Call button already covers it.
 */
export function MobileActionBar() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let ticking = false;
    // Measured live (once per frame at most): a value cached on mount can be
    // taken before layout settles and show the bar over the hero's own CTAs.
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const hero = document.getElementById("hero");
        setShown(
          hero
            ? hero.getBoundingClientRect().bottom < window.innerHeight * 0.4
            : window.scrollY > window.innerHeight * 0.6,
        );
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        "action-bar fixed inset-x-0 bottom-0 z-[70] border-t border-plaster/10 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden",
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
          <PhoneIcon className="h-4 w-4 text-ember" />
          Call now
        </a>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 bg-laterite py-4 font-mono text-xs uppercase tracking-[0.06em] text-plaster active:bg-laterite-deep"
        >
          <WhatsAppIcon className="h-4 w-4 text-plaster" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
