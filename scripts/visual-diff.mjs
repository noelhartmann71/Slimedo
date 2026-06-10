// Zero-dependency PNG pixel diff for the Slimedo visual-regression workflow.
// Uses only Node built-ins (zlib). Decodes 8-bit non-interlaced PNGs
// (color type 2 = RGB, 6 = RGBA) — which is what Playwright emits.
//
//   node scripts/visual-diff.mjs                       # diff visual-baseline vs visual-current
//   node scripts/visual-diff.mjs <dirA> <dirB>         # diff two arbitrary folders
//   THRESHOLD=12 node scripts/visual-diff.mjs          # per-channel tolerance (default 12)
//
// Exit code 0 = no meaningful differences, 1 = differences found (or size mismatch).
// Writes a highlighted <name>.diff.png next to each changed pair in dirB.

import zlib from "node:zlib";
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";

const PNG_SIG = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const THRESHOLD = Number(process.env.THRESHOLD ?? 12);
const MIN_CLUSTER = Number(process.env.MIN_CLUSTER ?? 3);

function decodePng(buf) {
  if (!buf.subarray(0, 8).equals(PNG_SIG)) throw new Error("not a PNG");
  let off = 8;
  let width = 0, height = 0, bitDepth = 0, colorType = 0, interlace = 0;
  const idat = [];
  while (off < buf.length) {
    const len = buf.readUInt32BE(off);
    const type = buf.toString("ascii", off + 4, off + 8);
    const data = buf.subarray(off + 8, off + 8 + len);
    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
      interlace = data[12];
    } else if (type === "IDAT") {
      idat.push(data);
    } else if (type === "IEND") {
      break;
    }
    off += 12 + len;
  }
  if (bitDepth !== 8) throw new Error(`unsupported bit depth ${bitDepth}`);
  if (interlace !== 0) throw new Error("interlaced PNG unsupported");
  const channels = colorType === 6 ? 4 : colorType === 2 ? 3 : 0;
  if (!channels) throw new Error(`unsupported color type ${colorType}`);

  const raw = zlib.inflateSync(Buffer.concat(idat));
  const bpp = channels;
  const stride = width * bpp;
  const out = Buffer.alloc(width * height * 4);
  const line = Buffer.alloc(stride);
  let prev = Buffer.alloc(stride);
  let pos = 0;

  const paeth = (a, b, c) => {
    const p = a + b - c;
    const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
    return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
  };

  for (let y = 0; y < height; y++) {
    const filter = raw[pos++];
    for (let x = 0; x < stride; x++) {
      const cur = raw[pos++];
      const a = x >= bpp ? line[x - bpp] : 0;
      const b = prev[x];
      const c = x >= bpp ? prev[x - bpp] : 0;
      let val;
      switch (filter) {
        case 0: val = cur; break;
        case 1: val = cur + a; break;
        case 2: val = cur + b; break;
        case 3: val = cur + ((a + b) >> 1); break;
        case 4: val = cur + paeth(a, b, c); break;
        default: throw new Error(`bad filter ${filter}`);
      }
      line[x] = val & 0xff;
    }
    // expand scanline to RGBA
    for (let x = 0; x < width; x++) {
      const si = x * bpp;
      const di = (y * width + x) * 4;
      out[di] = line[si];
      out[di + 1] = line[si + 1];
      out[di + 2] = line[si + 2];
      out[di + 3] = bpp === 4 ? line[si + 3] : 255;
    }
    const tmp = prev; prev = Buffer.from(line); line.fill(0); void tmp;
  }
  return { width, height, data: out };
}

