import type { PermissionDef } from "@/shared/lib/permission-def";

export const PETITION_P = {
  petitionRead: "petition:read",
  petitionApprove: "petition:approve",
} as const;

export const PETITION_PERMISSIONS: readonly PermissionDef[] = [
  { code: PETITION_P.petitionRead, module: "petition", action: "read", description: "ดูคำร้องและติดตามสถานะเอกสาร" },
  { code: PETITION_P.petitionApprove, module: "petition", action: "approve", description: "พิจารณาอนุมัติคำร้องของนิสิต" },
];
