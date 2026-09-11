import { z } from "zod";
import { PALETTE_IDS } from "@/shared/lib/palette";

export const ALLOWED_LOGO_MIME_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/svg+xml",
  "image/gif",
] as const;

export const MAX_LOGO_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const smtpSettingsSchema = z.object({
  enabled: z.boolean().default(false),
  host: z.string().trim().default("smtp.gmail.com"),
  port: z.coerce.number().min(1).max(65535).default(465),
  secure: z.boolean().default(true),
  user: z.string().trim().default(""),
  pass: z.string().trim().default(""),
  fromName: z.string().trim().max(100).default(""),
  fromEmail: z.string().trim().default(""),
});
export type SmtpSettings = z.infer<typeof smtpSettingsSchema>;

export const testSmtpSchema = z.object({
  smtp: smtpSettingsSchema,
  testEmail: z.string().trim().email(),
});
export type TestSmtpInput = z.infer<typeof testSmtpSchema>;

export const orgInfoSchema = z.object({
  taglineTh: z.string().trim().max(255).default(""),
  taglineEn: z.string().trim().max(255).default(""),
  descriptionTh: z.string().trim().max(2000).default(""),
  descriptionEn: z.string().trim().max(2000).default(""),
  addressTh: z.string().trim().max(500).default(""),
  addressEn: z.string().trim().max(500).default(""),
  email: z.string().trim().max(255).default(""),
  phone: z.string().trim().max(100).default(""),
  website: z.string().trim().max(255).default(""),
});
export type OrgInfo = z.infer<typeof orgInfoSchema>;

export const updateSettingsSchema = z.object({
  nameTh: z.string().trim().min(1).max(255),
  nameEn: z.string().trim().min(1).max(255),
  logoUrl: z
    .string()
    .trim()
    .max(500)
    .refine(
      (v) => v === "" || v.startsWith("/") || /^https?:\/\//.test(v),
      { message: "invalid_url" }
    )
    .default(""),
  palette: z.enum(PALETTE_IDS),
  smtp: smtpSettingsSchema.optional(),
  orgInfo: orgInfoSchema.optional(),
});
export const updateProfileSchema = z.object({ name: z.string().trim().min(1).max(255), locale: z.enum(["th", "en"]) });
export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
