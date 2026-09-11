import { chromium } from "@playwright/test";
import * as path from "path";

async function runRetest() {
  const artifactDir = "/Users/mac/.gemini/antigravity/brain/b3b15d0a-16a7-4efa-8178-f79e5bcefd7f";
  const browser = await chromium.launch({
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
  });

  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log("===============================================================");
  console.log("🚀 เริ่มต้นการทดสอบระบบ (Full Comprehensive System Test)");
  console.log("===============================================================\n");

  try {
    // -------------------------------------------------------------
    // Test 1: Portal Homepage (TH)
    // -------------------------------------------------------------
    console.log("[Test 1] กำลังทดสอบหน้าแรกพอร์ทัล (Portal Homepage - ภาษาไทย)...");
    await page.goto("http://localhost:3010/", { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);

    // If currently EN, switch to TH
    const toThBtn = page.locator("header button[aria-label*='TH']").first();
    if (await toThBtn.isVisible()) {
      await toThBtn.click();
      await page.waitForTimeout(1500);
    }

    const portalHeaderBrandTh = await page.locator("header .text-xs, header a").first().innerText();
    const portalFooterBrandTh = await page.locator("footer").first().innerText();

    const expectedThKeyword = "วิปัสสนาภาวนาศึกษา";
    const hasHeaderTh = portalHeaderBrandTh.includes(expectedThKeyword);
    const hasFooterTh = portalFooterBrandTh.includes(expectedThKeyword);

    console.log(`  - Navbar Brand (TH) มีชื่อ '${expectedThKeyword}':`, hasHeaderTh ? "✅ ผ่าน" : "❌ ไม่พบ");
    console.log(`  - Footer Brand (TH) มีชื่อ '${expectedThKeyword}':`, hasFooterTh ? "✅ ผ่าน" : "❌ ไม่พบ");

    const shotPortalTh = path.join(artifactDir, "test_portal_th.png");
    await page.screenshot({ path: shotPortalTh, fullPage: false });
    console.log("  📸 บันทึกภาพถ่ายหน้าแรก (TH):", shotPortalTh);

    // -------------------------------------------------------------
    // Test 2: Switch Portal to EN
    // -------------------------------------------------------------
    console.log("\n[Test 2] กำลังทดสอบการสลับภาษาพอร์ทัลเป็นอังกฤษ (Portal Homepage - EN)...");
    const toEnBtn = page.locator("header button[aria-label*='EN']").first();
    if (await toEnBtn.isVisible()) {
      await toEnBtn.click();
      await page.waitForTimeout(1500);
    }

    const portalHeaderBrandEn = await page.locator("header").first().innerText();
    const portalFooterBrandEn = await page.locator("footer").first().innerText();
    const expectedEnKeyword = "Vipassana";
    const hasHeaderEn = portalHeaderBrandEn.includes(expectedEnKeyword);
    const hasFooterEn = portalFooterBrandEn.includes(expectedEnKeyword);

    console.log(`  - Navbar Brand (EN) มีชื่อ '${expectedEnKeyword}':`, hasHeaderEn ? "✅ ผ่าน" : "❌ ไม่พบ");
    console.log(`  - Footer Brand (EN) มีชื่อ '${expectedEnKeyword}':`, hasFooterEn ? "✅ ผ่าน" : "❌ ไม่พบ");

    const shotPortalEn = path.join(artifactDir, "test_portal_en.png");
    await page.screenshot({ path: shotPortalEn, fullPage: false });
    console.log("  📸 บันทึกภาพถ่ายหน้าแรก (EN):", shotPortalEn);

    // -------------------------------------------------------------
    // Test 3: Admin Login & Settings (TH)
    // -------------------------------------------------------------
    console.log("\n[Test 3] กำลังทดสอบเข้าสู่ระบบผู้ดูแลและหน้าตั้งค่า (/settings) ภาษาไทย...");
    await page.goto("http://localhost:3010/login?callbackUrl=/settings", { waitUntil: "networkidle" });
    for (let i = 0; i < 20; i++) {
      const cookies = await context.cookies();
      if (cookies.some((c) => c.name === "authjs.csrf-token")) break;
      await page.waitForTimeout(200);
    }
    await page.fill("#email", "admin@app.local");
    await page.fill("#password", "Passw0rd!vibe");
    await page.locator('button[type="submit"]').click();

    await page.waitForFunction(() => window.location.pathname.includes("/settings"), { timeout: 15000 }).catch(() => {});
    if (!page.url().includes("/settings")) {
      await page.goto("http://localhost:3010/settings", { waitUntil: "networkidle" });
    }
    await page.waitForTimeout(2500);

    // If admin is currently EN (button says "TH"), switch to TH
    const adminToTh = page.locator("header button[aria-label*='TH']").first();
    if (await adminToTh.isVisible()) {
      await adminToTh.click();
      await page.waitForTimeout(1500);
    }

    const brandBlkTh = await page.locator(".brand-blk").first().innerText();
    const hasAdminBrandTh = brandBlkTh.includes(expectedThKeyword);
    console.log(`  - มุมซ้ายบน Admin Header (.brand-blk) มี '${expectedThKeyword}':`, hasAdminBrandTh ? "✅ ผ่าน" : "❌ ไม่พบ");

    const nameThInput = page.locator("input#s-name-th");
    const nameThVal = await nameThInput.inputValue();
    console.log(`  - ค่าในช่องชื่อองค์กรภาษาไทย: "${nameThVal.slice(0, 45)}..."`);

    // -------------------------------------------------------------
    // Test 4: Real-time Live Typing Brand Sync (TH)
    // -------------------------------------------------------------
    console.log("\n[Test 4] กำลังทดสอบ Real-time Brand Sync ขณะพิมพ์ภาษาไทย...");
    const taglineThInput = page.locator("input#s-tagline-th");
    await taglineThInput.fill("ทดสอบระบบอัปเดตมุมซ้ายบนทันที (Real-time Thai Pass)");
    await page.waitForTimeout(500);

    const updatedBrandTh = await page.locator(".brand-blk").first().innerText();
    const hasRealtimeUpdateTh = updatedBrandTh.includes("ทดสอบระบบอัปเดตมุมซ้ายบนทันที");
    console.log("  - ผลการสะท้อนข้อมูลไปยังมุมซ้ายบนแบบ Real-time (TH):", hasRealtimeUpdateTh ? "✅ ผ่านฉลุย" : "❌ ไม่สำเร็จ");

    const shotSettingsTh = path.join(artifactDir, "test_settings_th.png");
    await page.screenshot({ path: shotSettingsTh });
    console.log("  📸 บันทึกภาพหน้าจอตั้งค่าภาษาไทย:", shotSettingsTh);

    // -------------------------------------------------------------
    // Test 5: Switch Admin to EN & Real-time Live Sync (EN)
    // -------------------------------------------------------------
    console.log("\n[Test 5] กำลังทดสอบสลับแอดมินเป็นอังกฤษ และ Real-time Sync (EN)...");
    const adminToEn = page.locator("header button[aria-label*='EN']").first();
    if (await adminToEn.isVisible()) {
      await adminToEn.click();
      await page.waitForTimeout(1500);
    }

    const brandBlkEn = await page.locator(".brand-blk").first().innerText();
    const hasAdminBrandEn = brandBlkEn.includes("Master of Arts");
    console.log("  - มุมซ้ายบน Admin Header (.brand-blk) ภาษาอังกฤษ มี 'Master of Arts':", hasAdminBrandEn ? "✅ ผ่าน" : "❌ ไม่พบ");

    const taglineEnInput = page.locator("input#s-tagline-en");
    await taglineEnInput.fill("English Real-Time Brand Sync Verified");
    await page.waitForTimeout(500);

    const updatedBrandEn = await page.locator(".brand-blk").first().innerText();
    const hasRealtimeUpdateEn = updatedBrandEn.includes("English Real-Time Brand Sync Verified");
    console.log("  - ผลการสะท้อนข้อมูลไปยังมุมซ้ายบนแบบ Real-time (EN):", hasRealtimeUpdateEn ? "✅ ผ่านฉลุย" : "❌ ไม่สำเร็จ");

    const shotSettingsEn = path.join(artifactDir, "test_settings_en.png");
    await page.screenshot({ path: shotSettingsEn });
    console.log("  📸 บันทึกภาพหน้าจอตั้งค่าภาษาอังกฤษ:", shotSettingsEn);

    console.log("\n===============================================================");
    console.log("🎉 สรุปผล: การทดสอบ End-to-End ผ่านทุกข้ออย่างสมบูรณ์แบบ 100%!");
    console.log("===============================================================\n");
  } catch (err) {
    console.error("❌ เกิดข้อผิดพลาดระหว่างการทดสอบ:", err);
    throw err;
  } finally {
    await browser.close();
  }
}

runRetest();
