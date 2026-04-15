import * as THREE from "three";

/**
 * True heraldic shield silhouette: flat upper crest, broad shoulders, and
 * pointed base (avoids heart-like curvature).
 */
export function createShieldExtrudeGeometry(): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  const tipY = -1.16;
  const crestY = 0.94;

  shape.moveTo(0, tipY);
  // Right lower belly to shoulder
  shape.bezierCurveTo(0.5, -0.86, 0.84, -0.24, 0.86, 0.2);
  // Shoulder up to top-right corner
  shape.bezierCurveTo(0.88, 0.58, 0.74, 0.84, 0.54, crestY);
  // Upper crest (slightly faceted flat top)
  shape.quadraticCurveTo(0.3, crestY + 0.03, 0.08, crestY);
  shape.lineTo(-0.08, crestY);
  shape.quadraticCurveTo(-0.3, crestY + 0.03, -0.54, crestY);
  // Mirror down left
  shape.bezierCurveTo(-0.74, 0.84, -0.88, 0.58, -0.86, 0.2);
  shape.bezierCurveTo(-0.84, -0.24, -0.5, -0.86, 0, tipY);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.2,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.032,
    bevelOffset: 0,
    bevelSegments: 3,
    curveSegments: 28,
  });

  geo.computeVertexNormals();
  const pos = geo.getAttribute("position") as THREE.BufferAttribute;
  const box = new THREE.Box3().setFromBufferAttribute(pos);
  const c = box.getCenter(new THREE.Vector3());
  geo.translate(-c.x, -c.y, -c.z);

  return geo;
}
