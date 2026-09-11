import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { errors } from "@/shared/lib/errors";
import { ALLOWED_LOGO_MIME_TYPES, MAX_LOGO_FILE_SIZE } from "../validations/settings";

const MIME_TO_EXT: Record<string, string> = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/webp": ".webp",
  "image/svg+xml": ".svg",
  "image/gif": ".gif",
};

/** ตรวจสอบความปลอดภัยของไฟล์ SVG ป้องกัน Stored XSS และ Malicious Active Content */
function isSafeSvg(content: string): boolean {
  const lower = content.toLowerCase();
  if (!lower.includes("<svg")) return false;
  const dangerousPatterns = [
    /<script\b/i,
    /javascript:/i,
    /data:\s*text\/html/i,
    /\bon\w+\s*=/i, // onload=, onerror=, onclick=
    /<foreignobject\b/i,
    /<iframe\b/i,
    /<embed\b/i,
    /<object\b/i,
  ];
  return !dangerousPatterns.some((pattern) => pattern.test(content));
}

/** ตรวจสอบ Magic Bytes (File Signature) ป้องกันการปลอมแปลง MIME Type */
function isValidImageSignature(buffer: Buffer, mimeType: string): boolean {
  if (buffer.length < 4) return false;
  if (mimeType === "image/png") {
    return buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47;
  }
  if (mimeType === "image/jpeg") {
    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }
  if (mimeType === "image/gif") {
    return buffer.subarray(0, 3).toString("ascii") === "GIF";
  }
  if (mimeType === "image/webp") {
    return (
      buffer.length >= 12 &&
      buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
      buffer.subarray(8, 12).toString("ascii") === "WEBP"
    );
  }
  if (mimeType === "image/svg+xml") {
    return isSafeSvg(buffer.toString("utf-8"));
  }
  return false;
}

export async function saveLogoFile(tenantId: string, file: File): Promise<string> {
  if (!file || typeof file.size !== "number" || file.size === 0) {
    throw errors.validation("validation", { file: ["settings.fileRequired"] });
  }

  if (file.size > MAX_LOGO_FILE_SIZE) {
    throw errors.validation("validation", { file: ["settings.fileTooLarge"] });
  }

  if (!ALLOWED_LOGO_MIME_TYPES.includes(file.type as (typeof ALLOWED_LOGO_MIME_TYPES)[number])) {
    throw errors.validation("validation", { file: ["settings.invalidFileType"] });
  }

  let buffer: Buffer;
  if (typeof file.arrayBuffer === "function") {
    buffer = Buffer.from(await file.arrayBuffer());
  } else {
    const arrayBuffer = await new Response(file as unknown as Blob).arrayBuffer();
    buffer = Buffer.from(arrayBuffer);
  }

  // ป้องกัน MIME type spoofing และ Stored XSS ใน SVG
  if (!isValidImageSignature(buffer, file.type)) {
    throw errors.validation("validation", { file: ["settings.invalidFileType"] });
  }

  // ป้องกัน Directory Traversal ในชื่อ Tenant
  const safeTenantId = tenantId.replace(/[^a-zA-Z0-9_-]/g, "") || "default";
  const ext = MIME_TO_EXT[file.type] || ".png";
  const randomSuffix = crypto.randomBytes(6).toString("hex");
  const fileName = `${safeTenantId}-logo-${Date.now()}-${randomSuffix}${ext}`;

  const uploadDir = path.join(process.cwd(), "public", "uploads", "logos");
  await fs.mkdir(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, fileName);
  await fs.writeFile(filePath, buffer);

  return `/uploads/logos/${fileName}`;
}
