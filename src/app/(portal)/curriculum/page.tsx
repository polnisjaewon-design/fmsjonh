import { Award, Clock, Landmark } from "lucide-react";
import { getDefaultTenantId } from "@/features/identity/server";
import { getActiveCurriculum } from "@/features/curriculum/server";

export default async function CurriculumPage() {
  const tenantId = await getDefaultTenantId();
  const curriculum = await getActiveCurriculum(tenantId);

  const courseTypeLabels: Record<string, string> = {
    BASIC: "หมวดวิชาเสริมพื้นฐาน",
    CORE: "หมวดวิชาแกนพระพุทธศาสนา",
    SPECIALIZED: "หมวดวิชาเฉพาะสาขาวิปัสสนา",
    PRACTICE_VIPASSANA: "หมวดวิชาปฏิบัติวิปัสสนาภาวนา",
    THESIS: "วิทยานิพนธ์",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="border-b pb-8 space-y-4">
        <div className="text-amber-800 text-xs sm:text-sm font-semibold uppercase tracking-wider">
          Curriculum Specification (TQF2)
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-serif leading-tight">
          {curriculum?.nameTh || "หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา"}
        </h1>
        {curriculum?.nameEn && (
          <p className="text-stone-500 text-base sm:text-lg">{curriculum.nameEn}</p>
        )}
        <div className="flex flex-wrap gap-4 pt-2 text-xs sm:text-sm text-stone-600">
          {curriculum?.departmentNameTh && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-medium">
              <Landmark className="w-4 h-4 text-emerald-700" />
              <span>
                สังกัด: {curriculum.departmentNameTh}
                {curriculum.facultyNameTh ? ` (${curriculum.facultyNameTh})` : ""}
              </span>
            </div>
          )}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 font-medium">
            <Award className="w-4 h-4 text-amber-700" />
            <span>ชื่อปริญญา: {curriculum?.degreeTitleTh}</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 border text-stone-800 font-medium">
            <Clock className="w-4 h-4 text-stone-600" />
            <span>จำนวนหน่วยกิตรวมตลอดหลักสูตร: {curriculum?.totalCredits} หน่วยกิต</span>
          </div>
        </div>
      </div>

      {/* Description */}
      {curriculum?.descriptionTh && (
        <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2">
          <h2 className="text-lg font-bold text-stone-900 font-serif">วัตถุประสงค์และจุดเน้นของหลักสูตร</h2>
          <p className="text-stone-700 leading-relaxed text-sm sm:text-base">
            {curriculum.descriptionTh}
          </p>
        </div>
      )}

      {/* แผนการเรียน ๒ แผน */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-stone-900 font-serif">โครงสร้างแผนการศึกษา</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {curriculum?.studyPlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-xs space-y-4"
            >
              <div className="inline-flex px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
                {plan.planType === "PLAN_A1" ? "แผน ก แบบ ก ๑" : "แผน ก แบบ ก ๒"}
              </div>
              <h3 className="text-xl font-bold text-stone-900">{plan.nameTh}</h3>
              <p className="text-sm text-stone-600 leading-relaxed">{plan.descriptionTh}</p>
              <div className="p-4 rounded-xl bg-stone-50 border text-sm font-medium text-stone-800 flex justify-between items-center">
                <span>หน่วยกิตรวมที่ต้องศึกษา:</span>
                <span className="text-lg font-bold text-amber-800">{plan.totalCredits} หน่วยกิต</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ตารางรายวิชาที่เปิดสอน */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold text-stone-900 font-serif">รายวิชาในหลักสูตร</h2>
            <p className="text-xs sm:text-sm text-stone-500">รายวิชาบังคับ วิชาปฏิบัติวิปัสสนาภาวนา และวิทยานิพนธ์</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-stone-100/75 border-b text-stone-700 text-xs font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-4 w-28">รหัสวิชา</th>
                  <th className="py-3.5 px-4">ชื่อรายวิชา</th>
                  <th className="py-3.5 px-4 w-44">หมวดวิชา</th>
                  <th className="py-3.5 px-4 w-24 text-center">หน่วยกิต</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {curriculum?.courses.map((course) => (
                  <tr key={course.id} className="hover:bg-amber-50/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-semibold text-amber-900">
                      {course.courseCode}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-stone-900">{course.nameTh}</div>
                      {course.nameEn && (
                        <div className="text-xs text-stone-500 italic mt-0.5">{course.nameEn}</div>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2.5 py-1 rounded-md text-xs font-medium bg-stone-100 text-stone-700">
                        {courseTypeLabels[course.courseType] || course.courseType}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-stone-800">
                      {course.creditTotal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
