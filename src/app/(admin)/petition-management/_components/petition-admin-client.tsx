"use client";

import { useState, useTransition } from "react";
import { FileCheck, CheckCircle2, XCircle, Eye, Inbox, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useT, useLocale } from "@/shared/lib/i18n/client";
import { formatDate } from "@/shared/lib/format";
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
  RowMenuItem,
  type DataTableColumn,
} from "@/shared/components/liyon";
import { Button } from "@/components/ui/button";
import type { StudentPetitionDto } from "@/features/petition";
import {
  reviewPetitionAction,
  getAdminPetitionsAction,
} from "@/features/petition/actions";

export function PetitionAdminClient({
  initialPetitions,
  canApprove,
}: {
  initialPetitions: StudentPetitionDto[];
  canApprove: boolean;
}) {
  const t = useT();
  const locale = useLocale();
  const [petitions, setPetitions] = useState<StudentPetitionDto[]>(initialPetitions);
  const [selectedPetition, setSelectedPetition] = useState<StudentPetitionDto | null>(null);
  const [approverNote, setApproverNote] = useState("");
  const [isPending, startTransition] = useTransition();

  function openReview(p: StudentPetitionDto) {
    setSelectedPetition(p);
    setApproverNote(p.approverNote || "");
  }

  function handleReview(status: "APPROVED" | "REJECTED") {
    if (!selectedPetition) return;

    startTransition(async () => {
      const res = await reviewPetitionAction({
        id: selectedPetition.id,
        status,
        approverNote: approverNote || null,
      });

      if (res.ok) {
        toast.success(
          status === "APPROVED" ? "อนุมัติคำร้องเรียบร้อยแล้ว" : "บันทึกผลการไม่อนุมัติคำร้องแล้ว"
        );
        setSelectedPetition(null);
        refresh();
      } else {
        toast.error(res.error.message);
      }
    });
  }

  async function refresh() {
    const res = await getAdminPetitionsAction();
    if (res.ok) setPetitions(res.data);
  }

  const columns: DataTableColumn<StudentPetitionDto>[] = [
    {
      key: "no",
      header: t("petition.no"),
      className: "nowrap font-mono text-xs font-bold text-amber-900",
      render: (row) => <span>{row.petitionNo}</span>,
    },
    {
      key: "student",
      header: t("petition.student"),
      render: (row) => (
        <div>
          <div className="font-semibold text-stone-900">{row.studentName}</div>
          <div className="text-xs text-muted-foreground font-mono">{row.studentCode}</div>
        </div>
      ),
    },
    {
      key: "subject",
      header: t("petition.formTitle"),
      render: (row) => (
        <div>
          <div className="font-medium text-stone-800">{row.title}</div>
          <div className="text-xs text-amber-800 font-medium mt-0.5">{row.templateTitle}</div>
        </div>
      ),
    },
    {
      key: "status",
      header: t("petition.status"),
      render: (row) => {
        const tone =
          row.status === "APPROVED" ? "ok" : row.status === "REJECTED" ? "bad" : "warn";
        const label =
          row.status === "APPROVED"
            ? t("petition.statusApproved")
            : row.status === "REJECTED"
            ? t("petition.statusRejected")
            : t("petition.statusPending");
        return <StatusPill tone={tone}>{label}</StatusPill>;
      },
    },
    {
      key: "date",
      header: "วันที่ยื่น",
      className: "nowrap text-xs text-muted-foreground",
      render: (row) => <span>{formatDate(new Date(row.createdAt), locale)}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("petition.adminTitle")}</h1>
        <p className="text-sm text-muted-foreground">{t("petition.adminSubtitle")}</p>
      </div>

      <LiyonCard>
        <DataTable<StudentPetitionDto>
          headHeading={
            <div className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-amber-800" />
              <h2 className="text-base font-semibold">{t("petition.adminTitle")} ({petitions.length} ฉบับ)</h2>
            </div>
          }
          state={petitions.length === 0 ? "empty" : "data"}
          rows={petitions}
          columns={columns}
          getRowId={(row) => row.id}
          renderRowMenu={(row) => (
            <RowMenuItem onSelect={() => openReview(row)} icon={<Eye className="w-4 h-4" />}>
              พิจารณา / อนุมัติคำร้อง
            </RowMenuItem>
          )}
          empty={{
            icon: <Inbox className="h-10 w-10 text-muted-foreground/50" />,
            title: "ไม่มีคำร้องที่รอดำเนินการ",
            description: "เมื่อนิสิตส่งคำร้องผ่านพอร์ทัล ข้อมูลจะปรากฏในกล่องงานนี้",
          }}
          error={{
            icon: <AlertCircle className="h-10 w-10 text-destructive" />,
            title: t("common.error"),
          }}
        />
      </LiyonCard>

      {/* Review Dialog */}
      <LiyonDialog
        open={!!selectedPetition}
        onOpenChange={(open: boolean) => !open && setSelectedPetition(null)}
        wide
      >
        <LiyonDialogCloseButton label={t("common.close")} />
        <LiyonDialogHeader
          title="พิจารณาอนุมัติคำร้อง"
          description={t("petition.adminSubtitle")}
        />

        {selectedPetition && (
          <LiyonDialogBody>
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4 p-4 bg-stone-50 rounded-lg border border-stone-200 text-sm">
                <div>
                  <span className="text-muted-foreground block text-xs">เลขที่คำร้อง</span>
                  <span className="font-mono font-bold text-amber-900">{selectedPetition.petitionNo}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs">สถานะปัจจุบัน</span>
                  <span className="font-semibold text-stone-900">{selectedPetition.status}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs">นิสิตผู้ยื่น</span>
                  <span className="font-semibold text-stone-900">{selectedPetition.studentName}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-xs">รหัสนิสิต</span>
                  <span className="font-mono text-stone-700">{selectedPetition.studentCode}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground block text-xs">แบบฟอร์มคำร้อง</span>
                  <span className="font-medium text-amber-800">{selectedPetition.templateTitle}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground block text-xs">เรื่อง / หัวข้อคำร้อง</span>
                  <span className="font-semibold text-stone-900">{selectedPetition.title}</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1.5">
                  รายละเอียด / เหตุผลความจำเป็นของผู้ยื่น:
                </label>
                <div className="p-3.5 bg-amber-50/50 rounded-lg border border-amber-200/80 text-sm text-stone-800 whitespace-pre-wrap leading-relaxed">
                  {selectedPetition.reason}
                </div>
              </div>

              <LiyonField label={t("petition.approverNote")}>
                <textarea
                  rows={3}
                  value={approverNote}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setApproverNote(e.target.value)}
                  placeholder="ระบุข้อความ ความเห็น หรือเงื่อนไขเพิ่มเติม..."
                  className="w-full rounded-md border border-input bg-background p-3 text-sm shadow-sm"
                  disabled={!canApprove}
                />
              </LiyonField>
            </div>
          </LiyonDialogBody>
        )}

        <LiyonDialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setSelectedPetition(null)}
            disabled={isPending}
          >
            ปิด
          </Button>

          {canApprove && selectedPetition?.status === "PENDING" && (
            <div className="flex gap-2">
              <Button
                type="button"
                variant="destructive"
                onClick={() => handleReview("REJECTED")}
                disabled={isPending}
                className="gap-1.5"
              >
                <XCircle className="w-4 h-4" />
                {t("petition.reject")}
              </Button>
              <Button
                type="button"
                onClick={() => handleReview("APPROVED")}
                disabled={isPending}
                className="bg-emerald-700 hover:bg-emerald-800 text-white gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                {t("petition.approve")}
              </Button>
            </div>
          )}
        </LiyonDialogFooter>
      </LiyonDialog>
    </div>
  );
}
