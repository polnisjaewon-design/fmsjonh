import type { PermissionDef } from "@/shared/lib/permission-def";

export const FACULTY_P = {
  facultyRead: "faculty:read",
  facultyManage: "faculty:manage",
} as const;

export const FACULTY_PERMISSIONS: readonly PermissionDef[] = [
  { code: FACULTY_P.facultyRead, module: "faculty", action: "read", description: "ดูทำเนียบคณาจารย์และบุคลากร" },
  { code: FACULTY_P.facultyManage, module: "faculty", action: "manage", description: "จัดการข้อมูลคณาจารย์และพระวิปัสสนาจารย์" },
];
