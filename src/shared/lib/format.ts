import type { Locale } from "./i18n/config";

export interface FormatDateOptions { time?: boolean }

/** DB เก็บ ค.ศ. เสมอ — การแสดง พ.ศ. เกิดที่นี่ที่เดียว (Intl ใช้ปฏิทินพุทธเมื่อ locale th-TH-u-ca-buddhist) */
export function formatDate(value: Date | string | null | undefined, locale: Locale, opts: FormatDateOptions = {}): string {
  if (!value) return "—";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "—";
  const tag = locale === "th" ? "th-TH-u-ca-buddhist" : "en-GB";
  return new Intl.DateTimeFormat(tag, {
    year: "numeric", month: "short", day: "numeric",
    ...(opts.time ? { hour: "2-digit", minute: "2-digit" } : {}),
    timeZone: "Asia/Bangkok",
  }).format(date);
}

export interface Bilingual { nameTh: string; nameEn?: string | null }

export function localizedName(entity: Bilingual, locale: Locale): string {
  if (locale === "en" && entity.nameEn && entity.nameEn.trim() !== "") return entity.nameEn;
  return entity.nameTh;
}

/** ปีการศึกษาเก็บเป็นตัวเลข พ.ศ. (เป็นชื่อ ไม่ใช่วันที่) */
export function academicYearLabel(yearBE: number, locale: Locale): string {
  return locale === "th" ? `ปีการศึกษา ${yearBE}` : `AY ${yearBE - 543}`;
}

export interface MonasticPersonName {
  titleTh: string;
  academicRank?: string | null;
  firstNameTh: string;
  lastNameTh?: string | null;
  monasticName?: string | null;
}

/**
 * จัดรูปแบบชื่อเต็มภาษาไทยตามอัตลักษณ์สงฆ์และฆราวาส:
 * - พระสงฆ์: [ตำแหน่งวิชาการ] [สมณศักดิ์/คำนำหน้า][ชื่อ] ([ฉายา]) [นามสกุลถ้ามี]
 * - ฆราวาส/แม่ชี: [ตำแหน่งวิชาการ] [คำนำหน้า][ชื่อ] [นามสกุล]
 */
export function formatThaiMonasticFullName(p: MonasticPersonName): string {
  const parts: string[] = [];
  if (p.academicRank && p.academicRank.trim() !== "") {
    parts.push(p.academicRank.trim());
  }
  const namePart = (p.titleTh || "") + (p.firstNameTh || "");
  if (namePart) {
    parts.push(namePart);
  }
  if (p.monasticName && p.monasticName.trim() !== "") {
    parts.push(`(${p.monasticName.trim()})`);
  }
  if (p.lastNameTh && p.lastNameTh.trim() !== "") {
    parts.push(p.lastNameTh.trim());
  }
  return parts.join(" ");
}
