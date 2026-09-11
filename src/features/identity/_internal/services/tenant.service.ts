import { cache } from "react";
import { prisma, type Db } from "@/shared/lib/infra/prisma";
import { DEFAULT_PALETTE, isPalette, type PaletteId } from "@/shared/lib/palette";
import { errors } from "@/shared/lib/errors";
import { writeAudit } from "../audit";
import type { UpdateSettingsInput, SmtpSettings, OrgInfo } from "../validations/settings";

export interface TenantSettings {
  code: string;
  nameTh: string;
  nameEn: string;
  logoUrl: string | null;
  palette: PaletteId;
  smtp?: SmtpSettings;
  orgInfo?: OrgInfo;
}

async function readTenantSettings(tenantId: string, db: Db): Promise<TenantSettings> {
  let t = await db.tenant.findUnique({ where: { id: tenantId } });
  if (!t) {
    const fallbackTenant = await db.tenant.findFirst({ orderBy: { createdAt: "asc" } });
    if (fallbackTenant) t = fallbackTenant;
  }
  if (!t) throw errors.not_found();
  const s = (t.settings as { palette?: unknown; smtp?: SmtpSettings; orgInfo?: OrgInfo }) || {};
  const p = s.palette;
  const smtp = s.smtp;
  const orgInfo = s.orgInfo;
  return {
    code: t.code,
    nameTh: t.nameTh,
    nameEn: t.nameEn,
    logoUrl: t.logoUrl,
    palette: isPalette(p) ? p : DEFAULT_PALETTE,
    smtp: smtp ? {
      enabled: Boolean(smtp.enabled),
      host: smtp.host || "smtp.gmail.com",
      port: smtp.port || 465,
      secure: smtp.secure !== false,
      user: smtp.user || "",
      pass: smtp.pass || "",
      fromName: smtp.fromName || "",
      fromEmail: smtp.fromEmail || "",
    } : undefined,
    orgInfo: orgInfo ? {
      taglineTh: orgInfo.taglineTh || "",
      taglineEn: orgInfo.taglineEn || "",
      descriptionTh: orgInfo.descriptionTh || "",
      descriptionEn: orgInfo.descriptionEn || "",
      addressTh: orgInfo.addressTh || "",
      addressEn: orgInfo.addressEn || "",
      email: orgInfo.email || "",
      phone: orgInfo.phone || "",
      website: orgInfo.website || "",
    } : undefined,
  };
}

export async function getTenantSettings(tenantId: string): Promise<TenantSettings> {
  return readTenantSettings(tenantId, prisma);
}

/** เก็บคีย์อื่น ๆ ใน settings JSON ไว้ทั้งหมด — merge palette และ smtp ไม่ทับทั้งก้อน */
export async function updateTenantSettings(input: { tenantId: string; actorId: string } & UpdateSettingsInput): Promise<void> {
  await prisma.$transaction(async (tx) => {
    let targetTenant = await tx.tenant.findUnique({ where: { id: input.tenantId } });
    if (!targetTenant) {
      targetTenant = await tx.tenant.findFirst({ orderBy: { createdAt: "asc" } });
    }
    if (!targetTenant) throw errors.not_found();
    const before = await readTenantSettings(targetTenant.id, tx);
    const currentSettings = (targetTenant.settings as { palette?: unknown; smtp?: SmtpSettings; orgInfo?: OrgInfo }) || {};

    let mergedSmtp: SmtpSettings | undefined = undefined;
    if (input.smtp) {
      const existingPass = currentSettings.smtp?.pass || "";
      const finalPass = input.smtp.pass ? input.smtp.pass : existingPass;
      mergedSmtp = {
        ...input.smtp,
        pass: finalPass,
      };
    }

    await tx.tenant.update({
      where: { id: targetTenant.id },
      data: {
        nameTh: input.nameTh,
        nameEn: input.nameEn,
        logoUrl: input.logoUrl || null,
        settings: {
          ...currentSettings,
          palette: input.palette,
          ...(mergedSmtp !== undefined ? { smtp: mergedSmtp } : {}),
          ...(input.orgInfo !== undefined ? { orgInfo: input.orgInfo } : {}),
        },
      },
    });
    await writeAudit({ tenantId: targetTenant.id, actorId: input.actorId, action: "tenant.settings_update", entity: "tenant", entityId: targetTenant.id, before, after: input }, tx);
  });
}

export async function getTenantSmtp(tenantId?: string): Promise<SmtpSettings | undefined> {
  const tid = tenantId || (await getDefaultTenantId());
  if (!tid) return undefined;
  const t = await prisma.tenant.findUnique({ where: { id: tid }, select: { settings: true } });
  const s = t?.settings as { smtp?: SmtpSettings } | null;
  return s?.smtp?.enabled ? s.smtp : undefined;
}

export async function getTenantPalette(tenantId: string): Promise<PaletteId> {
  const t = await prisma.tenant.findUnique({ where: { id: tenantId }, select: { settings: true } });
  const p = (t?.settings as { palette?: unknown } | null)?.palette;
  return isPalette(p) ? p : DEFAULT_PALETTE;
}

export async function getDefaultTenantId(): Promise<string> {
  const mcuTenant = await prisma.tenant.findFirst({
    where: { code: "MCU-VIPASSANA", isActive: true },
    select: { id: true },
  });
  if (mcuTenant) return mcuTenant.id;

  const tenant = await prisma.tenant.findFirst({
    where: { isActive: true },
    select: { id: true },
  });
  return tenant?.id ?? "";
}

/**
 * tenant ของ session ถ้ามี — import แบบ dynamic เพราะ `../auth` ดึง next-auth ทั้งก้อนเข้ามา และ
 * โมดูลนี้ถูก import จาก root layout ที่รันทุก request · แยก try ของตัวเองไว้ต่างหากโดยเจตนา: เดิมมันอยู่
 * ใน try เดียวกับการอ่านฐานข้อมูล ทำให้ "โหลด auth ไม่ได้" กับ "ฐานข้อมูลล้ม" กลืนหายไปเป็นค่าเดียวกัน
 * และเส้นทางอ่าน tenant ทั้งเส้นทดสอบไม่ได้เลย (ในสภาพแวดล้อมเทสต์ next-auth resolve ไม่ผ่าน)
 */
async function sessionTenantId(): Promise<string | null> {
  try {
    const { auth } = await import("../auth");
    return (await auth())?.tenantId || null;
  } catch {
    return null;
  }
}

/** ใช้โดย root layout ทุก request — tenant จาก session ถ้ามี ไม่งั้น tenant แรก (หน้า login ยังไม่มี session) · ไม่ throw */
export const resolvePalette = cache(async (): Promise<PaletteId> => {
  try {
    const tenantId = (await sessionTenantId()) || (await prisma.tenant.findFirst({ orderBy: { createdAt: "asc" }, select: { id: true } }))?.id;
    return tenantId ? await getTenantPalette(tenantId) : DEFAULT_PALETTE;
  } catch {
    return DEFAULT_PALETTE;
  }
});

/** ใช้โดย layout ต่าง ๆ เพื่ออ่านข้อมูล tenant ปัจจุบัน (รวมถึง logoUrl) — ไม่ throw */
export const resolveTenantSettings = cache(async (): Promise<TenantSettings | null> => {
  try {
    const defaultId = await getDefaultTenantId();
    const tenantId =
      (await sessionTenantId()) ||
      defaultId ||
      (await prisma.tenant.findFirst({ orderBy: { createdAt: "asc" }, select: { id: true } }))?.id;
    return tenantId ? await getTenantSettings(tenantId) : null;
  } catch {
    return null;
  }
});
