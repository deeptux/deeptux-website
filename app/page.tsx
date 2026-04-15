"use client";

import { MobileBrandMark } from "@/components/brand/MobileBrandMark";
import { WebGLBackground } from "@/components/canvas/WebGLBackground";
import { DesktopNav } from "@/components/nav/DesktopNav";
import { MobileNav } from "@/components/nav/MobileNav";
import { MainScroll, ScrollRoot } from "@/components/scroll/ScrollRoot";
import { HomeSections } from "@/components/sections/HomeSections";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <ScrollRoot>
      <WebGLBackground reducedMotion={reducedMotion} />
      <MobileBrandMark />
      <DesktopNav />
      <MainScroll>
        <HomeSections />
      </MainScroll>
      <MobileNav />
    </ScrollRoot>
  );
}
