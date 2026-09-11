import { chromium } from "@playwright/test";

async function runDemo() {

  console.log("🚀 กำลังเปิด Google Chrome จริงบนหน้าจอ macOS...");
  const browser = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: false, // เปิดหน้าต่าง Chrome จริง
    slowMo: 500,     // หน่วงจังหวะให้ผู้ใช้ชมการทำงาน
    args: ["--start-maximized", "--window-size=1440,900"]
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  try {
    // -------------------------------------------------------------
    // ขั้นตอนที่ ๑: หน้า Portal และ Focus AI Hero Section
    // -------------------------------------------------------------
    console.log("📍 [1/6] นำทางไปยัง Portal หน้าหลัก (Focus AI Hero)...");
    await page.goto("http://localhost:3010/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2500);

    // ทดสอบคลิกปุ่มคลื่นเสียงสมาธิ (Focus Ambiance)
    console.log("  ↳ คลิกปุ่มสลับบรรยากาศสมาธิ (Focus Ambiance Wave)...");
    const ambianceBtn = page.locator("button:has-text('บรรยากาศภาวนา'), button:has-text('FOCUS AMBIANCE')");
    if (await ambianceBtn.count() > 0) {
      await ambianceBtn.first().click({ timeout: 3000 }).catch(() => {});
      await page.waitForTimeout(1500);
      await ambianceBtn.first().click({ timeout: 3000 }).catch(() => {});
      await page.waitForTimeout(1000);
    }

    // -------------------------------------------------------------
    // ขั้นตอนที่ ๒: ทดสอบระบบ Interactive Focus Flow (๕ มิติ)
    // -------------------------------------------------------------
    console.log("📍 [2/6] เลื่อนลงทดสอบระบบสลับแท็บ ๕ มิติหลักสูตร...");
    await page.evaluate(() => window.scrollBy({ top: 650, behavior: "smooth" }));
    await page.waitForTimeout(2000);

    console.log("  ↳ คลิกแท็บ 'พระอภิธรรม'...");
    await page.locator("button:has-text('พระอภิธรรม')").first().click({ timeout: 3000 }).catch(() => {});
    await page.waitForTimeout(2000);

    console.log("  ↳ คลิกแท็บ 'สอบอารมณ์'...");
    await page.locator("button:has-text('สอบอารมณ์')").first().click({ timeout: 3000 }).catch(() => {});
    await page.waitForTimeout(2000);

    console.log("  ↳ คลิกแท็บ 'วิจัยวิทยานิพนธ์'...");
    await page.locator("button:has-text('วิจัยวิทยานิพนธ์')").first().click({ timeout: 3000 }).catch(() => {});
    await page.waitForTimeout(1500);

    console.log("  ↳ คลิกแท็บ 'ภาคเสาร์-อาทิตย์'...");
    await page.locator("button:has-text('ภาคเสาร์-อาทิตย์')").first().click({ timeout: 3000 }).catch(() => {});
    await page.waitForTimeout(2000);

    // -------------------------------------------------------------
    // ขั้นตอนที่ ๓: ทดสอบหน้าสมัครเรียน (Admissions Portal)
    // -------------------------------------------------------------
    console.log("📍 [3/6] นำทางไปยังระบบรับสมัครเรียนออนไลน์ (/admissions)...");
    await page.goto("http://localhost:3010/admissions", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    await page.evaluate(() => window.scrollBy({ top: 450, behavior: "smooth" }));
    await page.waitForTimeout(2000);

    // -------------------------------------------------------------
    // ขั้นตอนที่ ๔: ทดสอบหน้าเข้าสู่ระบบ (Login)
    // -------------------------------------------------------------
    console.log("📍 [4/6] นำทางไปยังหน้าเข้าสู่ระบบผู้ดูแล (/login)...");
    await page.goto("http://localhost:3010/login", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1500);

    console.log("  ↳ กรอกอีเมล admin@app.local และรหัสผ่าน...");
    await page.fill("#email", "admin@app.local");
    await page.fill("#password", "Passw0rd!vibe");
    await page.waitForTimeout(1200);

    console.log("  ↳ กดปุ่มเข้าสู่ระบบ...");
    await page.getByRole("button", { name: /เข้าสู่ระบบ|Sign in/ }).click({ timeout: 5000 }).catch(() => {});
    await page.waitForURL("**/dashboard", { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(2500);

    // -------------------------------------------------------------
    // ขั้นตอนที่ ๕: แผงควบคุมผู้บริหาร (Admin Dashboard)
    // -------------------------------------------------------------
    console.log("📍 [5/6] สำรวจหน้า Admin Dashboard...");
    await page.evaluate(() => window.scrollBy({ top: 300, behavior: "smooth" }));
    await page.waitForTimeout(2000);

    // -------------------------------------------------------------
    // ขั้นตอนที่ ๖: ตั้งค่าสถาบัน และ โลโก้ (/settings)
    // -------------------------------------------------------------
    console.log("📍 [6/6] นำทางไปยังหน้าตั้งค่าสถาบันและ Logo (/settings)...");
    await page.goto("http://localhost:3010/settings", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2500);

    console.log("  ↳ สำรวจกล่องอัปโหลด Logo และ Color Palette...");
    await page.evaluate(() => window.scrollBy({ top: 300, behavior: "smooth" }));
    await page.waitForTimeout(3000);

    console.log("🎉 การทดสอบสาธิตสดบน Google Chrome เสร็จสมบูรณ์เรียบร้อยแล้วทุกขั้นตอน!");
    await page.waitForTimeout(4000);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("❌ บันทึกผลการทดสอบ:", message);
  } finally {
    await browser.close();
  }
}

runDemo();
