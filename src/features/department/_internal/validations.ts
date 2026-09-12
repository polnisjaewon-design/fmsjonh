import { z } from "zod";

export const departmentSchema = z.object({
  code: z.string().trim().min(1, "กรุณาระบุรหัสภาควิชา/ส่วนงาน").max(50),
  nameTh: z.string().trim().min(1, "กรุณาระบุชื่อภาควิชาภาษาไทย").max(255),
  nameEn: z.string().trim().min(1, "กรุณาระบุชื่อภาควิชาภาษาอังกฤษ").max(255),
  facultyNameTh: z.string().trim().max(255).optional().nullable(),
  facultyNameEn: z.string().trim().max(255).optional().nullable(),
  headName: z.string().trim().max(255).optional().nullable(),
  contactEmail: z
    .string()
    .trim()
    .email("รูปแบบอีเมลไม่ถูกต้อง")
    .optional()
    .nullable()
    .or(z.literal("")),
  contactPhone: z.string().trim().max(50).optional().nullable(),
  officeLocation: z.string().trim().max(255).optional().nullable(),
  descriptionTh: z.string().trim().optional().nullable(),
  descriptionEn: z.string().trim().optional().nullable(),
  isActive: z.boolean().default(true),
});

export const updateDepartmentSchema = departmentSchema.partial().extend({
  id: z.string().uuid("รหัสภาควิชาไม่ถูกต้อง"),
});

export const assignCurriculumsSchema = z.object({
  departmentId: z.string().uuid("รหัสภาควิชาไม่ถูกต้อง"),
  curriculumIds: z.array(z.string().uuid()),
});

export type DepartmentCreateInput = z.infer<typeof departmentSchema>;
export type DepartmentUpdateInput = z.infer<typeof updateDepartmentSchema>;
export type AssignCurriculumsInput = z.infer<typeof assignCurriculumsSchema>;
