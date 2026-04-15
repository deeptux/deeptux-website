"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import type { RefObject } from "react";
import * as THREE from "three";
import { DEEPTUX_RED } from "@/lib/brand-visual";

const BRAND_RED = DEEPTUX_RED;

type Props = {
  scrollRef: RefObject<HTMLDivElement | null>;
  reducedMotion: boolean;
  shardCount: number;
};

const ORBIT_RADIUS = 1.6;
/** Wider orbit so steady shards read near the viewport edges (not clustered). */
const STEADY_ORBIT_BASE = 2.95;
const STEADY_RADIUS_JITTER = 1.65;
/** Nudge steady shards left on screen so fewer sit over the shield center / tie. */
const STEADY_GROUP_OFFSET_X = 1.3;

function createSteadyShardGeometry(sides: number): THREE.BufferGeometry {
  if (sides === 3) {
    return new THREE.ConeGeometry(0.28, 0.62, 3);
  }
  if (sides === 4) {
    const e = 0.38;
    return new THREE.BoxGeometry(e, e, e);
  }
  const r = 0.3;
  const h = 0.56;
  return new THREE.CylinderGeometry(r, r, h, sides);
}

export function DeeptuxScene({
  scrollRef,
  reducedMotion,
  shardCount,
}: Props) {
  const gltf = useGLTF("/models/deeptux-shield.glb") as { scene: THREE.Group };
  const group = useRef<THREE.Group>(null);
  const spinningRefs = useRef<Array<THREE.Mesh | null>>([]);
  const steadyRefs = useRef<Array<THREE.Mesh | null>>([]);
  const steadyGeometriesRef = useRef<Record<number, THREE.BufferGeometry>>({});
  const currentSteadySidesRef = useRef(3);
  const smoothProgress = useRef(0);

  const shieldModel = useMemo(() => {
    const model = gltf.scene.clone(true);
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const targetHeight = 2.45;
    const scale = size.y > 0 ? targetHeight / size.y : 1;

    model.position.sub(center);
    model.scale.setScalar(scale);
    model.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;
      obj.castShadow = true;
      obj.receiveShadow = true;
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      mats.forEach((m) => {
        if ("transparent" in m) m.transparent = false;
        if ("opacity" in m) m.opacity = 1;
        if ("alphaTest" in m) m.alphaTest = 0;
        if ("depthWrite" in m) m.depthWrite = true;
        if ("depthTest" in m) m.depthTest = true;
        if ("side" in m) m.side = THREE.FrontSide;
        if ("transmission" in m) m.transmission = 0;
        if ("metalness" in m) m.metalness = Math.max(m.metalness ?? 0, 0.28);
        if ("roughness" in m) m.roughness = Math.min(m.roughness ?? 1, 0.5);
        if (m instanceof THREE.MeshStandardMaterial) {
          m.flatShading = false;
        }
        m.needsUpdate = true;
      });
    });
    return model;
  }, [gltf.scene]);

  const rng = (n: number) => {
    const x = Math.sin(n * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  };

  const totalShards = Math.max(32, shardCount * 3);
  const spinCount = Math.floor(totalShards / 2);
  const steadyCount = totalShards - spinCount;

  const spinningHeptagons = useMemo(() => {
    return Array.from({ length: spinCount }, (_, i) => ({
      baseAngle: (i / spinCount) * Math.PI * 2 + (rng(i + 13) - 0.5) * 0.2,
      radius: ORBIT_RADIUS + (rng(i + 17) - 0.5) * 0.9,
      yBase: -1 + (rng(i + 31) - 0.5) * 2.2,
      yAmp: 0.08 + rng(i + 41) * 0.22,
      yFreq: 0.55 + rng(i + 57) * 0.9,
      yPhase: rng(i + 73) * Math.PI * 2,
      spinSpeed: 0.15 + rng(i + 83) * 0.45,
      rotation: [
        rng(i + 2) * Math.PI,
        rng(i + 5) * Math.PI,
        rng(i + 8) * Math.PI,
      ] as [number, number, number],
      scale: 0.16 + rng(i + 11) * 0.16,
    }));
  }, [spinCount]);

  const steadyHeptagons = useMemo(() => {
    return Array.from({ length: steadyCount }, (_, i) => ({
      baseAngle: (i / steadyCount) * Math.PI * 2 + (rng(i + 113) - 0.5) * 0.42,
      radius: STEADY_ORBIT_BASE + (rng(i + 117) - 0.5) * STEADY_RADIUS_JITTER,
      yBase: -1.45 + (rng(i + 131) - 0.5) * 2.95,
      rotation: [
        rng(i + 102) * Math.PI,
        rng(i + 105) * Math.PI,
        rng(i + 108) * Math.PI,
      ] as [number, number, number],
      scale: 0.14 + rng(i + 111) * 0.2,
    }));
  }, [steadyCount]);

  useEffect(() => {
    const geometries = steadyGeometriesRef.current;
    return () => {
      Object.values(geometries).forEach((g) => g.dispose());
    };
  }, []);

  useFrame((_, delta) => {
    if (!group.current) return;
    if (reducedMotion) {
      group.current.rotation.set(0, 0, 0);
      group.current.position.y = 0;
      return;
    }
    const el = scrollRef.current;
    const max = el ? el.scrollHeight - el.clientHeight : 0;
    const scrollP = max > 0 ? el!.scrollTop / max : 0;
    const lerpAmt = 1 - Math.pow(0.0012, delta);
    smoothProgress.current = THREE.MathUtils.lerp(
      smoothProgress.current,
      scrollP,
      lerpAmt,
    );
    const p = smoothProgress.current;
    group.current.rotation.y = p * Math.PI * 1.65;
    group.current.rotation.x = p * 0.38;
    group.current.position.y = THREE.MathUtils.lerp(0.12, -0.32, p);

    const t = performance.now() * 0.001;
    spinningHeptagons.forEach((h, i) => {
      const mesh = spinningRefs.current[i];
      if (!mesh) return;
      const angle = h.baseAngle + t * h.spinSpeed;
      const x = Math.cos(angle) * h.radius;
      const z = Math.sin(angle) * h.radius;
      const y = h.yBase + Math.sin(t * h.yFreq + h.yPhase) * h.yAmp;
      mesh.position.set(x, y, z);
      mesh.rotation.set(
        h.rotation[0] + Math.sin(t * (0.6 + h.spinSpeed)) * 0.2,
        h.rotation[1] + t * (0.35 + h.spinSpeed * 0.5),
        h.rotation[2] + Math.cos(t * (0.7 + h.spinSpeed)) * 0.2,
      );
    });
    const steadySides = THREE.MathUtils.clamp(
      3 + Math.round(scrollP * 7),
      3,
      10,
    );
    if (steadySides !== currentSteadySidesRef.current) {
      currentSteadySidesRef.current = steadySides;
      if (!steadyGeometriesRef.current[steadySides]) {
        steadyGeometriesRef.current[steadySides] =
          createSteadyShardGeometry(steadySides);
      }
      const nextGeometry = steadyGeometriesRef.current[steadySides];
      steadyRefs.current.forEach((mesh) => {
        if (!mesh) return;
        mesh.geometry = nextGeometry;
      });
    }
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.32} />
      <directionalLight position={[5, 7, 5]} intensity={1.05} color="#ffffff" />
      <directionalLight position={[-4, -2, -3]} intensity={0.28} color="#94a3b8" />
      <pointLight position={[-2.2, -1.2, 3.2]} intensity={0.85} color={BRAND_RED} />
      <pointLight position={[2.4, 1.4, 2.4]} intensity={0.35} color={BRAND_RED} />
      <directionalLight position={[0, 0, 8]} intensity={0.16} color="#f1f5f9" />

      <group scale={1.26} position={[0.15, 0, 0]}>
        <primitive object={shieldModel} position={[0, -1.3, 0]} />

        {/* Half of the heptagons spin around the shield */}
        <group>
          {spinningHeptagons.map((h, i) => (
            <mesh
              key={`spin-${i}`}
              position={[
                Math.cos(h.baseAngle) * h.radius,
                h.yBase,
                Math.sin(h.baseAngle) * h.radius,
              ]}
              rotation={h.rotation}
              scale={h.scale}
              ref={(el) => {
                spinningRefs.current[i] = el;
              }}
            >
              <cylinderGeometry args={[0.24, 0.24, 0.08, 7]} />
              <meshStandardMaterial
                color={BRAND_RED}
                emissive={BRAND_RED}
                emissiveIntensity={0.22}
                metalness={0.34}
                roughness={0.3}
              />
            </mesh>
          ))}
        </group>

        {/* The other half remains steady but still follows scene scroll rotations */}
        <group position={[STEADY_GROUP_OFFSET_X, 0, 0]}>
          {steadyHeptagons.map((h, i) => (
            <mesh
              key={`steady-${i}`}
              position={[
                Math.cos(h.baseAngle) * h.radius * 1.12,
                h.yBase,
                Math.sin(h.baseAngle) * h.radius * 0.98,
              ]}
              rotation={h.rotation}
              scale={h.scale * 1.75}
              ref={(el) => {
                steadyRefs.current[i] = el;
              }}
            >
              <coneGeometry args={[0.28, 0.62, 3]} />
              <meshStandardMaterial
                color={BRAND_RED}
                emissive={BRAND_RED}
                emissiveIntensity={0.2}
                metalness={0.32}
                roughness={0.34}
              />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/deeptux-shield.glb");
