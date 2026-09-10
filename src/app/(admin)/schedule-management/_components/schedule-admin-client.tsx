"use client";

import { useState, useTransition } from "react";
import { Calendar, Plus, Trash2, Video, MapPin, Clock, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useT } from "@/shared/lib/i18n/client";
import {
  LiyonCard,
  DataTable,
  StatusPill,
  LiyonDialog,
  LiyonDialogCloseButton,
  LiyonDialogHeader,
  LiyonDialogBody,
  LiyonDialogFooter,
  LiyonField,
  LiyonSelect,
  RowMenuItem,
  type DataTableColumn,
} from "@/shared/components/liyon";
import { Button } from "@/components/ui/button";
import type { ClassScheduleDto } from "@/features/schedule";
import {
  createScheduleAction,
  deleteScheduleAction,
  getAdminSchedulesAction,
} from "@/features/schedule/actions";

export function ScheduleAdminClient({
  initialSchedules,
  canManage,
}: {
  initialSchedules: ClassScheduleDto[];
  canManage: boolean;
}) {
  const t = useT();
  const [schedules, setSchedules] = useState<ClassScheduleDto[]>(initialSchedules);
  const [isPending, startTransition] = useTransition();

  // Dialogs
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form states
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [instructorName, setInstructorName] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState<"SATURDAY" | "SUNDAY">("SATURDAY");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("12:00");
  const [roomNumber, setRoomNumber] = useState("ห้อง 401 อาคารเรียนรวม มจร วังน้อย");
  const [teachingMode, setTeachingMode] = useState<"ONSITE" | "ONLINE" | "HYBRID">("HYBRID");
  const [onlineMeetingUrl, setOnlineMeetingUrl] = useState("");
  const [onlineMeetingPasscode, setOnlineMeetingPasscode] = useState("");

  function resetForm() {
    setCourseCode("");
    setCourseName("");
    setInstructorName("");
    setDayOfWeek("SATURDAY");
    setStartTime("09:00");
    setEndTime("12:00");
    setRoomNumber("ห้อง 401 อาคารเรียนรวม มจร วังน้อย");
    setTeachingMode("HYBRID");
    setOnlineMeetingUrl("");
    setOnlineMeetingPasscode("");
  }

  function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(async () => {
      const res = await createScheduleAction({
        courseCode,
        courseName,
        instructorName,
        dayOfWeek,
        startTime,
        endTime,
        roomNumber,
        teachingMode,
        onlineMeetingUrl: onlineMeetingUrl || null,
        onlineMeetingPasscode: onlineMeetingPasscode || null,
      });

      if (res.ok) {
        toast.success("เพิ่มคาบเรียนเรียบร้อยแล้ว");
        setIsCreateOpen(false);
        resetForm();
        refresh();
      } else {
        toast.error(res.error.message);
      }
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      const res = await deleteScheduleAction(id);
      if (res.ok) {
        toast.success("ลบคาบเรียนเรียบร้อยแล้ว");
        setDeletingId(null);
        refresh();
      } else {
        toast.error(res.error.message);
      }
    });
  }

  async function refresh() {
    const res = await getAdminSchedulesAction();
    if (res.ok) setSchedules(res.data);
  }

  const columns: DataTableColumn<ClassScheduleDto>[] = [
    {
      key: "day",
      header: t("schedule.day"),
      className: "nowrap text-xs",
      render: (row) => {
        const isSat = row.dayOfWeek === "SATURDAY";
        return (
          <span
            className={`px-2.5 py-1 rounded-md text-xs font-bold ${
              isSat ? "bg-purple-100 text-purple-900 border border-purple-200" : "bg-red-100 text-red-900 border border-red-200"
            }`}
          >
            {isSat ? t("schedule.saturday") : t("schedule.sunday")}
          </span>
        );
      },
    },
    {
      key: "time",
      header: t("schedule.time"),
      className: "nowrap text-xs font-mono text-stone-700",
      render: (row) => (
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-stone-400" />
          {row.startTime} - {row.endTime} น.
        </span>
      ),
    },
    {
      key: "course",
      header: t("schedule.course"),
      render: (row) => (
        <div>
          <div className="font-semibold text-stone-900">{row.courseName}</div>
          <div className="text-xs text-amber-800 font-mono font-medium">{row.courseCode}</div>
        </div>
      ),
    },
    {
      key: "instructor",
      header: t("schedule.instructor"),
      render: (row) => <span className="text-xs text-stone-800 font-medium">{row.instructorName}</span>,
    },
    {
      key: "room",
      header: t("schedule.room") + " / " + t("schedule.mode"),
      render: (row) => {
        const modeTone = row.teachingMode === "HYBRID" ? "ok" : row.teachingMode === "ONLINE" ? "info" : "warn";
        const modeLabel =
          row.teachingMode === "HYBRID"
            ? t("schedule.modeHybrid")
            : row.teachingMode === "ONLINE"
            ? t("schedule.modeOnline")
            : t("schedule.modeOnsite");
        return (
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-xs text-stone-700">
              <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
              <span>{row.roomNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <StatusPill tone={modeTone}>{modeLabel}</StatusPill>
              {row.onlineMeetingUrl && (
                <a
                  href={row.onlineMeetingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-blue-600 hover:underline flex items-center gap-0.5"
                >
                  <Video className="w-3 h-3" />
                  <span>Zoom</span>
                </a>
              )}
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("schedule.adminTitle")}</h1>
          <p className="text-sm text-muted-foreground">{t("schedule.adminSubtitle")}</p>
        </div>
        {canManage && (
          <Button
            onClick={() => {
              resetForm();
              setIsCreateOpen(true);
            }}
            className="bg-amber-800 hover:bg-amber-900 text-white gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            {t("schedule.create")}
          </Button>
        )}
      </div>

      <LiyonCard>
        <DataTable<ClassScheduleDto>
          headHeading={
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-800" />
              <h2 className="text-base font-semibold">{t("schedule.title")} ({schedules.length} คาบเรียน)</h2>
            </div>
          }
          state={schedules.length === 0 ? "empty" : "data"}
          rows={schedules}
          columns={columns}
          getRowId={(row) => row.id}
          renderRowMenu={
            canManage
              ? (row) => (
                  <RowMenuItem
                    danger
                    onSelect={() => setDeletingId(row.id)}
                    icon={<Trash2 className="w-4 h-4 text-red-600" />}
                  >
                    {t("schedule.delete")}
                  </RowMenuItem>
                )
              : undefined
          }
          empty={{
            icon: <Calendar className="h-10 w-10 text-muted-foreground/50" />,
            title: "ยังไม่มีข้อมูลตารางเรียน",
            description: "คลิกปุ่ม 'เพิ่มคาบเรียน' เพื่อจัดตารางเรียนเสาร์-อาทิตย์",
          }}
          error={{
            icon: <AlertCircle className="h-10 w-10 text-destructive" />,
            title: t("common.error"),
          }}
        />
      </LiyonCard>

      {/* Create Dialog */}
      <LiyonDialog
        open={isCreateOpen}
        onOpenChange={(open: boolean) => {
          if (!open) setIsCreateOpen(false);
        }}
        wide
      >
        <LiyonDialogCloseButton label={t("common.close")} />
        <LiyonDialogHeader
          title={t("schedule.create")}
          description={t("schedule.adminSubtitle")}
        />

        <form onSubmit={handleCreate}>
          <LiyonDialogBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
              <LiyonField label={t("schedule.day")}>
                <LiyonSelect
                  value={dayOfWeek}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setDayOfWeek(e.target.value as "SATURDAY" | "SUNDAY")
                  }
                >
                  <option value="SATURDAY">{t("schedule.saturday")}</option>
                  <option value="SUNDAY">{t("schedule.sunday")}</option>
                </LiyonSelect>
              </LiyonField>

              <div className="grid grid-cols-2 gap-2">
                <LiyonField label="เวลาเริ่ม">
                  <input
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                    value={startTime}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartTime(e.target.value)}
                    placeholder="09:00"
                    required
                  />
                </LiyonField>
                <LiyonField label="เวลาสิ้นสุด">
                  <input
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                    value={endTime}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndTime(e.target.value)}
                    placeholder="12:00"
                    required
                  />
                </LiyonField>
              </div>

              <LiyonField label={t("curriculum.courseCode")}>
                <input
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                  value={courseCode}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCourseCode(e.target.value)}
                  placeholder="เช่น 600 101"
                  required
                />
              </LiyonField>

              <LiyonField label={t("curriculum.courseName")}>
                <input
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                  value={courseName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCourseName(e.target.value)}
                  placeholder="เช่น พระไตรปิฎกวิเคราะห์"
                  required
                />
              </LiyonField>

              <div className="md:col-span-2">
                <LiyonField label={t("schedule.instructor")}>
                  <input
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                    value={instructorName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInstructorName(e.target.value)}
                    placeholder="เช่น ศ.พิเศษ ดร.จำนงค์ ทองประเสริฐ หรือ พระอาจารย์สมณศักดิ์"
                    required
                  />
                </LiyonField>
              </div>

              <LiyonField label={t("schedule.room")}>
                <input
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                  value={roomNumber}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoomNumber(e.target.value)}
                  placeholder="เช่น ห้อง 401 อาคารเรียนรวม มจร วังน้อย"
                  required
                />
              </LiyonField>

              <LiyonField label={t("schedule.mode")}>
                <LiyonSelect
                  value={teachingMode}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setTeachingMode(e.target.value as "ONSITE" | "ONLINE" | "HYBRID")
                  }
                >
                  <option value="HYBRID">{t("schedule.modeHybrid")}</option>
                  <option value="ONLINE">{t("schedule.modeOnline")}</option>
                  <option value="ONSITE">{t("schedule.modeOnsite")}</option>
                </LiyonSelect>
              </LiyonField>

              <LiyonField label="ลิงก์ห้องเรียนออนไลน์ (Zoom Link)">
                <input
                  type="url"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                  value={onlineMeetingUrl}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOnlineMeetingUrl(e.target.value)}
                  placeholder="https://zoom.us/j/..."
                />
              </LiyonField>

              <LiyonField label="รหัสผ่านห้องเรียน (Meeting Passcode)">
                <input
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                  value={onlineMeetingPasscode}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOnlineMeetingPasscode(e.target.value)}
                  placeholder="เช่น vipassana67"
                />
              </LiyonField>
            </div>
          </LiyonDialogBody>
          <LiyonDialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCreateOpen(false)}
              disabled={isPending}
            >
              ยกเลิก
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-amber-800 hover:bg-amber-900 text-white"
            >
              {isPending ? "กำลังบันทึก..." : "บันทึกคาบเรียน"}
            </Button>
          </LiyonDialogFooter>
        </form>
      </LiyonDialog>

      {/* Delete Confirmation Dialog */}
      <LiyonDialog
        open={!!deletingId}
        onOpenChange={(open: boolean) => !open && setDeletingId(null)}
        danger
      >
        <LiyonDialogCloseButton label={t("common.close")} />
        <LiyonDialogHeader
          title={t("schedule.delete")}
          description="คุณแน่ใจหรือไม่ว่าต้องการลบคาบเรียนนี้?"
        />
        <LiyonDialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setDeletingId(null)}
            disabled={isPending}
          >
            ยกเลิก
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => deletingId && handleDelete(deletingId)}
            disabled={isPending}
          >
            {isPending ? "กำลังลบ..." : t("schedule.delete")}
          </Button>
        </LiyonDialogFooter>
      </LiyonDialog>
    </div>
  );
}
