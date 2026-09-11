import { describe, it, expect } from "vitest";
import { createScheduleSchema } from "./validations";

describe("schedule validations", () => {
  it("validate createScheduleSchema สำเร็จเมื่อข้อมูลถูกต้อง", () => {
    const valid = {
      courseCode: "VIP601",
      courseName: "วิปัสสนากรรมฐาน",
      instructorName: "พระธรรมวัชรบัณฑิต",
      dayOfWeek: "SATURDAY",
      startTime: "09:00",
      endTime: "12:00",
      roomNumber: "B301",
      teachingMode: "HYBRID",
      onlineMeetingUrl: "https://zoom.us/j/123456789",
    };
    const parsed = createScheduleSchema.parse(valid);
    expect(parsed.courseCode).toBe("VIP601");
    expect(parsed.dayOfWeek).toBe("SATURDAY");
    expect(parsed.teachingMode).toBe("HYBRID");
  });

  it("validate createScheduleSchema ล้มเมื่อ URL ผิดรูปแบบ", () => {
    expect(() =>
      createScheduleSchema.parse({
        courseCode: "VIP601",
        courseName: "วิปัสสนา",
        instructorName: "อาจารย์",
        startTime: "09:00",
        endTime: "12:00",
        roomNumber: "101",
        onlineMeetingUrl: "invalid-url",
      })
    ).toThrow();
  });

  it("validate createScheduleSchema ล้มเมื่อไม่มี startTime หรือ endTime", () => {
    expect(() =>
      createScheduleSchema.parse({
        courseCode: "VIP601",
        courseName: "วิปัสสนา",
        instructorName: "อาจารย์",
        startTime: "",
        endTime: "",
        roomNumber: "101",
      })
    ).toThrow();
  });
});
