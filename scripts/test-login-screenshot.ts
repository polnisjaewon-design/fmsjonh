import { chromium } from "@playwright/test";
import * as path from "path";

async function testLoginScreenshot() {
  const artifactDir = "/Users/mac/.gemini/antigravity/brain/b3b15d0a-16a7-4efa-8178-f79e5bcefd7f";
  const browser = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
  });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  try {
    await page.goto("http://localhost:3010/login", { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);

    const shotPath = path.join(artifactDir, "google_login_preview.png");
    await page.screenshot({ path: shotPath });
    console.log("📸 บันทึกภาพหน้าจอสำเร็จ:", shotPath);
  } finally {
    await browser.close();
  }
}

testLoginScreenshot();
