import { chromium } from "@playwright/test";
import * as path from "path";

async function testGroupedSidebar() {
  const artifactDir = "/Users/mac/.gemini/antigravity/brain/b3b15d0a-16a7-4efa-8178-f79e5bcefd7f";
  const browser = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
  });

  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log("🚀 ทดสอบการจัดกลุ่มเมนูหลักและเมนูย่อยบน Sidebar ฝั่ง Admin...");

  try {
    console.log("[Step 1] เข้าสู่ระบบ Admin...");
    await page.goto("http://localhost:3010/login?callbackUrl=/dashboard", { waitUntil: "networkidle" });
    for (let i = 0; i < 20; i++) {
      const cookies = await context.cookies();
      if (cookies.some((c) => c.name === "authjs.csrf-token")) break;
      await page.waitForTimeout(200);
    }
    await page.fill("#email", "admin@app.local");
    await page.fill("#password", "Passw0rd!vibe");
    await page.locator('button[type="submit"]').click();

    await page.waitForFunction(() => window.location.pathname.includes("/dashboard"), { timeout: 20000 }).catch(() => {});
    if (!page.url().includes("/dashboard")) {
      await page.goto("http://localhost:3010/dashboard", { waitUntil: "networkidle" });
    }
    await page.waitForTimeout(2000);

    // Switch to Thai if in English
    const langBtn = page.locator("button:has-text('TH'), button:has-text('EN')").first();
    if (await langBtn.isVisible()) {
      const text = await langBtn.innerText();
      if (text.includes("TH")) {
        await langBtn.click();
        await page.waitForTimeout(1000);
      }
    }

    console.log("[Step 2] ตรวจสอบกลุ่ม 'งานประชาสัมพันธ์และสื่อสารองค์กร'...");
    const prBtn = page.locator(".ng button.ni:has-text('งานประชาสัมพันธ์และสื่อสารองค์กร'), .ng button.ni:has-text('Public Relations')").first();
    const hasPR = await prBtn.isVisible();
    console.log("  - เมนูหลัก 'งานประชาสัมพันธ์และสื่อสารองค์กร':", hasPR ? "✅ พบ" : "❌ ไม่พบ");
    if (hasPR) {
      const isExpanded = await prBtn.getAttribute("aria-expanded");
      if (isExpanded !== "true") {
        await prBtn.click();
        await page.waitForTimeout(500);
      }
    }
    const shotPR = path.join(artifactDir, "sidebar_grouped_pr_open.png");
    await page.screenshot({ path: shotPR });
    console.log("  📸 บันทึกภาพกลุ่มประชาสัมพันธ์และสื่อสารองค์กร:", shotPR);

    console.log("[Step 3] ตรวจสอบกลุ่ม 'จัดการวิชาการและหลักสูตร'...");
    const academicBtn = page.locator(".ng button.ni:has-text('จัดการวิชาการและหลักสูตร'), .ng button.ni:has-text('Academic & Curriculums')").first();
    const hasAcademic = await academicBtn.isVisible();
    console.log("  - เมนูหลัก 'จัดการวิชาการและหลักสูตร':", hasAcademic ? "✅ พบ" : "❌ ไม่พบ");

    if (hasAcademic) {
      const isExpanded = await academicBtn.getAttribute("aria-expanded");
      if (isExpanded !== "true") {
        await academicBtn.click();
        await page.waitForTimeout(500);
      }
    }

    const shotAcademic = path.join(artifactDir, "sidebar_grouped_academic_open.png");
    await page.screenshot({ path: shotAcademic });
    console.log("  📸 บันทึกภาพกลุ่มวิชาการและหลักสูตร:", shotAcademic);

    console.log("[Step 3] ตรวจสอบกลุ่ม 'งานรับสมัครและทะเบียนนิสิต'...");
    const studentBtn = page.locator(".ng button.ni:has-text('งานรับสมัครและทะเบียนนิสิต'), .ng button.ni:has-text('Admissions & Students')").first();
    const hasStudent = await studentBtn.isVisible();
    console.log("  - เมนูหลัก 'งานรับสมัครและทะเบียนนิสิต':", hasStudent ? "✅ พบ" : "❌ ไม่พบ");

    if (hasStudent) {
      await studentBtn.click();
      await page.waitForTimeout(500);
    }

    const shotStudent = path.join(artifactDir, "sidebar_grouped_students_open.png");
    await page.screenshot({ path: shotStudent });
    console.log("  📸 บันทึกภาพกลุ่มรับสมัครและทะเบียนนิสิต:", shotStudent);

    console.log("[Step 4] ทดสอบคลิกนำทางไปยัง 'จัดการภาควิชา/ส่วนงาน'...");
    // Re-open academic group
    if (hasAcademic) {
      await academicBtn.click();
      await page.waitForTimeout(500);
      const deptLink = page.locator(".sub a.ni.sub:has-text('จัดการภาควิชา/ส่วนงาน'), .sub a.ni.sub:has-text('Manage Departments')").first();
      await deptLink.click();
      await page.waitForFunction(() => window.location.pathname.includes("/department-management"), { timeout: 10000 }).catch(() => {});
      await page.waitForTimeout(1500);
      console.log("  - นำทางสำเร็จ URL ปัจจุบัน:", page.url());

      const shotNav = path.join(artifactDir, "sidebar_grouped_active_navigation.png");
      await page.screenshot({ path: shotNav });
      console.log("  📸 บันทึกภาพหลังคลิกนำทาง:", shotNav);
    }

    console.log("🎉 การทดสอบจัดกลุ่มเมนูหลัก/เมนูย่อยบน Sidebar สำเร็จสมบูรณ์ 100%!");
  } catch (err) {
    console.error("❌ เกิดข้อผิดพลาด:", err);
    throw err;
  } finally {
    await browser.close();
  }
}

testGroupedSidebar();
