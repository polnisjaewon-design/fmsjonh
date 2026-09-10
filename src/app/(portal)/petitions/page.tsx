import { getDefaultTenantId } from "@/features/news/server";
import { listDocumentTemplates } from "@/features/petition/server";
import { PetitionClientForm } from "./_components/petition-form";

export default async function PetitionsPublicPage() {
  const tenantId = await getDefaultTenantId();
  const templates = await listDocumentTemplates(tenantId);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="border-b pb-6 space-y-2">
        <div className="text-amber-800 text-xs sm:text-sm font-semibold uppercase tracking-wider">
          Student E-Petitions
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif">
          ระบบยื่นคำร้องออนไลน์
        </h1>
        <p className="text-stone-600 text-sm sm:text-base">
          สำหรับนิสิตระดับบัณฑิตศึกษา สาขาวิชาวิปัสสนาภาวนาศึกษา มจร
        </p>
      </div>

      <PetitionClientForm templates={templates} />
    </div>
  );
}
