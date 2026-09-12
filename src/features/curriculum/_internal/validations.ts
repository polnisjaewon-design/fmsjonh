import { z } from "zod";

export const courseSchema = z.object({
  courseCode: z.string().min(1, "กรุณาระบุรหัสวิชา").max(50),
  nameTh: z.string().min(1, "กรุณาระบุชื่อวิชาภาษาไทย").max(255),
  nameEn: z.string().max(255).optional().nullable(),
  creditTotal: z.number().int().min(1),
  creditLecture: z.number().int().min(0).default(3),
  creditLab: z.number().int().min(0).default(0),
  creditSelf: z.number().int().min(0).default(6),
  courseType: z.enum(["BASIC", "CORE", "SPECIALIZED", "PRACTICE_VIPASSANA", "ELECTIVE", "THESIS"]).default("CORE"),
  descriptionTh: z.string().optional().nullable(),
  descriptionEn: z.string().optional().nullable(),
});

export const updateCourseSchema = courseSchema.partial().extend({
  id: z.string().uuid(),
});

export const updateCurriculumSchema = z.object({
  id: z.string().uuid(),
  code: z.string().trim().min(1, "กรุณาระบุรหัสหลักสูตร").max(50),
  nameTh: z.string().trim().min(1, "กรุณาระบุชื่อหลักสูตรภาษาไทย").max(255),
  nameEn: z.string().trim().min(1, "กรุณาระบุชื่อหลักสูตรภาษาอังกฤษ").max(255),
  degreeTitleTh: z.string().trim().min(1, "กรุณาระบุชื่อปริญญาภาษาไทย").max(255),
  degreeTitleEn: z.string().trim().min(1, "กรุณาระบุชื่อปริญญาภาษาอังกฤษ").max(255),
  totalCredits: z.coerce.number().int().min(1).default(36),
  departmentId: z.string().uuid().optional().nullable(),
  descriptionTh: z.string().trim().optional().nullable(),
  descriptionEn: z.string().trim().optional().nullable(),
  isActive: z.boolean().default(true),
});

export type CourseInput = z.infer<typeof courseSchema>;
export type UpdateCurriculumInput = z.infer<typeof updateCurriculumSchema>;
