import { requirePermission, hasPermission } from "@/features/identity/server";
import { DEPARTMENT_P } from "@/features/department/permissions";
import { listDepartments, listAllCurriculumsForSelection } from "@/features/department/server";
import { DepartmentAdminClient } from "./_components/department-admin-client";

export default async function DepartmentManagementPage() {
  const ctx = await requirePermission(DEPARTMENT_P.departmentRead);
  const departments = await listDepartments(ctx.tenantId);
  const availableCurriculums = await listAllCurriculumsForSelection(ctx.tenantId);

  return (
    <DepartmentAdminClient
      initialDepartments={departments}
      availableCurriculums={availableCurriculums}
      canManage={hasPermission(ctx, DEPARTMENT_P.departmentManage)}
    />
  );
}
