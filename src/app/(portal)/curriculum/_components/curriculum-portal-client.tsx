"use client";

import { useState } from "react";
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  GraduationCap,
  Landmark,
  Layers,
  Search,
  Users,
  ExternalLink,
} from "lucide-react";
import type { CurriculumDto } from "@/features/curriculum";

interface CurriculumPortalClientProps {
  curriculum: CurriculumDto | null;
}

export function CurriculumPortalClient({ curriculum }: CurriculumPortalClientProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "plans" | "courses" | "admission" | "committee">("overview");
  const [courseCategoryFilter, setCourseCategoryFilter] = useState<string>("ALL");
  const [courseSearch, setCourseSearch] = useState<string>("");
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);

  if (!curriculum) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold text-stone-700">ไม่พบข้อมูลหลักสูตรที่เปิดใช้งาน</h2>
      </div>
    );
  }

  const courseTypeLabels: Record<string, { label: string; bg: string; text: string }> = {
    BASIC: { label: "วิชาเสริมพื้นฐาน (ไม่นับหน่วยกิต)", bg: "bg-stone-100", text: "text-stone-700" },
    CORE: { label: "วิชาสัมพันธ์ / วิชาแกน (บังคับ)", bg: "bg-blue-50", text: "text-blue-800" },
    SPECIALIZED: { label: "วิชาเฉพาะสาขา", bg: "bg-emerald-50", text: "text-emerald-800" },
    PRACTICE_VIPASSANA: { label: "วิชาปฏิบัติวิปัสสนาภาวนา", bg: "bg-amber-100", text: "text-amber-900" },
    ELECTIVE: { label: "วิชาเลือกเฉพาะสาขา", bg: "bg-purple-50", text: "text-purple-800" },
    THESIS: { label: "วิทยานิพนธ์ / สารนิพนธ์", bg: "bg-rose-50", text: "text-rose-800" },
  };

  const filteredCourses = curriculum.courses.filter((course) => {
    const matchesCategory =
      courseCategoryFilter === "ALL" || course.courseType === courseCategoryFilter;
    const matchesQuery =
      !courseSearch.trim() ||
      course.courseCode.toLowerCase().includes(courseSearch.toLowerCase()) ||
      course.nameTh.toLowerCase().includes(courseSearch.toLowerCase()) ||
      (course.nameEn && course.nameEn.toLowerCase().includes(courseSearch.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  const committeeMembers = [
    {
      name: "พระมหายุทธนา นรเชฏฺโฐ, รศ.ดร.",
      position: "ประธานคณะกรรมการบริหารหลักสูตร",
      office: "หัวหน้าภาควิชาพระพุทธศาสนา คณะพุทธศาสตร์ มจร",
      degree: "พธ.ด. (พระพุทธศาสนา), พธ.ม. (พระพุทธศาสนา), พธ.บ. (พระพุทธศาสนา), ป.ธ.๙",
      expertise: "พระไตรปิฎกศึกษา, พระพุทธศาสนาเถรวาท, วิปัสสนาภาวนา",
      imageUrl: "https://fb.mcu.ac.th/wp-content/uploads/2026/03/PmYuttana6901.png",
      profileUrl: "https://fb.mcu.ac.th/?p=793",
      roleBadge: "ประธานหลักสูตร",
      badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
    },
    {
      name: "พระครูภาวนาวัฒนบัณฑิต วิ., ผศ.ดร.",
      position: "กรรมการและเลขานุการหลักสูตร",
      office: "อาจารย์ประจำภาควิชาพระพุทธศาสนา คณะพุทธศาสตร์ มจร",
      degree: "พธ.ด. (วิปัสสนาภาวนา), พธ.ม. (พระพุทธศาสนา), ศศ.บ. (ภาษาอังกฤษ), น.ธ.เอก",
      expertise: "สติปัฏฐาน ๔, การสอบอารมณ์วิปัสสนากรรมฐาน, วิสุทธิมรรค",
      imageUrl: "https://fb.mcu.ac.th/wp-content/uploads/2026/04/951813001_09.png",
      profileUrl: "https://fb.mcu.ac.th/?p=928",
      roleBadge: "กรรมการและเลขานุการ",
      badgeColor: "bg-blue-100 text-blue-900 border-blue-300",
    },
    {
      name: "พระมหายงยุทธ ธีรธมฺโม, ดร.",
      position: "อาจารย์ผู้รับผิดชอบหลักสูตร",
      office: "ผู้ช่วยศาสตราจารย์ประจำภาควิชาพระพุทธศาสนา คณะพุทธศาสตร์ มจร",
      degree: "พธ.ด. (พระพุทธศาสนา), อ.ม. (ภาษาบาลีและสันสกฤต), พธ.บ. (ภาษาบาลี), ป.ธ.๙",
      expertise: "คัมภีร์อภิธรรม, พระอภิธัมมัตถสังคหะ, ภาษาบาลีเพื่อการวิจัย",
      imageUrl: "https://fb.mcu.ac.th/wp-content/uploads/2026/03/yongyut6901.png",
      profileUrl: "https://fb.mcu.ac.th/?p=959",
      roleBadge: "อาจารย์ผู้รับผิดชอบหลักสูตร",
      badgeColor: "bg-stone-100 text-stone-800 border-stone-300",
    },
    {
      name: "รศ.ดร.สุเทพ พรมเลิศ",
      position: "อาจารย์ผู้รับผิดชอบหลักสูตร",
      office: "รองหัวหน้าภาควิชาพระพุทธศาสนา คณะพุทธศาสตร์ มจร",
      degree: "พธ.ด. (พระพุทธศาสนา), พธ.ม. (พระพุทธศาสนา), พธ.บ. (พระพุทธศาสนา)",
      expertise: "ปรัชญาพระพุทธศาสนา, จริยศาสตร์เชิงพุทธ, พระไตรปิฎกศึกษา",
      imageUrl: "https://fb.mcu.ac.th/wp-content/uploads/2026/03/AccSutep6901.png",
      profileUrl: "https://fb.mcu.ac.th/?p=998",
      roleBadge: "อาจารย์ผู้รับผิดชอบหลักสูตร",
      badgeColor: "bg-stone-100 text-stone-800 border-stone-300",
    },
    {
      name: "พระมหาราชัน จิตฺตปาโล, ดร.",
      position: "อาจารย์ผู้รับผิดชอบหลักสูตร",
      office: "ผู้ช่วยอธิการบดีฝ่ายกิจการนิสิต / อาจารย์ประจำภาควิชาพระพุทธศาสนา มจร",
      degree: "พธ.ด. (พระพุทธศาสนา), พธ.ม. (พระพุทธศาสนา), พธ.บ. (พระพุทธศาสนา)",
      expertise: "พระพุทธศาสนาเถรวาท, ธรรมนิเทศ, การพัฒนาจิตตภาวนา",
      imageUrl: "https://fb.mcu.ac.th/wp-content/uploads/2026/03/a3PmRashun6901.png",
      profileUrl: "https://fb.mcu.ac.th/?p=11005",
      roleBadge: "อาจารย์ผู้รับผิดชอบหลักสูตร",
      badgeColor: "bg-stone-100 text-stone-800 border-stone-300",
    },
  ];

  return (
    <div className="space-y-10">
      {/* ๑. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 text-white p-8 sm:p-12 shadow-xl border border-stone-800">
        <div className="relative z-10 space-y-5 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold tracking-wide border border-amber-500/30">
              <BookOpen className="w-3.5 h-3.5" />
              มคอ. ๒ (TQF 2)
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-stone-200 text-xs font-mono font-medium">
              รหัสหลักสูตร {curriculum.code}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-medium border border-emerald-500/30">
              สภา มจร ให้ความเห็นชอบ ๒๘ ส.ค. ๒๕๖๗
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight leading-snug">
            {curriculum.nameTh}
          </h1>
          {curriculum.nameEn && (
            <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
              {curriculum.nameEn}
            </p>
          )}

          {/* Quick specs grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <Landmark className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="text-stone-400 text-[11px]">สังกัดส่วนงาน</div>
                <div className="font-semibold text-stone-100">
                  {curriculum.departmentNameTh || "ภาควิชาพระพุทธศาสนา"}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <Award className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="text-stone-400 text-[11px]">ชื่อปริญญา</div>
                <div className="font-semibold text-stone-100">{curriculum.degreeTitleTh}</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <Clock className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="text-stone-400 text-[11px]">โครงสร้างหลักสูตร</div>
                <div className="font-semibold text-stone-100">
                  {curriculum.totalCredits} หน่วยกิต (ภาคพิเศษ เสาร์-อาทิตย์)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ๒. Navigation Tabs */}
      <div className="border-b border-stone-200">
        <nav className="flex space-x-2 sm:space-x-8 overflow-x-auto pb-px">
          {[
            { id: "overview", label: "ปรัชญาและเป้าหมาย", icon: BookOpen },
            { id: "plans", label: "โครงสร้างแผนการศึกษา (๒ แผน)", icon: Layers },
            { id: "courses", label: `รายวิชาในหลักสูตร (${curriculum.courses.length})`, icon: GraduationCap },
            { id: "admission", label: "เกณฑ์การรับเข้าและสำเร็จการศึกษา", icon: CheckCircle2 },
            { id: "committee", label: "อาจารย์ผู้รับผิดชอบหลักสูตร", icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 py-4 px-3 border-b-2 text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? "border-amber-800 text-amber-900 font-bold"
                    : "border-transparent text-stone-500 hover:text-stone-800 hover:border-stone-300"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-amber-800" : "text-stone-400"}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* ๓. Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Philosophy Box */}
          <div className="p-6 sm:p-8 rounded-2xl bg-amber-50/50 border border-amber-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-3 text-amber-900 font-serif">
              <BookOpen className="w-6 h-6 text-amber-800" />
              <h2 className="text-xl sm:text-2xl font-bold">ปรัชญาของหลักสูตร (Philosophy)</h2>
            </div>
            <p className="text-stone-800 leading-relaxed text-base sm:text-lg font-serif">
              “{curriculum.descriptionTh}”
            </p>
            {curriculum.descriptionEn && (
              <p className="text-stone-600 leading-relaxed text-sm sm:text-base italic pt-2 border-t border-amber-200/50">
                “{curriculum.descriptionEn}”
              </p>
            )}
          </div>

          {/* Objectives Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-lg">
                ๑
              </div>
              <h3 className="font-bold text-stone-900 text-lg">ด้านพุทธิปัญญา (Cognitive Domain)</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                มีความรู้ความเข้าใจอย่างลึกซึ้งในพระไตรปิฎก คัมภีร์วิสุทธิมรรค อภิธัมมัตถสังคหะ และพัฒนาการของวิปัสสนาญาณ ๑๖ อย่างถูกต้องตามหลักเถรวาท
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg">
                ๒
              </div>
              <h3 className="font-bold text-stone-900 text-lg">ด้านภาวนามัยปัญญา (Contemplative Practice)</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                มีความเชี่ยวชาญในการเจริญสติปัฏฐาน ๔ ผ่านการฝึกปฏิบัติวิปัสสนากรรมฐานเข้มข้นต่อเนื่อง ๓ เดือน (๙๐ วัน) และมีความสามารถในการสอบอารมณ์และให้คำปรึกษา
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-lg">
                ๓
              </div>
              <h3 className="font-bold text-stone-900 text-lg">ด้านการวิจัยและการเผยแผ่ (Research & Leadership)</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                สามารถสร้างสรรค์ผลงานวิจัย นวัตกรรมทางจิตปัญญา และเผยแผ่องค์ความรู้วิปัสสนาภาวนาสู่สังคมร่วมสมัยและระดับสากลด้วยเครื่องมือเทคโนโลยีดิจิทัล
              </p>
            </div>
          </div>

          {/* PLO Section */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
            <h3 className="text-xl font-bold text-stone-900 font-serif">
              ผลลัพธ์การเรียนรู้ที่คาดหวังของหลักสูตร (Program Learning Outcomes: PLOs)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-stone-700">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-900">PLO 1:</span> สามารถอธิบายและวิเคราะห์หลักธรรมในพระไตรปิฎกและคัมภีร์ที่เกี่ยวกับสมถะและวิปัสสนาภาวนาได้อย่างถูกต้อง
                </div>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-900">PLO 2:</span> มีทักษะการปฏิบัติวิปัสสนาภาวนาตามแนวสติปัฏฐานอย่างต่อเนื่องและสามารถตรวจสอบสภาวธรรมได้
                </div>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-900">PLO 3:</span> สามารถทำหน้าที่เป็นวิทยากร สอน แนะนำ และจัดค่ายปฏิบัติธรรมวิปัสสนาภาวนาได้อย่างมีมาตรฐาน
                </div>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-900">PLO 4:</span> สามารถสังเคราะห์งานวิจัยและองค์ความรู้ใหม่ทางจิตปัญญาเพื่อแก้ไขปัญหาสุขภาพจิตและสังคมร่วมสมัย
                </div>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-100 sm:col-span-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-900">PLO 5:</span> ปฏิบัติตนตามหลักจริยธรรม ศีลธรรม และจรณะศึกษา เป็นแบบอย่างที่ดีในการนำทางจิตวิญญาณ
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "plans" && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {curriculum.studyPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-sm flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="inline-flex px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
                    {plan.planType === "PLAN_1" || plan.planType === "PLAN_A1" ? "แผน ๑ (เน้นวิทยานิพนธ์)" : "แผน ๒ (ศึกษารายวิชาและสารนิพนธ์)"}
                  </div>
                  <h3 className="text-2xl font-bold text-stone-900 font-serif">{plan.nameTh}</h3>
                  {plan.nameEn && <p className="text-xs text-stone-500">{plan.nameEn}</p>}
                  <p className="text-sm text-stone-600 leading-relaxed">{plan.descriptionTh}</p>

                  <div className="space-y-2 pt-2 border-t border-stone-100 text-sm text-stone-700">
                    <div className="font-semibold text-stone-900">โครงสร้างหน่วยกิต:</div>
                    <ul className="space-y-1.5 list-disc list-inside text-xs sm:text-sm text-stone-600">
                      <li>วิชาเสริมพื้นฐาน: ๓ รายวิชา (ไม่นับหน่วยกิต)</li>
                      <li>หมวดวิชาสัมพันธ์ / บังคับ: ๙ หน่วยกิต</li>
                      <li>หมวดวิชาเฉพาะด้านวิปัสสนาและปฏิบัติ: {plan.planType === "PLAN_1" || plan.planType === "PLAN_A1" ? "๙ หน่วยกิต" : "๑๒ หน่วยกิต"}</li>
                      <li>หมวดวิชาเลือก: {plan.planType === "PLAN_1" || plan.planType === "PLAN_A1" ? "๖ หน่วยกิต" : "๙ หน่วยกิต"}</li>
                      <li>{plan.planType === "PLAN_1" || plan.planType === "PLAN_A1" ? "วิทยานิพนธ์: ๑๒ หน่วยกิต" : "สารนิพนธ์: ๖ หน่วยกิต"}</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm font-medium text-stone-800 flex justify-between items-center">
                  <span>หน่วยกิตรวมตลอดหลักสูตร:</span>
                  <span className="text-xl font-bold text-amber-900">{plan.totalCredits} หน่วยกิต</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-600 space-y-2">
            <div className="font-bold text-stone-900">หมายเหตุสำหรับนิสิต:</div>
            <p>
              • นิสิตทั้งสองแผนการศึกษาต้องเข้ารับการฝึกปฏิบัติวิปัสสนากรรมฐานอย่างเข้มข้นต่อเนื่องเป็นเวลาไม่น้อยกว่า ๓ เดือน (๙๐ วัน) ในรายวิชา <span className="font-semibold text-stone-800">๖๐๖ ๔๐๘ ปฏิบัติวิปัสสนาภาวนา</span>
            </p>
            <p>
              • นิสิตที่สำเร็จการศึกษาเปรียญธรรม ๙ ประโยค หรือมีคุณสมบัติตามเกณฑ์ อาจได้รับการยกเว้นวิชาเสริมพื้นฐานภาษาบาลีตามระเบียบมหาวิทยาลัย
            </p>
          </div>
        </div>
      )}

      {activeTab === "courses" && (
        <div className="space-y-6">
          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={courseSearch}
                onChange={(e) => setCourseSearch(e.target.value)}
                placeholder="ค้นหารหัสวิชา, ชื่อวิชา..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-700/20"
              />
            </div>

            <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1">
              {[
                { id: "ALL", label: "ทุกหมวดวิชา" },
                { id: "BASIC", label: "วิชาเสริมพื้นฐาน" },
                { id: "CORE", label: "วิชาสัมพันธ์/บังคับ" },
                { id: "SPECIALIZED", label: "วิชาเฉพาะสาขา" },
                { id: "PRACTICE_VIPASSANA", label: "วิชาปฏิบัติ" },
                { id: "ELECTIVE", label: "วิชาเลือก" },
                { id: "THESIS", label: "วิทยานิพนธ์" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCourseCategoryFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    courseCategoryFilter === cat.id
                      ? "bg-amber-800 text-white"
                      : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Courses List */}
          <div className="space-y-3">
            {filteredCourses.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border text-stone-500">
                ไม่พบรายวิชาที่ตรงกับเงื่อนไขการค้นหา
              </div>
            ) : (
              filteredCourses.map((course) => {
                const conf = courseTypeLabels[course.courseType] || {
                  label: course.courseType,
                  bg: "bg-stone-100",
                  text: "text-stone-700",
                };
                const isExpanded = expandedCourseId === course.id;

                return (
                  <div
                    key={course.id}
                    className="bg-white rounded-2xl border border-stone-200/90 shadow-xs overflow-hidden transition-all hover:border-amber-300/80"
                  >
                    <div
                      onClick={() => setExpandedCourseId(isExpanded ? null : course.id)}
                      className="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 cursor-pointer select-none"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1">
                        <span className="font-mono font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-md text-sm shrink-0 w-fit">
                          {course.courseCode}
                        </span>
                        <div>
                          <div className="font-bold text-stone-900 text-base">{course.nameTh}</div>
                          {course.nameEn && (
                            <div className="text-xs text-stone-500 italic">{course.nameEn}</div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${conf.bg} ${conf.text} hidden md:inline-block`}>
                          {conf.label}
                        </span>
                        <div className="text-right">
                          <div className="font-bold text-stone-900 text-sm sm:text-base">
                            {course.creditTotal} หน่วยกิต
                          </div>
                          <div className="text-[11px] text-stone-400 font-mono">
                            ({course.creditLecture}-{course.creditLab}-{course.creditSelf})
                          </div>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-stone-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-stone-400" />
                        )}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="px-5 pb-5 pt-2 border-t border-stone-100 bg-stone-50/50 space-y-3 text-sm">
                        <div className="md:hidden">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${conf.bg} ${conf.text}`}>
                            {conf.label}
                          </span>
                        </div>
                        <div>
                          <div className="font-bold text-stone-900 mb-1">คำอธิบายรายวิชา (Course Description):</div>
                          <p className="text-stone-700 leading-relaxed">
                            {course.descriptionTh || "ไม่มีข้อมูลคำอธิบายรายวิชา"}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {activeTab === "admission" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center gap-3 text-stone-900 font-serif">
                <CheckCircle2 className="w-6 h-6 text-amber-800" />
                <h3 className="text-xl font-bold">คุณสมบัติของผู้เข้าศึกษา</h3>
              </div>
              <ul className="space-y-3 text-sm text-stone-700 list-disc list-inside leading-relaxed">
                <li>เป็นพระภิกษุ สามเณร หรือคฤหัสถ์ (อุบาสก อุบาสิกา)</li>
                <li>สำเร็จการศึกษาระดับปริญญาตรีทุกสาขา จากสถาบันอุดมศึกษาที่ ก.พ. หรือสำนักงานปลัดกระทรวงการอุดมศึกษาฯ รับรอง</li>
                <li>หรือสำเร็จการศึกษาเปรียญธรรม ๙ ประโยค (ป.ธ.๙)</li>
                <li>ไม่เคยต้องคำพิพากษาถึงที่สุดให้จำคุก หรือมีโรคติดต่อร้ายแรงอันเป็นอุปสรรคต่อการศึกษา</li>
                <li>มีศรัทธาและความพร้อมในการเข้าปฏิบัติวิปัสสนากรรมฐานเข้มข้นตามแนวสติปัฏฐานอย่างต่อเนื่อง</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-center gap-3 text-stone-900 font-serif">
                <GraduationCap className="w-6 h-6 text-emerald-800" />
                <h3 className="text-xl font-bold">เกณฑ์การสำเร็จการศึกษา</h3>
              </div>
              <ul className="space-y-3 text-sm text-stone-700 list-disc list-inside leading-relaxed">
                <li>ศึกษารายวิชาครบถ้วนตามโครงสร้างหลักสูตรไม่น้อยกว่า ๓๖ หน่วยกิต</li>
                <li>มีผลการเรียนเฉลี่ยสะสม (GPAX) ไม่ต่ำกว่า ๓.๐๐ (จากระบบ ๔.๐๐)</li>
                <li>ผ่านการปฏิบัติวิปัสสนากรรมฐานเข้มข้นต่อเนื่องไม่น้อยกว่า ๓ เดือน (๙๐ วัน) ในรายวิชา ๖๐๖ ๔๐๘</li>
                <li>สอบผ่านการสอบวัดคุณสมบัติความรู้ภาษาอังกฤษสำหรับบัณฑิตศึกษาตามเกณฑ์ มจร</li>
                <li>สอบผ่านการสอบวิทยานิพนธ์ (แผน ๑) หรือสารนิพนธ์ (แผน ๒) ในระดับ ดี หรือ ดีเยี่ยม</li>
                <li>ผลงานวิทยานิพนธ์หรือสารนิพนธ์ได้รับการตีพิมพ์หรือตอบรับการตีพิมพ์ในวารสารวิชาการตามเกณฑ์ สกอ./กพอ.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === "committee" && (
        <div className="space-y-8">
          {/* Header Attribution & Link to Official Faculty Website */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-50 via-stone-50 to-amber-50/40 border border-amber-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-amber-900 font-serif font-bold text-lg">
                <Users className="w-5 h-5 text-amber-800 shrink-0" />
                <span>อาจารย์ผู้รับผิดชอบหลักสูตร (๕ ท่าน)</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600">
                หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา ภาควิชาพระพุทธศาสนา คณะพุทธศาสตร์ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย
              </p>
            </div>
            <a
              href="https://fb.mcu.ac.th/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition-all shrink-0"
            >
              <span>เว็บไซต์คณะพุทธศาสตร์ fb.mcu.ac.th</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Committee Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {committeeMembers.map((m, idx) => {
              const thaiNumbers = ["๑", "๒", "๓", "๔", "๕"];
              return (
                <div
                  key={idx}
                  className="group bg-white rounded-2xl p-5 border border-stone-200 hover:border-amber-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Instructor Portrait Image */}
                    <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-stone-100 border border-stone-200/80 shadow-inner">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={m.imageUrl}
                        alt={m.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      {/* Index Tag */}
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-stone-900/70 backdrop-blur-xs text-white text-xs font-serif font-bold">
                        ลำดับที่ {thaiNumbers[idx] || idx + 1}
                      </div>
                      {/* Role Badge */}
                      <div className="absolute top-2.5 right-2.5">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-medium border shadow-xs backdrop-blur-xs ${m.badgeColor}`}
                        >
                          {m.roleBadge}
                        </span>
                      </div>
                    </div>

                    {/* Name & Titles */}
                    <div>
                      <h4 className="font-bold text-stone-900 text-base font-serif group-hover:text-amber-900 transition-colors leading-snug">
                        {m.name}
                      </h4>
                      <div className="text-xs font-semibold text-amber-800 mt-1">
                        {m.position}
                      </div>
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        {m.office}
                      </div>
                    </div>

                    {/* Qualifications & Expertise */}
                    <div className="space-y-2.5 text-xs text-stone-600 border-t border-stone-100 pt-3">
                      <div>
                        <span className="font-bold text-stone-700 block text-[11px] uppercase tracking-wider text-amber-900/80">
                          คุณวุฒิการศึกษา:
                        </span>
                        <p className="mt-0.5 leading-relaxed text-stone-700">{m.degree}</p>
                      </div>
                      <div>
                        <span className="font-bold text-stone-700 block text-[11px] uppercase tracking-wider text-amber-900/80">
                          สาขาความเชี่ยวชาญ:
                        </span>
                        <p className="mt-0.5 leading-relaxed text-stone-700">{m.expertise}</p>
                      </div>
                    </div>
                  </div>

                  {/* External Profile Link Button */}
                  <a
                    href={m.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-3 rounded-xl bg-stone-50 group-hover:bg-amber-50/80 text-stone-700 group-hover:text-amber-900 text-xs font-semibold border border-stone-200 group-hover:border-amber-300 transition-all mt-4"
                  >
                    <span>ข้อมูลประวัติบน fb.mcu.ac.th</span>
                    <ExternalLink className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
