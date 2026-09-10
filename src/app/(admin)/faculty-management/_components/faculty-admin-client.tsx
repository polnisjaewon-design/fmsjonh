"use client";

import { useState, useTransition } from "react";
import { Users, Plus, Edit, Trash2, Building2, Phone, Mail, Sparkles, ShieldCheck, AlertCircle } from "lucide-react";
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
  RowMenuItem,
  type DataTableColumn,
} from "@/shared/components/liyon";
import { Button } from "@/components/ui/button";
import type { FacultyMemberDto } from "@/features/faculty";
import {
  createFacultyMemberAction,
  updateFacultyMemberAction,
  deleteFacultyMemberAction,
  getFacultyMembersAction,
} from "@/features/faculty/actions";

export function FacultyAdminClient({
  initialMembers,
  canManage,
}: {
  initialMembers: FacultyMemberDto[];
  canManage: boolean;
}) {
  const t = useT();
  const [members, setMembers] = useState<FacultyMemberDto[]>(initialMembers);
  const [isPending, startTransition] = useTransition();

  // Dialogs
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<FacultyMemberDto | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form states
  const [titleTh, setTitleTh] = useState("พระมหา");
  const [firstNameTh, setFirstNameTh] = useState("");
  const [lastNameTh, setLastNameTh] = useState("");
  const [monasticName, setMonasticName] = useState("");
  const [monasticRank, setMonasticRank] = useState("");
  const [academicRank, setAcademicRank] = useState("");
  const [templeName, setTempleName] = useState("");
  const [positionTh, setPositionTh] = useState("อาจารย์ประจำหลักสูตร");
  const [positionEn, setPositionEn] = useState("");
  const [isVipassanaMaster, setIsVipassanaMaster] = useState(false);
  const [isExecutive, setIsExecutive] = useState(false);
  const [expertise, setExpertise] = useState("");
  const [educationHistory, setEducationHistory] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  function resetForm() {
    setTitleTh("พระมหา");
    setFirstNameTh("");
    setLastNameTh("");
    setMonasticName("");
    setMonasticRank("");
    setAcademicRank("");
    setTempleName("");
    setPositionTh("อาจารย์ประจำหลักสูตร");
    setPositionEn("");
    setIsVipassanaMaster(false);
    setIsExecutive(false);
    setExpertise("");
    setEducationHistory("");
    setEmail("");
    setPhone("");
    setSortOrder(0);
  }

  function openEdit(m: FacultyMemberDto) {
    setEditingMember(m);
    setTitleTh(m.titleTh);
    setFirstNameTh(m.firstNameTh);
    setLastNameTh(m.lastNameTh || "");
    setMonasticName(m.monasticName || "");
    setMonasticRank(m.monasticRank || "");
    setAcademicRank(m.academicRank || "");
    setTempleName(m.templeName || "");
    setPositionTh(m.positionTh);
    setPositionEn(m.positionEn || "");
    setIsVipassanaMaster(m.isVipassanaMaster);
    setIsExecutive(m.isExecutive);
    setExpertise(m.expertise || "");
    setEducationHistory(m.educationHistory || "");
    setEmail(m.email || "");
    setPhone(m.phone || "");
    setSortOrder(m.sortOrder);
  }

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(async () => {
      if (editingMember) {
        const res = await updateFacultyMemberAction({
          id: editingMember.id,
          titleTh,
          firstNameTh,
          lastNameTh: lastNameTh || null,
          monasticName: monasticName || null,
          monasticRank: monasticRank || null,
          academicRank: academicRank || null,
          templeName: templeName || null,
          positionTh,
          positionEn: positionEn || null,
          isVipassanaMaster,
          isExecutive,
          expertise: expertise || null,
          educationHistory: educationHistory || null,
          email: email || null,
          phone: phone || null,
          sortOrder,
        });

        if (res.ok) {
          toast.success("บันทึกการแก้ไขข้อมูลคณาจารย์สำเร็จ");
          setEditingMember(null);
          refreshList();
        } else {
          toast.error(res.error.message);
        }
      } else {
        const res = await createFacultyMemberAction({
          titleTh,
          firstNameTh,
          lastNameTh: lastNameTh || null,
          monasticName: monasticName || null,
          monasticRank: monasticRank || null,
          academicRank: academicRank || null,
          templeName: templeName || null,
          positionTh,
          positionEn: positionEn || null,
          isVipassanaMaster,
          isExecutive,
          expertise: expertise || null,
          educationHistory: educationHistory || null,
          email: email || null,
          phone: phone || null,
          sortOrder,
        });

        if (res.ok) {
          toast.success("เพิ่มข้อมูลคณาจารย์เรียบร้อยแล้ว");
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
      const res = await deleteFacultyMemberAction(id);
      if (res.ok) {
        toast.success("ลบข้อมูลคณาจารย์เรียบร้อยแล้ว");
        setDeletingId(null);
        refreshList();
      } else {
        toast.error(res.error.message);
      }
    });
  }

  async function refreshList() {
    const res = await getFacultyMembersAction();
    if (res.ok) setMembers(res.data);
  }

  const columns: DataTableColumn<FacultyMemberDto>[] = [
    {
      key: "name",
      header: "ชื่อ - ฉายา / สมณศักดิ์",
      render: (row) => (
        <div>
          {row.monasticRank && (
            <div className="text-xs font-semibold text-amber-900 mb-0.5">{row.monasticRank}</div>
          )}
          <div className="font-semibold text-stone-900">{row.fullNameTh}</div>
          {row.templeName && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <Building2 className="w-3 h-3 text-amber-700" />
              <span>{row.templeName}</span>
            </div>
          )}
        </div>
      ),
    },
    {
      key: "position",
      header: "ตำแหน่งประจำหลักสูตร",
      render: (row) => (
        <div>
          <div className="text-sm font-medium text-stone-800">{row.positionTh}</div>
          {row.positionEn && <div className="text-xs text-muted-foreground">{row.positionEn}</div>}
        </div>
      ),
    },
    {
      key: "role",
      header: "บทบาทหน้าที่",
      className: "nowrap text-xs",
      render: (row) => (
        <div className="flex flex-wrap gap-1.5">
          {row.isVipassanaMaster && (
            <StatusPill tone="ok">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                พระวิปัสสนาจารย์
              </span>
            </StatusPill>
          )}
          {row.isExecutive && (
            <StatusPill tone="info">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                ผู้บริหารหลักสูตร
              </span>
            </StatusPill>
          )}
          {!row.isVipassanaMaster && !row.isExecutive && (
            <StatusPill tone="off">อาจารย์ผู้สอน</StatusPill>
          )}
        </div>
      ),
    },
    {
      key: "contact",
      header: t("faculty.contact"),
      className: "text-xs text-muted-foreground",
      render: (row) => (
        <div className="space-y-0.5">
          {row.email && (
            <div className="flex items-center gap-1 text-stone-600">
              <Mail className="w-3 h-3" />
              <span>{row.email}</span>
            </div>
          )}
          {row.phone && (
            <div className="flex items-center gap-1 text-stone-600">
              <Phone className="w-3 h-3" />
              <span>{row.phone}</span>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("faculty.adminTitle")}</h1>
          <p className="text-sm text-muted-foreground">{t("faculty.adminSubtitle")}</p>
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
            {t("faculty.create")}
          </Button>
        )}
      </div>

      <LiyonCard>
        <DataTable<FacultyMemberDto>
          headHeading={
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-800" />
              <h2 className="text-base font-semibold">{t("faculty.title")} ({members.length} ท่าน/รูป)</h2>
            </div>
          }
          state={members.length === 0 ? "empty" : "data"}
          rows={members}
          columns={columns}
          getRowId={(row) => row.id}
          renderRowMenu={
            canManage
              ? (row) => (
                  <>
                    <RowMenuItem onSelect={() => openEdit(row)} icon={<Edit className="w-4 h-4" />}>
                      {t("faculty.edit")}
                    </RowMenuItem>
                    <RowMenuItem
                      danger
                      onSelect={() => setDeletingId(row.id)}
                      icon={<Trash2 className="w-4 h-4 text-red-600" />}
                    >
                      {t("faculty.delete")}
                    </RowMenuItem>
                  </>
                )
              : undefined
          }
          empty={{
            icon: <Users className="h-10 w-10 text-muted-foreground/50" />,
            title: t("faculty.empty"),
            description: "คลิกปุ่ม 'เพิ่มคณาจารย์' เพื่อเพิ่มข้อมูลพระวิปัสสนาจารย์และอาจารย์ประจำ",
          }}
          error={{
            icon: <AlertCircle className="h-10 w-10 text-destructive" />,
            title: t("common.error"),
          }}
        />
      </LiyonCard>

      {/* Create / Edit Dialog */}
      <LiyonDialog
        open={isCreateOpen || !!editingMember}
        onOpenChange={(open: boolean) => {
          if (!open) {
            setIsCreateOpen(false);
            setEditingMember(null);
          }
        }}
        wide
      >
        <LiyonDialogCloseButton label={t("common.close")} />
        <LiyonDialogHeader
          title={editingMember ? t("faculty.edit") : t("faculty.create")}
          description={t("faculty.adminSubtitle")}
        />

        <form onSubmit={handleSave}>
          <LiyonDialogBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
              <LiyonField label="ตำแหน่งวิชาการ (ศ., รศ., ผศ., อ., ดร.)">
                <input
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                  value={academicRank}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAcademicRank(e.target.value)}
                  placeholder="เช่น ผศ.ดร. หรือ ศ.พิเศษ ดร."
                />
              </LiyonField>

              <LiyonField label="สมณศักดิ์ (สำหรับพระเถระ)">
                <input
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                  value={monasticRank}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMonasticRank(e.target.value)}
                  placeholder="เช่น พระธรรมพัชรญาณมุนี, พระครูวิภัชธรรมสาร"
                />
              </LiyonField>

              <LiyonField label="คำนำหน้าชื่อ">
                <input
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                  value={titleTh}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitleTh(e.target.value)}
                  placeholder="เช่น พระ, พระมหา, นาย, นางสาว"
                  required
                />
              </LiyonField>

              <LiyonField label="ชื่อภาษาไทย">
                <input
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                  value={firstNameTh}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstNameTh(e.target.value)}
                  placeholder="ชื่อคณาจารย์"
                  required
                />
              </LiyonField>

              <LiyonField label="ฉายา (สำหรับพระสงฆ์)">
                <input
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                  value={monasticName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMonasticName(e.target.value)}
                  placeholder="เช่น ฐิตญาโณ, เขมธมฺโม"
                />
              </LiyonField>

              <LiyonField label="นามสกุล (ถ้ามี)">
                <input
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                  value={lastNameTh}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastNameTh(e.target.value)}
                  placeholder="นามสกุล (ฆราวาส หรือ พระสงฆ์)"
                />
              </LiyonField>

              <LiyonField label={t("faculty.temple")}>
                <input
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                  value={templeName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTempleName(e.target.value)}
                  placeholder="เช่น วัดยานนาวา, วัดมหาธาตุฯ, สำนักสงฆ์..."
                />
              </LiyonField>

              <LiyonField label="ตำแหน่งประจำหลักสูตร">
                <input
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                  value={positionTh}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPositionTh(e.target.value)}
                  placeholder="เช่น ประธานหลักสูตร, พระวิปัสสนาจารย์ประจำหลักสูตร"
                  required
                />
              </LiyonField>

              <LiyonField label="ตำแหน่งภาษาอังกฤษ">
                <input
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                  value={positionEn}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPositionEn(e.target.value)}
                  placeholder="e.g. Program Director, Meditation Master"
                />
              </LiyonField>

              <LiyonField label="ลำดับการแสดงผล (Sort Order)">
                <input
                  type="number"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                  value={sortOrder}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSortOrder(parseInt(e.target.value) || 0)}
                />
              </LiyonField>

              {/* Roles Checkboxes */}
              <div className="md:col-span-2 flex items-center gap-6 py-2 px-3 bg-amber-50/60 rounded-lg border border-amber-200/80">
                <label className="flex items-center gap-2 text-sm font-medium text-amber-950 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isVipassanaMaster}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsVipassanaMaster(e.target.checked)}
                    className="w-4 h-4 text-amber-800 rounded border-stone-300"
                  />
                  <span>เป็นพระวิปัสสนาจารย์ (แสดงในทำเนียบพระวิปัสสนาจารย์)</span>
                </label>

                <label className="flex items-center gap-2 text-sm font-medium text-amber-950 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isExecutive}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsExecutive(e.target.checked)}
                    className="w-4 h-4 text-amber-800 rounded border-stone-300"
                  />
                  <span>เป็นผู้บริหารหลักสูตร (แสดงในคณะผู้บริหาร)</span>
                </label>
              </div>

              <div className="md:col-span-2">
                <LiyonField label={t("faculty.expertise")}>
                  <textarea
                    rows={2}
                    value={expertise}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setExpertise(e.target.value)}
                    placeholder="เช่น สติปัฏฐาน ๔, วิปัสสนากรรมฐาน, พระอภิธรรมมัตถสังคหะ..."
                    className="w-full rounded-md border border-input bg-background p-3 text-sm shadow-sm"
                  />
                </LiyonField>
              </div>

              <div className="md:col-span-2">
                <LiyonField label={t("faculty.education")}>
                  <textarea
                    rows={2}
                    value={educationHistory}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEducationHistory(e.target.value)}
                    placeholder="เช่น พธ.ด. (พระพุทธศาสนา) มจร, ป.ธ.๙..."
                    className="w-full rounded-md border border-input bg-background p-3 text-sm shadow-sm"
                  />
                </LiyonField>
              </div>

              <LiyonField label="อีเมลติดต่อ">
                <input
                  type="email"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  placeholder="faculty@mcu.ac.th"
                />
              </LiyonField>

              <LiyonField label="เบอร์โทรศัพท์">
                <input
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                  value={phone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                  placeholder="08X-XXX-XXXX"
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
                setEditingMember(null);
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
          title={t("faculty.delete")}
          description={t("faculty.deleteConfirm")}
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
            {isPending ? "กำลังลบ..." : t("faculty.delete")}
          </Button>
        </LiyonDialogFooter>
      </LiyonDialog>
    </div>
  );
}
