import type { PermissionDef } from "@/shared/lib/permission-def";

export const THESIS_P = {
  thesisRead: "thesis:read",
  thesisManage: "thesis:manage",
} as const;

export const THESIS_PERMISSIONS: readonly PermissionDef[] = [
  { code: THESIS_P.thesisRead, module: "thesis", action: "read", description: "สืบค้นคลังวิทยานิพนธ์และงานวิจัย" },
  { code: THESIS_P.thesisManage, module: "thesis", action: "manage", description: "จัดการหัวข้อ สอบเค้าโครง และเผยแพร่วิทยานิพนธ์" },
];
