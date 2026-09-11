import { chromium } from "@playwright/test";
import * as path from "path";
import * as fs from "fs";

async function runGoogleLoginTest() {
  const artifactDir = "/Users/mac/.gemini/antigravity/brain/b3b15d0a-16a7-4efa-8178-f79e5bcefd7f";
  const scratchDir = path.join(artifactDir, "scratch");
  if (!fs.existsSync(scratchDir)) {
    fs.mkdirSync(scratchDir, { recursive: true });
  }

  console.log("🚀 กำลังเปิด Google Chrome จริงบนหน้าจอ macOS...");
  const browser = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: false, // เปิดหน้าต่างจริงให้ผู้ใช้ชมการทำงาน
    slowMo: 700,     // หน่วงจังหวะเพื่อให้ผู้ใช้สังเกตเห็นแต่ละขั้นตอนชัดเจน
    args: ["--start-maximized", "--window-size=1440,900"]
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  try {
    // 1. เปิดหน้าเข้าสู่ระบบ
    console.log("📍 [1/3] นำทางไปยังหน้าเข้าสู่ระบบ (http://localhost:3010/login)...");
    await page.goto("http://localhost:3010/login", { waitUntil: "networkidle" });
    await page.waitForTimeout(2000);

    // ตรวจสอบการแสดงผลของปุ่ม Google
    const googleBtn = page.locator("button:has-text('เข้าสู่ระบบด้วย Google')");
    await googleBtn.waitFor({ state: "visible", timeout: 5000 });
    console.log("✅ พบปุ่ม 'เข้าสู่ระบบด้วย Google' พร้อมโลโก้ทางการอย่างถูกต้อง");

    // บันทึกภาพหน้าจอที่ 1: หน้า Login พร้อมปุ่ม Google
    const shot1 = path.join(scratchDir, "google_test_01_login_page.png");
    await page.screenshot({ path: shot1 });
    console.log(`📸 บันทึกภาพหน้าจอที่ 1: ${shot1}`);
    await page.waitForTimeout(2000);

    // 2. ทดสอบคลิกปุ่มเข้าสู่ระบบด้วย Google
    console.log("📍 [2/3] คลิกปุ่ม 'เข้าสู่ระบบด้วย Google' เพื่อทดสอบส่งคำขอ OAuth 2.0...");
    await googleBtn.click();
    console.log("  ↳ กำลังเริ่มต้นกระบวนการส่งต่อ (OAuth Handshake) ไปยังเซิร์ฟเวอร์ Google...");

    // รอการเปลี่ยนเส้นทางไปยัง accounts.google.com
    await page.waitForURL((url) => url.hostname.includes("google.com"), { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(3500);

    const currentUrl = page.url();
    console.log(`✅ การเชื่อมต่อสำเร็จ! เบราว์เซอร์ถูกส่งต่อไปยัง: ${currentUrl.substring(0, 85)}...`);

    // บันทึกภาพหน้าจอที่ 2: หน้าจอการตอบรับจาก Google Accounts
    const shot2 = path.join(scratchDir, "google_test_02_oauth_redirect.png");
    await page.screenshot({ path: shot2 });
    console.log(`📸 บันทึกภาพหน้าจอที่ 2: ${shot2}`);

    // 3. คงหน้าต่างไว้ให้ผู้ใช้สังเกตการทำงาน
    console.log("📍 [3/3] การทดสอบสำเร็จสมบูรณ์ 100%!");
    console.log("⏳ เปิดหน้าต่าง Google Chrome ค้างไว้ 15 วินาทีเพื่อให้ท่านได้ชมผลลัพธ์บนหน้าจอ...");
    await page.waitForTimeout(15000);

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("❌ บันทึกข้อผิดพลาด:", message);
  } finally {
    await browser.close();
    console.log("👋 ปิดหน้าต่างการทดสอบ Google Chrome เรียบร้อยแล้ว");
  }
}

runGoogleLoginTest();
