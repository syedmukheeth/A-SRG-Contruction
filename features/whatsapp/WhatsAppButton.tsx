"use client";

import { site } from "@/lib/site";

const message = `Hi ${site.name}, I'd like to enquire about a project.`;

/** Fixed WhatsApp click-to-chat button. Opens a prefilled chat in a new tab. */
export function WhatsAppButton() {
  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_8px_30px_rgba(37,211,102,0.45)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110 active:scale-95 sm:h-16 sm:w-16"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/50" />
      <svg
        viewBox="0 0 32 32"
        aria-hidden
        className="h-7 w-7 fill-white sm:h-8 sm:w-8"
      >
        <path d="M16.004 3.2c-7.07 0-12.8 5.73-12.8 12.8 0 2.26.6 4.44 1.73 6.37L3.2 28.8l6.6-1.7a12.74 12.74 0 0 0 6.2 1.6h.005c7.07 0 12.8-5.73 12.8-12.8s-5.73-12.7-12.8-12.7zm0 23.32h-.004a10.5 10.5 0 0 1-5.36-1.47l-.385-.23-3.92 1.02 1.05-3.82-.25-.39a10.48 10.48 0 0 1-1.61-5.62c0-5.8 4.72-10.52 10.52-10.52 2.81 0 5.45 1.1 7.44 3.08a10.44 10.44 0 0 1 3.08 7.45c0 5.8-4.72 10.5-10.52 10.5zm5.77-7.88c-.31-.16-1.85-.91-2.14-1.02-.29-.1-.5-.16-.71.16-.21.31-.81 1.01-.99 1.22-.18.21-.36.23-.67.08-.31-.16-1.3-.48-2.48-1.53-.92-.82-1.53-1.83-1.72-2.14-.18-.31-.02-.48.14-.63.14-.14.31-.36.47-.55.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.62-.52-.53-.71-.54h-.6c-.21 0-.55.08-.83.39-.29.31-1.09 1.07-1.09 2.6s1.12 3.02 1.28 3.23c.16.21 2.2 3.36 5.33 4.71.74.32 1.32.51 1.77.65.75.24 1.43.2 1.97.13.6-.09 1.85-.76 2.11-1.49.26-.73.26-1.36.18-1.49-.07-.13-.28-.21-.6-.36z" />
      </svg>
    </a>
  );
}
