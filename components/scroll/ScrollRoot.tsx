"use client";

import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";

const ScrollContext = createContext<RefObject<HTMLDivElement | null> | null>(
  null,
);

export function useMainScrollRef(): RefObject<HTMLDivElement | null> {
  const ctx = useContext(ScrollContext);
  if (!ctx) {
    throw new Error("useMainScrollRef must be used within ScrollRoot");
  }
  return ctx;
}

export function ScrollRoot({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  return (
    <ScrollContext.Provider value={scrollRef}>
      <div className="relative min-h-dvh bg-deeptux-ink text-white">{children}</div>
    </ScrollContext.Provider>
  );
}

export function MainScroll({ children }: { children: ReactNode }) {
  const scrollRef = useMainScrollRef();
  return (
    <div
      ref={scrollRef}
      id="main-scroll"
      className="relative z-10 h-dvh overflow-y-auto overflow-x-hidden overscroll-y-contain scroll-smooth"
    >
      {children}
    </div>
  );
}
