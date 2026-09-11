import "server-only";
import nodemailer from "nodemailer";
import { env, smtpConfigured } from "./env";
import { logger } from "./logger";

export interface SmtpConfig {
  host: string;
  port: number;
  secure?: boolean;
  user?: string;
  pass?: string;
  from?: string;
}

export interface MailInput {
  to: string;
  subject: string;
  text: string;
  html?: string;
  smtp?: SmtpConfig;
}

/** ไม่มี SMTP → เขียนลง log ระดับ info แล้วคืน delivered:false — ระบบต้องไม่ล้มเพราะส่งอีเมลไม่ได้ */
export async function sendMail(input: MailInput): Promise<{ delivered: boolean; error?: string }> {
  const customSmtp = input.smtp;
  const isCustomConfigured = Boolean(customSmtp && customSmtp.host && customSmtp.user);

  if (!isCustomConfigured && !smtpConfigured()) {
    logger.info("mail (no SMTP, logged only)", { to: input.to, subject: input.subject, text: input.text });
    return { delivered: false };
  }

  const e = env();
  const host = customSmtp?.host || e.SMTP_HOST;
  const port = customSmtp?.port || e.SMTP_PORT;
  const secure = customSmtp ? (customSmtp.secure !== undefined ? customSmtp.secure : port === 465) : port === 465;
  const user = customSmtp ? customSmtp.user : e.SMTP_USER;
  const pass = customSmtp ? customSmtp.pass : e.SMTP_PASS;
  const from = customSmtp?.from || e.SMTP_FROM;

  try {
    const transport = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: user ? { user, pass } : undefined,
    });
    await transport.sendMail({ from, to: input.to, subject: input.subject, text: input.text, html: input.html });
    return { delivered: true };
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    logger.error("mail send failed", { to: input.to, err: errMsg });
    return { delivered: false, error: errMsg };
  }
}
