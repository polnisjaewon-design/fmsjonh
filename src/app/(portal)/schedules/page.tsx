import { Calendar, Clock, Video, MapPin, UserCheck, ExternalLink } from "lucide-react";
import { getDefaultTenantId } from "@/features/news/server";
import { listCurrentSchedules } from "@/features/schedule/server";

export default async function SchedulesPublicPage() {
  const tenantId = await getDefaultTenantId();
  const schedules = await listCurrentSchedules(tenantId);

  const saturdayClasses = schedules.filter((s) => s.dayOfWeek === "SATURDAY");
  const sundayClasses = schedules.filter((s) => s.dayOfWeek === "SUNDAY");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="border-b pb-6 space-y-2">
        <div className="text-amber-800 text-xs sm:text-sm font-semibold uppercase tracking-wider">
          Weekend Class Timetable
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif">
          ตารางเรียนการสอนภาคเสาร์-อาทิตย์
        </h1>
        <p className="text-stone-600 text-sm sm:text-base">
          ภาคการศึกษาที่ ๑/๒๕๖๙ หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา มจร
        </p>
      </div>

      {/* Grid: Saturday & Sunday */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* เสาร์ */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-amber-900 border-b-2 border-amber-800 pb-2">
            <Calendar className="w-5 h-5 text-amber-800" />
            <h2 className="text-xl font-bold font-serif">วันเสาร์ (Saturday)</h2>
          </div>

          <div className="space-y-4">
            {saturdayClasses.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-3"
              >
                <div className="flex justify-between items-start gap-2">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-amber-100 text-amber-900">
                    {item.courseCode}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-stone-100 text-stone-700">
                    {item.teachingMode}
                  </span>
                </div>
                <h3 className="font-bold text-stone-900 text-base">{item.courseName}</h3>
                <div className="text-xs text-stone-600 space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>{item.startTime} - {item.endTime} น.</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-stone-400" />
                    <span>อาจารย์ผู้สอน: {item.instructorName}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>ห้องเรียน: {item.roomNumber}</span>
                  </div>
                </div>

                {item.onlineMeetingUrl && (
                  <div className="pt-2 border-t flex items-center justify-between">
                    <a
                      href={item.onlineMeetingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-800 bg-sky-50 hover:bg-sky-100 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>เข้าห้องเรียน Zoom</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    {item.onlineMeetingPasscode && (
                      <span className="text-xs text-stone-500 font-mono">
                        Passcode: {item.onlineMeetingPasscode}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* อาทิตย์ */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-amber-900 border-b-2 border-amber-800 pb-2">
            <Calendar className="w-5 h-5 text-amber-800" />
            <h2 className="text-xl font-bold font-serif">วันอาทิตย์ (Sunday)</h2>
          </div>

          <div className="space-y-4">
            {sundayClasses.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-3"
              >
                <div className="flex justify-between items-start gap-2">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-amber-100 text-amber-900">
                    {item.courseCode}
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-emerald-100 text-emerald-800">
                    {item.teachingMode}
                  </span>
                </div>
                <h3 className="font-bold text-stone-900 text-base">{item.courseName}</h3>
                <div className="text-xs text-stone-600 space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>{item.startTime} - {item.endTime} น.</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-stone-400" />
                    <span>พระวิปัสสนาจารย์: {item.instructorName}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>สถานที่: {item.roomNumber}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
