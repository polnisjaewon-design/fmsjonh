"use client";

import { useState, useTransition } from "react";
import {
  Landmark,
  Plus,
  Edit,
  Trash2,
  BookOpen,
  Mail,
  Phone,
  MapPin,
  User,
  Search,
  CheckCircle2,
  FolderKanban,
  Building,
} from "lucide-react";
import { toast } from "sonner";
import { useT } from "@/shared/lib/i18n/client";
import {
  LiyonCard,
  StatusPill,
  LiyonDialog,
  LiyonDialogCloseButton,
  LiyonDialogHeader,
  LiyonDialogBody,
  LiyonDialogFooter,
  LiyonField,
} from "@/shared/components/liyon";
import { Button } from "@/components/ui/button";
import type { DepartmentSummaryDto } from "@/features/department";
import {
  getDepartmentsAction,
  createDepartmentAction,
  updateDepartmentAction,
  deleteDepartmentAction,
  assignCurriculumsAction,
} from "@/features/department/actions";

interface AvailableCurriculumItem {
  id: string;
  code: string;
  nameTh: string;
  nameEn: string;
  departmentId: string | null;
}

export function DepartmentAdminClient({
  initialDepartments,
  availableCurriculums: initialCurriculums,
  canManage,
}: {
  initialDepartments: DepartmentSummaryDto[];
  availableCurriculums: AvailableCurriculumItem[];
  canManage: boolean;
}) {
  const t = useT();
  const [departments, setDepartments] = useState<DepartmentSummaryDto[]>(initialDepartments);
  const [curriculums, setCurriculums] = useState<AvailableCurriculumItem[]>(initialCurriculums);
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();

  // Dialog states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<DepartmentSummaryDto | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [assigningDept, setAssigningDept] = useState<DepartmentSummaryDto | null>(null);
  const [selectedCurriculumIds, setSelectedCurriculumIds] = useState<string[]>([]);

  // Form states for Create/Edit
  const [code, setCode] = useState("");
  const [nameTh, setNameTh] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [facultyNameTh, setFacultyNameTh] = useState("");
  const [facultyNameEn, setFacultyNameEn] = useState("");
  const [headName, setHeadName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [officeLocation, setOfficeLocation] = useState("");
  const [descriptionTh, setDescriptionTh] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [isActive, setIsActive] = useState(true);

  function resetForm() {
    setCode("");
    setNameTh("");
    setNameEn("");
    setFacultyNameTh("");
    setFacultyNameEn("");
    setHeadName("");
    setContactEmail("");
    setContactPhone("");
    setOfficeLocation("");
    setDescriptionTh("");
    setDescriptionEn("");
    setIsActive(true);
  }

  function openEdit(dept: DepartmentSummaryDto) {
    setEditingDept(dept);
    setCode(dept.code);
    setNameTh(dept.nameTh);
    setNameEn(dept.nameEn);
    setFacultyNameTh(dept.facultyNameTh || "");
    setFacultyNameEn(dept.facultyNameEn || "");
    setHeadName(dept.headName || "");
    setContactEmail(dept.contactEmail || "");
    setContactPhone(dept.contactPhone || "");
    setOfficeLocation(dept.officeLocation || "");
    setDescriptionTh(dept.descriptionTh || "");
    setDescriptionEn(dept.descriptionEn || "");
    setIsActive(dept.isActive);
  }

  function openAssign(dept: DepartmentSummaryDto) {
    setAssigningDept(dept);
    // Find all curriculums currently assigned to this department
    const currentlyAssigned = curriculums
      .filter((c) => c.departmentId === dept.id)
      .map((c) => c.id);
    setSelectedCurriculumIds(currentlyAssigned);
  }

  const reloadData = async () => {
    const res = await getDepartmentsAction();
    if (res.ok && res.data) {
      setDepartments(res.data);
    }
  };

  const handleCreateOrUpdate = () => {
    startTransition(async () => {
      try {
        if (editingDept) {
          const res = await updateDepartmentAction({
            id: editingDept.id,
            code,
            nameTh,
            nameEn,
            facultyNameTh,
            facultyNameEn,
            headName,
            contactEmail,
            contactPhone,
            officeLocation,
            descriptionTh,
            descriptionEn,
            isActive,
          });

          if (!res.ok) {
            toast.error(res.error.message || "เกิดข้อผิดพลาดในการบันทึก");
            return;
          }

          toast.success(t("department.saveSuccess"));
          setEditingDept(null);
          resetForm();
          await reloadData();
        } else {
          const res = await createDepartmentAction({
            code,
            nameTh,
            nameEn,
            facultyNameTh,
            facultyNameEn,
            headName,
            contactEmail,
            contactPhone,
            officeLocation,
            descriptionTh,
            descriptionEn,
            isActive,
          });

          if (!res.ok) {
            toast.error(res.error.message || "เกิดข้อผิดพลาดในการสร้าง");
            return;
          }

          toast.success(t("department.saveSuccess"));
          setIsCreateOpen(false);
          resetForm();
          await reloadData();
        }
      } catch (err: unknown) {
        toast.error((err as Error).message);
      }
    });
  };

  const handleDelete = () => {
    if (!deletingId) return;
    startTransition(async () => {
      try {
        const res = await deleteDepartmentAction(deletingId);
        if (!res.ok) {
          toast.error(res.error.message);
          return;
        }
        toast.success(t("department.deleteSuccess"));
        setDeletingId(null);
        await reloadData();
        // Update local curriculums list
        setCurriculums((prev) =>
          prev.map((c) => (c.departmentId === deletingId ? { ...c, departmentId: null } : c))
        );
      } catch (err: unknown) {
        toast.error((err as Error).message);
      }
    });
  };

  const handleSaveAssignments = () => {
    if (!assigningDept) return;
    startTransition(async () => {
      try {
        const res = await assignCurriculumsAction({
          departmentId: assigningDept.id,
          curriculumIds: selectedCurriculumIds,
        });

        if (!res.ok) {
          toast.error(res.error.message);
          return;
        }

        toast.success(t("department.assignSuccess"));
        setAssigningDept(null);
        await reloadData();
        // Update local curriculums list
        setCurriculums((prev) =>
          prev.map((c) => {
            if (selectedCurriculumIds.includes(c.id)) {
              return { ...c, departmentId: assigningDept.id };
            }
            if (c.departmentId === assigningDept.id) {
              return { ...c, departmentId: null };
            }
            return c;
          })
        );
      } catch (err: unknown) {
        toast.error((err as Error).message);
      }
    });
  };

  const filtered = departments.filter((d) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      d.nameTh.toLowerCase().includes(q) ||
      d.nameEn.toLowerCase().includes(q) ||
      d.code.toLowerCase().includes(q) ||
      (d.facultyNameTh && d.facultyNameTh.toLowerCase().includes(q))
    );
  });

  const totalCurriculumsHoused = departments.reduce((acc, d) => acc + d.curriculumCount, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 text-primary font-medium text-xs sm:text-sm uppercase tracking-wider">
            <Landmark className="w-4 h-4" />
            <span>{t("department.adminTitle")}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
            {t("department.title")}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {t("department.adminSubtitle")}
          </p>
        </div>

        {canManage && (
          <Button
            onClick={() => {
              resetForm();
              setIsCreateOpen(true);
            }}
            className="inline-flex items-center gap-2 self-start sm:self-center"
          >
            <Plus className="w-4 h-4" />
            <span>{t("department.add")}</span>
          </Button>
        )}
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <LiyonCard className="p-4 flex items-center gap-4 bg-card/60">
          <div className="p-3 rounded-xl bg-primary/10 text-primary">
            <Building className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground font-medium">{t("department.totalDepartments")}</div>
            <div className="text-2xl font-bold text-foreground">{departments.length}</div>
          </div>
        </LiyonCard>

        <LiyonCard className="p-4 flex items-center gap-4 bg-card/60">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground font-medium">{t("department.active")}</div>
            <div className="text-2xl font-bold text-foreground">
              {departments.filter((d) => d.isActive).length}
            </div>
          </div>
        </LiyonCard>

        <LiyonCard className="p-4 flex items-center gap-4 bg-card/60">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground font-medium">{t("department.totalHousedCurriculums")}</div>
            <div className="text-2xl font-bold text-foreground">{totalCurriculumsHoused}</div>
          </div>
        </LiyonCard>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3 bg-card border border-border/80 rounded-xl px-4 py-2.5 shadow-2xs">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ค้นหาชื่อภาควิชา, คณะ, หรือรหัส..."
          className="bg-transparent text-sm w-full outline-hidden text-foreground placeholder:text-muted-foreground"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            ล้าง
          </button>
        )}
      </div>

      {/* Department Cards Grid */}
      {filtered.length === 0 ? (
        <LiyonCard className="p-12 text-center text-muted-foreground">
          <Landmark className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">ไม่พบข้อมูลภาควิชาหรือส่วนงาน</p>
          <p className="text-xs mt-1">สามารถคลิกปุ่ม &quot;เพิ่มภาควิชา/ส่วนงาน&quot; เพื่อเริ่มต้นสร้างโครงสร้างวิชาการ</p>
        </LiyonCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((dept) => {
            const housedCurrs = curriculums.filter((c) => c.departmentId === dept.id);

            return (
              <LiyonCard
                key={dept.id}
                className="p-6 flex flex-col justify-between space-y-5 border-border/80 hover:border-primary/40 transition-colors shadow-2xs"
              >
                <div className="space-y-4">
                  {/* Top Bar: Code & Status */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-md bg-muted text-muted-foreground">
                      {dept.code}
                    </span>
                    <StatusPill tone={dept.isActive ? "ok" : "off"}>
                      {dept.isActive ? t("department.active") : t("department.inactive")}
                    </StatusPill>
                  </div>

                  {/* Names */}
                  <div>
                    <h3 className="text-lg font-bold text-foreground leading-snug">
                      {dept.nameTh}
                    </h3>
                    {dept.nameEn && (
                      <p className="text-xs text-muted-foreground font-medium mt-0.5">
                        {dept.nameEn}
                      </p>
                    )}
                    {dept.facultyNameTh && (
                      <div className="inline-flex items-center gap-1.5 text-xs text-primary/90 font-medium mt-2 bg-primary/5 px-2.5 py-1 rounded-md">
                        <Building className="w-3.5 h-3.5" />
                        <span>
                          {dept.facultyNameTh}
                          {dept.facultyNameEn ? ` (${dept.facultyNameEn})` : ""}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Metadata: Head, Contact, Office */}
                  <div className="space-y-1.5 text-xs text-muted-foreground pt-1 border-t border-border/60">
                    {dept.headName && (
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-primary" />
                        <span>{dept.headName}</span>
                      </div>
                    )}
                    {dept.contactEmail && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-primary" />
                        <span>{dept.contactEmail}</span>
                      </div>
                    )}
                    {dept.contactPhone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-primary" />
                        <span>{dept.contactPhone}</span>
                      </div>
                    )}
                    {dept.officeLocation && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                        <span>{dept.officeLocation}</span>
                      </div>
                    )}
                  </div>

                  {/* Curriculums housed */}
                  <div className="pt-2 border-t border-border/60">
                    <div className="flex items-center justify-between text-xs font-semibold text-foreground mb-2">
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                        <span>{t("department.curriculums")} ({housedCurrs.length})</span>
                      </span>
                      {canManage && (
                        <button
                          type="button"
                          onClick={() => openAssign(dept)}
                          className="text-xs text-primary hover:underline font-medium"
                        >
                          {t("department.manageCurriculums")}
                        </button>
                      )}
                    </div>

                    {housedCurrs.length === 0 ? (
                      <p className="text-xs text-muted-foreground italic bg-muted/40 p-2.5 rounded-lg text-center">
                        {t("department.noCurriculums")}
                      </p>
                    ) : (
                      <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                        {housedCurrs.map((c) => (
                          <div
                            key={c.id}
                            className="p-2 rounded-lg bg-card border border-border/70 text-xs flex items-center justify-between gap-2"
                          >
                            <span className="font-medium truncate text-foreground" title={c.nameTh}>
                              {c.nameTh}
                            </span>
                            <span className="font-mono text-[10px] text-muted-foreground shrink-0">
                              {c.code}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Buttons */}
                {canManage && (
                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-border/80">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openAssign(dept)}
                      className="text-xs inline-flex items-center gap-1.5"
                    >
                      <FolderKanban className="w-3.5 h-3.5" />
                      <span>{t("department.manageCurriculums")}</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEdit(dept)}
                      className="text-xs inline-flex items-center gap-1.5"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>{t("common.edit")}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeletingId(dept.id)}
                      className="text-xs text-destructive hover:bg-destructive/10 inline-flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                )}
              </LiyonCard>
            );
          })}
        </div>
      )}

      {/* Dialog: Create or Edit Department */}
      <LiyonDialog
        open={isCreateOpen || editingDept !== null}
        onOpenChange={(open) => {
          if (!open) {
            setIsCreateOpen(false);
            setEditingDept(null);
            resetForm();
          }
        }}
      >
        <LiyonDialogCloseButton label={t("common.close")} />
        <LiyonDialogHeader
          title={editingDept ? t("department.edit") : t("department.add")}
          description={t("department.adminSubtitle")}
        />
        <LiyonDialogBody className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <LiyonField label={t("department.code")} htmlFor="d-code">
              <input
                id="d-code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={t("department.codePlaceholder")}
                className="font-mono"
              />
            </LiyonField>
            <div className="sm:col-span-2">
              <LiyonField label={t("department.nameTh")} htmlFor="d-name-th">
                <input
                  id="d-name-th"
                  value={nameTh}
                  onChange={(e) => setNameTh(e.target.value)}
                  placeholder={t("department.nameThPlaceholder")}
                />
              </LiyonField>
            </div>
          </div>

          <LiyonField label={t("department.nameEn")} htmlFor="d-name-en">
            <input
              id="d-name-en"
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              placeholder={t("department.nameEnPlaceholder")}
            />
          </LiyonField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <LiyonField label={t("department.facultyTh")} htmlFor="d-fac-th">
              <input
                id="d-fac-th"
                value={facultyNameTh}
                onChange={(e) => setFacultyNameTh(e.target.value)}
                placeholder={t("department.facultyThPlaceholder")}
              />
            </LiyonField>
            <LiyonField label={t("department.facultyEn")} htmlFor="d-fac-en">
              <input
                id="d-fac-en"
                value={facultyNameEn}
                onChange={(e) => setFacultyNameEn(e.target.value)}
                placeholder={t("department.facultyEnPlaceholder")}
              />
            </LiyonField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <LiyonField label={t("department.headName")} htmlFor="d-head">
              <input
                id="d-head"
                value={headName}
                onChange={(e) => setHeadName(e.target.value)}
                placeholder={t("department.headNamePlaceholder")}
              />
            </LiyonField>
            <LiyonField label={t("department.officeLocation")} htmlFor="d-office">
              <input
                id="d-office"
                value={officeLocation}
                onChange={(e) => setOfficeLocation(e.target.value)}
                placeholder={t("department.officeLocationPlaceholder")}
              />
            </LiyonField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <LiyonField label={t("department.contactEmail")} htmlFor="d-email">
              <input
                id="d-email"
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="buddhism@mcu.ac.th"
              />
            </LiyonField>
            <LiyonField label={t("department.contactPhone")} htmlFor="d-phone">
              <input
                id="d-phone"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="02-123-4567"
              />
            </LiyonField>
          </div>

          <LiyonField label={t("department.description")} htmlFor="d-desc">
            <textarea
              id="d-desc"
              rows={2}
              value={descriptionTh}
              onChange={(e) => setDescriptionTh(e.target.value)}
              placeholder="รายละเอียดและภารกิจทางวิชาการของภาควิชา"
            />
          </LiyonField>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="d-active"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="rounded-sm border-border text-primary focus:ring-primary h-4 w-4"
            />
            <label htmlFor="d-active" className="text-sm font-medium text-foreground cursor-pointer">
              {t("department.active")}
            </label>
          </div>
        </LiyonDialogBody>
        <LiyonDialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setIsCreateOpen(false);
              setEditingDept(null);
              resetForm();
            }}
          >
            {t("common.cancel")}
          </Button>
          <Button
            onClick={handleCreateOrUpdate}
            disabled={isPending || !code.trim() || !nameTh.trim() || !nameEn.trim()}
          >
            {isPending ? t("common.saving") : t("common.save")}
          </Button>
        </LiyonDialogFooter>
      </LiyonDialog>

      {/* Dialog: Assign Curriculums */}
      <LiyonDialog
        open={assigningDept !== null}
        onOpenChange={(open) => {
          if (!open) setAssigningDept(null);
        }}
      >
        <LiyonDialogCloseButton label={t("common.close")} />
        <LiyonDialogHeader
          title={`${t("department.manageCurriculums")} - ${assigningDept?.nameTh}`}
          description={t("department.selectCurriculums")}
        />
        <LiyonDialogBody className="space-y-4 max-h-[60vh] overflow-y-auto">
          {curriculums.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              ยังไม่มีหลักสูตรในระบบ กรุณาสร้างหลักสูตรในหน้าจัดการหลักสูตรก่อน
            </p>
          ) : (
            <div className="space-y-2">
              {curriculums.map((curr) => {
                const isSelected = selectedCurriculumIds.includes(curr.id);
                const isOtherDept =
                  curr.departmentId && curr.departmentId !== assigningDept?.id;
                const otherDeptName = isOtherDept
                  ? departments.find((d) => d.id === curr.departmentId)?.nameTh
                  : null;

                return (
                  <label
                    key={curr.id}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-primary/5 border-primary/50 text-foreground"
                        : "bg-card border-border hover:bg-muted/50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCurriculumIds((prev) => [...prev, curr.id]);
                        } else {
                          setSelectedCurriculumIds((prev) => prev.filter((id) => id !== curr.id));
                        }
                      }}
                      className="mt-1 h-4 w-4 rounded-sm border-border text-primary focus:ring-primary"
                    />
                    <div className="space-y-0.5 text-xs">
                      <div className="font-semibold text-sm text-foreground">{curr.nameTh}</div>
                      {curr.nameEn && <div className="text-muted-foreground">{curr.nameEn}</div>}
                      <div className="flex items-center gap-2 pt-1 font-mono text-[11px] text-muted-foreground">
                        <span>รหัส: {curr.code}</span>
                        {otherDeptName && (
                          <span className="text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-sm">
                            ปัจจุบันสังกัด: {otherDeptName}
                          </span>
                        )}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          )}
        </LiyonDialogBody>
        <LiyonDialogFooter>
          <Button variant="outline" onClick={() => setAssigningDept(null)}>
            {t("common.cancel")}
          </Button>
          <Button onClick={handleSaveAssignments} disabled={isPending}>
            {isPending ? t("common.saving") : t("common.save")}
          </Button>
        </LiyonDialogFooter>
      </LiyonDialog>

      {/* Dialog: Delete Confirmation */}
      <LiyonDialog
        open={deletingId !== null}
        onOpenChange={(open) => {
          if (!open) setDeletingId(null);
        }}
        danger
      >
        <LiyonDialogCloseButton label={t("common.close")} />
        <LiyonDialogHeader
          title={t("department.delete")}
          description={t("department.deleteConfirm")}
        />
        <LiyonDialogFooter>
          <Button variant="outline" onClick={() => setDeletingId(null)}>
            {t("common.cancel")}
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
            {isPending ? t("common.deleting") : t("common.delete")}
          </Button>
        </LiyonDialogFooter>
      </LiyonDialog>
    </div>
  );
}
