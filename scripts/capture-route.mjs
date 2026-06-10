// Ad-hoc full-page screenshot of a single route (for manual review of
// non-landing pages during the migration).
//
//   node scripts/capture-route.mjs /auth/login login
//   node scripts/capture-route.mjs /auth/login login-m 390   (mobile width)
//   BASE_URL=http://localhost:5181 node scripts/capture-route.mjs <route> <name> [width]

import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const route = process.argv[2] || "/";
const name = process.argv[3] || "route";
const width = Number(process.argv[4]) || 1440;
const height = width <= 480 ? 844 : 900;
const BASE_URL = process.env.BASE_URL || "http://localhost:5173";
const outDir = "visual-routes";

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width, height },
  deviceScaleFactor: 2,
  isMobile: width <= 480,
});
const page = await context.newPage();
await page.goto(BASE_URL + route, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(800);
await mkdir(outDir, { recursive: true });
const file = path.join(outDir, `${name}.png`);
await page.screenshot({ path: file, fullPage: true });
console.log(`captured ${route} @${width}px -> ${file}`);
await browser.close();
