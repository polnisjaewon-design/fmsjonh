import { describe, it, expect } from "vitest";
import { courseSchema, updateCourseSchema } from "./validations";

describe("curriculum validations", () => {
  it("validate courseSchema สำเร็จเมื่อข้อมูลถูกต้อง", () => {
    const valid = {
      courseCode: "VIP601",
      nameTh: "วิปัสสนากรรมฐานขั้นสูง",
      creditTotal: 3,
      courseType: "PRACTICE_VIPASSANA",
    };
    const parsed = courseSchema.parse(valid);
    expect(parsed.courseCode).toBe("VIP601");
    expect(parsed.nameTh).toBe("วิปัสสนากรรมฐานขั้นสูง");
    expect(parsed.courseType).toBe("PRACTICE_VIPASSANA");
  });

  it("validate courseSchema ล้มเมื่อไม่มี courseCode หรือ nameTh หรือ creditTotal < 1", () => {
    expect(() =>
      courseSchema.parse({ courseCode: "", nameTh: "วิชา", creditTotal: 3 })
    ).toThrow();
    expect(() =>
      courseSchema.parse({ courseCode: "VIP601", nameTh: "", creditTotal: 3 })
    ).toThrow();
    expect(() =>
      courseSchema.parse({ courseCode: "VIP601", nameTh: "วิชา", creditTotal: 0 })
    ).toThrow();
  });

  it("validate updateCourseSchema ต้องการ uuid id", () => {
    const valid = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      creditTotal: 4,
    };
    const parsed = updateCourseSchema.parse(valid);
    expect(parsed.id).toBe("123e4567-e89b-12d3-a456-426614174000");
    expect(parsed.creditTotal).toBe(4);
  });
});
