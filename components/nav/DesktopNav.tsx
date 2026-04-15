"use client";

import { scrollToSection } from "@/lib/scroll-to";

const links = [
  { id: "story", label: "Story" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "work-web", label: "Work" },
  { id: "work-cctv", label: "Security" },
  { id: "contact", label: "Contact" },
] as const;

export function DesktopNav() {
  return (
    <header className="pointer-events-auto fixed left-0 right-0 top-0 z-30 hidden border-b border-white/10 bg-deeptux-ink/70 backdrop-blur-md md:block">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <button
          type="button"
          onClick={() => scrollToSection("hero")}
          className="flex items-center gap-3 text-left transition hover:opacity-90 sm:gap-4"
          aria-label="Deeptux IT Solutions — home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/deeptux-logo-whitebg.jpg"
            alt=""
            aria-hidden
            className="h-9 w-auto max-w-[104px] rounded-lg object-contain object-left sm:h-10 sm:max-w-[118px]"
            decoding="async"
          />
          <span className="whitespace-nowrap font-sans text-base font-bold tracking-[0.14em] text-white sm:text-lg">
            DEEPTUX
          </span>
        </button>
        <nav
          aria-label="Primary"
          className="flex flex-wrap justify-end gap-1 text-[11px] font-medium uppercase tracking-wide text-white/80 sm:text-xs md:text-sm"
        >
          {links.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => scrollToSection(l.id)}
              className="rounded-full px-3 py-1.5 transition hover:bg-white/10 hover:text-white"
            >
              {l.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
