"use client";

import { useState, useTransition } from "react";
import { BookOpen, Plus, Edit, Trash2, Award, Layers, AlertCircle } from "lucide-react";
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
import type { CurriculumDto, CourseDto } from "@/features/curriculum";
import {
  createCourseAction,
  updateCourseAction,
  deleteCourseAction,
  getCurriculumAction,
} from "@/features/curriculum/actions";

export function CurriculumAdminClient({
  curriculum: initialCurriculum,
  canManage,
}: {
  curriculum: CurriculumDto | null;
  canManage: boolean;
}) {
  const t = useT();
  const [curriculum, setCurriculum] = useState<CurriculumDto | null>(initialCurriculum);
  const [courses, setCourses] = useState<CourseDto[]>(initialCurriculum?.courses || []);
  const [isPending, startTransition] = useTransition();

  // Dialogs
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<CourseDto | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form states
  const [courseCode, setCourseCode] = useState("");
  const [nameTh, setNameTh] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [creditTotal, setCreditTotal] = useState(3);
  const [creditLecture, setCreditLecture] = useState(3);
  const [creditLab, setCreditLab] = useState(0);
  const [creditSelf, setCreditSelf] = useState(6);
  const [courseType, setCourseType] = useState<"BASIC" | "CORE" | "SPECIALIZED" | "PRACTICE_VIPASSANA" | "THESIS">("CORE");
  const [descriptionTh, setDescriptionTh] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");

  function resetForm() {
    setCourseCode("");
    setNameTh("");
    setNameEn("");
    setCreditTotal(3);
    setCreditLecture(3);
    setCreditLab(0);
    setCreditSelf(6);
    setCourseType("CORE");
    setDescriptionTh("");
    setDescriptionEn("");
  }

  function openEdit(c: CourseDto) {
    setEditingCourse(c);
    setCourseCode(c.courseCode);
    setNameTh(c.nameTh);
    setNameEn(c.nameEn || "");
    setCreditTotal(c.creditTotal);
    setCreditLecture(c.creditLecture);
    setCreditLab(c.creditLab);
    setCreditSelf(c.creditSelf);
    setCourseType(c.courseType as "BASIC" | "CORE" | "SPECIALIZED" | "PRACTICE_VIPASSANA" | "THESIS");
    setDescriptionTh(c.descriptionTh || "");
    setDescriptionEn(c.descriptionEn || "");
  }

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!curriculum) return;

    startTransition(async () => {
      if (editingCourse) {
        const res = await updateCourseAction({
          id: editingCourse.id,
          courseCode,
          nameTh,
          nameEn: nameEn || null,
          creditTotal,
          creditLecture,
          creditLab,
          creditSelf,
          courseType,
          descriptionTh: descriptionTh || null,
          descriptionEn: descriptionEn || null,
        });

        if (res.ok) {
          toast.success("บันทึกการแก้ไขรายวิชาสำเร็จ");
          setEditingCourse(null);
          refresh();
        } else {
          toast.error(res.error.message);
        }
      } else {
        const res = await createCourseAction(curriculum.id, {
          courseCode,
          nameTh,
          nameEn: nameEn || null,
          creditTotal,
          creditLecture,
          creditLab,
          creditSelf,
          courseType,
          descriptionTh: descriptionTh || null,
          descriptionEn: descriptionEn || null,
        });

        if (res.ok) {
          toast.success("เพิ่มรายวิชาเรียบร้อยแล้ว");
          setIsCreateOpen(false);
          resetForm();
          refresh();
        } else {
          toast.error(res.error.message);
        }
      }
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      const res = await deleteCourseAction(id);
      if (res.ok) {
        toast.success("ลบรายวิชาเรียบร้อยแล้ว");
        setDeletingId(null);
        refresh();
      } else {
        toast.error(res.error.message);
      }
    });
  }

  async function refresh() {
    const res = await getCurriculumAction();
    if (res.ok && res.data) {
      setCurriculum(res.data);
      setCourses(res.data.courses);
    }
  }

  const columns: DataTableColumn<CourseDto>[] = [
    {
      key: "code",
      header: t("curriculum.courseCode"),
      className: "nowrap font-mono text-xs font-bold text-amber-900",
      render: (row) => <span>{row.courseCode}</span>,
    },
    {
      key: "name",
      header: t("curriculum.courseName"),
      render: (row) => (
        <div>
          <div className="font-semibold text-stone-900">{row.nameTh}</div>
          {row.nameEn && <div className="text-xs text-muted-foreground italic">{row.nameEn}</div>}
          {row.descriptionTh && (
            <div className="text-xs text-stone-500 mt-1 line-clamp-1">{row.descriptionTh}</div>
          )}
        </div>
      ),
    },
    {
      key: "credits",
      header: t("curriculum.credits"),
      className: "nowrap text-xs font-mono",
      render: (row) => (
        <span className="font-medium">
          {row.creditTotal} ({row.creditLecture}-{row.creditLab}-{row.creditSelf})
        </span>
      ),
    },
    {
      key: "category",
      header: t("curriculum.courseType"),
      className: "nowrap text-xs",
      render: (row) => {
        const typeMap: Record<string, { label: string; tone: "ok" | "warn" | "bad" | "info" | "off" }> = {
          BASIC: { label: t("curriculum.typeBasic"), tone: "off" },
          CORE: { label: t("curriculum.typeCore"), tone: "info" },
          SPECIALIZED: { label: t("curriculum.typeSpecial"), tone: "ok" },
          PRACTICE_VIPASSANA: { label: t("curriculum.typeVipassana"), tone: "warn" },
          THESIS: { label: t("curriculum.typeThesis"), tone: "bad" },
        };
        const conf = typeMap[row.courseType] || { label: row.courseType, tone: "off" };
        return <StatusPill tone={conf.tone}>{conf.label}</StatusPill>;
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("curriculum.adminTitle")}</h1>
          <p className="text-sm text-muted-foreground">{t("curriculum.adminSubtitle")}</p>
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
            {t("curriculum.addCourse")}
          </Button>
        )}
      </div>

      {curriculum && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LiyonCard className="p-4 bg-gradient-to-br from-amber-50 to-orange-50/40 border-amber-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-800 text-white flex items-center justify-center font-bold">
                มคอ.๒
              </div>
              <div>
                <div className="text-xs text-amber-800 font-semibold uppercase">{curriculum.code}</div>
                <div className="font-bold text-stone-900 text-sm leading-snug">{curriculum.nameTh}</div>
                {curriculum.departmentNameTh && (
                  <div className="text-xs text-emerald-800 font-medium mt-1">
                    สังกัด: {curriculum.departmentNameTh}
                    {curriculum.facultyNameTh ? ` (${curriculum.facultyNameTh})` : ""}
                  </div>
                )}
              </div>
            </div>
          </LiyonCard>

          <LiyonCard className="p-4 border-stone-200">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-amber-700" />
              <div>
                <div className="text-xs text-muted-foreground">{t("curriculum.totalCredits")}</div>
                <div className="text-xl font-bold text-stone-900">{curriculum.totalCredits} {t("curriculum.credits")}</div>
              </div>
            </div>
          </LiyonCard>

          <LiyonCard className="p-4 border-stone-200">
            <div className="flex items-center gap-3">
              <Layers className="w-8 h-8 text-amber-700" />
              <div>
                <div className="text-xs text-muted-foreground">แผนการศึกษาที่เปิดสอน</div>
                <div className="text-sm font-semibold text-stone-800">
                  {curriculum.studyPlans.map((p) => p.nameTh).join(" และ ")}
                </div>
              </div>
            </div>
          </LiyonCard>
        </div>
      )}

      <LiyonCard>
        <DataTable<CourseDto>
          headHeading={
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-800" />
              <h2 className="text-base font-semibold">รายวิชาในหลักสูตร ({courses.length} วิชา)</h2>
            </div>
          }
          state={courses.length === 0 ? "empty" : "data"}
          rows={courses}
          columns={columns}
          getRowId={(row) => row.id}
          renderRowMenu={
            canManage
              ? (row) => (
                  <>
                    <RowMenuItem onSelect={() => openEdit(row)} icon={<Edit className="w-4 h-4" />}>
                      {t("curriculum.editCourse")}
                    </RowMenuItem>
                    <RowMenuItem
                      danger
                      onSelect={() => setDeletingId(row.id)}
                      icon={<Trash2 className="w-4 h-4 text-red-600" />}
                    >
                      {t("curriculum.deleteCourse")}
                    </RowMenuItem>
                  </>
                )
              : undefined
          }
          empty={{
            icon: <BookOpen className="h-10 w-10 text-muted-foreground/50" />,
            title: "ยังไม่มีรายวิชาในหลักสูตร",
            description: "คลิกปุ่ม 'เพิ่มรายวิชาใหม่' เพื่อบันทึกรายวิชา มคอ.๒",
          }}
          error={{
            icon: <AlertCircle className="h-10 w-10 text-destructive" />,
            title: t("common.error"),
          }}
        />
      </LiyonCard>

      {/* Create / Edit Dialog */}
      <LiyonDialog
        open={isCreateOpen || !!editingCourse}
        onOpenChange={(open: boolean) => {
          if (!open) {
            setIsCreateOpen(false);
            setEditingCourse(null);
          }
        }}
        wide
      >
        <LiyonDialogCloseButton label={t("common.close")} />
        <LiyonDialogHeader
          title={editingCourse ? t("curriculum.editCourse") : t("curriculum.addCourse")}
          description={t("curriculum.adminSubtitle")}
        />

        <form onSubmit={handleSave}>
          <LiyonDialogBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
              <LiyonField label={t("curriculum.courseCode")}>
                <input
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                  value={courseCode}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCourseCode(e.target.value)}
                  placeholder="เช่น 600 101"
                  required
                />
              </LiyonField>

              <LiyonField label={t("curriculum.courseType")}>
                <LiyonSelect
                  value={courseType}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setCourseType(e.target.value as "BASIC" | "CORE" | "SPECIALIZED" | "PRACTICE_VIPASSANA" | "THESIS")
                  }
                >

                  <option value="BASIC">{t("curriculum.typeBasic")}</option>
                  <option value="CORE">{t("curriculum.typeCore")}</option>
                  <option value="SPECIALIZED">{t("curriculum.typeSpecial")}</option>
                  <option value="PRACTICE_VIPASSANA">{t("curriculum.typeVipassana")}</option>
                  <option value="THESIS">{t("curriculum.typeThesis")}</option>
                </LiyonSelect>
              </LiyonField>

              <div className="md:col-span-2">
                <LiyonField label={t("curriculum.courseName")}>
                  <input
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                    value={nameTh}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameTh(e.target.value)}
                    placeholder="ชื่อรายวิชาภาษาไทย"
                    required
                  />
                </LiyonField>
              </div>

              <div className="md:col-span-2">
                <LiyonField label="ชื่อรายวิชาภาษาอังกฤษ">
                  <input
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                    value={nameEn}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameEn(e.target.value)}
                    placeholder="Course name in English"
                  />
                </LiyonField>
              </div>

              <div className="grid grid-cols-4 gap-2 md:col-span-2">
                <LiyonField label="หน่วยกิตรวม">
                  <input
                    type="number"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                    value={creditTotal}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCreditTotal(parseInt(e.target.value) || 0)}
                    min={1}
                    required
                  />
                </LiyonField>
                <LiyonField label="บรรยาย (ชม.)">
                  <input
                    type="number"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                    value={creditLecture}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCreditLecture(parseInt(e.target.value) || 0)}
                    min={0}
                  />
                </LiyonField>
                <LiyonField label="ปฏิบัติ (ชม.)">
                  <input
                    type="number"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                    value={creditLab}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCreditLab(parseInt(e.target.value) || 0)}
                    min={0}
                  />
                </LiyonField>
                <LiyonField label="ศึกษาด้วยตนเอง">
                  <input
                    type="number"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                    value={creditSelf}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCreditSelf(parseInt(e.target.value) || 0)}
                    min={0}
                  />
                </LiyonField>
              </div>

              <div className="md:col-span-2">
                <LiyonField label={t("curriculum.desc")}>
                  <textarea
                    rows={4}
                    value={descriptionTh}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescriptionTh(e.target.value)}
                    placeholder="คำอธิบายสาระสำคัญของรายวิชา..."
                    className="w-full rounded-md border border-input bg-background p-3 text-sm shadow-sm"
                  />
                </LiyonField>
              </div>
            </div>
          </LiyonDialogBody>
          <LiyonDialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsCreateOpen(false);
                setEditingCourse(null);
              }}
              disabled={isPending}
            >
              ยกเลิก
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-amber-800 hover:bg-amber-900 text-white"
            >
              {isPending ? "กำลังบันทึก..." : "บันทึกรายวิชา"}
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
          title={t("curriculum.deleteCourse")}
          description={t("curriculum.deleteConfirm")}
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
            {isPending ? "กำลังลบ..." : t("curriculum.deleteCourse")}
          </Button>
        </LiyonDialogFooter>
      </LiyonDialog>
    </div>
  );
}
