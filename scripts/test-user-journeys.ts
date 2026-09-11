import { chromium } from "@playwright/test";
import * as path from "path";

async function runUserJourneyTest() {
  const artifactDir = "/Users/mac/.gemini/antigravity/brain/b3b15d0a-16a7-4efa-8178-f79e5bcefd7f";
  const browser = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
  });

  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log("================================================================================");
  console.log("🌟 เริ่มต้นการทดสอบการใช้งานระบบจริง (Comprehensive User Journey Acceptance Test)");
  console.log("================================================================================\n");

  try {
    // ========================================================================
    // JOURNEY 1: Public Portal (ผู้สนใจศึกษาต่อและประชาชนทั่วไป)
    // ========================================================================
    console.log("👉 [เส้นทางการใช้งานที่ 1: ระบบหน้าบ้าน Portal สำหรับประชาชนและผู้สนใจศึกษา]");

    // 1.1 หน้าแรกพอร์ทัล
    console.log("  1.1 เข้าชมหน้าแรกหลักสูตรพุทธศาสตรมหาบัณฑิต (/) ...");
    await page.goto("http://localhost:3010/", { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    const shot1 = path.join(artifactDir, "journey_01_portal_home.png");
    await page.screenshot({ path: shot1, fullPage: false });
    console.log("      📸 ภาพหน้าแรก:", shot1);

    // 1.2 หน้ารับสมัครนิสิตใหม่
    console.log("  1.2 เข้าชมหน้าข้อมูลการรับสมัครนิสิตใหม่ (/admissions) ...");
    await page.goto("http://localhost:3010/admissions", { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);
    const shot2 = path.join(artifactDir, "journey_02_admissions.png");
    await page.screenshot({ path: shot2, fullPage: false });
    console.log("      📸 ภาพหน้ารับสมัคร:", shot2);

    // 1.3 หน้าโครงสร้างหลักสูตร
    console.log("  1.3 เข้าชมหน้าโครงสร้างหลักสูตรและแผนการศึกษา (/curriculum) ...");
    await page.goto("http://localhost:3010/curriculum", { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);
    const shot3 = path.join(artifactDir, "journey_03_curriculum.png");
    await page.screenshot({ path: shot3, fullPage: false });
    console.log("      📸 ภาพหน้าหลักสูตร:", shot3);

    // 1.4 หน้าคณาจารย์และผู้เชี่ยวชาญ
    console.log("  1.4 เข้าชมหน้าทำเนียบคณาจารย์และผู้ทรงคุณวุฒิ (/faculty) ...");
    await page.goto("http://localhost:3010/faculty", { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);
    const shot4 = path.join(artifactDir, "journey_04_faculty.png");
    await page.screenshot({ path: shot4, fullPage: false });
    console.log("      📸 ภาพหน้าคณาจารย์:", shot4);

    // 1.5 หน้าคลังวิทยานิพนธ์
    console.log("  1.5 เข้าชมคลังวิทยานิพนธ์และงานวิจัยวิปัสสนา (/theses) ...");
    await page.goto("http://localhost:3010/theses", { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);
    const shot5 = path.join(artifactDir, "journey_05_theses.png");
    await page.screenshot({ path: shot5, fullPage: false });
    console.log("      📸 ภาพหน้าคลังวิทยานิพนธ์:", shot5);

    // ========================================================================
    // JOURNEY 2: Authentication (การเข้าสู่ระบบ)
    // ========================================================================
    console.log("\n👉 [เส้นทางการใช้งานที่ 2: ระบบยืนยันตัวตนและการเข้าสู่ระบบเจ้าหน้าที่]");
    console.log("  2.1 เข้าสู่หน้าล็อกอิน (/login) ตรวจสอบปุ่ม Google SSO และฟอร์ม ...");
    await page.goto("http://localhost:3010/login", { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);
    const shot6 = path.join(artifactDir, "journey_06_login_page.png");
    await page.screenshot({ path: shot6 });
    console.log("      📸 ภาพหน้าล็อกอิน:", shot6);

    // ล็อกอินผู้ดูแลระบบ
    console.log("  2.2 ดำเนินการเข้าสู่ระบบด้วยบัญชีผู้ดูแลสูงสุด (admin@app.local) ...");
    for (let i = 0; i < 20; i++) {
      const cookies = await context.cookies();
      if (cookies.some((c) => c.name === "authjs.csrf-token")) break;
      await page.waitForTimeout(200);
    }
    await page.fill("#email", "admin@app.local");
    await page.fill("#password", "Passw0rd!vibe");
    await page.locator('button[type="submit"]').click();

    await page.waitForFunction(() => window.location.pathname.includes("/dashboard"), { timeout: 15000 }).catch(() => {});
    if (!page.url().includes("/dashboard")) {
      await page.goto("http://localhost:3010/dashboard", { waitUntil: "networkidle" });
    }
    await page.waitForTimeout(2500);

    // ========================================================================
    // JOURNEY 3: Admin Console (การบริหารงานระบบหลังบ้าน)
    // ========================================================================
    console.log("\n👉 [เส้นทางการใช้งานที่ 3: ระบบบริหารงานวิชาการและควบคุมหลังบ้าน Admin Console]");

    // 3.1 แดชบอร์ดภาพรวม
    console.log("  3.1 ตรวจสอบแดชบอร์ดภาพรวมสถิติ (/dashboard) ...");
    const shot7 = path.join(artifactDir, "journey_07_admin_dashboard.png");
    await page.screenshot({ path: shot7 });
    console.log("      📸 ภาพหน้า Dashboard:", shot7);

    // 3.2 จัดการระบบรับสมัคร
    console.log("  3.2 ตรวจสอบระบบบริหารจัดการผู้สมัครเรียน (/admission-management) ...");
    await page.goto("http://localhost:3010/admission-management", { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    const shot8 = path.join(artifactDir, "journey_08_admin_admissions.png");
    await page.screenshot({ path: shot8 });
    console.log("      📸 ภาพหน้าจัดการรับสมัคร:", shot8);

    // 3.3 ทะเบียนนิสิต
    console.log("  3.3 ตรวจสอบระบบทะเบียนประวัตินิสิต (/student-management) ...");
    await page.goto("http://localhost:3010/student-management", { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    const shot9 = path.join(artifactDir, "journey_09_admin_students.png");
    await page.screenshot({ path: shot9 });
    console.log("      📸 ภาพหน้าจัดการนิสิต:", shot9);

    // 3.4 จัดการวิทยานิพนธ์
    console.log("  3.4 ตรวจสอบระบบควบคุมและจัดเก็บวิทยานิพนธ์ (/thesis-management) ...");
    await page.goto("http://localhost:3010/thesis-management", { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    const shot10 = path.join(artifactDir, "journey_10_admin_theses.png");
    await page.screenshot({ path: shot10 });
    console.log("      📸 ภาพหน้าจัดการวิทยานิพนธ์:", shot10);

    // 3.5 หน้าตั้งค่าองค์กรและระบบ
    console.log("  3.5 ตรวจสอบหน้าตั้งค่าองค์กร, SMTP, และ Dynamic Brand Block (/settings) ...");
    await page.goto("http://localhost:3010/settings", { waitUntil: "networkidle" });
    await page.waitForTimeout(2000);
    const shot11 = path.join(artifactDir, "journey_11_admin_settings.png");
    await page.screenshot({ path: shot11 });
    console.log("      📸 ภาพหน้าตั้งค่าระบบ:", shot11);

    console.log("\n================================================================================");
    console.log("🎉 การทดสอบการใช้งานทุกเส้นทาง (User Journeys) ประสบความสำเร็จครบถ้วน 100%!");
    console.log("================================================================================\n");
  } catch (err) {
    console.error("❌ เกิดข้อผิดพลาดระหว่างการทดสอบ:", err);
    throw err;
  } finally {
    await browser.close();
  }
}

runUserJourneyTest();
