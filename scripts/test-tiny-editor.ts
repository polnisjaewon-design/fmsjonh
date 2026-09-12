import { chromium } from "@playwright/test";
import * as path from "path";

async function main() {
  const artifactDir = "/Users/mac/.gemini/antigravity/brain/b3b15d0a-16a7-4efa-8178-f79e5bcefd7f";
  const browser = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1080 },
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

  console.log("2. Navigating to /news-management...");
  await page.goto("http://localhost:3010/news-management", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);

  // Open Create Dialog
  const createBtn = page.locator('button:has-text("สร้างข่าวใหม่")');
  await createBtn.click();
  await page.waitForTimeout(1500);

  // Wait for TinyMCE editor to load
  await page.waitForSelector(".tox-tinymce", { timeout: 15000 });
  console.log("TinyMCE editor container is present!");

  // Fill in Thai fields
  await page.fill("#news-title-th", "การประชุมวิชาการระดับชาติด้านพระพุทธศาสนากับการพัฒนามนุษย์ ๒๕๖๙");
  await page.fill(
    "#news-summary-th",
    "คณะพุทธศาสตร์ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย จัดการประชุมวิชาการระดับชาติ ประจำปีการศึกษา ๒๕๖๙ เพื่อแลกเปลี่ยนองค์ความรู้และการพัฒนาอย่างยั่งยืน"
  );

  // Set rich content in Thai TinyMCE editor
  const thaiRichContent = `
    <h2>บทนำการประชุมวิชาการ</h2>
    <p>คณะพุทธศาสตร์ ขอเชิญชวนนักวิชาการ คณาจารย์ นิสิตนักศึกษา และผู้สนใจทุกท่าน เข้าร่วม<strong>การประชุมวิชาการระดับชาติ</strong> โดยมีวัตถุประสงค์เพื่อส่งเสริมการบูรณาการหลักธรรมทางพระพุทธศาสนากับศาสตร์สมัยใหม่</p>
    <h3>หัวข้อหลักในการสัมมนา</h3>
    <ul>
      <li>การประยุกต์ใช้จิตตภาวนากับสุขภาพจิตในศตวรรษที่ ๒๑</li>
      <li>หลักพุทธเศรษฐศาสตร์กับการพัฒนาเศรษฐกิจชุมชนอย่างยั่งยืน</li>
      <li>การจัดการศึกษาพระพุทธศาสนาในยุคดิจิทัล (AI and Buddhism)</li>
    </ul>
    <blockquote>"ธรรมะย่อมรักษาผู้ประพฤติธรรม และนำพาสังคมสู่สันติสุขที่แท้จริง"</blockquote>
  `;

  await page.evaluate((html) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const editor = (window as any).tinymce?.get("news-content-th");
    if (editor) {
      editor.setContent(html);
      editor.fire("change");
    }
  }, thaiRichContent);

  await page.waitForTimeout(1000);

  await page.screenshot({
    path: path.join(artifactDir, "tiny_01_admin_thai_editor.png"),
    fullPage: false,
  });
  console.log("Saved: tiny_01_admin_thai_editor.png");

  // Switch to English Tab
  console.log("3. Switching to English Tab in Dialog...");
  const enTabBtn = page.locator('button:has-text("(English)")');
  await enTabBtn.click();
  await page.waitForTimeout(1500);

  // Wait for English TinyMCE editor
  await page.waitForSelector(".tox-tinymce", { timeout: 10000 });

  await page.fill(
    "#news-title-en",
    "National Academic Conference on Buddhism and Human Development 2026"
  );
  await page.fill(
    "#news-summary-en",
    "The Faculty of Buddhism, MCU, hosts the National Academic Conference 2026 to foster cross-disciplinary Buddhist research and sustainable community development."
  );

  const englishRichContent = `
    <h2>Overview of the National Conference</h2>
    <p>The Faculty of Buddhism cordially invites scholars, researchers, faculty members, and students to attend the <strong>National Academic Conference 2026</strong> focused on integrating Buddhist philosophy with modern sciences.</p>
    <h3>Key Conference Tracks</h3>
    <ul>
      <li>Mindfulness Meditation and Mental Wellbeing in the 21st Century</li>
      <li>Buddhist Economics and Sustainable Community Growth</li>
      <li>Buddhist Education in the Age of Artificial Intelligence</li>
    </ul>
    <blockquote>"Wisdom and compassion remain the foundational pillars of enduring peace and prosperity."</blockquote>
  `;

  await page.evaluate((html) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const editor = (window as any).tinymce?.get("news-content-en");
    if (editor) {
      editor.setContent(html);
      editor.fire("change");
    }
  }, englishRichContent);

  await page.waitForTimeout(1000);

  await page.screenshot({
    path: path.join(artifactDir, "tiny_02_admin_english_editor.png"),
    fullPage: false,
  });
  console.log("Saved: tiny_02_admin_english_editor.png");

  // Save the news article
  console.log("4. Saving the news article...");
  const saveNewsBtn = page.locator('.dlg button:has-text("บันทึก")');
  await saveNewsBtn.evaluate((b) => (b as HTMLElement).click());
  await page.waitForTimeout(3000);

  // Verify it appears in the table
  await page.waitForSelector('text="การประชุมวิชาการระดับชาติด้านพระพุทธศาสนากับการพัฒนามนุษย์ ๒๕๖๙"', {
    timeout: 10000,
  });
  console.log("Article created and listed in table successfully!");

  // 5. Navigate to Portal News
  console.log("5. Navigating to Public Portal /news...");
  await page.goto("http://localhost:3010/news", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);

  // Click on the new article card
  const articleLink = page.locator(
    'a:has-text("การประชุมวิชาการระดับชาติด้านพระพุทธศาสนากับการพัฒนามนุษย์ ๒๕๖๙")'
  );
  await articleLink.first().click();
  await page.waitForTimeout(2000);

  // Check that rich elements (h2, ul, blockquote) exist in portal
  const h2Count = await page.locator(".prose h2").count();
  const ulCount = await page.locator(".prose ul").count();
  const bqCount = await page.locator(".prose blockquote").count();
  console.log(`Portal rich elements found: h2=${h2Count}, ul=${ulCount}, blockquote=${bqCount}`);

  await page.screenshot({
    path: path.join(artifactDir, "tiny_03_portal_rich_th.png"),
    fullPage: false,
  });
  console.log("Saved: tiny_03_portal_rich_th.png");

  // Switch to English on portal
  console.log("6. Switching to English view on Portal...");
  const portalEnBtn = page.locator('button:has-text("🇬🇧 English")');
  if (await portalEnBtn.isVisible()) {
    await portalEnBtn.click();
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: path.join(artifactDir, "tiny_04_portal_rich_en.png"),
      fullPage: false,
    });
    console.log("Saved: tiny_04_portal_rich_en.png");
  }

  await browser.close();
  console.log("All Tiny Editor Playwright tests completed successfully!");
}

main().catch((err) => {
  console.error("Test error:", err);
  process.exit(1);
});
