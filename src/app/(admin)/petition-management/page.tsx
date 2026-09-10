import { requirePermission, hasPermission } from "@/features/identity/server";
import { PETITION_P } from "@/features/petition/permissions";
import { listAdminPetitions } from "@/features/petition/server";
import { PetitionAdminClient } from "./_components/petition-admin-client";

export default async function PetitionManagementPage() {
  const ctx = await requirePermission(PETITION_P.petitionRead);
  const petitions = await listAdminPetitions(ctx.tenantId);

  return (
    <PetitionAdminClient
      initialPetitions={petitions}
      canApprove={hasPermission(ctx, PETITION_P.petitionApprove)}
    />
  );
}
