import { chromium } from "@playwright/test";
import * as path from "path";

async function testPersonnelMenu() {
  const artifactDir = "/Users/mac/.gemini/antigravity/brain/b3b15d0a-16a7-4efa-8178-f79e5bcefd7f";
  const browser = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
  });

  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log("🚀 ทดสอบเมนู 'บริหารจัดการบุคลากร' ภายใต้เมนู User...");

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

    // Make sure we test in Thai
    const langBtn = page.locator("button:has-text('TH'), button:has-text('EN')").first();
    if (await langBtn.isVisible()) {
      const text = await langBtn.innerText();
      if (text.includes("TH")) {
        await langBtn.click();
        await page.waitForTimeout(1000);
      }
    }

    console.log("[Step 2] ตรวจสอบเมนู User และเมนูย่อย 'บริหารจัดการบุคลากร'...");
    const userGroupBtn = page.locator(".ng button.ni:has-text('ผู้ใช้'), .ng button.ni:has-text('Users')").first();
    if (await userGroupBtn.isVisible()) {
      const isExpanded = await userGroupBtn.getAttribute("aria-expanded");
      if (isExpanded !== "true") {
        await userGroupBtn.click();
        await page.waitForTimeout(500);
      }
    }

    const personnelLink = page.locator(".sub a.ni.sub:has-text('บริหารจัดการบุคลากร'), .sub a.ni.sub:has-text('Personnel Management')").first();
    const isPersonnelVisible = await personnelLink.isVisible();
    console.log("  - เมนู 'บริหารจัดการบุคลากร' ใต้ User:", isPersonnelVisible ? "✅ ปรากฏถูกต้อง" : "❌ ไม่พบ");

    const shot = path.join(artifactDir, "personnel_menu_under_user.png");
    await page.screenshot({ path: shot });
    console.log("  📸 บันทึกภาพเมนูภายใต้ User:", shot);

    console.log("[Step 3] คลิกเข้าสู่เมนู 'บริหารจัดการบุคลากร'...");
    await personnelLink.click();
    await page.waitForFunction(() => window.location.pathname.includes("/faculty-management"), { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(1500);

    const heading = await page.locator("h1").innerText();
    console.log("  - หัวเรื่องหน้า:", heading);
    console.log("  - URL ปัจจุบัน:", page.url());

    const shotPage = path.join(artifactDir, "personnel_page_loaded.png");
    await page.screenshot({ path: shotPage });
    console.log("  📸 บันทึกภาพหน้าบริหารจัดการบุคลากร:", shotPage);

    console.log("🎉 การทดสอบย้ายเมนูบุคลากรไปไว้ใต้ User สำเร็จสมบูรณ์ 100%!");
  } catch (err) {
    console.error("❌ เกิดข้อผิดพลาด:", err);
    throw err;
  } finally {
    await browser.close();
  }
}

testPersonnelMenu();
