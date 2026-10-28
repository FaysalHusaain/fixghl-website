// FixGHL logo system generator. One source of truth for every brand file.
// Run: node design/brand.mjs   (needs Playwright's Chromium and python3 + Pillow for the .ico)
//
// Mark: a spirit level. Pill 44x18, radius 9, stroke 3; ticks at ±11 (stroke 1.5, 40%); bubble r 4.5 dead centre.
// Wordmark: "FixGHL" in Inter Tight 600, tracking -0.04em, outlined to paths.
// Lockup: mark left, vertically centred, gap = 0.35 x wordmark height.

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import opentype from "opentype.js";

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const out = path.join(root, "public/brand");
fs.mkdirSync(out, { recursive: true });

const INK = "#08080A";
const WHITE = "#FFFFFF";
const GOLD = "#FFDE59";
const GOLD_ON_LIGHT = "#E8C33A";

const r2 = (n) => Math.round(n * 100) / 100;

// ---------- Wordmark outlines ----------
const fontFile = path.join(root, "node_modules/@fontsource/inter-tight/files/inter-tight-latin-600-normal.woff");
const buf = fs.readFileSync(fontFile);
const font = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));

const SIZE = 100; // working font size; everything is rescaled later
const TRACK = -0.04 * SIZE;
const glyphs = font.stringToGlyphs("FixGHL");
const scale = SIZE / font.unitsPerEm;
let x = 0;
const commands = [];
glyphs.forEach((g, i) => {
  const p = g.getPath(x, 0, SIZE);
  commands.push(...p.commands);
  const kern = i < glyphs.length - 1 ? font.getKerningValue(g, glyphs[i + 1]) * scale : 0;
  x += g.advanceWidth * scale + kern + (i < glyphs.length - 1 ? TRACK : 0);
});

// Tight bounds of the outlines (baseline at y=0, so tops are negative).
const word = new opentype.Path();
word.commands = commands;
const bb = word.getBoundingBox();
const wordW = bb.x2 - bb.x1;
const wordH = bb.y2 - bb.y1;

// Re-emit the path normalised to (0,0) top-left, in units where wordmark height = 1.
function pathData(dx, dy, k) {
  const X = (v) => r2((v - bb.x1) * k + dx);
  const Y = (v) => r2((v - bb.y1) * k + dy);
  return commands
    .map((c) => {
      if (c.type === "M") return `M${X(c.x)} ${Y(c.y)}`;
      if (c.type === "L") return `L${X(c.x)} ${Y(c.y)}`;
      if (c.type === "Q") return `Q${X(c.x1)} ${Y(c.y1)} ${X(c.x)} ${Y(c.y)}`;
      if (c.type === "C") return `C${X(c.x1)} ${Y(c.y1)} ${X(c.x2)} ${Y(c.y2)} ${X(c.x)} ${Y(c.y)}`;
      return "Z";
    })
    .join("");
}

// ---------- Mark ----------
// Native mark units: pill 44x18 with a 3-unit stroke centred on the edge, so the outer box is 47x21.
const PILL = { w: 44, h: 18, r: 9, stroke: 3 };
const MARK_W = PILL.w + PILL.stroke;
const MARK_H = PILL.h + PILL.stroke;

function markSvg({ ox, oy, k, line, bubble, ticks = true, tickOpacity = 0.4 }) {
  const cx = ox + (MARK_W / 2) * k;
  const cy = oy + (MARK_H / 2) * k;
  const parts = [
    `<rect x="${r2(cx - (PILL.w / 2) * k)}" y="${r2(cy - (PILL.h / 2) * k)}" width="${r2(PILL.w * k)}" height="${r2(PILL.h * k)}" rx="${r2(PILL.r * k)}" fill="none" stroke="${line}" stroke-width="${r2(PILL.stroke * k)}"/>`,
  ];
  if (ticks) {
    const t = 1.5 * k;
    const half = (PILL.h / 2 - PILL.stroke / 2) * k; // ticks run the inner height of the vial
    for (const s of [-1, 1]) {
      const tx = r2(cx + s * 11 * k);
      parts.push(`<line x1="${tx}" y1="${r2(cy - half)}" x2="${tx}" y2="${r2(cy + half)}" stroke="${line}" stroke-width="${r2(t)}" stroke-opacity="${tickOpacity}"/>`);
    }
  }
  parts.push(`<circle cx="${r2(cx)}" cy="${r2(cy)}" r="${r2(4.5 * k)}" fill="${bubble}"/>`);
  return parts.join("");
}

