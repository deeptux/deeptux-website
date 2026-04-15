"use client";

import { scrollToSection } from "@/lib/scroll-to";

export function HeroScrollCue() {
  return (
    <div className="pointer-events-auto absolute bottom-[calc(4.5rem+env(safe-area-inset-bottom))] left-1/2 z-20 -translate-x-1/2 md:bottom-10 md:z-10">
      <button
        type="button"
        onClick={() => scrollToSection("story")}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-deeptux-red/50 bg-deeptux-red/15 text-white shadow-[0_0_24px_rgba(209,33,39,0.25)] transition hover:border-deeptux-red hover:bg-deeptux-red/30"
        aria-label="Scroll to next section"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="m7 10 5 5 5-5" />
          <path d="m7 6 5 5 5-5" opacity="0.35" />
        </svg>
      </button>
    </div>
  );
}
