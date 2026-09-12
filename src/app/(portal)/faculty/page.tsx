import { Users, UserCheck, Award, MapPin } from "lucide-react";
import { getDefaultTenantId } from "@/features/identity/server";
import { listFacultyMembers } from "@/features/faculty/server";

export default async function FacultyPage() {
  const tenantId = await getDefaultTenantId();
  const members = await listFacultyMembers(tenantId);

  const vipassanaMasters = members.filter((m) => m.isVipassanaMaster);
  const executives = members.filter((m) => m.isExecutive && !m.isVipassanaMaster);
  const others = members.filter((m) => !m.isExecutive && !m.isVipassanaMaster);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="border-b pb-6">
        <div className="text-amber-800 text-xs sm:text-sm font-semibold uppercase tracking-wider">
          Faculty Members & Masters
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif mt-1">
          ทำเนียบคณาจารย์และพระวิปัสสนาจารย์
        </h1>
        <p className="text-sm text-stone-600 mt-2">
          คณะผู้บริหาร คณาจารย์ประจำ และพระวิปัสสนาจารย์ผู้ทรงคุณวุฒิ หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา มจร
        </p>
      </div>

      {/* ๑. พระวิปัสสนาจารย์ */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-amber-900">
          <UserCheck className="w-6 h-6 text-amber-800" />
          <h2 className="text-2xl font-bold font-serif">พระวิปัสสนาจารย์ประจำหลักสูตร</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vipassanaMasters.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl p-6 border border-amber-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-amber-100 overflow-hidden flex items-center justify-center text-amber-900 font-bold shrink-0 text-xl border-2 border-amber-300">
                  {member.avatarUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={member.avatarUrl}
                      alt={member.fullNameTh}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <UserCheck className="w-8 h-8 text-amber-800" />
                  )}
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-stone-900 text-base leading-snug">
                    {member.fullNameTh}
                  </h3>
                  <p className="text-xs font-semibold text-amber-800">{member.positionTh}</p>
                  {member.templeName && (
                    <p className="text-xs text-stone-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-amber-700 shrink-0" />
                      <span>{member.templeName}</span>
                    </p>
                  )}
                </div>
              </div>
              {member.expertise && (
                <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-100 text-xs text-stone-700">
                  <span className="font-semibold text-amber-900">ความเชี่ยวชาญ:</span> {member.expertise}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ๒. คณะผู้บริหารหลักสูตร */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-stone-900">
          <Award className="w-6 h-6 text-amber-800" />
          <h2 className="text-2xl font-bold font-serif">คณะผู้บริหารหลักสูตรและมหาวิทยาลัย</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {executives.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex items-start gap-4 hover:shadow-md transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-stone-100 overflow-hidden flex items-center justify-center text-stone-700 font-bold shrink-0 text-xl border">
                {member.avatarUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={member.avatarUrl}
                    alt={member.fullNameTh}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <Users className="w-8 h-8 text-stone-600" />
                )}
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="font-bold text-stone-900 text-lg leading-snug">
                  {member.fullNameTh}
                </h3>
                <p className="text-xs font-semibold text-amber-800">{member.positionTh}</p>
                {member.templeName && (
                  <p className="text-xs text-stone-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-700 shrink-0" />
                    <span>{member.templeName}</span>
                  </p>
                )}
                {member.expertise && (
                  <p className="text-xs text-stone-600 pt-1">
                    <span className="font-semibold">ความเชี่ยวชาญ:</span> {member.expertise}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ๓. คณาจารย์ประจำและผู้ทรงคุณวุฒิ */}
      {others.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-stone-900">
            <Users className="w-6 h-6 text-amber-800" />
            <h2 className="text-2xl font-bold font-serif">อาจารย์ประจำและผู้ทรงคุณวุฒิ</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {others.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-3"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-stone-100 overflow-hidden flex items-center justify-center text-stone-700 font-bold shrink-0 border">
                    {member.avatarUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={member.avatarUrl}
                        alt={member.fullNameTh}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <Users className="w-6 h-6 text-stone-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 text-base">{member.fullNameTh}</h3>
                    <p className="text-xs text-amber-800 font-medium">{member.positionTh}</p>
                  </div>
                </div>
                {member.expertise && (
                  <p className="text-xs text-stone-600 pt-2 border-t">
                    <span className="font-semibold">ความเชี่ยวชาญ:</span> {member.expertise}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
