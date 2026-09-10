import { z } from "zod";

export const studentProfileSchema = z.object({
  studentCode: z.string().min(1, "กรุณาระบุรหัสนิสิต").max(50),
  applicantType: z.enum(["MONK", "NOVICE", "NUN", "LAYPERSON"]).default("MONK"),
  titleTh: z.string().min(1, "กรุณาระบุคำนำหน้าชื่อ").max(50),
  firstNameTh: z.string().min(1, "กรุณาระบุชื่อ").max(100),
  lastNameTh: z.string().max(100).optional().nullable(),
  monasticName: z.string().max(100).optional().nullable(),
  monasticRank: z.string().max(100).optional().nullable(),
  templeName: z.string().max(255).optional().nullable(),
  ecclesiasticalProvince: z.string().max(100).optional().nullable(),
  batchYear: z.number().int().default(2569),
  status: z.enum(["STUDYING", "LEAVE", "GRADUATED", "RETIRED"]).default("STUDYING"),
  phone: z.string().max(50).optional().nullable(),
  email: z.string().email("อีเมลไม่ถูกต้อง").optional().nullable(),
});

export const updateStudentProfileSchema = studentProfileSchema.partial().extend({
  id: z.string().uuid(),
});

export type StudentProfileInput = z.infer<typeof studentProfileSchema>;
