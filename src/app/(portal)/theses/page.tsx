import { Search, Sparkles, FileText } from "lucide-react";

import { getDefaultTenantId } from "@/features/news/server";
import { listPublishedTheses } from "@/features/thesis/server";

export default async function ThesesPublicPage(props: {
  searchParams: Promise<{ q?: string }>;
}) {
  const searchParams = await props.searchParams;
  const tenantId = await getDefaultTenantId();
  const theses = await listPublishedTheses(tenantId, searchParams.q);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header Banner */}
      <div className="border-b pb-8 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>คลังวิทยานิพนธ์เพื่อสร้างองค์ความรู้ใหม่ (Open Access E-Theses)</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-serif leading-tight">
          คลังปัญญาวิทยานิพนธ์และงานวิจัยเชิงลึก
        </h1>
        <p className="text-stone-600 text-sm sm:text-base max-w-3xl">
          รวบรวมผลงานวิทยานิพนธ์ระดับพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย เพื่อการศึกษา ค้นคว้า และต่อยอดภูมิปัญญาทางจิตตภาวนา
        </p>

        {/* Search Bar */}
        <form method="GET" className="pt-2 max-w-2xl">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              name="q"
              defaultValue={searchParams.q || ""}
              placeholder="สืบค้นชื่อวิทยานิพนธ์, คำสำคัญ, หรือชื่อผู้วิจัย..."
              className="w-full rounded-2xl border border-stone-300 bg-white pl-12 pr-28 py-3.5 text-sm shadow-xs focus:outline-amber-700"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-amber-800 text-white text-xs font-medium hover:bg-amber-900 transition-colors"
            >
              ค้นหา
            </button>
          </div>
        </form>
      </div>

      {/* Theses List */}
      {theses.length === 0 ? (
        <div className="p-16 text-center bg-white rounded-3xl border space-y-2">
          <FileText className="w-10 h-10 text-stone-400 mx-auto" />
          <h3 className="font-bold text-stone-800">ไม่พบข้อมูลวิทยานิพนธ์</h3>
          <p className="text-xs text-stone-500">ลองใช้คำค้นอื่น หรือกดค้นหาทั้งหมด</p>
        </div>
      ) : (
        <div className="space-y-6">
          {theses.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs hover:shadow-md transition-all space-y-4"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 font-semibold">
                    พธ.ม. (วิปัสสนาภาวนาศึกษา)
                  </span>
                  {t.yearGraduated && (
                    <span className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 font-medium">
                      ปีที่สำเร็จ {t.yearGraduated}
                    </span>
                  )}
                  {t.similarityPercentage && (
                    <span className="px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium">
                      Plagiarism Similarity {t.similarityPercentage}%
                    </span>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif leading-snug hover:text-amber-800">
                  {t.titleTh}
                </h2>
                {t.titleEn && (
                  <p className="text-xs sm:text-sm text-stone-500 italic">{t.titleEn}</p>
                )}
              </div>

              {/* Author & Advisor */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm text-stone-600 pt-1">
                <div>
                  <span className="text-stone-400">ผู้วิจัย: </span>
                  <span className="font-semibold text-stone-800">{t.authorName}</span>
                </div>
                <div>
                  <span className="text-stone-400">อาจารย์ที่ปรึกษา: </span>
                  <span className="font-semibold text-stone-800">{t.advisorName}</span>
                  {t.coAdvisorName && <span> (ร่วม: {t.coAdvisorName})</span>}
                </div>
              </div>

              {/* New Body of Knowledge Highlight Box */}
              {t.newBodyOfKnowledge && (
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-amber-950 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-amber-900">
                    <Sparkles className="w-4 h-4 text-amber-700" />
                    <span>องค์ความรู้ใหม่ที่ค้นพบ (New Body of Knowledge):</span>
                  </div>
                  <p className="leading-relaxed">{t.newBodyOfKnowledge}</p>
                </div>
              )}

              {/* Abstract */}
              {t.abstractTh && (
                <div className="space-y-1 pt-1">
                  <span className="text-xs font-bold uppercase text-stone-500 tracking-wider">บทคัดย่อ:</span>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed line-clamp-3">
                    {t.abstractTh}
                  </p>
                </div>
              )}

              {/* Keywords */}
              {t.keywords && (
                <div className="pt-2 border-t flex flex-wrap gap-2 text-xs text-stone-500">
                  <span className="font-medium text-stone-700">คำสำคัญ:</span>
                  {t.keywords.split(",").map((kw, i) => (
                    <span key={i} className="bg-stone-100 px-2.5 py-0.5 rounded-full">
                      {kw.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
