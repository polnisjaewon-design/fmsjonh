"use client";

import { useState, useTransition } from "react";
import { GraduationCap, Plus, Edit, Trash2, User, Sparkles, AlertCircle } from "lucide-react";
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
import type { ThesisDto } from "@/features/thesis";
import {
  createThesisAction,
  updateThesisAction,
  deleteThesisAction,
  getAdminThesesAction,
} from "@/features/thesis/actions";

export function ThesisAdminClient({
  initialTheses,
  canManage,
}: {
  initialTheses: ThesisDto[];
  canManage: boolean;
}) {
  const t = useT();
  const [theses, setTheses] = useState<ThesisDto[]>(initialTheses);
  const [isPending, startTransition] = useTransition();

  // Dialogs
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingThesis, setEditingThesis] = useState<ThesisDto | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form states
  const [studentCode, setStudentCode] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [titleTh, setTitleTh] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [advisorName, setAdvisorName] = useState("");
  const [coAdvisorName, setCoAdvisorName] = useState("");
  const [status, setStatus] = useState<"TOPIC_PROPOSED" | "PROPOSAL_DEFENSE" | "IN_PROGRESS" | "FINAL_DEFENSE" | "COMPLETED" | "PUBLISHED">("IN_PROGRESS");
  const [abstractTh, setAbstractTh] = useState("");
  const [abstractEn, setAbstractEn] = useState("");
  const [keywords, setKeywords] = useState("");
  const [similarityPercentage, setSimilarityPercentage] = useState<number | undefined>(undefined);
  const [newBodyOfKnowledge, setNewBodyOfKnowledge] = useState("");
  const [documentUrl, setDocumentUrl] = useState("");
  const [yearGraduated, setYearGraduated] = useState<number | undefined>(2568);

  function resetForm() {
    setStudentCode("");
    setAuthorName("");
    setTitleTh("");
    setTitleEn("");
    setAdvisorName("");
    setCoAdvisorName("");
    setStatus("IN_PROGRESS");
    setAbstractTh("");
    setAbstractEn("");
    setKeywords("");
    setSimilarityPercentage(undefined);
    setNewBodyOfKnowledge("");
    setDocumentUrl("");
    setYearGraduated(2568);
  }

  function openEdit(th: ThesisDto) {
    setEditingThesis(th);
    setStudentCode("");
    setAuthorName(th.authorName);
    setTitleTh(th.titleTh);
    setTitleEn(th.titleEn || "");
    setAdvisorName(th.advisorName);
    setCoAdvisorName(th.coAdvisorName || "");
    setStatus(th.status as "TOPIC_PROPOSED" | "PROPOSAL_DEFENSE" | "IN_PROGRESS" | "FINAL_DEFENSE" | "COMPLETED" | "PUBLISHED");
    setAbstractTh(th.abstractTh || "");

    setAbstractEn(th.abstractEn || "");
    setKeywords(th.keywords || "");
    setSimilarityPercentage(th.similarityPercentage ?? undefined);
    setNewBodyOfKnowledge(th.newBodyOfKnowledge || "");
    setDocumentUrl(th.documentUrl || "");
    setYearGraduated(th.yearGraduated ?? undefined);
  }

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(async () => {
      if (editingThesis) {
        const res = await updateThesisAction({
          id: editingThesis.id,
          authorName,
          titleTh,
          titleEn: titleEn || null,
          advisorName,
          coAdvisorName: coAdvisorName || null,
          status,
          abstractTh: abstractTh || null,
          abstractEn: abstractEn || null,
          keywords: keywords || null,
          similarityPercentage: similarityPercentage !== undefined ? Number(similarityPercentage) : null,
          newBodyOfKnowledge: newBodyOfKnowledge || null,
          documentUrl: documentUrl || null,
          yearGraduated: yearGraduated !== undefined ? Number(yearGraduated) : null,
        });

        if (res.ok) {
          toast.success("บันทึกการแก้ไขวิทยานิพนธ์สำเร็จ");
          setEditingThesis(null);
          refresh();
        } else {
          toast.error(res.error.message);
        }
      } else {
        const res = await createThesisAction({
          studentCode,
          authorName,
          titleTh,
          titleEn: titleEn || null,
          advisorName,
          coAdvisorName: coAdvisorName || null,
          status,
          abstractTh: abstractTh || null,
          abstractEn: abstractEn || null,
          keywords: keywords || null,
          similarityPercentage: similarityPercentage !== undefined ? Number(similarityPercentage) : null,
          newBodyOfKnowledge: newBodyOfKnowledge || null,
          documentUrl: documentUrl || null,
          yearGraduated: yearGraduated !== undefined ? Number(yearGraduated) : null,
        });

        if (res.ok) {
          toast.success("เพิ่มข้อมูลวิทยานิพนธ์เรียบร้อยแล้ว");
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
      const res = await deleteThesisAction(id);
      if (res.ok) {
        toast.success("ลบวิทยานิพนธ์เรียบร้อยแล้ว");
        setDeletingId(null);
        refresh();
      } else {
        toast.error(res.error.message);
      }
    });
  }

  async function refresh() {
    const res = await getAdminThesesAction();
    if (res.ok) setTheses(res.data);
  }

  const columns: DataTableColumn<ThesisDto>[] = [
    {
      key: "title",
      header: t("thesis.thesisTitle"),
      render: (row) => (
        <div>
          <div className="font-semibold text-stone-900 leading-snug">{row.titleTh}</div>
          {row.titleEn && <div className="text-xs text-muted-foreground italic mt-0.5">{row.titleEn}</div>}
          {row.newBodyOfKnowledge && (
            <div className="flex items-center gap-1 text-xs text-amber-800 mt-1 font-medium bg-amber-50 px-2 py-0.5 rounded w-fit">
              <Sparkles className="w-3 h-3" />
              <span>{row.newBodyOfKnowledge}</span>
            </div>
          )}
        </div>
      ),
    },
    {
      key: "author",
      header: t("thesis.author"),
      render: (row) => (
        <div>
          <div className="font-semibold text-stone-800 text-sm flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-stone-400" />
            {row.authorName}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            ที่ปรึกษา: {row.advisorName}
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: t("thesis.status"),
      className: "nowrap text-xs",
      render: (row) => {
        const toneMap: Record<string, "ok" | "warn" | "bad" | "info" | "off"> = {
          TOPIC_PROPOSED: "off",
          PROPOSAL_DEFENSE: "info",
          IN_PROGRESS: "warn",
          FINAL_DEFENSE: "info",
          COMPLETED: "ok",
          PUBLISHED: "ok",
        };
        const labelMap: Record<string, string> = {
          TOPIC_PROPOSED: t("thesis.statusProposed"),
          PROPOSAL_DEFENSE: t("thesis.statusProposalExam"),
          IN_PROGRESS: t("thesis.statusInProgress"),
          FINAL_DEFENSE: t("thesis.statusFinalExam"),
          COMPLETED: "สอบผ่านสมบูรณ์",
          PUBLISHED: t("thesis.statusPublished"),
        };
        return (
          <StatusPill tone={toneMap[row.status] || "off"}>
            {labelMap[row.status] || row.status}
          </StatusPill>
        );
      },
    },
    {
      key: "similarity",
      header: "อักขราวิสุทธิ์",
      className: "nowrap text-xs font-mono",
      render: (row) => {
        if (row.similarityPercentage === null || row.similarityPercentage === undefined) return <span className="text-muted-foreground">—</span>;
        const tone = row.similarityPercentage <= 5 ? "text-emerald-700 bg-emerald-50" : "text-amber-700 bg-amber-50";
        return (
          <span className={`px-2 py-0.5 rounded font-bold ${tone}`}>
            {row.similarityPercentage}%
          </span>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("thesis.adminTitle")}</h1>
          <p className="text-sm text-muted-foreground">{t("thesis.adminSubtitle")}</p>
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
            {t("thesis.create")}
          </Button>
        )}
      </div>

      <LiyonCard>
        <DataTable<ThesisDto>
          headHeading={
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-amber-800" />
              <h2 className="text-base font-semibold">{t("thesis.title")} ({theses.length} เรื่อง)</h2>
            </div>
          }
          state={theses.length === 0 ? "empty" : "data"}
          rows={theses}
          columns={columns}
          getRowId={(row) => row.id}
          renderRowMenu={
            canManage
              ? (row) => (
                  <>
                    <RowMenuItem onSelect={() => openEdit(row)} icon={<Edit className="w-4 h-4" />}>
                      แก้ไขสถานะ / ข้อมูลวิทยานิพนธ์
                    </RowMenuItem>
                    <RowMenuItem
                      danger
                      onSelect={() => setDeletingId(row.id)}
                      icon={<Trash2 className="w-4 h-4 text-red-600" />}
                    >
                      ลบวิทยานิพนธ์
                    </RowMenuItem>
                  </>
                )
              : undefined
          }
          empty={{
            icon: <GraduationCap className="h-10 w-10 text-muted-foreground/50" />,
            title: t("thesis.empty"),
            description: "คลิกปุ่ม 'เพิ่มหัวข้อวิทยานิพนธ์' เพื่อเริ่มบันทึกข้อมูลวิจัย",
          }}
          error={{
            icon: <AlertCircle className="h-10 w-10 text-destructive" />,
            title: t("common.error"),
          }}
        />
      </LiyonCard>

      {/* Create / Edit Dialog */}
      <LiyonDialog
        open={isCreateOpen || !!editingThesis}
        onOpenChange={(open: boolean) => {
          if (!open) {
            setIsCreateOpen(false);
            setEditingThesis(null);
          }
        }}
        wide
      >
        <LiyonDialogCloseButton label={t("common.close")} />
        <LiyonDialogHeader
          title={editingThesis ? "แก้ไขข้อมูลวิทยานิพนธ์" : t("thesis.create")}
          description={t("thesis.adminSubtitle")}
        />

        <form onSubmit={handleSave}>
          <LiyonDialogBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
              {!editingThesis && (
                <LiyonField label="รหัสนิสิตผู้วิจัย">
                  <input
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                    value={studentCode}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStudentCode(e.target.value)}
                    placeholder="เช่น 6701501001"
                    required
                  />
                </LiyonField>
              )}

              <LiyonField label={t("thesis.author")}>
                <input
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                  value={authorName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthorName(e.target.value)}
                  placeholder="ชื่อ-ฉายา หรือ นามสกุลผู้วิจัย"
                  required
                />
              </LiyonField>

              <div className="md:col-span-2">
                <LiyonField label={t("thesis.thesisTitle")}>
                  <input
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                    value={titleTh}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitleTh(e.target.value)}
                    placeholder="ชื่อวิทยานิพนธ์ภาษาไทย"
                    required
                  />
                </LiyonField>
              </div>

              <div className="md:col-span-2">
                <LiyonField label="ชื่อวิทยานิพนธ์ภาษาอังกฤษ">
                  <input
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                    value={titleEn}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitleEn(e.target.value)}
                    placeholder="Thesis Title in English"
                  />
                </LiyonField>
              </div>

              <LiyonField label={t("thesis.advisor")}>
                <input
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                  value={advisorName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAdvisorName(e.target.value)}
                  placeholder="เช่น พระธรรมพัชรญาณมุนี, ศ.ดร..."
                  required
                />
              </LiyonField>

              <LiyonField label="อาจารย์ที่ปรึกษาร่วม (ถ้ามี)">
                <input
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                  value={coAdvisorName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCoAdvisorName(e.target.value)}
                  placeholder="อาจารย์ที่ปรึกษาร่วม"
                />
              </LiyonField>

              <LiyonField label={t("thesis.status")}>
                <LiyonSelect
                  value={status}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setStatus(e.target.value as "TOPIC_PROPOSED" | "PROPOSAL_DEFENSE" | "IN_PROGRESS" | "FINAL_DEFENSE" | "COMPLETED" | "PUBLISHED")
                  }
                >

                  <option value="TOPIC_PROPOSED">{t("thesis.statusProposed")}</option>
                  <option value="PROPOSAL_DEFENSE">{t("thesis.statusProposalExam")}</option>
                  <option value="IN_PROGRESS">{t("thesis.statusInProgress")}</option>
                  <option value="FINAL_DEFENSE">{t("thesis.statusFinalExam")}</option>
                  <option value="COMPLETED">สอบผ่านสมบูรณ์</option>
                  <option value="PUBLISHED">{t("thesis.statusPublished")}</option>
                </LiyonSelect>
              </LiyonField>

              <LiyonField label="ผลตรวจความซ้ำซ้อน (%)">
                <input
                  type="number"
                  step="0.1"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                  value={similarityPercentage ?? ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSimilarityPercentage(e.target.value === "" ? undefined : parseFloat(e.target.value))
                  }
                  placeholder="เช่น 1.8"
                />
              </LiyonField>

              <div className="md:col-span-2">
                <LiyonField label={t("thesis.newKnowledge")}>
                  <input
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                    value={newBodyOfKnowledge}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewBodyOfKnowledge(e.target.value)}
                    placeholder="เช่น รูปแบบการประยุกต์สติปัฏฐานเพื่อบำบัดภาวะหมดไฟ (Burnout)..."
                  />
                </LiyonField>
              </div>

              <div className="md:col-span-2">
                <LiyonField label="คำสำคัญ (Keywords)">
                  <input
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                    value={keywords}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeywords(e.target.value)}
                    placeholder="เช่น สติปัฏฐาน ๔, วิปัสสนาภาวนา, สุขภาพจิต, อานาปานสติ"
                  />
                </LiyonField>
              </div>

              <div className="md:col-span-2">
                <LiyonField label={t("thesis.abstract")}>
                  <textarea
                    rows={4}
                    value={abstractTh}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAbstractTh(e.target.value)}
                    placeholder="บทคัดย่อภาษาไทย..."
                    className="w-full rounded-md border border-input bg-background p-3 text-sm shadow-sm"
                  />
                </LiyonField>
              </div>

              <LiyonField label="ปีที่สำเร็จการศึกษา (พ.ศ.)">
                <input
                  type="number"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                  value={yearGraduated ?? ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setYearGraduated(e.target.value === "" ? undefined : parseInt(e.target.value))
                  }
                  placeholder="2568"
                />
              </LiyonField>

              <LiyonField label="ลิงก์ไฟล์เล่มวิทยานิพนธ์ (PDF)">
                <input
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                  value={documentUrl}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDocumentUrl(e.target.value)}
                  placeholder="https://..."
                />
              </LiyonField>
            </div>
          </LiyonDialogBody>
          <LiyonDialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsCreateOpen(false);
                setEditingThesis(null);
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
              {isPending ? "กำลังบันทึก..." : "บันทึกวิทยานิพนธ์"}
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
          title="ลบวิทยานิพนธ์"
          description="คุณแน่ใจหรือไม่ว่าต้องการลบวิทยานิพนธ์เรื่องนี้?"
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
            {isPending ? "กำลังลบ..." : "ลบวิทยานิพนธ์"}
          </Button>
        </LiyonDialogFooter>
      </LiyonDialog>
    </div>
  );
}
