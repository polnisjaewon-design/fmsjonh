import { chromium } from "@playwright/test";
import * as path from "path";

async function main() {
  const artifactDir = "/Users/mac/.gemini/antigravity/brain/b3b15d0a-16a7-4efa-8178-f79e5bcefd7f";
  const browser = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  console.log("1. Navigating to login page...");
  await page.goto("http://localhost:3010/login", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  // Login
  for (let i = 0; i < 20; i++) {
    const cookies = await context.cookies();
    if (cookies.some((c) => c.name === "authjs.csrf-token")) break;
    await page.waitForTimeout(200);
  }
  await page.fill("#email", "admin@app.local");
  await page.fill("#password", "Passw0rd!vibe");
  await page.locator('button[type="submit"]').click();
  await page.waitForTimeout(2500);

  console.log("2. Testing /settings Gemini AI Configuration...");
  await page.goto("http://localhost:3010/settings", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);

  // Fill Gemini API Key
  const geminiInput = page.locator("#gemini-api-key");
  await geminiInput.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  // Fill key
  await geminiInput.fill("AIzaSyB3M1n1A1T3stK3yPr0v1d3r998877");
  await page.waitForTimeout(500);

  // Save Settings
  const saveBtn = page.locator(".savebar button");
  await saveBtn.click();
  await page.waitForTimeout(2000);

  await page.screenshot({
    path: path.join(artifactDir, "news_01_settings_gemini.png"),
    fullPage: false,
  });
  console.log("Saved screenshot: news_01_settings_gemini.png");

  console.log("3. Navigating to /news-management...");
  await page.goto("http://localhost:3010/news-management", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);

  // Click create news button
  const createBtn = page.locator('button:has-text("สร้างข่าวใหม่")');
  await createBtn.click();
  await page.waitForTimeout(1000);

  // Verify Thai fields
  await page.fill("#news-title-th", "โครงการปฏิบัติวิปัสสนากรรมฐานเฉลิมพระเกียรติ ประจำปี ๒๕๖๙");
  await page.fill("#news-summary-th", "หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา จัดโครงการปฏิบัติธรรมวิปัสสนากรรมฐาน ณ ศูนย์วิปัสสนา มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย");
  await page.fill("#news-content-th", "ภาควิชาพระพุทธศาสนา คณะพุทธศาสตร์ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย ขอเชิญนิสิต คณาจารย์ และพุทธศาสนิกชนทั่วไป เข้าร่วมโครงการปฏิบัติวิปัสสนากรรมฐานเฉลิมพระเกียรติ ประจำปี ๒๕๖๙ เพื่อพัฒนาศักยภาพจิตภาวนาตามแนวสติปัฏฐาน ๔ โดยมีคณาจารย์และพระวิปัสสนาจารย์ผู้ทรงคุณวุฒิคอยให้คำแนะนำตลอดหลักสูตรการปฏิบัติธรรม");

  await page.screenshot({
    path: path.join(artifactDir, "news_02_admin_dialog_th.png"),
    fullPage: false,
  });
  console.log("Saved screenshot: news_02_admin_dialog_th.png");

  // Switch to English Tab
  const enTabBtn = page.locator('button:has-text("English")');
  await enTabBtn.click();
  await page.waitForTimeout(500);

  // Fill English fields
  await page.fill("#news-title-en", "Annual Vipassana Meditation Retreat 2026 for Students and Public");
  await page.fill("#news-summary-en", "Master of Arts Program in Vipassana Meditation Studies hosts the annual mindfulness meditation retreat at MCU Vipassana Center.");
  await page.fill("#news-content-en", "The Department of Buddhism, Faculty of Buddhism, Mahachulalongkornrajavidyalaya University (MCU) cordially invites students, researchers, and meditation practitioners to join the Annual Vipassana Meditation Retreat 2026. This retreat focuses on the Four Foundations of Mindfulness (Satipatthana) guided by experienced Buddhist meditation masters.");

  await page.screenshot({
    path: path.join(artifactDir, "news_03_admin_dialog_en.png"),
    fullPage: false,
  });
  console.log("Saved screenshot: news_03_admin_dialog_en.png");

  // Save the news article
  const dialogSaveBtn = page.locator('div[role="dialog"] button:has-text("บันทึก")');
  await dialogSaveBtn.click();
  await page.waitForTimeout(2000);

  await page.screenshot({
    path: path.join(artifactDir, "news_04_admin_table.png"),
    fullPage: false,
  });
  console.log("Saved screenshot: news_04_admin_table.png");

  console.log("4. Testing Portal /news...");
  await page.goto("http://localhost:3010/news", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);

  await page.screenshot({
    path: path.join(artifactDir, "news_05_portal_news_index.png"),
    fullPage: false,
  });
  console.log("Saved screenshot: news_05_portal_news_index.png");

  console.log("5. Testing Portal /news/[slug] bilingual view...");
  const targetNewsLink = page.locator('h2 a:has-text("โครงการปฏิบัติวิปัสสนากรรมฐานเฉลิมพระเกียรติ")').first();
  await targetNewsLink.click();
  await page.waitForTimeout(1500);

  await page.screenshot({
    path: path.join(artifactDir, "news_06_portal_detail_th.png"),
    fullPage: false,
  });
  console.log("Saved screenshot: news_06_portal_detail_th.png");

  // Switch to English in Portal
  const portalEnBtn = page.locator('button:has-text("English")');
  if (await portalEnBtn.isVisible()) {
    await portalEnBtn.click();
    await page.waitForTimeout(800);
    await page.screenshot({
      path: path.join(artifactDir, "news_07_portal_detail_en.png"),
      fullPage: false,
    });
    console.log("Saved screenshot: news_07_portal_detail_en.png");
  }

  await browser.close();
  console.log("All news gemini tests completed successfully!");
}

main().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
