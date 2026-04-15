"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { DeeptuxScene } from "./DeeptuxScene";
import type { RefObject } from "react";

type Props = {
  scrollRef: RefObject<HTMLDivElement | null>;
  reducedMotion: boolean;
};

function useMobileShardCount() {
  const [count, setCount] = useState(14);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const apply = () => setCount(mq.matches ? 10 : 18);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return count;
}

export default function CanvasImpl({ scrollRef, reducedMotion }: Props) {
  const shardCount = useMobileShardCount();
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    const raw = Math.min(window.devicePixelRatio || 1, 1.35);
    setDpr(raw);
  }, []);

  return (
    <Canvas
      dpr={[1, dpr]}
      gl={{
        alpha: false,
        antialias: false,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
      camera={{ position: [0, 0, 6.2], fov: 42, near: 0.1, far: 40 }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#050506"]} />
      <Suspense fallback={null}>
        <DeeptuxScene
          scrollRef={scrollRef}
          reducedMotion={reducedMotion}
          shardCount={shardCount}
        />
      </Suspense>
    </Canvas>
  );
}
