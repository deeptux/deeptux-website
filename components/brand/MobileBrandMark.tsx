"use client";

import { scrollToSection } from "@/lib/scroll-to";

export function MobileBrandMark() {
  return (
    <button
      type="button"
      onClick={() => scrollToSection("hero")}
      className="pointer-events-auto fixed left-3 top-[max(0.65rem,env(safe-area-inset-top))] z-40 flex h-11 max-w-[min(calc(100vw-1.5rem),280px)] items-center gap-2 rounded-xl border border-white/15 bg-deeptux-ink/80 px-2.5 py-1 shadow-lg backdrop-blur-md md:hidden"
      aria-label="Deeptux IT Solutions — back to home"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/deeptux-logo-whitebg.jpg"
        alt=""
        aria-hidden
        className="h-8 w-auto max-w-[76px] shrink-0 rounded-lg object-contain sm:h-9 sm:max-w-[88px]"
        decoding="async"
      />
      <span className="shrink-0 font-sans text-[10px] font-bold tracking-[0.12em] text-white">
        DEEPTUX
      </span>
    </button>
  );
}
