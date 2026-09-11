import { describe, it, expect } from "vitest";
import { createThesisSchema, updateThesisSchema } from "./validations";

describe("thesis validations", () => {
  it("validate createThesisSchema สำเร็จเมื่อข้อมูลถูกต้อง", () => {
    const valid = {
      studentCode: "6901234567",
      authorName: "พระมหาประเสริฐ โชติปญฺโญ",
      titleTh: "การศึกษาวิปัสสนากรรมฐานตามแนวสติปัฏฐานสูตร",
      advisorName: "ศ.ดร.พระธรรมวัชรบัณฑิต",
      status: "IN_PROGRESS",
      similarityPercentage: 12.5,
    };
    const parsed = createThesisSchema.parse(valid);
    expect(parsed.studentCode).toBe("6901234567");
    expect(parsed.titleTh).toBe("การศึกษาวิปัสสนากรรมฐานตามแนวสติปัฏฐานสูตร");
    expect(parsed.similarityPercentage).toBe(12.5);
  });

  it("validate createThesisSchema ล้มเมื่อไม่มี titleTh หรือ advisorName", () => {
    expect(() =>
      createThesisSchema.parse({
        studentCode: "12345",
        authorName: "ผู้วิจัย",
        titleTh: "",
        advisorName: "อาจารย์",
      })
    ).toThrow();
  });

  it("validate updateThesisSchema ต้องการ uuid id", () => {
    const valid = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      status: "COMPLETED",
    };
    const parsed = updateThesisSchema.parse(valid);
    expect(parsed.id).toBe("123e4567-e89b-12d3-a456-426614174000");
    expect(parsed.status).toBe("COMPLETED");
  });
});
