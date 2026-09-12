"use server";
import { revalidatePath } from "next/cache";
import { runAction, type ActionResult } from "@/shared/lib/result";
import { getLocale } from "@/shared/lib/i18n/server";
import { zodErrorMap } from "@/shared/lib/i18n/zod-locale";
import { errors } from "@/shared/lib/errors";
import { P } from "../../permissions";
import { requirePermission } from "../rbac";
import { writeAudit } from "../audit";
import { updateSettingsSchema, testSmtpSchema, testGeminiSchema } from "../validations/settings";
import { prisma } from "@/shared/lib/infra/prisma";
import { sendMail } from "@/shared/lib/infra/mailer";
import { getTenantSettings, updateTenantSettings, type TenantSettings } from "../services/tenant.service";
import { saveLogoFile } from "../services/upload.service";

export async function getSettingsAction(): Promise<ActionResult<TenantSettings>> {
  return runAction(async () => getTenantSettings((await requirePermission(P.settingsManage)).tenantId));
}
export async function updateSettingsAction(input: unknown): Promise<ActionResult<void>> {
  return runAction(async () => {
    const ctx = await requirePermission(P.settingsManage);
    await updateTenantSettings({
      tenantId: ctx.tenantId,
      actorId: ctx.userId,
      ...updateSettingsSchema.parse(input, { error: zodErrorMap(await getLocale()) }),
    });
    revalidatePath("/", "layout"); // data-palette บน <html> อ่านใหม่
    revalidatePath("/(admin)", "layout");
    revalidatePath("/(portal)", "layout");
    revalidatePath("/settings");
    revalidatePath("/");
  });
}
export async function uploadLogoAction(formData: FormData): Promise<ActionResult<{ url: string }>> {
  return runAction(async () => {
    const ctx = await requirePermission(P.settingsManage);
    const file = formData.get("file") as File | null;
    if (!file) {
      throw errors.validation("validation", { file: ["settings.fileRequired"] });
    }
    const targetTenant = (await prisma.tenant.findUnique({ where: { id: ctx.tenantId }, select: { id: true } })) ?? (await prisma.tenant.findFirst({ orderBy: { createdAt: "asc" }, select: { id: true } }));
    const tenantId = targetTenant?.id ?? ctx.tenantId;
    const url = await saveLogoFile(tenantId, file);
    await writeAudit({
      tenantId,
      actorId: ctx.userId,
      action: "tenant.logo_upload",
      entity: "tenant",
      entityId: tenantId,
      after: { url },
    });
    return { url };
  });
}

export async function testSmtpAction(input: unknown): Promise<ActionResult<{ delivered: boolean }>> {
  return runAction(async () => {
    await requirePermission(P.settingsManage);
    const locale = await getLocale();
    const data = testSmtpSchema.parse(input, { error: zodErrorMap(locale) });
    const { smtp, testEmail } = data;

    const fromAddress = smtp.fromName
      ? `"${smtp.fromName}" <${smtp.fromEmail || smtp.user}>`
      : smtp.fromEmail || smtp.user;

    const res = await sendMail({
      to: testEmail,
      subject: `[FMS MCU] ทดสอบการเชื่อมต่อ Gmail SMTP สำเร็จ`,
      text: `การเชื่อมต่อระบบ Gmail SMTP กับ FMS MCU เสร็จสมบูรณ์แล้ว!\n\nHost: ${smtp.host}\nPort: ${smtp.port}\nUsername: ${smtp.user}\nทดสอบเมื่อ: ${new Date().toLocaleString("th-TH")}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #0f172a; margin-bottom: 6px;">ระบบทดสอบ Gmail SMTP (FMS MCU)</h2>
            <p style="color: #64748b; font-size: 14px; margin: 0;">หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา มจร</p>
          </div>
          <div style="padding: 16px; background-color: #f0fdf4; border-left: 4px solid #22c55e; border-radius: 6px; margin-bottom: 20px;">
            <strong style="color: #15803d; font-size: 16px;">✅ การเชื่อมต่อสำเร็จสมบูรณ์</strong>
            <p style="color: #166534; font-size: 14px; margin: 4px 0 0 0;">
              ระบบสามารถเชื่อมต่อไปยัง Gmail SMTP Server และส่งอีเมลฉบับนี้ออกมาได้เรียบร้อยแล้ว
            </p>
          </div>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; width: 140px;">SMTP Host:</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: 500;">${smtp.host}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;">SMTP Port:</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: 500;">${smtp.port} (${smtp.secure ? "SSL/TLS" : "STARTTLS"})</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;">บัญชีผู้ส่ง:</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: 500;">${smtp.user}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;">เวลาที่ทดสอบ:</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: 500;">${new Date().toLocaleString("th-TH")}</td>
            </tr>
          </table>
          <p style="color: #94a3b8; font-size: 12px; text-align: center; margin: 0;">
            อีเมลฉบับนี้เป็นการทดสอบระบบจากหน้าตั้งค่าผู้ดูแลระบบ กรุณาอย่าตอบกลับ
          </p>
        </div>
      `,
      smtp: {
        host: smtp.host,
        port: smtp.port,
        secure: smtp.secure,
        user: smtp.user,
        pass: smtp.pass,
        from: fromAddress,
      },
    });

    if (!res.delivered) {
      throw new Error(res.error || "settings.smtpTestFailed");
    }

    return { delivered: true };
  });
}

export async function testGeminiAction(input: unknown): Promise<ActionResult<{ success: boolean; model: string }>> {
  return runAction(async () => {
    await requirePermission(P.settingsManage);
    const locale = await getLocale();
    const data = testGeminiSchema.parse(input, { error: zodErrorMap(locale) });
    const apiKey = data.gemini.apiKey || process.env.GEMINI_API_KEY || "";
    if (!apiKey) {
      throw new Error("settings.geminiApiKeyRequired");
    }
    const model = data.gemini.model || "gemini-2.5-flash";
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: "Hello Gemini! Reply with: OK" }],
          },
        ],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 10,
        },
      }),
    });

    if (!res.ok) {
      let errorMsg = `HTTP ${res.status} ${res.statusText}`;
      try {
        const errJson = await res.json();
        if (errJson.error?.message) {
          errorMsg = errJson.error.message;
        }
      } catch {}
      throw new Error(errorMsg);
    }

    return { success: true, model };
  });
}

