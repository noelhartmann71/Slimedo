// Einmaliger Smoke-Test für die Folgerezept-Route (Auth-Guard + Rendering).
// Aufruf: node scripts/smoke-follow-up.mjs (Dev-Server muss laufen)
import { chromium } from "playwright";

const BASE = process.env.SMOKE_BASE_URL || "http://localhost:5173";

const browser = await chromium.launch();
try {
  // 1) Ohne Token → Redirect auf /auth/login
  const page1 = await browser.newPage();
  await page1.goto(`${BASE}/questionnaire/follow-up`);
  await page1.waitForTimeout(2500);
  console.log("ohne Token:", page1.url());

  // 2) Mit (Fake-)Token → Seite rendert; Eligibility-Query schlägt ohne
  //    Backend fehl → Redirect zum Dashboard erwartet
  const page2 = await browser.newPage();
  await page2.addInitScript(() => localStorage.setItem("token", "smoke-test"));
  await page2.goto(`${BASE}/questionnaire/follow-up`);
  await page2.waitForTimeout(1000);
  const heading = await page2
    .locator("h1")
    .first()
    .textContent()
    .catch(() => null);
  console.log("mit Token, initiale Überschrift:", heading);
  await page2.waitForTimeout(4000);
  console.log("mit Token, finale URL:", page2.url());
} finally {
  await browser.close();
}
