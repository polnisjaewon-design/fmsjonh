"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Upload,
  Trash2,
  Loader2,
  ImageIcon,
  Mail,
  Send,
  Eye,
  EyeOff,
  Sparkles,
  ExternalLink,
  AlertCircle,
  Check,
  Copy,
  ShieldCheck,
  Crop,
  Building2,
  Award,
  Globe,
  MapPin,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiyonCard, LiyonField, PalettePicker } from "@/shared/components/liyon";
import { useT } from "@/shared/lib/i18n/client";
import { cn } from "@/shared/lib/utils";
import type { PaletteId } from "@/shared/lib/palette";
import type { TenantSettings, OrgInfo } from "@/features/identity";
import { updateSettingsAction, uploadLogoAction, testSmtpAction } from "@/features/identity/actions";
import { ImageCropModal } from "./image-crop-modal";
import { OrgInfoDialog } from "./org-info-dialog";

export function SettingsForm({ initial }: { initial: TenantSettings }) {
  const t = useT();
  const router = useRouter();

  const [form, setForm] = useState({
    nameTh: initial.nameTh,
    nameEn: initial.nameEn,
    logoUrl: initial.logoUrl ?? "",
    palette: initial.palette as PaletteId,
  });

  const [orgInfo, setOrgInfo] = useState<OrgInfo>({
    taglineTh: initial.orgInfo?.taglineTh ?? "",
    taglineEn: initial.orgInfo?.taglineEn ?? "",
    descriptionTh: initial.orgInfo?.descriptionTh ?? "",
    descriptionEn: initial.orgInfo?.descriptionEn ?? "",
    addressTh: initial.orgInfo?.addressTh ?? "",
    addressEn: initial.orgInfo?.addressEn ?? "",
    email: initial.orgInfo?.email ?? "",
    phone: initial.orgInfo?.phone ?? "",
    website: initial.orgInfo?.website ?? "",
  });

  const [smtp, setSmtp] = useState({
    enabled: initial.smtp?.enabled ?? false,
    host: initial.smtp?.host ?? "smtp.gmail.com",
    port: initial.smtp?.port ?? 465,
    secure: initial.smtp?.secure ?? true,
    user: initial.smtp?.user ?? "",
    pass: initial.smtp?.pass ?? "",
    fromName: initial.smtp?.fromName ?? initial.nameTh ?? "",
    fromEmail: initial.smtp?.fromEmail ?? "",
  });

  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [orgInfoDialogOpen, setOrgInfoDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [testEmail, setTestEmail] = useState("");
  const [testingSmtp, setTestingSmtp] = useState(false);
  const [copiedUri, setCopiedUri] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [pending, start] = useTransition();
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // ส่ง Event อัปเดตมุมซ้ายบนของเว็บแบบ Real-time ทันทีขณะพิมพ์หรือเปลี่ยนรูป
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("tenant-brand-updated", {
          detail: {
            logoUrl: form.logoUrl,
            nameTh: form.nameTh,
            nameEn: form.nameEn,
            taglineTh: orgInfo.taglineTh,
            taglineEn: orgInfo.taglineEn,
          },
        })
      );
    }
  }, [form.nameTh, form.nameEn, form.logoUrl, orgInfo.taglineTh, orgInfo.taglineEn]);

  function copyToClipboard(text: string) {
    void navigator.clipboard.writeText(text);
    setCopiedUri(text);
    toast.success(t("settings.oauthCopied"));
    setTimeout(() => setCopiedUri(null), 2500);
  }

  function applyGmailPreset() {
    setSmtp((prev) => ({
      ...prev,
      enabled: true,
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      fromEmail: prev.fromEmail || prev.user,
    }));
    toast.success(t("settings.smtpPresetApplied"));
  }

  async function handleTestEmail() {
    if (!testEmail || !testEmail.includes("@")) {
      toast.error("กรุณาระบุอีเมลผู้รับทดสอบที่ถูกต้อง");
      return;
    }
    if (!smtp.user || !smtp.pass) {
      toast.error("กรุณากรอกอีเมล Gmail และ App Password ก่อนทดสอบ");
      return;
    }
    setTestingSmtp(true);
    try {
      const res = await testSmtpAction({
        smtp,
        testEmail,
      });
      if (res.ok) {
        toast.success(t("settings.smtpTestSuccess"));
      } else {
        toast.error(res.error?.message || t("settings.smtpTestFailed"));
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("settings.smtpTestFailed"));
    } finally {
      setTestingSmtp(false);
    }
  }

  async function processFile(file: File) {
    if (file.size > 5 * 1024 * 1024) {
      toast.error(t("settings.fileTooLarge"));
      return;
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/webp", "image/svg+xml", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      toast.error(t("settings.invalidFileType"));
      return;
    }

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await uploadLogoAction(fd);
      if (!res.ok) {
        const errKey = res.error.fieldErrors?.file?.[0];
        toast.error(errKey ? t(errKey) : t("settings.uploadError"));
        return;
      }
      setForm((prev) => ({ ...prev, logoUrl: res.data.url }));
      toast.success(t("settings.uploadSuccess"));
    } catch {
      toast.error(t("settings.uploadError"));
    } finally {
      setUploading(false);
    }
  }

  function save() {
    start(async () => {
      const r = await updateSettingsAction({ ...form, smtp, orgInfo });
      if (!r.ok) {
        setErrors(r.error.fieldErrors ?? {});
        if (!r.error.fieldErrors) toast.error(t(`error.${r.error.code}`));
        return;
      }
      setErrors({});
      toast.success(t("settings.saveOk"));
      router.refresh();
    });
  }

  return (
    <>
      <header className="ph">
        <h1>{t("settings.title")}</h1>
      </header>

      <div className="set-cards">
        {/* SECTION 1: Logo & Image Crop Tool (Admin only) */}
        <LiyonCard>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-4 mb-4">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <ImageIcon className="h-5 w-5 text-brand" />
                {t("settings.logoPreview")}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {t("settings.logoHint")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setCropModalOpen(true)}
                className="gap-2 border-brand/50 hover:bg-brand/10 hover:border-brand font-medium text-brand"
              >
                <Crop className="h-4 w-4" />
                {t("settings.changeLogo")}
              </Button>
              {form.logoUrl && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setForm((prev) => ({ ...prev, logoUrl: "" }))}
                  disabled={uploading || pending}
                  className="text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="mr-1 h-4 w-4" />
                  {t("settings.removeLogo")}
                </Button>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 p-4 bg-muted/20 border border-border/50 rounded-xl">
            <div
              className={cn(
                "relative w-28 h-28 rounded-2xl border-2 flex items-center justify-center p-2 bg-background cursor-pointer hover:border-brand/80 transition-all shadow-sm group shrink-0",
                isDragging ? "border-brand ring-4 ring-brand/10" : "border-border/80"
              )}
              onClick={() => setCropModalOpen(true)}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const file = e.dataTransfer.files?.[0];
                if (file) processFile(file);
              }}
              title="คลิกเพื่อเปิดเครื่องมือครอบตัดและปรับแต่งรูปภาพ"
            >
              {form.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={form.logoUrl}
                  alt={t("settings.logoPreview")}
                  className="max-w-full max-h-full object-contain rounded-xl"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <ImageIcon className="h-8 w-8 mb-1 opacity-50" />
                  <span className="text-[10px]">ไม่มีโลโก้</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[11px] font-medium backdrop-blur-[1px]">
                <Crop className="h-5 w-5 mb-1" />
                ครอบตัด / แก้ไข
              </div>
            </div>

            <div className="flex-1 space-y-2 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <Button
                  type="button"
                  onClick={() => setCropModalOpen(true)}
                  className="gap-2 bg-brand text-white hover:bg-brand/90"
                  size="sm"
                >
                  <Upload className="h-4 w-4" />
                  {t("settings.changeLogo")}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                คลิกปุ่ม <strong>{t("settings.changeLogo")}</strong> เพื่อเปิดหน้าต่างลากวางไฟล์ รองรับ .png, .jpg, .jpeg นำเข้าจาก URL ปรับย่อขยาย ครอบภาพ หมุน ปรับเอียง จัดตรงกลาง และบีบอัดขนาดไฟล์อัตโนมัติไม่เกิน 200 KB
              </p>
              {form.logoUrl && (
                <div className="pt-1 text-[11px] text-muted-foreground truncate max-w-md">
                  ที่อยู่ไฟล์ปัจจุบัน: <code className="text-foreground/80">{form.logoUrl}</code>
                </div>
              )}
            </div>
          </div>
        </LiyonCard>

        {/* SECTION 2: Organization Information & World-Standard Details */}
        <LiyonCard>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-4 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-brand" />
                <h2 className="text-lg font-semibold">{t("settings.orgTitle")}</h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  <Award className="h-3 w-3" />
                  {t("settings.orgPreviewBadge")}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {t("settings.worldOrgDesc")}
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setOrgInfoDialogOpen(true)}
              className="gap-2 border-brand/50 hover:bg-brand/10 hover:border-brand shrink-0 text-brand font-medium"
            >
              <Sparkles className="h-4 w-4 text-amber-500" />
              {t("settings.editWorldOrgBtn")}
            </Button>
          </div>

          <div className="space-y-4">
            {/* Direct Inputs for Official Names & Taglines (อัปเดตมุมซ้ายบนทันทีขณะพิมพ์) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <LiyonField
                label={t("settings.nameTh")}
                htmlFor="s-name-th"
                error={errors.nameTh?.[0]}
                hint="ชื่อทางการภาษาไทย (แสดงที่มุมซ้ายบนของทั้งสองหน้า)"
              >
                <input
                  id="s-name-th"
                  value={form.nameTh}
                  onChange={(e) => setForm({ ...form, nameTh: e.target.value })}
                  placeholder="เช่น หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา(ภาคเสาร์-อาทิตย์) ภาควิชาพระพุทธศาสนา คณะพุทธศาสตร์ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย"
                />
              </LiyonField>

              <LiyonField
                label={t("settings.nameEn")}
                htmlFor="s-name-en"
                error={errors.nameEn?.[0]}
                hint="Official Name in English (Top-Left Brand Title)"
              >
                <input
                  id="s-name-en"
                  value={form.nameEn}
                  onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
                  placeholder="e.g. Master of Arts Program in Vipassana Meditation Studies (Weekend Session), Department of Buddhism, Faculty of Buddhism, MCU"
                />
              </LiyonField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <LiyonField
                label={t("settings.orgTaglineTh")}
                htmlFor="s-tagline-th"
                hint="คำขวัญ/สโลแกนภาษาไทย (แสดงใต้ชื่อมุมซ้ายบน)"
              >
                <input
                  id="s-tagline-th"
                  value={orgInfo.taglineTh}
                  onChange={(e) => setOrgInfo({ ...orgInfo, taglineTh: e.target.value })}
                  placeholder="เช่น หลักสูตรพุทธศาสตรมหาบัณฑิต (ภาคเสาร์-อาทิตย์)"
                />
              </LiyonField>

              <LiyonField
                label={t("settings.orgTaglineEn")}
                htmlFor="s-tagline-en"
                hint="Official Tagline / Subtitle (English)"
              >
                <input
                  id="s-tagline-en"
                  value={orgInfo.taglineEn}
                  onChange={(e) => setOrgInfo({ ...orgInfo, taglineEn: e.target.value })}
                  placeholder="e.g. Master of Arts Program (Weekend Session)"
                />
              </LiyonField>
            </div>

            {/* Global Contact & Vision Summary Banner */}
            <div className="p-3.5 bg-muted/30 border border-border/50 rounded-xl space-y-2.5 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-semibold text-foreground flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-brand" />
                  วิสัยทัศน์ พันธกิจ และช่องทางติดต่อสากล
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setOrgInfoDialogOpen(true)}
                  className="h-7 text-xs text-brand hover:text-brand/80 px-2"
                >
                  เปิดหน้าต่างจัดการข้อมูลสากลเต็มรูปแบบ →
                </Button>
              </div>

              {(orgInfo.descriptionTh || orgInfo.descriptionEn) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
                  {orgInfo.descriptionTh && (
                    <div className="bg-background/80 p-2 rounded-lg border border-border/40">
                      <span className="text-[10px] text-muted-foreground font-medium block mb-0.5">
                        {t("settings.orgDescTh")}:
                      </span>
                      <p className="text-foreground/80 line-clamp-2 leading-relaxed">
                        {orgInfo.descriptionTh}
                      </p>
                    </div>
                  )}
                  {orgInfo.descriptionEn && (
                    <div className="bg-background/80 p-2 rounded-lg border border-border/40">
                      <span className="text-[10px] text-muted-foreground font-medium block mb-0.5">
                        {t("settings.orgDescEn")}:
                      </span>
                      <p className="text-foreground/80 line-clamp-2 leading-relaxed">
                        {orgInfo.descriptionEn}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Global Contact Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-muted-foreground">
                {orgInfo.addressTh && (
                  <span className="inline-flex items-center gap-1.5 bg-background px-2.5 py-1 rounded-md border border-border/60">
                    <MapPin className="h-3.5 w-3.5 text-brand shrink-0" />
                    <span className="truncate max-w-xs">{orgInfo.addressTh}</span>
                  </span>
                )}
                {orgInfo.email && (
                  <span className="inline-flex items-center gap-1.5 bg-background px-2.5 py-1 rounded-md border border-border/60">
                    <Mail className="h-3.5 w-3.5 text-brand shrink-0" />
                    <span>{orgInfo.email}</span>
                  </span>
                )}
                {orgInfo.phone && (
                  <span className="inline-flex items-center gap-1.5 bg-background px-2.5 py-1 rounded-md border border-border/60">
                    <Phone className="h-3.5 w-3.5 text-brand shrink-0" />
                    <span>{orgInfo.phone}</span>
                  </span>
                )}
                {orgInfo.website && (
                  <span className="inline-flex items-center gap-1.5 bg-background px-2.5 py-1 rounded-md border border-border/60">
                    <Globe className="h-3.5 w-3.5 text-brand shrink-0" />
                    <span>{orgInfo.website}</span>
                  </span>
                )}
                {!orgInfo.email && !orgInfo.phone && !orgInfo.website && !orgInfo.addressTh && (
                  <span className="text-muted-foreground italic text-[11px]">
                    ยังไม่ได้ระบุวิสัยทัศน์และข้อมูลติดต่อ สามารถคลิกปุ่ม &ldquo;เปิดหน้าต่างจัดการข้อมูลสากลเต็มรูปแบบ&rdquo; เพื่อระบุเพิ่มเติม
                  </span>
                )}
              </div>
            </div>
          </div>
        </LiyonCard>

        {/* SECTION 3: Theme Palette (Colour palette) */}
        <LiyonCard>
          <h2>{t("settings.brandTitle")}</h2>
          <p>{t("settings.brandDesc")}</p>
          <PalettePicker
            value={form.palette}
            onChange={(p) => setForm({ ...form, palette: p })}
            label={t("settings.paletteLabel")}
          />
          {form.palette === "coral" && (
            <p className="warn" role="note">
              {t("settings.coralWarn")}
            </p>
          )}
        </LiyonCard>

        {/* SECTION 4: Email Settings (Gmail SMTP) */}
        <LiyonCard>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-4 mb-4">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <Mail className="h-5 w-5 text-brand" />
                {t("settings.smtpTitle")}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">{t("settings.smtpDesc")}</p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={applyGmailPreset}
              className="gap-2 border-brand/40 hover:bg-brand/10 hover:border-brand shrink-0"
            >
              <Sparkles className="h-4 w-4 text-amber-500" />
              {t("settings.smtpPresetGmail")}
            </Button>
          </div>

          <div className="space-y-4">
            {/* สวิตช์เปิดใช้งาน SMTP */}
            <div className="flex items-center gap-3 p-3 bg-muted/40 rounded-lg border border-border/50">
              <input
                id="smtp-enabled"
                type="checkbox"
                checked={smtp.enabled}
                onChange={(e) => setSmtp({ ...smtp, enabled: e.target.checked })}
                className="h-4 w-4 rounded text-brand focus:ring-brand"
              />
              <label htmlFor="smtp-enabled" className="text-sm font-medium cursor-pointer">
                {t("settings.smtpEnable")}
              </label>
            </div>

            {/* กล่องคำแนะนำ Gmail App Password */}
            <div className="p-3.5 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs leading-relaxed space-y-1 text-foreground/90">
              <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>คำแนะนำการใช้งานกับบัญชี Gmail:</span>
              </div>
              <p className="pl-6 text-muted-foreground">
                Google กำหนดให้ใช้ <strong>App Password (รหัสผ่านสำหรับแอป ๑๖ ตัวอักษร)</strong> แทนรหัสผ่านปกติของ Gmail
                โดยท่านต้องเปิด <strong>2-Step Verification</strong> ในบัญชี Google เสียก่อน
              </p>
              <div className="pl-6 pt-1">
                <a
                  href="https://myaccount.google.com/apppasswords"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-brand font-medium hover:underline"
                >
                  <span>ไปที่หน้าสร้าง Google App Password</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <LiyonField
                label={t("settings.smtpUser")}
                htmlFor="smtp-user"
                error={errors["smtp.user"]?.[0]}
              >
                <input
                  id="smtp-user"
                  type="email"
                  placeholder="example@gmail.com"
                  value={smtp.user}
                  onChange={(e) => setSmtp({ ...smtp, user: e.target.value })}
                />
              </LiyonField>

              <LiyonField
                label={t("settings.smtpPass")}
                htmlFor="smtp-pass"
                error={errors["smtp.pass"]?.[0]}
              >
                <div className="relative flex items-center">
                  <input
                    id="smtp-pass"
                    type={showPassword ? "text" : "password"}
                    placeholder="xxxx xxxx xxxx xxxx"
                    value={smtp.pass}
                    onChange={(e) => setSmtp({ ...smtp, pass: e.target.value })}
                    className="w-full pr-10 tracking-wider"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 text-muted-foreground hover:text-foreground"
                    title={showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </LiyonField>

              <LiyonField
                label={t("settings.smtpHost")}
                htmlFor="smtp-host"
                error={errors["smtp.host"]?.[0]}
              >
                <input
                  id="smtp-host"
                  value={smtp.host}
                  onChange={(e) => setSmtp({ ...smtp, host: e.target.value })}
                />
              </LiyonField>

              <div className="grid grid-cols-2 gap-2">
                <LiyonField
                  label={t("settings.smtpPort")}
                  htmlFor="smtp-port"
                  error={errors["smtp.port"]?.[0]}
                >
                  <input
                    id="smtp-port"
                    type="number"
                    value={smtp.port}
                    onChange={(e) => setSmtp({ ...smtp, port: Number(e.target.value) })}
                  />
                </LiyonField>
                <div className="flex flex-col justify-end pb-2">
                  <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={smtp.secure}
                      onChange={(e) => setSmtp({ ...smtp, secure: e.target.checked })}
                      className="h-4 w-4 rounded text-brand focus:ring-brand"
                    />
                    <span>SSL/TLS (465)</span>
                  </label>
                </div>
              </div>

              <LiyonField
                label={t("settings.smtpFromName")}
                htmlFor="smtp-from-name"
                error={errors["smtp.fromName"]?.[0]}
              >
                <input
                  id="smtp-from-name"
                  placeholder="เช่น หลักสูตร พธ.ม. มจร"
                  value={smtp.fromName}
                  onChange={(e) => setSmtp({ ...smtp, fromName: e.target.value })}
                />
              </LiyonField>

              <LiyonField
                label={t("settings.smtpFromEmail")}
                htmlFor="smtp-from-email"
                error={errors["smtp.fromEmail"]?.[0]}
              >
                <input
                  id="smtp-from-email"
                  type="email"
                  placeholder="เว้นว่างจะใช้อีเมลบัญชีผู้ส่ง"
                  value={smtp.fromEmail}
                  onChange={(e) => setSmtp({ ...smtp, fromEmail: e.target.value })}
                />
              </LiyonField>
            </div>

            {/* ส่วนทดสอบการส่งอีเมล */}
            <div className="mt-4 pt-4 border-t border-border/50">
              <h3 className="text-sm font-semibold mb-1 flex items-center gap-2">
                <Send className="h-4 w-4 text-brand" />
                {t("settings.smtpTestTitle")}
              </h3>
              <p className="text-xs text-muted-foreground mb-3">{t("settings.smtpTestDesc")}</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="ระบุอีเมลปลายทาง เช่น your-email@gmail.com"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  className="flex-1 text-sm"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleTestEmail}
                  disabled={testingSmtp || !smtp.user || !smtp.pass}
                  className="gap-2 shrink-0"
                >
                  {testingSmtp ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>{t("settings.smtpTesting")}</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>{t("settings.smtpTestBtn")}</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </LiyonCard>

        {/* SECTION 5: Google OAuth 2.0 (Sign-In SSO) */}
        <LiyonCard>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-4 mb-4">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  aria-hidden="true"
                  className="shrink-0"
                >
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                {t("settings.oauthTitle")}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">{t("settings.oauthDesc")}</p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-semibold shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {t("settings.oauthStatusActive")}
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-3.5 bg-muted/40 border border-border/50 rounded-lg text-xs leading-relaxed space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-semibold text-foreground flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-brand" />
                  {t("settings.oauthRedirectTitle")}
                </span>
                <a
                  href="https://console.cloud.google.com/apis/credentials"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-brand font-medium hover:underline text-xs"
                >
                  <span>{t("settings.oauthGuideLink")}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <p className="text-muted-foreground">
                ระบุ URL ต่อไปนี้ในช่อง <strong>Authorized redirect URIs</strong> บน Google Cloud Console:
              </p>

              <div className="space-y-2 pt-1">
                {[
                  {
                    label: "Local Development",
                    uri: "http://localhost:3010/api/auth/callback/google",
                  },
                  {
                    label: "Public HTTPS Tunnel",
                    uri: "https://cas-meters-ensemble-emperor.trycloudflare.com/api/auth/callback/google",
                  },
                ].map((item) => (
                  <div
                    key={item.uri}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2 bg-background rounded border border-border/60 font-mono text-xs"
                  >
                    <div className="flex items-center gap-2 min-w-0 overflow-hidden">
                      <span className="text-muted-foreground select-none shrink-0 font-sans font-medium">
                        {item.label}:
                      </span>
                      <span className="truncate select-all text-foreground/90">{item.uri}</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs shrink-0 self-end sm:self-auto"
                      onClick={() => copyToClipboard(item.uri)}
                    >
                      {copiedUri === item.uri ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" />
                          <span className="text-emerald-600 dark:text-emerald-400">
                            {t("settings.oauthCopied")}
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 mr-1" />
                          <span>{t("settings.oauthCopy")}</span>
                        </>
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </LiyonCard>

        {/* Save Bar */}
        <div className="savebar">
          <Button type="button" onClick={save} disabled={pending}>
            {t("common.save")}
          </Button>
        </div>
      </div>

      {/* MODALS */}
      <ImageCropModal
        open={cropModalOpen}
        onOpenChange={setCropModalOpen}
        currentLogoUrl={form.logoUrl}
        onApply={async (file: File) => {
          await processFile(file);
        }}
      />

      {orgInfoDialogOpen && (
        <OrgInfoDialog
          open={orgInfoDialogOpen}
          onOpenChange={setOrgInfoDialogOpen}
          nameTh={form.nameTh}
          nameEn={form.nameEn}
          orgInfo={orgInfo}
          onSave={(updated) => {
            setForm((prev) => ({
              ...prev,
              nameTh: updated.nameTh,
              nameEn: updated.nameEn,
            }));
            setOrgInfo(updated.orgInfo);
            toast.success("อัปเดตข้อมูลองค์กรเรียบร้อยแล้ว กรุณากดปุ่มบันทึกการตั้งค่า");
          }}
        />
      )}
    </>
  );
}
