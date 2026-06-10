// Visual sanity check for Navbar interactive states (hover dropdown + button
// hover on desktop, open mobile menu). Manual review only — not a diff.
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const BASE_URL = process.env.BASE_URL || "http://localhost:5173";
const out = "visual-routes";
await mkdir(out, { recursive: true });

const browser = await chromium.launch();

// Desktop: hover the "Abnehmspritzen" dropdown + show CTA button hover.
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await page.getByText("Abnehmspritzen").first().hover();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${out}/navbar-dropdown.png`, clip: { x: 0, y: 0, width: 1440, height: 560 } });
  await page.getByRole("link", { name: /Behandlung starten/ }).first().hover();
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${out}/navbar-cta-hover.png`, clip: { x: 700, y: 0, width: 740, height: 110 } });
  await ctx.close();
}

// Mobile: open the hamburger menu.
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await page.getByLabel("Menü").click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${out}/navbar-mobile-open.png`, clip: { x: 0, y: 0, width: 390, height: 560 } });
  await ctx.close();
}

await browser.close();
console.log("navbar states captured -> visual-routes/");