// ---------- Lockup geometry ----------
// Wordmark height H; the mark is drawn at a size where its outer height sits at 0.92 H, optically matched to the caps.
const H = 40;
const k = (0.92 * H) / MARK_H;
const markW = MARK_W * k;
const gap = 0.35 * H;
const wordScale = H / wordH;
const lockW = markW + gap + wordW * wordScale;
const lockH = H;
const markY = (lockH - MARK_H * k) / 2;
const wordPath = pathData(markW + gap, 0, wordScale);

function lockupSvg({ line, bubble, word, bg, pad = 0 }) {
  const W = r2(lockW + pad * 2);
  const Ht = r2(lockH + pad * 2);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${Ht}" width="${W}" height="${Ht}" role="img" aria-label="FixGHL">${
    bg ? `<rect width="${W}" height="${Ht}" fill="${bg}"/>` : ""
  }<g transform="translate(${pad} ${pad})">${markSvg({ ox: 0, oy: markY, k, line, bubble })}<path d="${wordPath}" fill="${word}"/></g></svg>\n`;
}

// logo-dark: white on ink (background included); logo-light: ink on transparent.
fs.writeFileSync(path.join(out, "logo-dark.svg"), lockupSvg({ line: WHITE, bubble: GOLD, word: WHITE, bg: INK, pad: H * 0.6 }));
fs.writeFileSync(path.join(out, "logo-light.svg"), lockupSvg({ line: INK, bubble: GOLD_ON_LIGHT, word: INK }));

// mark.svg (for light grounds) and mark-dark.svg (white pill for dark grounds), native 47x21 units.
const markFile = (line, bubble) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${MARK_W} ${MARK_H}" width="${MARK_W * 4}" height="${MARK_H * 4}" role="img" aria-label="FixGHL">${markSvg({ ox: 0, oy: 0, k: 1, line, bubble })}</svg>\n`;
fs.writeFileSync(path.join(out, "mark.svg"), markFile(INK, GOLD_ON_LIGHT));
fs.writeFileSync(path.join(out, "mark-dark.svg"), markFile(WHITE, GOLD));

// ---------- Icons ----------
// Square icon: ink ground, white pill at 72% of the width, gold bubble. `rounded` gives the app-icon squircle radius.
function iconSvg(px, { ticks = true, rounded = false, fill = 0.72 } = {}) {
  const ik = (px * fill) / MARK_W;
  const ox = (px - MARK_W * ik) / 2;
  const oy = (px - MARK_H * ik) / 2;
  const rr = rounded ? r2(px * 0.2237) : 0;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${px} ${px}" width="${px}" height="${px}"><rect width="${px}" height="${px}" rx="${rr}" fill="${INK}"/>${markSvg({ ox, oy, k: ik, line: WHITE, bubble: GOLD, ticks })}</svg>`;
}
// Small favicons drop the ticks and run the pill wider so the 3-unit stroke survives at 16px.
// Hand-snapped to the pixel grid: whole-pixel strokes, bubble centred on the pixel centre.
const SMALL = {
  16: { rx: 3, pill: [2, 5, 12, 6, 3], stroke: 2, bubble: 1.6 },
  32: { rx: 7, pill: [3.5, 10.5, 25, 11, 5.5], stroke: 3, bubble: 3.2 },
};
const smallIcon = (px) => {
  const g = SMALL[px];
  const [x, y, w, h, rx] = g.pill;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${px} ${px}" width="${px}" height="${px}"><rect width="${px}" height="${px}" rx="${g.rx}" fill="${INK}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="none" stroke="${WHITE}" stroke-width="${g.stroke}"/><circle cx="${px / 2}" cy="${px / 2}" r="${g.bubble}" fill="${GOLD}"/></svg>`;
};

fs.writeFileSync(path.join(out, "icon.svg"), iconSvg(1024, { rounded: true }) + "\n");
fs.writeFileSync(path.join(out, "favicon.svg"), smallIcon(32) + "\n");

// ---------- Rasterise ----------
const { chromium } = require("playwright");
const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 1 });
async function png(svg, w, h, file, { transparent = false } = {}) {
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(`<html><body style="margin:0;background:transparent">${svg.replace(/width="[\d.]+" height="[\d.]+"/, `width="${w}" height="${h}"`)}</body></html>`);
  await page.screenshot({ path: file, omitBackground: transparent, clip: { x: 0, y: 0, width: w, height: h } });
}

await png(iconSvg(1024, { rounded: true }), 1024, 1024, path.join(out, "icon.png"), { transparent: true });
await png(iconSvg(180), 180, 180, path.join(out, "apple-touch-icon.png")); // iOS masks its own corners: full bleed
await png(iconSvg(512), 512, 512, path.join(out, "icon-512.png"));
await png(iconSvg(192), 192, 192, path.join(out, "icon-192.png"));
await png(smallIcon(32), 32, 32, path.join(out, "favicon-32.png"), { transparent: true });
await png(smallIcon(16), 16, 16, path.join(out, "favicon-16.png"), { transparent: true });
await png(iconSvg(48, { rounded: true, fill: 0.8 }), 48, 48, path.join(out, "favicon-48.png"), { transparent: true });

// logo-500: light lockup centred on white, sized to sit inside a circular avatar crop.
{
  const w = 500;
  const lw = 380;
  const s = lw / lockW;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${w}" width="${w}" height="${w}"><rect width="${w}" height="${w}" fill="#FFFFFF"/><g transform="translate(${r2((w - lw) / 2)} ${r2((w - lockH * s) / 2)}) scale(${r2(s * 1000) / 1000})">${markSvg({ ox: 0, oy: markY, k, line: INK, bubble: GOLD_ON_LIGHT })}<path d="${wordPath}" fill="${INK}"/></g></svg>`;
  await png(svg, w, w, path.join(out, "logo-500.png"));
}
// Schema/organisation logo: 512 square app icon on ink (Google prefers a square, solid logo).
await png(iconSvg(512), 512, 512, path.join(out, "logo-512.png"));
await browser.close();

