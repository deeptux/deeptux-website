"use client";

import { rasterizeProcessedLogo } from "@/lib/remap-deeptux-logo";
import { DEEPTUX_LOGO } from "@/lib/brand-visual";
import { useEffect, useState } from "react";

type Props = {
  className?: string;
  decorative?: boolean;
};

let cachedPng: string | null = null;
let inflight: Promise<string> | null = null;

function loadDarkLogoPng(): Promise<string> {
  if (cachedPng) return Promise.resolve(cachedPng);
  if (!inflight) {
    inflight = rasterizeProcessedLogo(DEEPTUX_LOGO)
      .then((url) => {
        cachedPng = url;
        return url;
      })
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
}

export function DeeptuxLogoDark({ className = "", decorative }: Props) {
  const [src, setSrc] = useState<string | null>(() => cachedPng);

  useEffect(() => {
    let cancelled = false;
    loadDarkLogoPng().then((url) => {
      if (!cancelled) setSrc(url);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!src) {
    return (
      <span
        className={`inline-block rounded-md bg-white/10 ${className}`}
        style={{ aspectRatio: "2.4 / 1", minHeight: "2.25rem", minWidth: "5rem" }}
        aria-hidden={decorative}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- data URL from canvas; not in /public
    <img
      src={src}
      alt={decorative ? "" : "Deeptux IT Solutions"}
      className={className}
      decoding="async"
      {...(decorative ? { "aria-hidden": true } : {})}
    />
  );
}
