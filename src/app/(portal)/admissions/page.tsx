import { getDefaultTenantId } from "@/features/news/server";
import { getActiveAdmissionRound } from "@/features/admission/server";
import { AdmissionClientForm } from "./_components/admission-form";

export default async function AdmissionsPage() {
  const tenantId = await getDefaultTenantId();
  const round = await getActiveAdmissionRound(tenantId);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="border-b pb-6 space-y-2 text-center sm:text-left">
        <div className="text-amber-800 text-xs sm:text-sm font-semibold uppercase tracking-wider">
          Online Admissions
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif">
          รับสมัครนิสิตใหม่ออนไลน์
        </h1>
        <p className="text-stone-600 text-sm sm:text-base">
          หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา (ภาคเสาร์-อาทิตย์) มจร
        </p>
      </div>

      {round ? (
        <AdmissionClientForm round={round} />
      ) : (
        <div className="p-12 text-center bg-white rounded-2xl border">
          <p className="text-stone-500">ขณะนี้ยังไม่เปิดรอบรับสมัคร โปรดติดตามประกาศทางข่าวสารประชาสัมพันธ์</p>
        </div>
      )}
    </div>
  );
}
