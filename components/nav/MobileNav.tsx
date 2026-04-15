"use client";

import { scrollToSection } from "@/lib/scroll-to";

const links = [
  { id: "hero", label: "Home" },
  { id: "services", label: "Services" },
  { id: "work-web", label: "Work" },
  { id: "contact", label: "Contact" },
] as const;

export function MobileNav() {
  return (
    <nav
      className="pointer-events-auto fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-deeptux-ink/85 backdrop-blur-md pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 md:hidden"
      aria-label="Primary"
    >
      <ul className="flex justify-around gap-1 px-2 text-[11px] font-medium uppercase tracking-wide text-white/80">
        {links.map((l) => (
          <li key={l.id}>
            <button
              type="button"
              className="rounded-full px-3 py-2 text-white/90 transition hover:bg-white/10 hover:text-white active:scale-[0.98]"
              onClick={() => scrollToSection(l.id)}
            >
              {l.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
