import { z } from "zod";

export const createPetitionSchema = z.object({
  studentCode: z.string().min(1, "กรุณาระบุรหัสนิสิต"),
  templateId: z.string().uuid("กรุณาเลือกประเภทคำร้อง"),
  title: z.string().min(1, "กรุณาระบุเรื่อง"),
  reason: z.string().min(1, "กรุณาระบุเหตุผล"),
});

export const reviewPetitionSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["APPROVED", "REJECTED", "RETURNED"]),
  approverNote: z.string().optional().nullable(),
});

export type CreatePetitionInput = z.infer<typeof createPetitionSchema>;
export type ReviewPetitionInput = z.infer<typeof reviewPetitionSchema>;
