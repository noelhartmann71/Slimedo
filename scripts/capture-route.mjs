// Ad-hoc full-page screenshot of a single route (for manual review of
// non-landing pages during the migration).
//
//   node scripts/capture-route.mjs /auth/login login
//   BASE_URL=http://localhost:5181 node scripts/capture-route.mjs <route> <name>

import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const route = process.argv[2] || "/";
const name = process.argv[3] || "route";
const BASE_URL = process.env.BASE_URL || "http://localhost:5173";
const outDir = "visual-routes";

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
const page = await context.newPage();
await page.goto(BASE_URL + route, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(800);
await mkdir(outDir, { recursive: true });
const file = path.join(outDir, `${name}.png`);
await page.screenshot({ path: file, fullPage: true });
console.log(`captured ${route} -> ${file}`);
await browser.close();
