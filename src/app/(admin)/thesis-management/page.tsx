import { requirePermission, hasPermission } from "@/features/identity/server";
import { THESIS_P } from "@/features/thesis/permissions";
import { listAdminTheses } from "@/features/thesis/server";
import { ThesisAdminClient } from "./_components/thesis-admin-client";

export default async function ThesisManagementPage() {
  const ctx = await requirePermission(THESIS_P.thesisRead);
  const theses = await listAdminTheses(ctx.tenantId);

  return (
    <ThesisAdminClient
      initialTheses={theses}
      canManage={hasPermission(ctx, THESIS_P.thesisManage)}
    />
  );
}