execFileSync("python3", [
  "-c",
  `from PIL import Image
import sys
d=sys.argv[1]
imgs=[Image.open(f"{d}/favicon-{s}.png").convert("RGBA") for s in (16,32,48)]
imgs[2].save(f"{d}/favicon.ico", sizes=[(16,16),(32,32),(48,48)], append_images=imgs[:2])`,
  out,
]);

// ---------- React component data ----------
const ts = `// Generated by design/brand.mjs. Do not edit by hand.
export const LOGO = {
  width: ${r2(lockW)},
  height: ${r2(lockH)},
  pill: { x: ${r2((MARK_W / 2) * k - (PILL.w / 2) * k)}, y: ${r2(markY + (MARK_H / 2) * k - (PILL.h / 2) * k)}, w: ${r2(PILL.w * k)}, h: ${r2(PILL.h * k)}, r: ${r2(PILL.r * k)}, stroke: ${r2(PILL.stroke * k)} },
  ticks: { x: [${r2((MARK_W / 2 - 11) * k)}, ${r2((MARK_W / 2 + 11) * k)}], y1: ${r2(markY + (MARK_H / 2) * k - (PILL.h / 2 - PILL.stroke / 2) * k)}, y2: ${r2(markY + (MARK_H / 2) * k + (PILL.h / 2 - PILL.stroke / 2) * k)}, stroke: ${r2(1.5 * k)} },
  bubble: { cx: ${r2((MARK_W / 2) * k)}, cy: ${r2(markY + (MARK_H / 2) * k)}, r: ${r2(4.5 * k)} },
  word: "${wordPath}",
} as const;
`;
fs.writeFileSync(path.join(root, "src/components/brand/logo-data.ts"), ts);

// Wire into the app: Next serves src/app/{icon.svg,apple-icon.png,favicon.ico}; manifest and schema read /public.
for (const [from, to] of [
  ["favicon.svg", "src/app/icon.svg"],
  ["apple-touch-icon.png", "src/app/apple-icon.png"],
  ["favicon.ico", "src/app/favicon.ico"],
  ["icon-192.png", "public/icon-192.png"],
  ["icon-512.png", "public/icon-512.png"],
  ["logo-512.png", "public/logo.png"],
  ["logo-light.svg", "public/logo.svg"],
]) fs.copyFileSync(path.join(out, from), path.join(root, to));

console.log({ wordW: r2(wordW), wordH: r2(wordH), lockW: r2(lockW), lockH, gap: r2(gap), markScale: r2(k) });
