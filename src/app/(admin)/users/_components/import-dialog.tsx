"use client";

import { useState, useTransition, useRef } from "react";
import {
  Upload,
  Download,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import {
  LiyonDialog,
  LiyonDialogHeader,
  LiyonDialogBody,
  LiyonDialogFooter,
  LiyonDialogCloseButton,
  LiyonField,
  LiyonSelect,
  StatusPill,
} from "@/shared/components/liyon";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useT, useLocale } from "@/shared/lib/i18n/client";
import { localizedName } from "@/shared/lib/format";
import { importUsersCsvAction } from "@/features/identity/actions";
import type { RolePick, UserListItem } from "./types";

interface ParsedUserRow {
  index: number;
  rawEmail: string;
  rawName: string;
  rawRoles: string;
  email: string;
  name: string;
  roleIds: string[];
  roleNames: string[];
  isValid: boolean;
  isDuplicate: boolean;
  errors: string[];
}

export function ImportDialog({
  open,
  onOpenChange,
  roles,
  existingUsers,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  roles: RolePick[];
  existingUsers: UserListItem[];
  onSuccess: () => void;
}) {
  const t = useT();
  const locale = useLocale();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [parsedRows, setParsedRows] = useState<ParsedUserRow[]>([]);
  const [defaultRoleId, setDefaultRoleId] = useState<string>(
    roles.find((r) => r.code === "STAFF" || r.code === "VIEWER")?.id || roles[0]?.id || ""
  );
  const [sendEmail, setSendEmail] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isDragOver, setIsDragOver] = useState(false);

  function resetState() {
    setFile(null);
    setParsedRows([]);
    setSendEmail(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  // Generate and download CSV Template with UTF-8 BOM
  function downloadTemplate() {
    const headers = ["อีเมล (Email)", "ชื่อ-นามสกุล (Name)", "รหัสบทบาท (Role Codes)"];
    const sampleRows = [
      ["somchai.staff@mcu.ac.th", "นายสมชาย สว่างใจ", "STAFF"],
      ["ananda.monk@mcu.ac.th", "พระอานนท์ อาภสฺสโร", "VIEWER"],
      ["vipassana.coord@mcu.ac.th", "แม่ชีวิภาดา สงบใจ", "STAFF"],
    ];

    const availableRolesHint = `# รหัสบทบาทที่สามารถใช้ได้: ${roles.map((r) => `${r.code} (${localizedName(r, locale)})`).join(", ")}`;
    const lines = [
      availableRolesHint,
      headers.join(","),
      ...sampleRows.map((r) => r.map((c) => `"${c}"`).join(",")),
    ];

    const bom = "\uFEFF";
    const csvContent = bom + lines.join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "user_import_template.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("ดาวน์โหลดไฟล์ตัวอย่างเรียบร้อยแล้ว");
  }

  // Parse CSV Line respecting quoted commas
  function parseCsvLine(text: string): string[] {
    const result: string[] = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch === '"') {
        if (inQuotes && text[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === "," && !inQuotes) {
        result.push(cur.trim());
        cur = "";
      } else {
        cur += ch;
      }
    }
    result.push(cur.trim());
    return result;
  }

  function handleFileSelected(selectedFile: File) {
    if (!selectedFile.name.toLowerCase().endsWith(".csv")) {
      toast.error("กรุณาเลือกไฟล์นามสกุล .csv เท่านั้น");
      return;
    }

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (!text) return;
      processCsvText(text);
    };
    reader.readAsText(selectedFile, "utf-8");
  }

  function processCsvText(text: string) {
    const lines = text
      .split(/\r\n|\n|\r/)
      .map((l) => l.trim())
      .filter((l) => l.length > 0 && !l.startsWith("#"));

    if (lines.length <= 1) {
      toast.error("ไฟล์ CSV ไม่มีข้อมูลผู้ใช้");
      return;
    }

    // Header check
    const headerLine = lines[0];
    const headerCols = parseCsvLine(headerLine).map((h) => h.toLowerCase());

    let emailIdx = headerCols.findIndex((h) => h.includes("email") || h.includes("อีเมล") || h.includes("mail"));
    let nameIdx = headerCols.findIndex((h) => h.includes("name") || h.includes("ชื่อ"));
    let roleIdx = headerCols.findIndex((h) => h.includes("role") || h.includes("บทบาท"));

    if (emailIdx === -1) emailIdx = 0;
    if (nameIdx === -1) nameIdx = 1;
    if (roleIdx === -1 && headerCols.length > 2) roleIdx = 2;

    const dataLines = lines.slice(1);
    const existingEmailSet = new Set(existingUsers.map((u) => u.email.toLowerCase().trim()));
    const seenBatchEmails = new Set<string>();

    const rows: ParsedUserRow[] = [];

    dataLines.forEach((line, idx) => {
      const cols = parseCsvLine(line);
      if (cols.length === 0 || cols.every((c) => !c)) return;

      const rawEmail = cols[emailIdx] || "";
      const rawName = cols[nameIdx] || "";
      const rawRoles = roleIdx !== -1 && cols[roleIdx] ? cols[roleIdx] : "";

      const email = rawEmail.toLowerCase().trim();
      const name = rawName.trim();
      const errors: string[] = [];

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
        errors.push("ไม่ระบุอีเมล");
      } else if (!emailRegex.test(email)) {
        errors.push("รูปแบบอีเมลไม่ถูกต้อง");
      }

      // Duplicate check
      let isDuplicate = false;
      if (email) {
        if (existingEmailSet.has(email)) {
          isDuplicate = true;
          errors.push("อีเมลนี้มีอยู่ในระบบแล้ว");
        } else if (seenBatchEmails.has(email)) {
          isDuplicate = true;
          errors.push("อีเมลซ้ำกับแถวอื่นในไฟล์");
        } else {
          seenBatchEmails.add(email);
        }
      }

      // Name validation
      if (!name) {
        errors.push("ไม่ระบุชื่อ-นามสกุล");
      } else if (name.length > 255) {
        errors.push("ชื่อยาวเกิน 255 ตัวอักษร");
      }

      // Role parsing
      const matchedRoleIds: string[] = [];
      const matchedRoleNames: string[] = [];

      if (rawRoles) {
        const tokens = rawRoles.split(/[,;|]/).map((t) => t.trim().toUpperCase());
        for (const token of tokens) {
          const found = roles.find(
            (r) =>
              r.code.toUpperCase() === token ||
              r.nameTh.toUpperCase() === token ||
              r.nameEn.toUpperCase() === token
          );
          if (found && !matchedRoleIds.includes(found.id)) {
            matchedRoleIds.push(found.id);
            matchedRoleNames.push(localizedName(found, locale));
          }
        }
      }

      // Fallback to default role if none matched
      if (matchedRoleIds.length === 0 && defaultRoleId) {
        const def = roles.find((r) => r.id === defaultRoleId);
        if (def) {
          matchedRoleIds.push(def.id);
          matchedRoleNames.push(`${localizedName(def, locale)} (ค่าเริ่มต้น)`);
        }
      }

      if (matchedRoleIds.length === 0) {
        errors.push("ไม่พบบทบาทที่ตรงกัน");
      }

      rows.push({
        index: idx + 1,
        rawEmail,
        rawName,
        rawRoles,
        email,
        name,
        roleIds: matchedRoleIds,
        roleNames: matchedRoleNames,
        isValid: errors.length === 0,
        isDuplicate,
        errors,
      });
    });

    setParsedRows(rows);
  }

  function handleImportSubmit() {
    const validRows = parsedRows.filter((r) => r.isValid);
    if (validRows.length === 0) {
      toast.error("ไม่มีแถวข้อมูลที่ถูกต้องสำหรับการนำเข้า");
      return;
    }

    startTransition(async () => {
      const payload = {
        users: validRows.map((r) => ({
          email: r.email,
          name: r.name,
          roleIds: r.roleIds,
        })),
        sendPasswordSetupEmail: sendEmail,
      };

      const res = await importUsersCsvAction(payload);
      if (res.ok) {
        toast.success(
          t("users.importSuccess", {
            done: res.data.successCount,
            failed: res.data.failedCount,
          })
        );
        onSuccess();
        onOpenChange(false);
        resetState();
      } else {
        toast.error(res.error.message || t("users.importFail"));
      }
    });
  }

  const validCount = parsedRows.filter((r) => r.isValid).length;
  const invalidCount = parsedRows.filter((r) => !r.isValid).length;

  return (
    <LiyonDialog
      open={open}
      onOpenChange={(o) => {
        if (!o) resetState();
        onOpenChange(o);
      }}
      wide
    >
      <LiyonDialogCloseButton label={t("common.close")} />
      <LiyonDialogHeader
        title={t("users.importTitle")}
        description={t("users.importDesc")}
      />
      <LiyonDialogBody>
        <div className="space-y-6">
          {/* Top Info & Template Download */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-amber-50/70 border border-amber-200/80">
            <div className="space-y-0.5">
              <div className="text-sm font-semibold text-amber-950 flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-amber-800" />
                <span>ไฟล์แม่แบบสำหรับการนำเข้าข้อมูล</span>
              </div>
              <p className="text-xs text-amber-900/80">
                รองรับคอลัมน์ อีเมล, ชื่อ-นามสกุล และรหัสบทบาท (เช่น STAFF, VIEWER)
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={downloadTemplate}
              className="bg-white hover:bg-amber-100/50 border-amber-300 text-amber-900 text-xs gap-1.5 shrink-0"
            >
              <Download className="w-3.5 h-3.5 text-amber-800" />
              <span>{t("users.downloadTemplate")}</span>
            </Button>
          </div>

          {/* File Upload Dropzone */}
          {!file ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragOver(false);
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  handleFileSelected(e.dataTransfer.files[0]);
                }
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                isDragOver
                  ? "border-amber-500 bg-amber-50/50"
                  : "border-stone-300 hover:border-amber-400 bg-stone-50/50 hover:bg-amber-50/30"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,text/csv"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileSelected(e.target.files[0]);
                  }
                }}
              />
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center mx-auto mb-3">
                <Upload className="w-6 h-6" />
              </div>
              <div className="text-sm font-semibold text-stone-800">
                {t("users.dragOrBrowse")}
              </div>
              <p className="text-xs text-stone-500 mt-1">
                ไฟล์ข้อความ CSV (UTF-8) ขนาดไม่เกิน 5 MB
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-stone-100 border border-stone-200">
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="w-6 h-6 text-amber-800" />
                <div>
                  <div className="text-sm font-semibold text-stone-900">{file.name}</div>
                  <div className="text-xs text-stone-500">
                    {(file.size / 1024).toFixed(1)} KB • {parsedRows.length} รายการ
                  </div>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={resetState}
                className="text-stone-500 hover:text-red-600 gap-1"
              >
                <Trash2 className="w-4 h-4" />
                <span>เปลี่ยนไฟล์</span>
              </Button>
            </div>
          )}

          {/* Import Settings & Options */}
          {parsedRows.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200 text-sm">
              <LiyonField label={t("users.defaultRole")}>
                <LiyonSelect
                  value={defaultRoleId}
                  onChange={(e) => {
                    const val = e.target.value;
                    setDefaultRoleId(val);
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => processCsvText(ev.target?.result as string);
                      reader.readAsText(file, "utf-8");
                    }
                  }}
                >
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>
                      {localizedName(r, locale)} ({r.code})
                    </option>
                  ))}
                </LiyonSelect>
              </LiyonField>

              <div className="flex items-center pt-6">
                <label className="flex items-center gap-2 text-stone-800 cursor-pointer">
                  <Checkbox
                    checked={sendEmail}
                    onCheckedChange={(c) => setSendEmail(Boolean(c))}
                  />
                  <span className="text-xs">{t("users.sendInviteEmail")}</span>
                </label>
              </div>
            </div>
          )}

          {/* Preview Table */}
          {parsedRows.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-stone-900">
                  {t("users.previewTitle", { valid: validCount, total: parsedRows.length })}
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {validCount} ถูกต้อง
                  </span>
                  {invalidCount > 0 && (
                    <span className="inline-flex items-center gap-1 text-red-600 font-medium ml-2">
                      <AlertCircle className="w-3.5 h-3.5" /> {invalidCount} ไม่ผ่าน
                    </span>
                  )}
                </div>
              </div>

              <div className="max-h-72 overflow-y-auto rounded-xl border border-stone-200 shadow-inner">
                <table className="w-full text-xs text-left border-collapse">
                  <thead className="bg-stone-100 text-stone-700 sticky top-0 border-b border-stone-200">
                    <tr>
                      <th className="py-2.5 px-3 font-semibold w-12 text-center">#</th>
                      <th className="py-2.5 px-3 font-semibold">สถานะ</th>
                      <th className="py-2.5 px-3 font-semibold">อีเมล</th>
                      <th className="py-2.5 px-3 font-semibold">ชื่อ - นามสกุล</th>
                      <th className="py-2.5 px-3 font-semibold">บทบาทที่จะมอบ</th>
                      <th className="py-2.5 px-3 font-semibold">ข้อผิดพลาด/หมายเหตุ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 bg-white">
                    {parsedRows.map((r) => (
                      <tr
                        key={r.index}
                        className={!r.isValid ? "bg-red-50/40" : "hover:bg-stone-50/80"}
                      >
                        <td className="py-2.5 px-3 text-center text-stone-500 font-mono">
                          {r.index}
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          {r.isValid ? (
                            <StatusPill tone="ok">{t("users.statusValid")}</StatusPill>
                          ) : r.isDuplicate ? (
                            <StatusPill tone="warn">{t("users.statusDuplicate")}</StatusPill>
                          ) : (
                            <StatusPill tone="bad">{t("users.statusInvalid")}</StatusPill>
                          )}
                        </td>
                        <td className="py-2.5 px-3 font-mono font-medium text-stone-900">
                          {r.rawEmail || "-"}
                        </td>
                        <td className="py-2.5 px-3 text-stone-900">{r.rawName || "-"}</td>
                        <td className="py-2.5 px-3">
                          {r.roleNames.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {r.roleNames.map((rn, i) => (
                                <span
                                  key={i}
                                  className="px-1.5 py-0.5 rounded bg-stone-100 border border-stone-200 text-stone-800 text-[11px]"
                                >
                                  {rn}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-stone-400">-</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-red-600 font-medium">
                          {r.errors.length > 0 ? r.errors.join(", ") : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </LiyonDialogBody>
      <LiyonDialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={() => onOpenChange(false)}
          disabled={isPending}
        >
          {t("common.close")}
        </Button>
        <Button
          type="button"
          onClick={handleImportSubmit}
          disabled={validCount === 0 || isPending}
          className="bg-amber-800 hover:bg-amber-900 text-white gap-2"
        >
          {isPending ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <CheckCircle2 className="w-4 h-4" />
          )}
          <span>{t("users.importSubmit", { n: validCount })}</span>
        </Button>
      </LiyonDialogFooter>
    </LiyonDialog>
  );
}
