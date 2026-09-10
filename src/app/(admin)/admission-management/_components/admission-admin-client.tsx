"use client";

import { useState, useTransition } from "react";
import { UserCheck, Layers, AlertCircle, Eye, CheckCircle2, XCircle } from "lucide-react";
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
  RowMenuItem,
  type DataTableColumn,
} from "@/shared/components/liyon";
import { Button } from "@/components/ui/button";
import type { ApplicationDto } from "@/features/admission";
import { updateApplicationStatusAction, getAdminApplicationsAction } from "@/features/admission/actions";

export function AdmissionAdminClient({
  initialApplications,
  canManage,
}: {
  initialApplications: ApplicationDto[];
  canManage: boolean;
}) {
  const t = useT();
  const locale = useLocale();
  const [applications, setApplications] = useState<ApplicationDto[]>(initialApplications);
  const [selectedApp, setSelectedApp] = useState<ApplicationDto | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleStatus(id: string, status: "PAYMENT_VERIFIED" | "INTERVIEW_PASSED" | "REJECTED") {
    startTransition(async () => {
      const res = await updateApplicationStatusAction({ id, status });
      if (res.ok) {
        toast.success("อัปเดตสถานะผู้สมัครแล้ว");
        setSelectedApp(null);
        const ref = await getAdminApplicationsAction();
        if (ref.ok) setApplications(ref.data);
      } else {
        toast.error(res.error.message);
      }
    });
  }

  const columns: DataTableColumn<ApplicationDto>[] = [
    {
      key: "no",
      header: t("admission.applicationNo"),
      className: "nowrap font-mono text-xs font-bold text-amber-900",
      render: (row) => <span>{row.applicationNo}</span>,
    },
    {
      key: "name",
      header: t("admission.firstName"),
      render: (row) => (
        <div>
          <div className="font-semibold text-stone-900">{row.fullNameTh}</div>
          <div className="text-xs text-muted-foreground">{row.email} • {row.phone}</div>
        </div>
      ),
    },
    {
      key: "temple",
      header: t("admission.temple"),
      render: (row) => <span className="text-xs text-stone-600">{row.templeName || "—"}</span>,
    },
    {
      key: "status",
      header: t("admission.status"),
      render: (row) => {
        const tone = row.status === "PAYMENT_VERIFIED" || row.status === "INTERVIEW_PASSED" ? "ok" : row.status === "REJECTED" ? "bad" : "warn";
        return (
          <StatusPill tone={tone}>
            {row.status === "PAYMENT_VERIFIED"
              ? t("admission.statusVerified")
              : row.status === "INTERVIEW_PASSED"
              ? t("admission.statusPassed")
              : row.status === "REJECTED"
              ? t("admission.statusRejected")
              : t("admission.statusSubmitted")}
          </StatusPill>
        );
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
        <h1 className="text-2xl font-bold tracking-tight">{t("admission.adminTitle")}</h1>
        <p className="text-sm text-muted-foreground">{t("admission.adminSubtitle")}</p>
      </div>

      <LiyonCard>
        <DataTable<ApplicationDto>
          headHeading={<h2 className="text-base font-semibold">{t("admission.adminTitle")}</h2>}
          state={applications.length === 0 ? "empty" : "data"}
          rows={applications}
          columns={columns}
          getRowId={(row) => row.id}
          renderRowMenu={(row) => (
            <RowMenuItem onSelect={() => setSelectedApp(row)} icon={<Eye className="w-4 h-4" />}>
              ดูใบสมัคร / ตรวจสอบ
            </RowMenuItem>
          )}
          empty={{
            icon: <Layers className="h-10 w-10 text-muted-foreground/50" />,
            title: "ยังไม่มีผู้ยื่นใบสมัคร",
            description: t("admission.adminSubtitle"),
          }}
          error={{
            icon: <AlertCircle className="h-10 w-10 text-destructive" />,
            title: t("common.error"),
          }}
        />
      </LiyonCard>

      {/* Dialog รายละเอียดผู้สมัคร */}
      <LiyonDialog open={!!selectedApp} onOpenChange={(open) => !open && setSelectedApp(null)} wide>
        <LiyonDialogCloseButton label={t("common.close")} />
        <LiyonDialogHeader
          title={`ใบสมัครเลขที่ ${selectedApp?.applicationNo}`}
          description={`ยื่นเมื่อ ${selectedApp?.createdAt ? formatDate(new Date(selectedApp.createdAt), locale) : ""}`}
        />
        <LiyonDialogBody>
          <div className="space-y-4 py-2 text-sm">
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-stone-50 border">
              <div>
                <span className="text-xs text-stone-500 block">ชื่อ-ฉายา:</span>
                <span className="font-semibold text-stone-900">{selectedApp?.fullNameTh}</span>
              </div>
              <div>
                <span className="text-xs text-stone-500 block">สถานะผู้สมัคร:</span>
                <span className="font-medium text-stone-800">{selectedApp?.applicantType}</span>
              </div>
              <div>
                <span className="text-xs text-stone-500 block">วัดสังกัด:</span>
                <span className="text-stone-800">{selectedApp?.templeName || "—"}</span>
              </div>
              <div>
                <span className="text-xs text-stone-500 block">เบอร์โทรศัพท์ / อีเมล:</span>
                <span className="text-stone-800">{selectedApp?.phone} • {selectedApp?.email}</span>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-stone-700 block mb-1">วุฒิการศึกษาเดิม:</span>
              <p className="p-3 rounded-xl bg-white border text-stone-800 text-xs leading-relaxed">
                {selectedApp?.educationBackground || "—"}
              </p>
            </div>

            {selectedApp?.paymentSlipUrl && (
              <div>
                <span className="text-xs font-semibold text-stone-700 block mb-1">สลิปชำระเงิน:</span>
                <a
                  href={selectedApp.paymentSlipUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-amber-800 underline block truncate"
                >
                  {selectedApp.paymentSlipUrl}
                </a>
              </div>
            )}
          </div>
        </LiyonDialogBody>
        <LiyonDialogFooter>
          {canManage && (
            <div className="flex gap-2 w-full justify-between">
              <Button
                variant="destructive"
                onClick={() => selectedApp && handleStatus(selectedApp.id, "REJECTED")}
                disabled={isPending}
              >
                <XCircle className="w-4 h-4 mr-1.5" />
                <span>ปฏิเสธ</span>
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => selectedApp && handleStatus(selectedApp.id, "PAYMENT_VERIFIED")}
                  disabled={isPending}
                >
                  <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-600" />
                  <span>ตรวจสลิปผ่าน</span>
                </Button>
                <Button
                  className="bg-amber-800 hover:bg-amber-900 text-white"
                  onClick={() => selectedApp && handleStatus(selectedApp.id, "INTERVIEW_PASSED")}
                  disabled={isPending}
                >
                  <UserCheck className="w-4 h-4 mr-1.5" />
                  <span>ผ่านคัดเลือก</span>
                </Button>
              </div>
            </div>
          )}
        </LiyonDialogFooter>
      </LiyonDialog>
    </div>
  );
}
