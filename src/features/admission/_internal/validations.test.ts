import { describe, it, expect } from "vitest";
import { createApplicationSchema, updateApplicationStatusSchema } from "./validations";

describe("admission validations", () => {
  it("validate createApplicationSchema สำเร็จเมื่อข้อมูลครบถ้วน", () => {
    const valid = {
      roundId: "123e4567-e89b-12d3-a456-426614174000",
      applicantType: "MONK",
      titleTh: "พระ",
      firstNameTh: "มหาประเสริฐ",
      monasticName: "โชติปญฺโญ",
      idCardOrPassport: "1234567890123",
      phone: "0812345678",
      email: "prasert@example.com",
    };
    const parsed = createApplicationSchema.parse(valid);
    expect(parsed.titleTh).toBe("พระ");
    expect(parsed.firstNameTh).toBe("มหาประเสริฐ");
    expect(parsed.email).toBe("prasert@example.com");
  });

  it("validate createApplicationSchema ล้มเมื่ออีเมลไม่ถูกต้องหรือไม่มี idCard", () => {
    expect(() =>
      createApplicationSchema.parse({
        roundId: "123e4567-e89b-12d3-a456-426614174000",
        titleTh: "นาย",
        firstNameTh: "สมชาย",
        idCardOrPassport: "",
        phone: "0812345678",
        email: "invalid-email",
      })
    ).toThrow();
  });

  it("validate updateApplicationStatusSchema สำเร็จเมื่อสถานะถูกต้อง", () => {
    const valid = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      status: "INTERVIEW_PASSED",
      reviewerNote: "ผ่านการสอบสัมภาษณ์",
    };
    const parsed = updateApplicationStatusSchema.parse(valid);
    expect(parsed.status).toBe("INTERVIEW_PASSED");
    expect(parsed.reviewerNote).toBe("ผ่านการสอบสัมภาษณ์");
  });

  it("validate updateApplicationStatusSchema ล้มเมื่อสถานะนอกเหนือจากที่กำหนด", () => {
    expect(() =>
      updateApplicationStatusSchema.parse({
        id: "123e4567-e89b-12d3-a456-426614174000",
        status: "UNKNOWN_STATUS",
      })
    ).toThrow();
  });
});
