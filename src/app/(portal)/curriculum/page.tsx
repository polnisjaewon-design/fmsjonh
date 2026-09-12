import { getDefaultTenantId } from "@/features/identity/server";
import { getActiveCurriculum } from "@/features/curriculum/server";
import { CurriculumPortalClient } from "./_components/curriculum-portal-client";

export default async function CurriculumPage() {
  const tenantId = await getDefaultTenantId();
  const curriculum = await getActiveCurriculum(tenantId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <CurriculumPortalClient curriculum={curriculum} />
    </div>
  );
}

