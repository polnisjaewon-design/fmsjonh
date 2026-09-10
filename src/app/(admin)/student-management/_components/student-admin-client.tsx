"use client";

import { useState, useTransition } from "react";
import { Users, Plus, Edit, Trash2, GraduationCap, Building2, Phone, AlertCircle } from "lucide-react";
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
import type { StudentProfileDto } from "@/features/student";
import {
  createStudentAction,
  updateStudentAction,
  deleteStudentAction,
  getStudentsAction,
} from "@/features/student/actions";

export function StudentAdminClient({
  initialStudents,
  canManage,
}: {
  initialStudents: StudentProfileDto[];
  canManage: boolean;
}) {
  const t = useT();
  const [students, setStudents] = useState<StudentProfileDto[]>(initialStudents);
  const [isPending, startTransition] = useTransition();

  // Dialog states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentProfileDto | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form states
  const [studentCode, setStudentCode] = useState("");
  const [applicantType, setApplicantType] = useState<"MONK" | "NOVICE" | "NUN" | "LAYPERSON">("MONK");
  const [titleTh, setTitleTh] = useState("พระมหา");
  const [firstNameTh, setFirstNameTh] = useState("");
  const [lastNameTh, setLastNameTh] = useState("");
  const [monasticName, setMonasticName] = useState("");
  const [monasticRank, setMonasticRank] = useState("");
  const [templeName, setTempleName] = useState("");
  const [ecclesiasticalProvince, setEcclesiasticalProvince] = useState("");
  const [batchYear, setBatchYear] = useState(2569);
  const [status, setStatus] = useState<"STUDYING" | "LEAVE" | "GRADUATED" | "RETIRED">("STUDYING");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  function resetForm() {
    setStudentCode("");
    setApplicantType("MONK");
    setTitleTh("พระมหา");
    setFirstNameTh("");
    setLastNameTh("");
    setMonasticName("");
    setMonasticRank("");
    setTempleName("");
    setEcclesiasticalProvince("");
    setBatchYear(2569);
    setStatus("STUDYING");
    setPhone("");
    setEmail("");
  }

  function openEdit(st: StudentProfileDto) {
    setEditingStudent(st);
    setStudentCode(st.studentCode);
    setApplicantType(st.applicantType as "MONK" | "NOVICE" | "NUN" | "LAYPERSON");
    setTitleTh(st.titleTh);
    setFirstNameTh(st.firstNameTh);
    setLastNameTh(st.lastNameTh || "");
    setMonasticName(st.monasticName || "");
    setMonasticRank(st.monasticRank || "");
    setTempleName(st.templeName || "");
    setEcclesiasticalProvince(st.ecclesiasticalProvince || "");
    setBatchYear(st.batchYear);
    setStatus(st.status as "STUDYING" | "LEAVE" | "GRADUATED" | "RETIRED");
    setPhone(st.phone || "");
    setEmail(st.email || "");
  }

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(async () => {
      if (editingStudent) {
        const res = await updateStudentAction({
          id: editingStudent.id,
          studentCode,
          applicantType,
          titleTh,
          firstNameTh,
          lastNameTh: lastNameTh || null,
          monasticName: monasticName || null,
          monasticRank: monasticRank || null,
          templeName: templeName || null,
          ecclesiasticalProvince: ecclesiasticalProvince || null,
          batchYear,
          status,
          phone: phone || null,
          email: email || null,
        });

        if (res.ok) {
          toast.success("บันทึกการแก้ไขข้อมูลนิสิตสำเร็จ");
          setEditingStudent(null);
          refreshList();
        } else {
          toast.error(res.error.message);
        }
      } else {
        const res = await createStudentAction({
          studentCode,
          applicantType,
          titleTh,
          firstNameTh,
          lastNameTh: lastNameTh || null,
          monasticName: monasticName || null,
          monasticRank: monasticRank || null,
          templeName: templeName || null,
          ecclesiasticalProvince: ecclesiasticalProvince || null,
          batchYear,
          status,
          phone: phone || null,
          email: email || null,
        });

        if (res.ok) {
          toast.success("เพิ่มข้อมูลนิสิตเรียบร้อยแล้ว");
          setIsCreateOpen(false);
          resetForm();
          refreshList();
        } else {
          toast.error(res.error.message);
        }
      }
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      const res = await deleteStudentAction(id);
      if (res.ok) {
        toast.success("ลบข้อมูลนิสิตเรียบร้อยแล้ว");
        setDeletingId(null);
        refreshList();
      } else {
        toast.error(res.error.message);
      }
    });
  }

  async function refreshList() {
    const res = await getStudentsAction();
    if (res.ok) setStudents(res.data);
  }

  const columns: DataTableColumn<StudentProfileDto>[] = [
    {
      key: "code",
      header: t("student.code"),
      className: "nowrap font-mono text-xs font-bold text-amber-900",
      render: (row) => <span>{row.studentCode}</span>,
    },
    {
      key: "name",
      header: t("student.fullName"),
      render: (row) => (
        <div>
          <div className="font-semibold text-stone-900">
            {row.monasticRank ? <span className="text-amber-800 mr-1.5">{row.monasticRank}</span> : null}
            {row.fullNameTh}
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
            {row.templeName && (
              <span className="flex items-center gap-1">
                <Building2 className="w-3 h-3 text-amber-700" />
                {row.templeName}
              </span>
            )}
            {row.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {row.phone}
              </span>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "batch",
      header: t("student.batch"),
      className: "nowrap text-xs",
      render: (row) => (
        <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-mono font-medium">
          รุ่น {row.batchYear}
        </span>
      ),
    },
    {
      key: "type",
      header: "ประเภท",
      className: "nowrap text-xs",
      render: (row) => {
        const labels: Record<string, string> = {
          MONK: "พระภิกษุ",
          NOVICE: "สามเณร",
          NUN: "แม่ชี",
          LAYPERSON: "คฤหัสถ์",
        };
        return <span className="text-stone-600">{labels[row.applicantType] || row.applicantType}</span>;
      },
    },
    {
      key: "status",
      header: t("student.status"),
      render: (row) => {
        const toneMap: Record<string, "ok" | "warn" | "bad" | "info"> = {
          STUDYING: "ok",
          LEAVE: "warn",
          GRADUATED: "info",
          RETIRED: "bad",
        };
        const labelMap: Record<string, string> = {
          STUDYING: t("student.statusStudying"),
          LEAVE: t("student.statusLeave"),
          GRADUATED: t("student.statusGraduated"),
          RETIRED: t("student.statusRetired"),
        };
        return (
          <StatusPill tone={toneMap[row.status] || "ok"}>
            {labelMap[row.status] || row.status}
          </StatusPill>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("student.adminTitle")}</h1>
          <p className="text-sm text-muted-foreground">{t("student.adminSubtitle")}</p>
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
            {t("student.create")}
          </Button>
        )}
      </div>

      <LiyonCard>
        <DataTable<StudentProfileDto>
          headHeading={
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-amber-800" />
              <h2 className="text-base font-semibold">{t("student.title")} ({students.length} รูป/ท่าน)</h2>
            </div>
          }
          state={students.length === 0 ? "empty" : "data"}
          rows={students}
          columns={columns}
          getRowId={(row) => row.id}
          renderRowMenu={
            canManage
              ? (row) => (
                  <>
                    <RowMenuItem onSelect={() => openEdit(row)} icon={<Edit className="w-4 h-4" />}>
                      {t("student.edit")}
                    </RowMenuItem>
                    <RowMenuItem
                      danger
                      onSelect={() => setDeletingId(row.id)}
                      icon={<Trash2 className="w-4 h-4 text-red-600" />}
                    >
                      {t("student.delete")}
                    </RowMenuItem>
                  </>
                )
              : undefined
          }
          empty={{
            icon: <Users className="h-10 w-10 text-muted-foreground/50" />,
            title: "ไม่พบข้อมูลทะเบียนนิสิต",
            description: "คลิกปุ่ม 'เพิ่มนิสิตใหม่' เพื่อเริ่มบันทึกทะเบียนประวัตินิสิต",
          }}
          error={{
            icon: <AlertCircle className="h-10 w-10 text-destructive" />,
            title: t("common.error"),
          }}
        />
      </LiyonCard>

      {/* Create / Edit Dialog */}
      <LiyonDialog
        open={isCreateOpen || !!editingStudent}
        onOpenChange={(open: boolean) => {
          if (!open) {
            setIsCreateOpen(false);
            setEditingStudent(null);
          }
        }}
        wide
      >
        <LiyonDialogCloseButton label={t("common.close")} />
        <LiyonDialogHeader
          title={editingStudent ? t("student.edit") : t("student.create")}
          description={t("student.adminSubtitle")}
        />

        <form onSubmit={handleSave}>
          <LiyonDialogBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
              <LiyonField label={t("student.code")}>
                <input
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                  value={studentCode}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStudentCode(e.target.value)}
                  placeholder="เช่น 6701501001"
                  required
                />
              </LiyonField>

              <LiyonField label="ประเภทผู้สมัคร/นิสิต">
                <LiyonSelect
                  value={applicantType}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setApplicantType(e.target.value as "MONK" | "NOVICE" | "NUN" | "LAYPERSON")
                  }
                >
                  <option value="MONK">พระภิกษุ</option>
                  <option value="NOVICE">สามเณร</option>
                  <option value="NUN">แม่ชี</option>
                  <option value="LAYPERSON">คฤหัสถ์ (ชาย/หญิง)</option>
                </LiyonSelect>
              </LiyonField>

              <LiyonField label="คำนำหน้าชื่อ">
                <input
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                  value={titleTh}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitleTh(e.target.value)}
                  placeholder="เช่น พระมหา, พระปลัด, พระครู, นาย, นางสาว"
                  required
                />
              </LiyonField>

              <LiyonField label="ชื่อภาษาไทย">
                <input
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                  value={firstNameTh}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstNameTh(e.target.value)}
                  placeholder="ชื่อนิสิต"
                  required
                />
              </LiyonField>

              <LiyonField label="ฉายา (สำหรับบรรพชิต)">
                <input
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                  value={monasticName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMonasticName(e.target.value)}
                  placeholder="เช่น เขมธมฺโม, ญาณวีโร"
                />
              </LiyonField>

              <LiyonField label="นามสกุล (ถ้ามี)">
                <input
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                  value={lastNameTh}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastNameTh(e.target.value)}
                  placeholder="นามสกุล"
                />
              </LiyonField>

              <LiyonField label="สมณศักดิ์ (ถ้ามี)">
                <input
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                  value={monasticRank}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMonasticRank(e.target.value)}
                  placeholder="เช่น พระครูสัญญาบัตรเทียบผู้ช่วยเจ้าอาวาส..."
                />
              </LiyonField>

              <LiyonField label={t("student.temple")}>
                <input
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                  value={templeName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTempleName(e.target.value)}
                  placeholder="เช่น วัดมหาธาตุยุวราชรังสฤษฎิ์ ราชวรมหาวิหาร"
                />
              </LiyonField>

              <LiyonField label={t("student.province")}>
                <input
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                  value={ecclesiasticalProvince}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEcclesiasticalProvince(e.target.value)}
                  placeholder="เช่น เจ้าคณะกรุงเทพมหานคร / ภาค ๑"
                />
              </LiyonField>

              <LiyonField label={t("student.batch")}>
                <input
                  type="number"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                  value={batchYear}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBatchYear(parseInt(e.target.value) || 2569)}
                  required
                />
              </LiyonField>

              <LiyonField label={t("student.status")}>
                <LiyonSelect
                  value={status}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setStatus(e.target.value as "STUDYING" | "LEAVE" | "GRADUATED" | "RETIRED")
                  }
                >
                  <option value="STUDYING">{t("student.statusStudying")}</option>
                  <option value="LEAVE">{t("student.statusLeave")}</option>
                  <option value="GRADUATED">{t("student.statusGraduated")}</option>
                  <option value="RETIRED">{t("student.statusRetired")}</option>
                </LiyonSelect>
              </LiyonField>

              <LiyonField label="เบอร์โทรศัพท์">
                <input
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                  value={phone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                  placeholder="08X-XXX-XXXX"
                />
              </LiyonField>

              <div className="md:col-span-2">
                <LiyonField label="อีเมลติดต่อ">
                  <input
                    type="email"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    placeholder="student@mcu.ac.th"
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
                setEditingStudent(null);
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
              {isPending ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
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
          title={t("student.delete")}
          description={t("student.deleteConfirm")}
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
            {isPending ? "กำลังลบ..." : t("student.delete")}
          </Button>
        </LiyonDialogFooter>
      </LiyonDialog>
    </div>
  );
}
