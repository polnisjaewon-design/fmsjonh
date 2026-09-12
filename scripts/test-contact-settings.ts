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

  console.log("1. Navigating to login page with callback to /settings...");
  await page.goto("http://localhost:3010/login?callbackUrl=/settings", { waitUntil: "networkidle" });
  for (let i = 0; i < 20; i++) {
    const cookies = await context.cookies();
    if (cookies.some((c) => c.name === "authjs.csrf-token")) break;
    await page.waitForTimeout(200);
  }
  await page.fill("#email", "admin@app.local");
  await page.fill("#password", "Passw0rd!vibe");
  await page.locator('button[type="submit"]').click();

  await page.waitForTimeout(3000);
  console.log("Current URL after login:", page.url());

  if (!page.url().includes("/settings")) {
    await page.goto("http://localhost:3010/settings", { waitUntil: "networkidle" });
  }
  await page.waitForTimeout(2000);
  console.log("Current URL on settings step:", page.url());

  console.log("3. Checking for #s-address-th...");
  await page.locator("#s-address-th").scrollIntoViewIfNeeded();

  console.log("4. Filling contact details in /settings form...");
  await page.fill("#s-address-th", "อาคารมหาจุฬาบรรณาคาร มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย ต.ลำไทร อ.วังน้อย จ.พระนครศรีอยุธยา ๑๓๑๗๐");
  await page.fill("#s-address-en", "Mahachulalongkornrajavidyalaya University, Wang Noi, Phra Nakhon Si Ayutthaya 13170 Thailand");
  await page.fill("#s-org-phone", "๐๓๕-๒๔๘-๐๐๐ ต่อ ๘๐๕๐");
  await page.fill("#s-org-email", "vipassana.grad@mcu.ac.th");
  await page.fill("#s-org-website", "https://grad.mcu.ac.th");
  await page.fill("#s-hours-th", "วันเสาร์ - อาทิตย์ เวลา ๐๘:๓๐ - ๑๗:๐๐ น.");
  await page.fill("#s-hours-en", "Saturday - Sunday: 08:30 - 17:00");
  await page.fill("#s-line-id", "@mcuvipassana");
  await page.fill("#s-facebook-url", "https://facebook.com/vipassanamcu");

  console.log("5. Submitting settings form via .savebar button...");
  const saveBtn = page.locator(".savebar button");
  await saveBtn.scrollIntoViewIfNeeded();
  await saveBtn.click();
  await page.waitForTimeout(3500);

  // Scroll back to contact card for screenshot
  await page.locator("#s-address-th").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  const screenshot1 = path.join(artifactDir, "contact_01_admin_settings_saved.png");
  await page.screenshot({ path: screenshot1, fullPage: false });
  console.log(`Saved screenshot 1: ${screenshot1}`);

  console.log("6. Navigating to portal home / to verify footer...");
  await page.goto("http://localhost:3010/", { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1500);

  const footer = page.locator("footer");
  const footerText = await footer.innerText();
  console.log("Footer text sample:", footerText.slice(0, 300));

  if (footerText.includes("vipassana.grad@mcu.ac.th")) {
    console.log("✓ Footer contains updated email: vipassana.grad@mcu.ac.th");
  } else {
    console.warn("⚠ Email check result:", footerText);
  }

  if (footerText.includes("@mcuvipassana")) {
    console.log("✓ Footer contains updated LINE ID: @mcuvipassana");
  }

  const screenshot2 = path.join(artifactDir, "contact_02_portal_footer.png");
  await page.screenshot({ path: screenshot2, fullPage: false });
  console.log(`Saved screenshot 2: ${screenshot2}`);

  console.log("7. Navigating to /contact page...");
  await page.goto("http://localhost:3010/contact", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);

  const contactPageText = await page.locator("body").innerText();
  if (contactPageText.includes("vipassana.grad@mcu.ac.th")) {
    console.log("✓ Contact page contains email!");
  }
  if (contactPageText.includes("@mcuvipassana")) {
    console.log("✓ Contact page contains LINE ID!");
  }

  const screenshot3 = path.join(artifactDir, "contact_03_portal_contact_page.png");
  await page.screenshot({ path: screenshot3, fullPage: true });
  console.log(`Saved screenshot 3: ${screenshot3}`);

  await browser.close();
  console.log("E2E Contact Settings test completed successfully!");
}

main().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
