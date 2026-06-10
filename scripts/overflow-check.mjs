// Ad-hoc: detect horizontal overflow on mobile for a set of routes.
import { chromium } from "playwright";
const BASE = process.env.BASE_URL || "http://localhost:5173";
const routes = process.argv.slice(2);
if (routes.length === 0) routes.push("/auth/login", "/auth/create-register", "/product/select", "/privacy", "/terms");
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true });
const p = await ctx.newPage();
for (const r of routes) {
  await p.goto(BASE + r, { waitUntil: "networkidle", timeout: 60000 });
  await p.waitForTimeout(500);
  const m = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  const overflow = m.sw - m.cw;
  let culprits = [];
  if (overflow > 0) {
    culprits = await p.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const out = [];
      document.querySelectorAll("*").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.right > vw + 1 && r.width > 0 && r.width < vw * 3) {
          out.push({ tag: el.tagName, cls: (el.className?.toString?.() || "").slice(0, 70), right: Math.round(r.right) });
        }
      });
      return out.slice(0, 10);
    });
  }
  console.log(`${r}  scrollW=${m.sw} clientW=${m.cw} overflow=${overflow}`);
  culprits.forEach((c) => console.log(`    -> <${c.tag}> right=${c.right} "${c.cls}"`));
}
await b.close();
