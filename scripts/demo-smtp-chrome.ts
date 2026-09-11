import { chromium } from "@playwright/test";
import * as path from "path";
import * as fs from "fs";

async function runSmtpChromeDemo() {
  const artifactDir = "/Users/mac/.gemini/antigravity/brain/b3b15d0a-16a7-4efa-8178-f79e5bcefd7f";
  const scratchDir = path.join(artifactDir, "scratch");
  if (!fs.existsSync(scratchDir)) {
    fs.mkdirSync(scratchDir, { recursive: true });
  }

  console.log("🚀 กำลังเปิด Google Chrome จริงบนหน้าจอ macOS...");
  const browser = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: false, // เปิดหน้าต่างจริงให้ผู้ใช้ชมการทำงาน
    slowMo: 500,     // หน่วงจังหวะเพื่อให้ผู้ใช้สังเกตเห็นแต่ละขั้นตอนชัดเจน
    args: ["--start-maximized", "--window-size=1440,900"]
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  try {
    // 1. เข้าสู่ระบบโดยตรงพร้อมส่ง callbackUrl ไปหน้า /settings
    console.log("📍 [1/5] นำทางไปยังหน้าเข้าสู่ระบบ (/login?callbackUrl=/settings)...");
    await page.goto("http://localhost:3010/login?callbackUrl=/settings", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    // รอคุกกี้ CSRF
    console.log("  ↳ กำลังตรวจสอบความพร้อมของระบบรักษาความปลอดภัย...");
    for (let i = 0; i < 20; i++) {
      const cookies = await context.cookies();
      if (cookies.some((c) => c.name === "authjs.csrf-token")) break;
      await page.waitForTimeout(200);
    }
    await page.waitForTimeout(500);

    console.log("  ↳ กรอกอีเมล admin@app.local และรหัสผ่าน...");
    await page.fill("#email", "admin@app.local");
    await page.fill("#password", "Passw0rd!vibe");
    await page.waitForTimeout(800);

    console.log("  ↳ กดปุ่มเข้าสู่ระบบ...");
    await page.getByRole("button", { name: /เข้าสู่ระบบ|Sign in/ }).click();

    // รอจนกระทั่ง URL เปลี่ยนไปยัง /settings หรือ /dashboard
    console.log("  ↳ กำลังยืนยันสิทธิ์ผู้ดูแลระบบ...");
    await page.waitForFunction(() => {
      return window.location.pathname.includes("/settings") || window.location.pathname.includes("/dashboard");
    }, { timeout: 12000 }).catch(() => {});

    if (!page.url().includes("/settings")) {
      await page.goto("http://localhost:3010/settings", { waitUntil: "domcontentloaded" });
    }
    await page.waitForTimeout(2500);
    console.log("✅ อยู่ในหน้าตั้งค่าระบบ (/settings) เรียบร้อยแล้ว");

    // 2. เลื่อนลงไปยังการ์ด Gmail SMTP
    console.log("📍 [2/5] เลื่อนหน้าจอลงไปยังการ์ด 'ระบบส่งอีเมล (Gmail SMTP Configuration)'...");
    await page.evaluate(() => {
      const el = document.getElementById("smtp-enabled");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      } else {
        window.scrollBy({ top: 600, behavior: "smooth" });
      }
    });
    await page.waitForTimeout(2000);

    // บันทึกภาพหน้าจอการ์ดเริ่มต้น
    const shot1 = path.join(scratchDir, "smtp_demo_01_card.png");
    await page.screenshot({ path: shot1 });
    console.log(`📸 บันทึกภาพหน้าจอที่ 1: ${shot1}`);

    // 3. คลิกเปิดการใช้งานและกดปุ่ม Preset Gmail อัตโนมัติ
    console.log("📍 [3/5] สาธิตการกดปุ่ม 'ตั้งค่า Gmail อัตโนมัติ' (Quick Preset)...");
    const presetBtn = page.locator("button:has-text('ตั้งค่า Gmail อัตโนมัติ')");
    if (await presetBtn.count() > 0) {
      await presetBtn.first().click();
      await page.waitForTimeout(1500);
    }

    // เปิดสวิตช์ถ้ายังไม่ได้เปิด
    const enabledCheckbox = page.locator("#smtp-enabled");
    if (await enabledCheckbox.count() > 0 && !(await enabledCheckbox.isChecked())) {
      await enabledCheckbox.check();
      await page.waitForTimeout(800);
    }

    // กรอกข้อมูลตัวอย่าง
    console.log("  ↳ กรอกอีเมลบัญชีผู้ส่ง: fms.mcu.demo@gmail.com...");
    await page.fill("#smtp-user", "fms.mcu.demo@gmail.com");
    await page.waitForTimeout(800);

    console.log("  ↳ กรอกรหัสผ่านแอปพลิเคชัน (App Password 16 หลัก)...");
    await page.fill("#smtp-pass", "abcd efgh ijkl mnop");
    await page.waitForTimeout(800);

    console.log("  ↳ สลับปุ่มแสดง/ซ่อนรหัสผ่าน (Show/Hide Password)...");
    const eyeBtn = page.locator("button[title*='รหัสผ่าน']");
    if (await eyeBtn.count() > 0) {
      await eyeBtn.first().click();
      await page.waitForTimeout(2000);
      await eyeBtn.first().click();
      await page.waitForTimeout(1000);
    }

    console.log("  ↳ กำหนดชื่อผู้ส่ง: หลักสูตร พธ.ม. วิปัสสนาภาวนา มจร...");
    await page.fill("#smtp-from-name", "หลักสูตร พธ.ม. วิปัสสนาภาวนา มจร");
    await page.waitForTimeout(1200);

    // บันทึกภาพหน้าจอหลังกรอกข้อมูล
    const shot2 = path.join(scratchDir, "smtp_demo_02_configured.png");
    await page.screenshot({ path: shot2 });
    console.log(`📸 บันทึกภาพหน้าจอที่ 2: ${shot2}`);

    // 4. สาธิตส่วนทดสอบการเชื่อมต่อ
    console.log("📍 [4/5] สาธิตส่วน 'ทดสอบการเชื่อมต่อส่งอีเมล' (Live Connection Test)...");
    const testEmailInput = page.locator("input[placeholder*='ระบุอีเมลปลายทาง']");
    if (await testEmailInput.count() > 0) {
      await testEmailInput.fill("your-personal-email@gmail.com");
      await page.waitForTimeout(1500);
    }

    // เลื่อนลงให้เห็นกล่องทดสอบและปุ่มส่งชัดเจน
    await page.evaluate(() => window.scrollBy({ top: 350, behavior: "smooth" }));
    await page.waitForTimeout(1500);

    // บันทึกภาพหน้าจอส่วนทดสอบ
    const shot3 = path.join(scratchDir, "smtp_demo_03_test_ready.png");
    await page.screenshot({ path: shot3 });
    console.log(`📸 บันทึกภาพหน้าจอที่ 3: ${shot3}`);

    console.log("📍 [5/5] สาธิตสำเร็จสมบูรณ์ 100%!");
    console.log("⏳ จะเปิดหน้าจอค้างไว้ 15 วินาทีเพื่อให้ท่านได้ชมผลลัพธ์บน Chrome อย่างเต็มที่...");
    await page.waitForTimeout(15000);

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("❌ บันทึกข้อผิดพลาด:", message);
  } finally {
    await browser.close();
    console.log("👋 ปิดหน้าต่างการสาธิต Google Chrome เรียบร้อยแล้ว");
  }
}

runSmtpChromeDemo();
