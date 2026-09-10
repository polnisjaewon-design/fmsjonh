import { requirePermission, hasPermission } from "@/features/identity/server";
import { ADMISSION_P } from "@/features/admission/permissions";
import { listAdminApplications } from "@/features/admission/server";
import { AdmissionAdminClient } from "./_components/admission-admin-client";

export default async function AdmissionManagementPage() {
  const ctx = await requirePermission(ADMISSION_P.admissionRead);
  const applications = await listAdminApplications(ctx.tenantId);

  return (
    <AdmissionAdminClient
      initialApplications={applications}
      canManage={hasPermission(ctx, ADMISSION_P.admissionManage)}
    />
  );
}
