/**
 * Pixel-remap the official light-plate JPEG for dark UI:
 * near-white → transparent (incl. shirt + page bg),
 * dark ink → near-white,
 * red tie → brand red (#D12127).
 */
const OUT_R = 248;
const OUT_G = 250;
const OUT_B = 252;
const RED_R = 0xd1;
const RED_G = 0x21;
const RED_B = 0x27;

export function remapDeeptuxLogoForDarkBg(data: ImageData): void {
  const d = data.data;

  for (let i = 0; i < d.length; i += 4) {
    const r = d[i];
    const g = d[i + 1];
    const b = d[i + 2];

    const maxc = Math.max(r, g, b);
    const minc = Math.min(r, g, b);
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;

    // Flat white JPEG background
    if (lum > 250 && maxc - minc < 10) {
      d[i + 3] = 0;
      continue;
    }

    // Red tie (check before light/dark so edges classify correctly)
    const isRed =
      r >= 72 &&
      r > g + 12 &&
      r > b + 8 &&
      g < 220 &&
      b < 220 &&
      r >= maxc - 25;

    if (isRed) {
      d[i] = RED_R;
      d[i + 1] = RED_G;
      d[i + 2] = RED_B;
      d[i + 3] = 255;
      continue;
    }

    // Light areas: background, shirt, highlights → transparent w/ soft edge
    if (lum > 200) {
      const fadeStart = 188;
      const fadeEnd = 252;
      if (lum >= fadeEnd) {
        d[i + 3] = 0;
        continue;
      }
      const t = Math.min(1, Math.max(0, (lum - fadeStart) / (fadeEnd - fadeStart)));
      const alpha = Math.round(255 * (1 - t));
      d[i] = OUT_R;
      d[i + 1] = OUT_G;
      d[i + 2] = OUT_B;
      d[i + 3] = alpha;
      continue;
    }

    // Solid dark ink
    if (lum < 95 || maxc < 85) {
      d[i] = OUT_R;
      d[i + 1] = OUT_G;
      d[i + 2] = OUT_B;
      d[i + 3] = 255;
      continue;
    }

    // Mid tones (antialiasing, soft blacks)
    const u = (lum - 95) / (200 - 95);
    const lift = Math.round(OUT_R * (1 - u * 0.12) + lum * u * 0.08);
    d[i] = lift;
    d[i + 1] = Math.min(255, lift + 2);
    d[i + 2] = Math.min(255, lift + 4);
    d[i + 3] = 255;
  }
}

export function rasterizeProcessedLogo(src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      try {
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        if (!w || !h) {
          reject(new Error("Invalid logo dimensions"));
          return;
        }
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) {
          reject(new Error("Canvas unsupported"));
          return;
        }
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, w, h);
        remapDeeptuxLogoForDarkBg(imageData);
        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      } catch (e) {
        reject(e instanceof Error ? e : new Error(String(e)));
      }
    };
    img.onerror = () => reject(new Error("Logo failed to load"));
    img.src = src;
  });
}
