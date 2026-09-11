import { describe, it, expect, vi, beforeEach } from "vitest";
import fs from "node:fs/promises";
import { saveLogoFile } from "./upload.service";
import { MAX_LOGO_FILE_SIZE } from "../validations/settings";

vi.mock("node:fs/promises", () => ({
  default: {
    mkdir: vi.fn().mockResolvedValue(undefined),
    writeFile: vi.fn().mockResolvedValue(undefined),
  },
}));

describe("upload.service - saveLogoFile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("โยน validation error เมื่อไม่มีไฟล์หรือขนาดไฟล์เป็น 0", async () => {
    const emptyFile = new File([], "empty.png", { type: "image/png" });
    await expect(saveLogoFile("tenant-1", emptyFile)).rejects.toMatchObject({
      code: "validation",
      fieldErrors: { file: ["settings.fileRequired"] },
    });
  });

  it("โยน validation error เมื่อขนาดไฟล์เกิน 5MB", async () => {
    // Create a mock large file
    const largeContent = new Uint8Array(10);
    const largeFile = new File([largeContent], "large.png", { type: "image/png" });
    Object.defineProperty(largeFile, "size", { value: MAX_LOGO_FILE_SIZE + 1 });

    await expect(saveLogoFile("tenant-1", largeFile)).rejects.toMatchObject({
      code: "validation",
      fieldErrors: { file: ["settings.fileTooLarge"] },
    });
  });

  it("โยน validation error เมื่อ MIME type ไม่ใช่รูปภาพที่รองรับ", async () => {
    const pdfFile = new File(["dummy pdf"], "doc.pdf", { type: "application/pdf" });
    await expect(saveLogoFile("tenant-1", pdfFile)).rejects.toMatchObject({
      code: "validation",
      fieldErrors: { file: ["settings.invalidFileType"] },
    });
  });

  it("ปฏิเสธไฟล์ที่ปลอมแปลง MIME type (MIME spoofing)", async () => {
    const fakePng = new File(["not-really-a-png"], "malicious.png", { type: "image/png" });
    await expect(saveLogoFile("tenant-1", fakePng)).rejects.toMatchObject({
      code: "validation",
      fieldErrors: { file: ["settings.invalidFileType"] },
    });
  });

  it("ปฏิเสธไฟล์ SVG ที่มีสคริปต์อันตราย (Stored XSS Protection)", async () => {
    const maliciousSvg = new File(
      ['<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>'],
      "attack.svg",
      { type: "image/svg+xml" }
    );
    await expect(saveLogoFile("tenant-1", maliciousSvg)).rejects.toMatchObject({
      code: "validation",
      fieldErrors: { file: ["settings.invalidFileType"] },
    });
  });

  it("บันทึกไฟล์รูปภาพสำเร็จและส่งกลับ relative URL /uploads/logos/...", async () => {
    // Valid PNG signature: 89 50 4E 47 0D 0A 1A 0A
    const pngBytes = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x01]);
    const pngFile = new File([pngBytes], "logo.png", { type: "image/png" });
    if (typeof pngFile.arrayBuffer !== "function") {
      pngFile.arrayBuffer = async () => pngBytes.buffer;
    }
    const url = await saveLogoFile("t123", pngFile);

    expect(fs.mkdir).toHaveBeenCalledWith(expect.stringContaining("public/uploads/logos"), { recursive: true });
    expect(fs.writeFile).toHaveBeenCalled();
    expect(url).toMatch(/^\/uploads\/logos\/t123-logo-\d+-[a-f0-9]+\.png$/);
  });
});
