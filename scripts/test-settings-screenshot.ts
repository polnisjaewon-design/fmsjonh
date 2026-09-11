import { chromium } from "@playwright/test";
import * as path from "path";

async function testSettingsScreenshot() {
  const artifactDir = "/Users/mac/.gemini/antigravity/brain/b3b15d0a-16a7-4efa-8178-f79e5bcefd7f";
  const browser = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
  });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  try {
    await page.goto("http://localhost:3010/login?callbackUrl=/settings", { waitUntil: "networkidle" });
    for (let i = 0; i < 20; i++) {
      const cookies = await context.cookies();
      if (cookies.some((c) => c.name === "authjs.csrf-token")) break;
      await page.waitForTimeout(200);
    }
    await page.fill("#email", "admin@app.local");
    await page.fill("#password", "Passw0rd!vibe");
    await page.locator('button[type="submit"]').click();

    await page.waitForFunction(() => window.location.pathname.includes("/settings"), { timeout: 15000 }).catch(() => {});
    if (!page.url().includes("/settings")) {
      await page.goto("http://localhost:3010/settings", { waitUntil: "networkidle" });
    }
    await page.waitForTimeout(2500);

    const target = page.locator("text=Google OAuth 2.0");
    await target.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);

    const shotPath = path.join(artifactDir, "settings_google_oauth_card.png");
    await page.screenshot({ path: shotPath });
    console.log("📸 บันทึกภาพหน้าจอ Settings OAuth Card สำเร็จ:", shotPath);
  } finally {
    await browser.close();
  }
}

testSettingsScreenshot();
