import { describe, it, expect } from "vitest";
import {
  departmentSchema,
  updateDepartmentSchema,
  assignCurriculumsSchema,
} from "./validations";

describe("Department Validations", () => {
  it("passes when valid department data is provided", () => {
    const input = {
      code: "DEPT-BUDDHISM",
      nameTh: "ภาควิชาพระพุทธศาสนา",
      nameEn: "Department of Buddhism",
      facultyNameTh: "คณะพุทธศาสตร์",
      facultyNameEn: "Faculty of Buddhism",
      headName: "พระมหาดนัย ชิตมาโร",
      contactEmail: "buddhism@mcu.ac.th",
      contactPhone: "02-123-4567",
      officeLocation: "อาคารเรียนรวม ชั้น ๓",
      descriptionTh: "มุ่งเน้นการจัดการเรียนการสอนและวิจัยทางพระพุทธศาสนา",
      isActive: true,
    };

    const parsed = departmentSchema.safeParse(input);
    expect(parsed.success).toBe(true);
  });

  it("fails when required fields are missing or empty", () => {
    const invalidInput = {
      code: "",
      nameTh: "",
      nameEn: "Department of Buddhism",
    };

    const parsed = departmentSchema.safeParse(invalidInput);
    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      expect(fieldErrors.code).toBeDefined();
      expect(fieldErrors.nameTh).toBeDefined();
    }
  });

  it("fails when email format is invalid", () => {
    const invalidEmailInput = {
      code: "DEPT-BUDDHISM",
      nameTh: "ภาควิชาพระพุทธศาสนา",
      nameEn: "Department of Buddhism",
      contactEmail: "invalid-email-string",
    };

    const parsed = departmentSchema.safeParse(invalidEmailInput);
    expect(parsed.success).toBe(false);
  });

  it("allows empty string or null email", () => {
    const emptyEmailInput = {
      code: "DEPT-BUDDHISM",
      nameTh: "ภาควิชาพระพุทธศาสนา",
      nameEn: "Department of Buddhism",
      contactEmail: "",
    };

    const parsed = departmentSchema.safeParse(emptyEmailInput);
    expect(parsed.success).toBe(true);
  });

  it("validates updateDepartmentSchema with valid uuid", () => {
    const updateInput = {
      id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
      nameTh: "ภาควิชาพระพุทธศาสนา (ปรับปรุง)",
    };

    const parsed = updateDepartmentSchema.safeParse(updateInput);
    expect(parsed.success).toBe(true);
  });

  it("validates assignCurriculumsSchema with uuid array", () => {
    const assignInput = {
      departmentId: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
      curriculumIds: [
        "b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22",
        "c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33",
      ],
    };

    const parsed = assignCurriculumsSchema.safeParse(assignInput);
    expect(parsed.success).toBe(true);
  });
});
