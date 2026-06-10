// Visual baseline/diff capture for the Slimedo landing page.
//
//   node scripts/visual-baseline.mjs baseline   -> writes visual-baseline/<viewport>/...
//   node scripts/visual-baseline.mjs current     -> writes visual-current/<viewport>/...
//
// Captures full-page + per-section screenshots at desktop and mobile widths.
// Compare folders after a refactor; the landing must stay pixel-identical.
//
// Env: BASE_URL (default http://localhost:5173)

import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const mode = process.argv[2] === "current" ? "current" : "baseline";
const outRoot = mode === "current" ? "visual-current" : "visual-baseline";
const BASE_URL = process.env.BASE_URL || "http://localhost:5173";

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

// Section anchors worth capturing individually (best-effort; missing ones are skipped).
const sectionIds = [
  "how-it-works-section",
  "therapie",
  "preise",
  "wirk",
  "potenzial",
  "anwendung",
  "bewertungen",
  "blog",
  "faq",
];

// Freeze all motion + force scroll-reveal elements to their final state, so
// captures are deterministic (no animation-timing / subpixel noise).
const FREEZE_CSS = `
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
    animation-delay: 0s !important;
    animation-duration: 0s !important;
    caret-color: transparent !important;
  }
  .slimedo-anim, .slimedo-anim.played {
    opacity: 1 !important;
    transform: none !important;
  }
`;

async function settlePage(page) {
  await page.addStyleTag({ content: FREEZE_CSS });
  // Trigger scroll-reveal animations by scrolling to the bottom, then back to top.
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = () => {
        window.scrollTo(0, y);
        y += window.innerHeight;
        if (y < document.body.scrollHeight) {
          setTimeout(step, 60);
        } else {
          window.scrollTo(0, 0);
          setTimeout(resolve, 400);
        }
      };
      step();
    });
  });
  await page.waitForTimeout(600);
}

const browser = await chromium.launch();
try {
  for (const vp of viewports) {
    const dir = path.join(outRoot, vp.name);
    await mkdir(dir, { recursive: true });

    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 60000 });
    await settlePage(page);

    await page.screenshot({
      path: path.join(dir, "00-fullpage.png"),
      fullPage: true,
    });
    console.log(`[${mode}] ${vp.name} full page captured`);

    let i = 1;
    for (const id of sectionIds) {
      const el = page.locator(`#${id}`).first();
      if ((await el.count()) === 0) continue;
      try {
        await el.scrollIntoViewIfNeeded();
        await page.waitForTimeout(250);
        await el.screenshot({
          path: path.join(dir, `${String(i).padStart(2, "0")}-${id}.png`),
        });
        i += 1;
      } catch {
        /* section not screenshot-able (offscreen/animated) — skip */
      }
    }
    console.log(`[${mode}] ${vp.name} sections captured`);
    await context.close();
  }
} finally {
  await browser.close();
}
console.log(`Done -> ${outRoot}/`);
