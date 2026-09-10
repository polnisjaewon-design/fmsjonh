import type { PermissionDef } from "@/shared/lib/permission-def";

export const ADMISSION_P = {
  admissionRead: "admission:read",
  admissionManage: "admission:manage",
} as const;

export const ADMISSION_PERMISSIONS: readonly PermissionDef[] = [
  { code: ADMISSION_P.admissionRead, module: "admission", action: "read", description: "ดูข้อมูลการรับสมัครและผู้สมัคร" },
  { code: ADMISSION_P.admissionManage, module: "admission", action: "manage", description: "จัดการรอบรับสมัครและตรวจสอบเอกสารผู้สมัคร" },
];
