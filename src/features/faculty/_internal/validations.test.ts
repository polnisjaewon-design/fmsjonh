import { describe, it, expect } from "vitest";
import { facultyMemberSchema, updateFacultyMemberSchema } from "./validations";

describe("faculty validations", () => {
  it("validate facultyMemberSchema สำเร็จเมื่อข้อมูลถูกต้อง", () => {
    const valid = {
      titleTh: "พระธรรมวัชรบัณฑิต",
      firstNameTh: "สมจินต์",
      monasticName: "สมฺมาปญฺโญ",
      academicRank: "ศ.ดร.",
      positionTh: "อธิการบดี",
      isVipassanaMaster: true,
      isExecutive: true,
    };
    const parsed = facultyMemberSchema.parse(valid);
    expect(parsed.titleTh).toBe("พระธรรมวัชรบัณฑิต");
    expect(parsed.firstNameTh).toBe("สมจินต์");
    expect(parsed.academicRank).toBe("ศ.ดร.");
    expect(parsed.isVipassanaMaster).toBe(true);
  });

  it("validate facultyMemberSchema ล้มเมื่อไม่มี titleTh, firstNameTh หรือ positionTh", () => {
    expect(() => facultyMemberSchema.parse({ titleTh: "", firstNameTh: "ทดสอบ", positionTh: "อาจารย์" })).toThrow();
    expect(() => facultyMemberSchema.parse({ titleTh: "นาย", firstNameTh: "", positionTh: "อาจารย์" })).toThrow();
    expect(() => facultyMemberSchema.parse({ titleTh: "นาย", firstNameTh: "ทดสอบ", positionTh: "" })).toThrow();
  });

  it("validate updateFacultyMemberSchema ต้องการ uuid id", () => {
    const valid = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      sortOrder: 1,
    };
    const parsed = updateFacultyMemberSchema.parse(valid);
    expect(parsed.id).toBe("123e4567-e89b-12d3-a456-426614174000");
    expect(parsed.sortOrder).toBe(1);
  });
});
