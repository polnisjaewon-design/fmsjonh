import { z } from "zod";

export const courseSchema = z.object({
  courseCode: z.string().min(1, "กรุณาระบุรหัสวิชา").max(50),
  nameTh: z.string().min(1, "กรุณาระบุชื่อวิชาภาษาไทย").max(255),
  nameEn: z.string().max(255).optional().nullable(),
  creditTotal: z.number().int().min(1),
  creditLecture: z.number().int().min(0).default(3),
  creditLab: z.number().int().min(0).default(0),
  creditSelf: z.number().int().min(0).default(6),
  courseType: z.enum(["BASIC", "CORE", "SPECIALIZED", "PRACTICE_VIPASSANA", "THESIS"]).default("CORE"),
  descriptionTh: z.string().optional().nullable(),
  descriptionEn: z.string().optional().nullable(),
});

export const updateCourseSchema = courseSchema.partial().extend({
  id: z.string().uuid(),
});

export type CourseInput = z.infer<typeof courseSchema>;
