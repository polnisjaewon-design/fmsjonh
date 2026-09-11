import { describe, it, expect } from "vitest";
import { createPetitionSchema, reviewPetitionSchema } from "./validations";

describe("petition validations", () => {
  it("validate createPetitionSchema สำเร็จเมื่อข้อมูลครบ", () => {
    const valid = {
      studentCode: "6901234567",
      templateId: "123e4567-e89b-12d3-a456-426614174000",
      title: "ขอลาปฏิบัติธรรมพิเศษ",
      reason: "เข้าร่วมโครงการปฏิบัติธรรม ณ สำนักปฏิบัติธรรม",
    };
    const parsed = createPetitionSchema.parse(valid);
    expect(parsed.studentCode).toBe("6901234567");
    expect(parsed.title).toBe("ขอลาปฏิบัติธรรมพิเศษ");
  });

  it("validate createPetitionSchema ล้มเมื่อ templateId ไม่ใช่ uuid หรือไม่มี studentCode", () => {
    expect(() =>
      createPetitionSchema.parse({
        studentCode: "",
        templateId: "123e4567-e89b-12d3-a456-426614174000",
        title: "เรื่อง",
        reason: "เหตุผล",
      })
    ).toThrow();
    expect(() =>
      createPetitionSchema.parse({
        studentCode: "12345",
        templateId: "not-a-uuid",
        title: "เรื่อง",
        reason: "เหตุผล",
      })
    ).toThrow();
  });

  it("validate reviewPetitionSchema สำเร็จเมื่อมี uuid id และ status ถูกต้อง", () => {
    const valid = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      status: "APPROVED",
      approverNote: "อนุมัติตามที่เสนอ",
    };
    const parsed = reviewPetitionSchema.parse(valid);
    expect(parsed.status).toBe("APPROVED");
    expect(parsed.approverNote).toBe("อนุมัติตามที่เสนอ");
  });

  it("validate reviewPetitionSchema ล้มเมื่อ status นอกเหนือจาก APPROVED/REJECTED/RETURNED", () => {
    expect(() =>
      reviewPetitionSchema.parse({
        id: "123e4567-e89b-12d3-a456-426614174000",
        status: "PENDING",
      })
    ).toThrow();
  });
});
