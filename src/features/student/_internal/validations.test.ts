import { describe, it, expect } from "vitest";
import { studentProfileSchema, updateStudentProfileSchema } from "./validations";

describe("student validations", () => {
  it("validate studentProfileSchema สำเร็จเมื่อข้อมูลถูกต้อง", () => {
    const valid = {
      studentCode: "6901234567",
      applicantType: "MONK",
      titleTh: "พระมหา",
      firstNameTh: "บุญส่ง",
      monasticName: "ญาณวีโร",
      batchYear: 2569,
      status: "STUDYING",
    };
    const parsed = studentProfileSchema.parse(valid);
    expect(parsed.studentCode).toBe("6901234567");
    expect(parsed.firstNameTh).toBe("บุญส่ง");
    expect(parsed.status).toBe("STUDYING");
  });

  it("validate studentProfileSchema ล้มเมื่อไม่มี studentCode หรือ firstNameTh", () => {
    expect(() => studentProfileSchema.parse({ titleTh: "นาย" })).toThrow();
  });

  it("validate updateStudentProfileSchema ต้องการ uuid id", () => {
    const valid = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      status: "GRADUATED",
    };
    const parsed = updateStudentProfileSchema.parse(valid);
    expect(parsed.id).toBe("123e4567-e89b-12d3-a456-426614174000");
    expect(parsed.status).toBe("GRADUATED");
  });
});
