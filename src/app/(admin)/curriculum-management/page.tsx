import { requirePermission, hasPermission } from "@/features/identity/server";
import { CURRICULUM_P } from "@/features/curriculum/permissions";
import { getActiveCurriculum } from "@/features/curriculum/server";
import { listDepartments } from "@/features/department/server";
import { CurriculumAdminClient } from "./_components/curriculum-admin-client";

export default async function CurriculumManagementPage() {
  const ctx = await requirePermission(CURRICULUM_P.curriculumRead);
  const [curriculum, departments] = await Promise.all([
    getActiveCurriculum(ctx.tenantId),
    listDepartments(ctx.tenantId, { isActive: true }),
  ]);

  return (
    <CurriculumAdminClient
      curriculum={curriculum}
      departments={departments.map((d) => ({
        id: d.id,
        nameTh: d.nameTh,
        nameEn: d.nameEn,
        facultyNameTh: d.facultyNameTh,
      }))}
      canManage={hasPermission(ctx, CURRICULUM_P.curriculumManage)}
    />
  );
}