function encodePng(width, height, rgba) {
  const stride = width * 4;
  const rawSize = (stride + 1) * height;
  const raw = Buffer.alloc(rawSize);
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0; // filter None
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride);
  }
  const idat = zlib.deflateSync(raw, { level: 6 });
  const chunk = (type, data) => {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, "ascii");
    const body = Buffer.concat([typeBuf, data]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(zlib.crc32(body) >>> 0, 0);
    return Buffer.concat([len, body, crc]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;   // bit depth
  ihdr[9] = 6;   // RGBA
  return Buffer.concat([
    PNG_SIG,
    chunk("IHDR", ihdr),
    chunk("IDAT", idat),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

function diffPair(aPath, bPath, outPath) {
  const a = decodePng(readFileSync(aPath));
  const b = decodePng(readFileSync(bPath));
  if (a.width !== b.width || a.height !== b.height) {
    return { sizeMismatch: true, a: `${a.width}x${a.height}`, b: `${b.width}x${b.height}` };
  }
  const { width, height } = a;
  const total = width * height;

  // Pass 1: raw per-pixel diff mask (per-channel tolerance).
  const mask = new Uint8Array(total);
  for (let i = 0; i < total; i++) {
    const o = i * 4;
    const dr = Math.abs(a.data[o] - b.data[o]);
    const dg = Math.abs(a.data[o + 1] - b.data[o + 1]);
    const db = Math.abs(a.data[o + 2] - b.data[o + 2]);
    const da = Math.abs(a.data[o + 3] - b.data[o + 3]);
    if (Math.max(dr, dg, db, da) > THRESHOLD) mask[i] = 1;
  }

  // Pass 2: keep a diff pixel only if >= MIN_CLUSTER of its 8 neighbors also
  // differ. This drops 1px antialiasing/subpixel-shift edges while preserving
  // solid recoloured regions. Set MIN_CLUSTER=0 to disable.
  const diff = Buffer.alloc(total * 4);
  let changed = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      const o = i * 4;
      let real = mask[i] === 1;
      if (real && MIN_CLUSTER > 0) {
        let n = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const yy = y + dy, xx = x + dx;
            if (yy < 0 || xx < 0 || yy >= height || xx >= width) continue;
            if (mask[yy * width + xx]) n++;
          }
        }
        if (n < MIN_CLUSTER) real = false;
      }
      if (real) {
        changed++;
        diff[o] = 255; diff[o + 1] = 0; diff[o + 2] = 255; diff[o + 3] = 255; // magenta
      } else {
        const g = (a.data[o] * 0.3 + a.data[o + 1] * 0.59 + a.data[o + 2] * 0.11) | 0;
        const dim = 60 + ((g * 0.5) | 0);
        diff[o] = dim; diff[o + 1] = dim; diff[o + 2] = dim; diff[o + 3] = 255;
      }
    }
  }
  if (changed > 0 && outPath) writeFileSync(outPath, encodePng(width, height, diff));
  return { changed, total, pct: (changed / total) * 100 };
}

const dirA = process.argv[2] || "visual-baseline";
const dirB = process.argv[3] || "visual-current";
if (!existsSync(dirA) || !existsSync(dirB)) {
  console.error(`Need both folders. Missing: ${!existsSync(dirA) ? dirA : dirB}`);
  console.error(`Run: node scripts/visual-baseline.mjs current   (then re-run this)`);
  process.exit(2);
}

let anyDiff = false;
for (const vp of readdirSync(dirA)) {
  const subA = path.join(dirA, vp);
  const subB = path.join(dirB, vp);
  if (!existsSync(subB)) continue;
  for (const file of readdirSync(subA)) {
    if (!file.endsWith(".png") || file.endsWith(".diff.png")) continue;
    const aPath = path.join(subA, file);
    const bPath = path.join(subB, file);
    if (!existsSync(bPath)) { console.log(`MISSING in current: ${vp}/${file}`); anyDiff = true; continue; }
    const outPath = path.join(subB, file.replace(/\.png$/, ".diff.png"));
    const r = diffPair(aPath, bPath, outPath);
    if (r.sizeMismatch) {
      console.log(`SIZE  ${vp}/${file}: ${r.a} -> ${r.b}`);
      anyDiff = true;
    } else if (r.changed > 0) {
      console.log(`DIFF  ${vp}/${file}: ${r.changed} px (${r.pct.toFixed(4)}%) -> ${path.basename(outPath)}`);
      anyDiff = true;
    } else {
      console.log(`OK    ${vp}/${file}`);
    }
  }
}
console.log(anyDiff ? "\nDifferences found." : `\nNo differences (threshold=${THRESHOLD}). Landing is pixel-stable.`);
process.exit(anyDiff ? 1 : 0);
