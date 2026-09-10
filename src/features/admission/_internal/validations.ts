import { z } from "zod";

export const createApplicationSchema = z.object({
  roundId: z.string().uuid("กรุณาเลือกรอบรับสมัคร"),
  applicantType: z.enum(["MONK", "NOVICE", "NUN", "LAYPERSON"]).default("MONK"),
  titleTh: z.string().min(1, "กรุณาระบุคำนำหน้าชื่อ").max(50),
  firstNameTh: z.string().min(1, "กรุณาระบุชื่อ").max(100),
  lastNameTh: z.string().max(100).optional().nullable(),
  monasticName: z.string().max(100).optional().nullable(),
  monasticRank: z.string().max(100).optional().nullable(),
  templeName: z.string().max(255).optional().nullable(),
  idCardOrPassport: z.string().min(5, "กรุณาระบุเลขประจำตัวประชาชนหรือหนังสือเดินทาง").max(50),
  phone: z.string().min(9, "กรุณาระบุเบอร์โทรศัพท์").max(50),
  email: z.string().email("กรุณาระบุอีเมลที่ถูกต้อง"),
  educationBackground: z.string().optional().nullable(),
  paymentSlipUrl: z.string().optional().nullable(),
});

export const updateApplicationStatusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["SUBMITTED", "PAYMENT_VERIFIED", "INTERVIEW_PASSED", "REJECTED"]),
  reviewerNote: z.string().optional().nullable(),
});

export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;
export type UpdateApplicationStatusInput = z.infer<typeof updateApplicationStatusSchema>;
