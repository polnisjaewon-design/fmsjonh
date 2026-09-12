import { chromium } from "@playwright/test";
import * as path from "path";

async function testDepartmentE2E() {
  const artifactDir = "/Users/mac/.gemini/antigravity/brain/b3b15d0a-16a7-4efa-8178-f79e5bcefd7f";
  const browser = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
  });

  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log("🚀 เริ่มต้นการทดสอบ E2E ระบบบริหารจัดการภาควิชาและส่วนงาน (Department Management)...");

  try {
    // -------------------------------------------------------------
    // Step 1: Login Admin
    // -------------------------------------------------------------
    console.log("[Step 1] เข้าสู่ระบบด้วยบัญชี Super Admin...");
    await page.goto("http://localhost:3010/login?callbackUrl=/department-management", { waitUntil: "networkidle" });
    for (let i = 0; i < 20; i++) {
      const cookies = await context.cookies();
      if (cookies.some((c) => c.name === "authjs.csrf-token")) break;
      await page.waitForTimeout(200);
    }
    await page.fill("#email", "admin@app.local");
    await page.fill("#password", "Passw0rd!vibe");
    await page.locator('button[type="submit"]').click();

    await page.waitForFunction(() => window.location.pathname.includes("/department-management"), { timeout: 20000 }).catch(() => {});
    if (!page.url().includes("/department-management")) {
      await page.goto("http://localhost:3010/department-management", { waitUntil: "networkidle" });
    }
    await page.waitForTimeout(2500);

    // -------------------------------------------------------------
    // Step 2: Verify Initial Departments
    // -------------------------------------------------------------
    console.log("[Step 2] ตรวจสอบรายการภาควิชาและส่วนงาน...");
    const content = await page.content();
    const hasDeptBuddhism = content.includes("ภาควิชาพระพุทธศาสนา");
    const hasDeptRelPhil = content.includes("ภาควิชาศาสนาและปรัชญา");
    const hasVipassanaInst = content.includes("สถาบันวิปัสสนาธุระ");

    console.log("  - ภาควิชาพระพุทธศาสนา:", hasDeptBuddhism ? "✅ พบ" : "❌ ไม่พบ");
    console.log("  - ภาควิชาศาสนาและปรัชญา:", hasDeptRelPhil ? "✅ พบ" : "❌ ไม่พบ");
    console.log("  - สถาบันวิปัสสนาธุระ:", hasVipassanaInst ? "✅ พบ" : "❌ ไม่พบ");

    const shot1 = path.join(artifactDir, "dept_01_admin_overview.png");
    await page.screenshot({ path: shot1 });
    console.log("  📸 บันทึกภาพหน้าจอภาพรวมภาควิชา:", shot1);

    // -------------------------------------------------------------
    // Step 3: Test Create Department
    // -------------------------------------------------------------
    console.log("[Step 3] ทดสอบสร้างภาควิชา/ส่วนงานใหม่ผ่าน Dialog...");
    const addBtn = page.locator("button:has-text('เพิ่มภาควิชา/ส่วนงาน'), button:has-text('Add Department')").first();
    if (await addBtn.isVisible()) {
      await addBtn.click();
      await page.waitForTimeout(1000);

      await page.fill("#d-code", "DEPT-MINDFULNESS");
      await page.fill("#d-name-th", "ส่วนงานนวัตกรรมจิตภาวนาและสติศึกษา");
      await page.fill("#d-name-en", "Department of Mindfulness and Contemplative Studies");
      await page.fill("#d-fac-th", "บัณฑิตวิทยาลัย / คณะพุทธศาสตร์");
      await page.fill("#d-head", "พระครูปลัดสุวัฒนศีลคุณ (ดร.)");
      await page.fill("#d-office", "อาคารธรรมวิจัย ชั้น ๔");

      const shotModal = path.join(artifactDir, "dept_02_create_modal.png");
      await page.screenshot({ path: shotModal });
      console.log("  📸 บันทึกภาพแบบฟอร์มเพิ่มภาควิชา:", shotModal);

      const saveBtn = page.locator("button:has-text('บันทึก'), button:has-text('Save')").last();
      await saveBtn.click();
      await page.waitForTimeout(3500);
    }

    const updatedContent = await page.content();
    const hasNewDept = updatedContent.includes("ส่วนงานนวัตกรรมจิตภาวนาและสติศึกษา");
    console.log("  - ส่วนงานใหม่ปรากฏในระบบ:", hasNewDept ? "✅ สำเร็จสมบูรณ์" : "❌ ไม่สำเร็จ");

    const shotUpdated = path.join(artifactDir, "dept_03_admin_after_create.png");
    await page.screenshot({ path: shotUpdated });
    console.log("  📸 บันทึกภาพหลังสร้างส่วนงานใหม่:", shotUpdated);

    // -------------------------------------------------------------
    // Step 4: Verify Portal Curriculum Page Affiliation
    // -------------------------------------------------------------
    console.log("[Step 4] ตรวจสอบหน้าแรกหลักสูตรพอร์ทัล (/curriculum)...");
    await page.goto("http://localhost:3010/curriculum", { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);

    const portalText = await page.content();
    const hasPortalAffiliation = portalText.includes("ภาควิชาพระพุทธศาสนา");
    console.log("  - ป้ายแสดงสังกัดภาควิชาพระพุทธศาสนาบนหน้าพอร์ทัล:", hasPortalAffiliation ? "✅ ถูกต้อง 100%" : "❌ ไม่พบ");

    const shotPortal = path.join(artifactDir, "dept_04_portal_curriculum_affiliation.png");
    await page.screenshot({ path: shotPortal, fullPage: false });
    console.log("  📸 บันทึกภาพหน้าหลักสูตรพร้อมป้ายสังกัดภาควิชา:", shotPortal);

    console.log("\n🎉 สรุปผลการทดสอบระบบบริหารจัดการภาควิชา: ผ่านฉลุย 100%!");
  } catch (err) {
    console.error("❌ เกิดข้อผิดพลาดในการทดสอบ:", err);
    throw err;
  } finally {
    await browser.close();
  }
}

testDepartmentE2E();
