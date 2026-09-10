import { z } from "zod";

export const facultyMemberSchema = z.object({
  titleTh: z.string().min(1, "กรุณาระบุคำนำหน้า").max(50),
  firstNameTh: z.string().min(1, "กรุณาระบุชื่อ").max(100),
  lastNameTh: z.string().max(100).optional().nullable(),
  monasticName: z.string().max(100).optional().nullable(),
  monasticRank: z.string().max(100).optional().nullable(),
  academicRank: z.string().max(50).optional().nullable(),
  templeName: z.string().max(255).optional().nullable(),
  positionTh: z.string().min(1, "กรุณาระบุตำแหน่ง").max(255),
  positionEn: z.string().max(255).optional().nullable(),
  isVipassanaMaster: z.boolean().default(false),
  isExecutive: z.boolean().default(false),
  expertise: z.string().optional().nullable(),
  educationHistory: z.string().optional().nullable(),
  email: z.string().email("อีเมลไม่ถูกต้อง").optional().nullable(),
  phone: z.string().max(50).optional().nullable(),
  avatarUrl: z.string().max(500).optional().nullable(),
  sortOrder: z.number().int().default(0),
});

export const updateFacultyMemberSchema = facultyMemberSchema.partial().extend({
  id: z.string().uuid(),
});

export type FacultyMemberInput = z.infer<typeof facultyMemberSchema>;
