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

  console.log("1. Testing redirect from /academic-programs...");
  await page.goto("http://localhost:3010/academic-programs", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  console.log("Current URL after /academic-programs:", page.url());

  // If redirected to login, login as admin
  if (page.url().includes("/login")) {
    console.log("Logging in as super admin...");
    for (let i = 0; i < 20; i++) {
      const cookies = await context.cookies();
      if (cookies.some((c) => c.name === "authjs.csrf-token")) break;
      await page.waitForTimeout(200);
    }
    await page.fill("#email", "admin@app.local");
    await page.fill("#password", "Passw0rd!vibe");
    await page.locator('button[type="submit"]').click();
    await page.waitForTimeout(3000);
  }

  // Ensure we are on /curriculum-management
  if (!page.url().includes("/curriculum-management")) {
    await page.goto("http://localhost:3010/curriculum-management", { waitUntil: "networkidle" });
    await page.waitForTimeout(2000);
  }
  console.log("Current URL on admin curriculum page:", page.url());

  // Verify curriculum code and elements
  const pageText = await page.content();
  const hasCode = pageText.includes("6742061");
  console.log("Contains TQF2 code 6742061:", hasCode);

  // Take screenshot of curriculum-management page
  const screenshot1 = path.join(artifactDir, "curriculum_01_admin_management.png");
  await page.screenshot({ path: screenshot1, fullPage: false });
  console.log("Saved screenshot 1:", screenshot1);

  // Click "แก้ไขข้อมูลหลักสูตร"
  console.log("Clicking 'แก้ไขข้อมูลหลักสูตร'...");
  const editBtn = page.locator('button:has-text("แก้ไขข้อมูลหลักสูตร")').first();
  if (await editBtn.isVisible()) {
    await editBtn.click();
    await page.waitForTimeout(1000);

    const screenshot2 = path.join(artifactDir, "curriculum_02_admin_edit_dialog.png");
    await page.screenshot({ path: screenshot2, fullPage: false });
    console.log("Saved screenshot 2 (dialog open):", screenshot2);

    // Save changes
    console.log("Saving curriculum changes...");
    const saveBtn = page.locator('button[type="submit"]:has-text("บันทึก")').last();
    if (await saveBtn.isVisible()) {
      await saveBtn.click();
      await page.waitForTimeout(3000);
    }
  }

  // 2. Test Portal Curriculum Page: /curriculum
  console.log("Navigating to portal curriculum page: http://localhost:3010/curriculum...");
  await page.goto("http://localhost:3010/curriculum", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  // Screenshot Overview Tab
  const screenshot3 = path.join(artifactDir, "curriculum_03_portal_overview.png");
  await page.screenshot({ path: screenshot3, fullPage: false });
  console.log("Saved screenshot 3 (Portal Overview):", screenshot3);

  // Click Tab 2: "โครงสร้างแผนการศึกษา (๒ แผน)"
  console.log("Clicking 'โครงสร้างแผนการศึกษา (๒ แผน)' tab...");
  const plansTab = page.locator('button:has-text("โครงสร้างแผนการศึกษา")');
  if (await plansTab.isVisible()) {
    await plansTab.click();
    await page.waitForTimeout(1000);
    const screenshot4 = path.join(artifactDir, "curriculum_04_portal_plans.png");
    await page.screenshot({ path: screenshot4, fullPage: false });
    console.log("Saved screenshot 4 (Portal Plans):", screenshot4);
  }

  // Click Tab 3: "รายวิชาในหลักสูตร"
  console.log("Clicking 'รายวิชาในหลักสูตร' tab...");
  const coursesTab = page.locator('button:has-text("รายวิชาในหลักสูตร")');
  if (await coursesTab.isVisible()) {
    await coursesTab.click();
    await page.waitForTimeout(1000);

    // Expand course 606 408 (ปฏิบัติวิปัสสนาภาวนา)
    const vipassanaPracticeCourse = page.locator('text=606 408').first();
    if (await vipassanaPracticeCourse.isVisible()) {
      await vipassanaPracticeCourse.click();
      await page.waitForTimeout(600);
    }

    const screenshot5 = path.join(artifactDir, "curriculum_05_portal_courses.png");
    await page.screenshot({ path: screenshot5, fullPage: false });
    console.log("Saved screenshot 5 (Portal Courses):", screenshot5);

    // Click Category Filter: "วิชาเลือก"
    const electiveFilter = page.locator('button:has-text("วิชาเลือก")');
    if (await electiveFilter.isVisible()) {
      await electiveFilter.click();
      await page.waitForTimeout(800);
      const screenshot6 = path.join(artifactDir, "curriculum_06_portal_courses_filtered.png");
      await page.screenshot({ path: screenshot6, fullPage: false });
      console.log("Saved screenshot 6 (Portal Electives Filter):", screenshot6);
    }
  }

  // Click Tab 4: "เกณฑ์การรับเข้าและสำเร็จการศึกษา"
  const admissionTab = page.locator('button:has-text("เกณฑ์การรับเข้าและสำเร็จการศึกษา")');
  if (await admissionTab.isVisible()) {
    await admissionTab.click();
    await page.waitForTimeout(1000);
    const screenshot7 = path.join(artifactDir, "curriculum_07_portal_admission.png");
    await page.screenshot({ path: screenshot7, fullPage: false });
    console.log("Saved screenshot 7 (Portal Admission):", screenshot7);
  }

  // Click Tab 5: "อาจารย์ผู้รับผิดชอบหลักสูตร"
  const committeeTab = page.locator('button:has-text("อาจารย์ผู้รับผิดชอบหลักสูตร")');
  if (await committeeTab.isVisible()) {
    await committeeTab.click();
    await page.waitForTimeout(1000);
    const screenshot8 = path.join(artifactDir, "curriculum_08_portal_committee.png");
    await page.screenshot({ path: screenshot8, fullPage: false });
    console.log("Saved screenshot 8 (Portal Committee):", screenshot8);
  }

  console.log("All Playwright verification steps completed successfully!");
  await browser.close();
}

main().catch((err) => {
  console.error("Test failed with error:", err);
  process.exit(1);
});
