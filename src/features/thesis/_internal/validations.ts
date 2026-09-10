import { z } from "zod";

export const createThesisSchema = z.object({
  studentCode: z.string().min(1, "กรุณาระบุรหัสนิสิต"),
  authorName: z.string().min(1, "กรุณาระบุชื่อผู้วิจัย"),
  titleTh: z.string().min(1, "กรุณาระบุชื่อวิทยานิพนธ์ภาษาไทย").max(500),
  titleEn: z.string().max(500).optional().nullable(),
  advisorName: z.string().min(1, "กรุณาระบุอาจารย์ที่ปรึกษา").max(255),
  coAdvisorName: z.string().max(255).optional().nullable(),
  status: z.enum(["TOPIC_PROPOSED", "PROPOSAL_DEFENSE", "IN_PROGRESS", "FINAL_DEFENSE", "COMPLETED", "PUBLISHED"]).default("IN_PROGRESS"),
  abstractTh: z.string().optional().nullable(),
  abstractEn: z.string().optional().nullable(),
  keywords: z.string().optional().nullable(),
  similarityPercentage: z.number().min(0).max(100).optional().nullable(),
  newBodyOfKnowledge: z.string().optional().nullable(),
  documentUrl: z.string().optional().nullable(),
  yearGraduated: z.number().int().optional().nullable(),
});

export const updateThesisSchema = createThesisSchema.partial().extend({
  id: z.string().uuid(),
});

export type CreateThesisInput = z.infer<typeof createThesisSchema>;
export type UpdateThesisInput = z.infer<typeof updateThesisSchema>;

