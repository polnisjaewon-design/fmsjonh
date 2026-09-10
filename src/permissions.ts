import type { PermissionDef } from "@/shared/lib/permission-def";
import { IDENTITY_PERMISSIONS } from "@/features/identity/permissions";
import { SAMPLE_PERMISSIONS } from "@/features/sample/permissions";
import { NEWS_PERMISSIONS } from "@/features/news/permissions";
import { CURRICULUM_PERMISSIONS } from "@/features/curriculum/permissions";
import { FACULTY_PERMISSIONS } from "@/features/faculty/permissions";
import { ADMISSION_PERMISSIONS } from "@/features/admission/permissions";
import { STUDENT_PERMISSIONS } from "@/features/student/permissions";
import { PETITION_PERMISSIONS } from "@/features/petition/permissions";
import { SCHEDULE_PERMISSIONS } from "@/features/schedule/permissions";
import { THESIS_PERMISSIONS } from "@/features/thesis/permissions";

/** สิทธิ์ทั้งระบบ — feature ใหม่เพิ่มบรรทัดที่นี่ · seed เขียนลง permissions ทุกครั้ง */
export const ALL_PERMISSIONS: readonly PermissionDef[] = [
  ...IDENTITY_PERMISSIONS,
  ...SAMPLE_PERMISSIONS,
  ...NEWS_PERMISSIONS,
  ...CURRICULUM_PERMISSIONS,
  ...FACULTY_PERMISSIONS,
  ...ADMISSION_PERMISSIONS,
  ...STUDENT_PERMISSIONS,
  ...PETITION_PERMISSIONS,
  ...SCHEDULE_PERMISSIONS,
  ...THESIS_PERMISSIONS,
];

const codes = ALL_PERMISSIONS.map((p) => p.code);
if (new Set(codes).size !== codes.length) throw new Error("permission code ซ้ำใน ALL_PERMISSIONS");
