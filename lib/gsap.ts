"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins once (guard against HMR double-registration).
let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  // Mobile browsers fire resize when the address bar collapses mid-scroll;
  // without this every such event forces a full trigger re-measure (stutter).
  ScrollTrigger.config({ ignoreMobileResize: true });
  gsap.defaults({ ease: "power3.out" });
  registered = true;
}

registerGsap();

// One coalesced ScrollTrigger.refresh() per mount batch, after paint. A refresh
// per component re-measures every trigger a dozen times on load.
let refreshQueued = false;
export function queueRefresh() {
  if (refreshQueued) return;
  refreshQueued = true;
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      refreshQueued = false;
      ScrollTrigger.refresh();
    }),
  );
}

export { gsap, ScrollTrigger };
