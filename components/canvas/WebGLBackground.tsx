"use client";

import { Loader, useGLTF } from "@react-three/drei";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useMainScrollRef } from "@/components/scroll/ScrollRoot";
import { DEEPTUX_RED } from "@/lib/brand-visual";

const SHIELD_MODEL_URL = "/models/deeptux-shield.glb";

const CanvasImpl = dynamic(() => import("./CanvasImpl"), { ssr: false });

type Props = {
  reducedMotion: boolean;
};

export function WebGLBackground({ reducedMotion }: Props) {
  const scrollRef = useMainScrollRef();

  useEffect(() => {
    void useGLTF.preload(SHIELD_MODEL_URL);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden
    >
      <div className="relative h-full w-full">
        <CanvasImpl scrollRef={scrollRef} reducedMotion={reducedMotion} />
        <Loader
          initialState={() => true}
          dataInterpolation={(p) =>
            p < 100 ? `Loading ${p.toFixed(0)}%` : "Ready"
          }
          containerStyles={{
            background: "#050506",
            pointerEvents: "none",
            transition: reducedMotion ? "none" : undefined,
          }}
          innerStyles={{
            width: 140,
            background: "rgba(255,255,255,0.08)",
          }}
          barStyles={{
            background: DEEPTUX_RED,
          }}
          dataStyles={{
            color: "rgba(248,250,252,0.72)",
            fontSize: "0.7em",
            marginTop: "0.75em",
          }}
        />
      </div>
    </div>
  );
}
