/**
 * Rebuild public/models/deeptux-shield.glb from a high-res source.
 * Place the original (pre-decimation) file at:
 *   public/models/deeptux-shield.source.glb
 * Then: npm run rebuild:shield
 *
 * Keeps ~52% of vertices (smoother tie than --ratio 0.38); still much smaller than source.
 */
const { execSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const source = path.join(root, "public", "models", "deeptux-shield.source.glb");
const dest = path.join(root, "public", "models", "deeptux-shield.glb");
const tmp1 = path.join(root, "public", "models", "_shield_tmp1.glb");
const tmp2 = path.join(root, "public", "models", "_shield_tmp2.glb");
const tmp3 = path.join(root, "public", "models", "_shield_tmp3.glb");

if (!fs.existsSync(source)) {
  console.error(
    "Missing public/models/deeptux-shield.source.glb — add your high-res GLB there, then rerun.",
  );
  process.exit(1);
}

function run(cmd) {
  execSync(cmd, { cwd: root, stdio: "inherit", shell: true });
}

try {
  run(
    `npx gltf-transform optimize "${source}" "${tmp1}" --compress false --texture-compress webp --texture-size 2048 --simplify false --join false --instance false`,
  );
  run(
    `npx gltf-transform simplify "${tmp1}" "${tmp2}" --ratio 0.52 --error 0.00005`,
  );
  run(`npx gltf-transform quantize "${tmp2}" "${tmp3}"`);
  run(`npx gltf-transform prune "${tmp3}" "${dest}"`);
  console.log("Wrote", path.relative(root, dest));
} finally {
  for (const f of [tmp1, tmp2, tmp3]) {
    try {
      fs.unlinkSync(f);
    } catch {
      /* ignore */
    }
  }
}
