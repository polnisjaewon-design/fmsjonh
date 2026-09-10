import { requirePermission, hasPermission } from "@/features/identity/server";
import { CURRICULUM_P } from "@/features/curriculum/permissions";
import { getActiveCurriculum } from "@/features/curriculum/server";
import { CurriculumAdminClient } from "./_components/curriculum-admin-client";

export default async function CurriculumManagementPage() {
  const ctx = await requirePermission(CURRICULUM_P.curriculumRead);
  const curriculum = await getActiveCurriculum(ctx.tenantId);

  return (
    <CurriculumAdminClient
      curriculum={curriculum}
      canManage={hasPermission(ctx, CURRICULUM_P.curriculumManage)}
    />
  );
}
