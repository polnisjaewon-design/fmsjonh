import { describe, it, expect } from "vitest";
import { updateSettingsSchema } from "./settings";

describe("updateSettingsSchema", () => {
  it("ยอมรับ URL ว่างเปล่าสำหรับกรณีไม่มีโลโก้", () => {
    const res = updateSettingsSchema.safeParse({
      nameTh: "มหาวิทยาลัย",
      nameEn: "University",
      logoUrl: "",
      palette: "blue",
    });
    expect(res.success).toBe(true);
    if (res.success) {
      expect(res.data.logoUrl).toBe("");
    }
  });

  it("ยอมรับ relative upload path ที่ขึ้นต้นด้วย /", () => {
    const res = updateSettingsSchema.safeParse({
      nameTh: "มหาวิทยาลัย",
      nameEn: "University",
      logoUrl: "/uploads/logos/tenant-1-logo-12345.png",
      palette: "blue",
    });
    expect(res.success).toBe(true);
    if (res.success) {
      expect(res.data.logoUrl).toBe("/uploads/logos/tenant-1-logo-12345.png");
    }
  });

  it("ยอมรับ absolute URL (http / https)", () => {
    const res = updateSettingsSchema.safeParse({
      nameTh: "มหาวิทยาลัย",
      nameEn: "University",
      logoUrl: "https://example.com/images/logo.png",
      palette: "green",
    });
    expect(res.success).toBe(true);
    if (res.success) {
      expect(res.data.logoUrl).toBe("https://example.com/images/logo.png");
    }
  });

  it("ปฏิเสธ URL ที่ไม่ถูกต้อง (ไม่ขึ้นต้นด้วย / หรือ http/https)", () => {
    const res = updateSettingsSchema.safeParse({
      nameTh: "มหาวิทยาลัย",
      nameEn: "University",
      logoUrl: "invalid-url-scheme",
      palette: "blue",
    });
    expect(res.success).toBe(false);
  });

  it("ปฏิเสธชื่อองค์กรที่เป็นค่าว่าง", () => {
    const res = updateSettingsSchema.safeParse({
      nameTh: "   ",
      nameEn: "University",
      logoUrl: "",
      palette: "blue",
    });
    expect(res.success).toBe(false);
  });

  it("ยอมรับข้อมูล SMTP ที่ถูกต้อง", () => {
    const res = updateSettingsSchema.safeParse({
      nameTh: "มหาวิทยาลัย",
      nameEn: "University",
      logoUrl: "",
      palette: "blue",
      smtp: {
        enabled: true,
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        user: "admin@gmail.com",
        pass: "abcd efgh ijkl mnop",
        fromName: "FMS Admin",
        fromEmail: "admin@gmail.com",
      },
    });
    expect(res.success).toBe(true);
    if (res.success && res.data.smtp) {
      expect(res.data.smtp.enabled).toBe(true);
      expect(res.data.smtp.host).toBe("smtp.gmail.com");
      expect(res.data.smtp.port).toBe(465);
    }
  });

  it("ยอมรับข้อมูลข้อความองค์กรมาตรฐานโลก (orgInfo)", () => {
    const res = updateSettingsSchema.safeParse({
      nameTh: "บัณฑิตวิทยาลัย มจร",
      nameEn: "MCU Graduate School",
      logoUrl: "/uploads/logos/mcu.png",
      palette: "blue",
      orgInfo: {
        taglineTh: "ศูนย์กลางการศึกษาวิปัสสนาภาวนาระดับสากล",
        taglineEn: "World-Class Center for Vipassana Meditation Studies",
        descriptionTh: "มุ่งมั่นพัฒนาปัญญาและสันติภาพภายในสู่สังคมโลก",
        descriptionEn: "Committed to cultivating inner wisdom and global peace",
        addressTh: "79 หมู่ 1 ต.ลำไทร อ.วังน้อย จ.พระนครศรีอยุธยา 13170",
        addressEn: "79 Moo 1, Lamsai, Wang Noi, Phra Nakhon Si Ayutthaya 13170, Thailand",
        email: "vipassana@mcu.ac.th",
        phone: "035-248-000",
        website: "https://www.mcu.ac.th",
      },
    });
    expect(res.success).toBe(true);
    if (res.success && res.data.orgInfo) {
      expect(res.data.orgInfo.taglineTh).toBe("ศูนย์กลางการศึกษาวิปัสสนาภาวนาระดับสากล");
      expect(res.data.orgInfo.email).toBe("vipassana@mcu.ac.th");
      expect(res.data.orgInfo.website).toBe("https://www.mcu.ac.th");
    }
  });
});

