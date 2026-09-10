import type { PermissionDef } from "@/shared/lib/permission-def";

export const STUDENT_P = {
  studentRead: "student:read",
  studentManage: "student:manage",
} as const;

export const STUDENT_PERMISSIONS: readonly PermissionDef[] = [
  { code: STUDENT_P.studentRead, module: "student", action: "read", description: "ดูข้อมูลทะเบียนประวัตินิสิต" },
  { code: STUDENT_P.studentManage, module: "student", action: "manage", description: "จัดการประวัตินิสิต ฉายา และสถานะภาพ" },
];
