import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, CheckCircle2, ChevronRight, Sparkles, UserCheck } from "lucide-react";
import { getLocale } from "@/shared/lib/i18n/server";
import { formatDate } from "@/shared/lib/format";
import { getDefaultTenantId, listPublishedArticles } from "@/features/news/server";
import { getActiveCurriculum } from "@/features/curriculum/server";
import { listVipassanaMasters } from "@/features/faculty/server";

export default async function HomePage() {
  const locale = await getLocale();
  const tenantId = await getDefaultTenantId();

  const [articles, curriculum, vipassanaMasters] = await Promise.all([
    listPublishedArticles(tenantId, 3),
    getActiveCurriculum(tenantId),
    listVipassanaMasters(tenantId),
  ]);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* ๑. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-900/10 via-amber-800/5 to-transparent pt-12 pb-20 lg:pt-20 lg:pb-28 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs sm:text-sm font-medium">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>เปิดรับสมัครนิสิตใหม่ ภาคเสาร์-อาทิตย์ ประจำปีการศึกษา ๒๕๖๙</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-tight font-serif">
              หลักสูตรพุทธศาสตรมหาบัณฑิต <br />
              <span className="text-amber-800">สาขาวิชาวิปัสสนาภาวนาศึกษา</span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
              มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย บัณฑิตวิทยาลัย <br className="hidden sm:inline" />
              มุ่งเน้นการวิจัยเชิงลึกและปฏิบัติวิปัสสนากรรมฐานตามแนวสติปัฏฐาน ๔ เพื่อสร้างองค์ความรู้ใหม่ทางจิตปัญญา
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
              <Link
                href="/admissions"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-semibold text-base shadow-md hover:shadow-lg transition-all"
              >
                <span>สมัครเรียนออนไลน์</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/curriculum"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 font-semibold text-base border border-stone-300 shadow-xs transition-colors"
              >
                <BookOpen className="w-4 h-4 text-amber-700" />
                <span>โครงสร้างหลักสูตร (มคอ.๒)</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Highlight Stats Banner */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-12 sm:mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-md border border-amber-200/60">
            <div className="text-center p-3">
              <div className="text-2xl sm:text-3xl font-bold text-amber-800">เสาร์-อาทิตย์</div>
              <div className="text-xs sm:text-sm text-stone-500 mt-1">เวลาเรียนยืดหยุ่น</div>
            </div>
            <div className="text-center p-3 border-l border-stone-200">
              <div className="text-2xl sm:text-3xl font-bold text-amber-800">๒ ปี (๔ ภาค)</div>
              <div className="text-xs sm:text-sm text-stone-500 mt-1">ระยะเวลาการศึกษา</div>
            </div>
            <div className="text-center p-3 border-l border-stone-200">
              <div className="text-2xl sm:text-3xl font-bold text-amber-800">๓๖ หน่วยกิต</div>
              <div className="text-xs sm:text-sm text-stone-500 mt-1">ตลอดหลักสูตร</div>
            </div>
            <div className="text-center p-3 border-l border-stone-200">
              <div className="text-2xl sm:text-3xl font-bold text-amber-800">พธ.ม.</div>
              <div className="text-xs sm:text-sm text-stone-500 mt-1">ปริญญาบัตร มจร</div>
            </div>
          </div>
        </div>
      </section>

      {/* ๒. ข่าวสารประชาสัมพันธ์และกิจกรรมล่าสุด */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-amber-800 text-xs sm:text-sm font-semibold uppercase tracking-wider">
              News & Announcements
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif mt-1">
              ข่าวสารและกิจกรรมสำคัญ
            </h2>
          </div>
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-800 hover:text-amber-900 transition-colors"
          >
            <span>ดูข่าวทั้งหมด</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-md transition-all duration-200"
            >
              {item.coverImageUrl && (
                <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.coverImageUrl}
                    alt={item.titleTh}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.categoryName && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-amber-900/85 text-amber-100 text-xs font-medium backdrop-blur-xs">
                      {item.categoryName}
                    </span>
                  )}
                </div>
              )}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.publishedAt ? formatDate(new Date(item.publishedAt), locale) : "—"}</span>
                  </div>
                  <h3 className="text-base font-bold text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-2">
                    <Link href={`/news/${item.slug}`}>{item.titleTh}</Link>
                  </h3>
                  <p className="text-sm text-stone-600 line-clamp-2">
                    {item.summaryTh || item.contentTh}
                  </p>
                </div>
                <div className="pt-2 border-t flex items-center justify-between">
                  <Link
                    href={`/news/${item.slug}`}
                    className="text-xs font-semibold text-amber-800 group-hover:underline inline-flex items-center gap-1"
                  >
                    <span>อ่านต่อ</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <span className="text-xs text-stone-400">เข้าชม {item.viewCount} ครั้ง</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ๓. แผนการศึกษาและจุดเด่นหลักสูตร */}
      <section className="bg-stone-100/70 py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
              ทางเลือกแผนการศึกษา
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-2">
              ออกแบบรองรับทั้งผู้มุ่งเน้นการวิจัยเชิงลึก และผู้ที่ต้องการศึกษารายวิชาพร้อมปฏิบัติกรรมฐาน
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {curriculum?.studyPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-2xl p-7 border border-stone-200 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="inline-flex px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
                    {plan.planType === "PLAN_A1" ? "เน้นวิจัย" : "ศึกษารายวิชาและวิจัย"}
                  </div>
                  <h3 className="text-xl font-bold text-stone-900">{plan.nameTh}</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {plan.descriptionTh}
                  </p>
                  <div className="space-y-2 pt-3">
                    <div className="flex items-center gap-2 text-sm text-stone-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>จำนวนหน่วยกิตรวมตลอดหลักสูตร {plan.totalCredits} หน่วยกิต</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-stone-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>เรียนวันเสาร์และวันอาทิตย์ (ห้องเรียนและระบบออนไลน์)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-stone-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>อาจารย์ที่ปรึกษาวิทยานิพนธ์ระดับผู้ทรงคุณวุฒิและพระมหาเถระ</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t">
                  <Link
                    href="/curriculum"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-800 hover:text-amber-900"
                  >
                    <span>ดูรายละเอียดวิชาที่เปิดสอน</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ๔. พระวิปัสสนาจารย์ประจำหลักสูตร */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-amber-800 text-xs sm:text-sm font-semibold uppercase tracking-wider">
              Meditation Masters
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif mt-1">
              พระวิปัสสนาจารย์ประจำหลักสูตร
            </h2>
          </div>
          <Link
            href="/faculty"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-800 hover:text-amber-900 transition-colors"
          >
            <span>ดูทำเนียบคณาจารย์ทั้งหมด</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vipassanaMasters.map((master) => (
            <div
              key={master.id}
              className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs flex items-start gap-4 hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-bold shrink-0 text-lg border border-amber-300">
                <UserCheck className="w-7 h-7 text-amber-800" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-stone-900 text-base leading-snug">
                  {master.fullNameTh}
                </h3>
                <p className="text-xs font-medium text-amber-800">{master.positionTh}</p>
                {master.templeName && (
                  <p className="text-xs text-stone-500">{master.templeName}</p>
                )}
                {master.expertise && (
                  <p className="text-xs text-stone-600 pt-1 line-clamp-2">
                    เชี่ยวชาญ: {master.expertise}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ๕. CALL TO ACTION (CTA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-serif leading-tight">
              เริ่มต้นศึกษาพระพุทธศาสนาและวิปัสสนาภาวนาเชิงลึก
            </h2>
            <p className="text-amber-100 text-sm sm:text-base leading-relaxed">
              ร่วมเป็นส่วนหนึ่งในการพัฒนาองค์ความรู้ใหม่และสืบทอดพระสัทธรรม เปิดรับทั้งบรรพชิตและคฤหัสถ์ เรียนวันเสาร์-อาทิตย์
            </p>
            <div className="pt-2">
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white hover:bg-amber-50 text-amber-900 font-bold text-base shadow-md transition-all"
              >
                <span>กรอกใบสมัครเรียนออนไลน์</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
