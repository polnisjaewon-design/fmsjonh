import { describe, it, expect } from "vitest";
import { createArticleSchema, updateArticleSchema, deleteArticleSchema, translateNewsSchema } from "./validations";

describe("news validations", () => {
  it("validate createArticleSchema สำเร็จเมื่อข้อมูลถูกต้อง", () => {
    const valid = {
      titleTh: "ข่าวประชาสัมพันธ์",
      contentTh: "เนื้อหาข่าวการปฏิบัติธรรม",
      isPinned: true,
      isPublished: true,
    };
    const parsed = createArticleSchema.parse(valid);
    expect(parsed.titleTh).toBe("ข่าวประชาสัมพันธ์");
    expect(parsed.contentTh).toBe("เนื้อหาข่าวการปฏิบัติธรรม");
    expect(parsed.isPinned).toBe(true);
  });

  it("validate createArticleSchema ล้มเมื่อไม่มี titleTh หรือ contentTh", () => {
    expect(() => createArticleSchema.parse({ titleTh: "", contentTh: "ข้อความ" })).toThrow();
    expect(() => createArticleSchema.parse({ titleTh: "หัวข้อ", contentTh: "" })).toThrow();
  });

  it("validate updateArticleSchema ต้องการ uuid id", () => {
    const valid = { id: "123e4567-e89b-12d3-a456-426614174000", titleTh: "แก้ไขหัวข้อ" };
    expect(updateArticleSchema.parse(valid).id).toBe("123e4567-e89b-12d3-a456-426614174000");
    expect(() => updateArticleSchema.parse({ id: "invalid-uuid" })).toThrow();
  });

  it("validate deleteArticleSchema ต้องการ uuid id", () => {
    const valid = { id: "123e4567-e89b-12d3-a456-426614174000" };
    expect(deleteArticleSchema.parse(valid).id).toBe("123e4567-e89b-12d3-a456-426614174000");
    expect(() => deleteArticleSchema.parse({ id: "abc" })).toThrow();
  });

  it("validate translateNewsSchema สำเร็จเมื่อระบุ titleTh และ contentTh", () => {
    const valid = {
      titleTh: "ข่าวสารสำคัญ",
      summaryTh: "สรุปย่อ",
      contentTh: "เนื้อหาข่าวภาษาไทยเพื่อส่งให้ Gemini แปล",
    };
    const parsed = translateNewsSchema.parse(valid);
    expect(parsed.titleTh).toBe("ข่าวสารสำคัญ");
    expect(parsed.contentTh).toBe("เนื้อหาข่าวภาษาไทยเพื่อส่งให้ Gemini แปล");
  });

  it("validate translateNewsSchema ล้มเมื่อไม่มี titleTh หรือ contentTh", () => {
    expect(() => translateNewsSchema.parse({ titleTh: "", contentTh: "เนื้อหา" })).toThrow();
    expect(() => translateNewsSchema.parse({ titleTh: "หัวข้อ", contentTh: "" })).toThrow();
  });
});

