"use client";

import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useLocale } from "@/shared/lib/i18n/client";
import type { OrgInfo } from "@/features/identity";

export interface PortalFooterProps {
  logoUrl?: string | null;
  nameTh?: string | null;
  nameEn?: string | null;
  taglineTh?: string | null;
  taglineEn?: string | null;
  orgInfo?: OrgInfo | null;
}

export function PortalFooter({
  logoUrl,
  nameTh,
  nameEn,
  taglineTh,
  taglineEn,
  orgInfo,
}: PortalFooterProps = {}) {
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  const defaultNameTh =
    "หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา(ภาคเสาร์-อาทิตย์) ภาควิชาพระพุทธศาสนา คณะพุทธศาสตร์ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย";
  const defaultNameEn =
    "Master of Arts Program in Vipassana Meditation Studies (Weekend Session), Department of Buddhism, Faculty of Buddhism, Mahachulalongkornrajavidyalaya University";
  const defaultTaglineTh = "หลักสูตรพุทธศาสตรมหาบัณฑิต (ภาคเสาร์-อาทิตย์)";
  const defaultTaglineEn = "Master of Arts Program (Weekend Session)";

  const brandName =
    locale === "en"
      ? nameEn || nameTh || defaultNameEn
      : nameTh || nameEn || defaultNameTh;

  const brandTagline =
    locale === "en"
      ? taglineEn || taglineTh || defaultTaglineEn
      : taglineTh || taglineEn || defaultTaglineTh;

  const academicLinks = [
    { href: "/", labelTh: "หน้าแรก", labelEn: "Home" },
    { href: "/news", labelTh: "ข่าวสารและกิจกรรม", labelEn: "News & Events" },
    { href: "/admissions", labelTh: "รับสมัครเรียนออนไลน์", labelEn: "Online Admissions" },
    { href: "/curriculum", labelTh: "โครงสร้างหลักสูตร (มคอ.๒)", labelEn: "Curriculum Specification" },
    { href: "/faculty", labelTh: "ทำเนียบคณาจารย์", labelEn: "Faculty Directory" },
    { href: "/schedules", labelTh: "ตารางเรียนบรรยาย", labelEn: "Class Schedules" },
    { href: "/theses", labelTh: "คลังวิทยานิพนธ์", labelEn: "Theses Repository" },
  ];

  const serviceLinks = [
    { href: "/dashboard", labelTh: "ระบบจัดการ (Console)", labelEn: "Staff Console", external: false },
    { href: "/petitions", labelTh: "ยื่นคำร้องออนไลน์", labelEn: "Student Petitions", external: false },
    { href: "/contact", labelTh: "ติดต่อเราและแผนที่ตั้ง", labelEn: "Contact & Location", external: false },
    { href: "/me", labelTh: "ข้อมูลส่วนบุคคล", labelEn: "User Profile", external: false },
    { href: "https://www.mcu.ac.th", labelTh: "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย", labelEn: "MCU Main Portal", external: true },
    { href: "https://grad.mcu.ac.th", labelTh: "บัณฑิตวิทยาลัย มจร", labelEn: "MCU Graduate School", external: true },
  ];

  return (
    <footer className="mt-16 bg-[var(--ink-band)] text-[var(--ink-band-text)] border-t border-white/10 transition-colors relative">
      {/* Delicate ambient line on top of footer */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-light)] to-transparent opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Col 1: About Program & Institution (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3 group inline-flex">
              <i className="w-10 h-10 rounded-lg bg-brand text-on-brand flex items-center justify-center font-normal overflow-hidden shrink-0 shadow-md group-hover:scale-105 transition-transform duration-150">
                {logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logoUrl}
                    alt={brandName}
                    className="h-full w-full object-contain p-0.5 rounded-[inherit]"
                  />
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                    <path d="M22 10 12 5 2 10l10 5 10-5Z" />
                    <path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
                  </svg>
                )}
              </i>
              <div className="flex flex-col min-w-0">
                <b className="text-sm sm:text-base font-bold tracking-tight text-[var(--ink-band-text)] leading-snug group-hover:text-brand-light transition-colors">
                  {brandName}
                </b>
                <span className="text-xs text-[var(--ink-band-muted)] leading-tight">
                  {brandTagline}
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[var(--ink-band-muted)] leading-relaxed">
              {locale === "en"
                ? "Dedicated to advancing research and in-depth understanding of Vipassana meditation, integrating Buddhist scriptures with mindfulness practice for spiritual growth and global outreach."
                : "มุ่งเน้นสร้างองค์ความรู้ใหม่และการวิจัยเชิงลึกด้านวิปัสสนากรรมฐาน บูรณาการปริยัติธรรมและปฏิบัติธรรมตามหลักพระไตรปิฎก เพื่อพัฒนาจิตปัญญาและเผยแผ่พระสัทธรรมสู่สังคมสากล"}
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs text-[var(--ink-band-muted)]">
                <Sparkles className="w-3.5 h-3.5 text-brand-light" />
                <span>
                  {locale === "en"
                    ? "Graduate School, MCU (Weekend Program)"
                    : "บัณฑิตวิทยาลัย มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย"}
                </span>
              </div>
            </div>
          </div>

          {/* Col 2: Academic Links (Span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold tracking-wider uppercase text-[var(--ink-band-text)] flex items-center gap-1.5">
              <span>{locale === "en" ? "Curriculum" : "เมนูหลักสูตร"}</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {academicLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--ink-band-muted)] hover:text-[var(--ink-band-text)] hover:translate-x-0.5 transition-all inline-flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="w-3 h-3 text-brand-light opacity-60 group-hover:opacity-100 transition-opacity" />
                    <span>{locale === "en" ? link.labelEn : link.labelTh}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Student & Staff Services (Span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold tracking-wider uppercase text-[var(--ink-band-text)] flex items-center gap-1.5">
              <span>{locale === "en" ? "Services & Portals" : "บริการนิสิตและบุคลากร"}</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--ink-band-muted)] hover:text-[var(--ink-band-text)] transition-colors inline-flex items-center gap-1.5 group"
                    >
                      <ExternalLink className="w-3 h-3 text-brand-light opacity-60 group-hover:opacity-100 transition-opacity" />
                      <span>{locale === "en" ? link.labelEn : link.labelTh}</span>
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-[var(--ink-band-muted)] hover:text-[var(--ink-band-text)] hover:translate-x-0.5 transition-all inline-flex items-center gap-1.5 group"
                    >
                      <ChevronRight className="w-3 h-3 text-brand-light opacity-60 group-hover:opacity-100 transition-opacity" />
                      <span>{locale === "en" ? link.labelEn : link.labelTh}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Location (Span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold tracking-wider uppercase text-[var(--ink-band-text)] flex items-center gap-1.5">
              <span>{locale === "en" ? "Contact Office" : "ติดต่อหลักสูตร"}</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-[var(--ink-band-muted)]">
              <li className="flex items-start gap-2.5 leading-relaxed">
                <MapPin className="w-4 h-4 text-brand-light shrink-0 mt-0.5" />
                <span>
                  {locale === "en"
                    ? orgInfo?.addressEn || orgInfo?.addressTh || "Mahachulalongkornrajavidyalaya University, Wang Noi, Phra Nakhon Si Ayutthaya 13170 Thailand"
                    : orgInfo?.addressTh || orgInfo?.addressEn || "อาคารมหาจุฬาบรรณาคาร มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย ต.ลำไทร อ.วังน้อย จ.พระนครศรีอยุธยา ๑๓๑๗๐"}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-light shrink-0" />
                <span>{orgInfo?.phone || "๐๓๕-๒๔๘-๐๐๐ ต่อ ๘๐๕๐"}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-light shrink-0" />
                <a
                  href={`mailto:${orgInfo?.email || "vipassana@mcu.ac.th"}`}
                  className="hover:underline hover:text-[var(--ink-band-text)] transition-colors"
                >
                  {orgInfo?.email || "vipassana@mcu.ac.th"}
                </a>
              </li>
              <li className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-brand-light shrink-0 mt-0.5" />
                <span>
                  {locale === "en"
                    ? orgInfo?.officeHoursEn || orgInfo?.officeHoursTh || "Saturday - Sunday: 08:30 - 17:00"
                    : orgInfo?.officeHoursTh || orgInfo?.officeHoursEn || "วันเสาร์ - อาทิตย์ เวลา ๐๘:๓๐ - ๑๗:๐๐ น."}
                </span>
              </li>

              {/* Social & Official Channels */}
              {(orgInfo?.lineId || orgInfo?.facebookUrl || orgInfo?.website) && (
                <li className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
                  {orgInfo.lineId && (
                    <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-950/60 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                      LINE: {orgInfo.lineId}
                    </span>
                  )}
                  {orgInfo.facebookUrl && (
                    <a
                      href={orgInfo.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] bg-blue-950/60 text-blue-300 hover:text-blue-200 px-2 py-0.5 rounded border border-blue-500/30 transition-colors"
                    >
                      Facebook
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                  {orgInfo.website && (
                    <a
                      href={orgInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] bg-amber-950/60 text-amber-300 hover:text-amber-200 px-2 py-0.5 rounded border border-amber-500/30 transition-colors"
                    >
                      Website
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </li>
              )}

              {/* Direct Link to /contact page */}
              <li className="pt-1.5">
                <Link
                  href="/contact"
                  className="text-xs text-brand-light hover:underline inline-flex items-center gap-1 font-medium"
                >
                  <span>{locale === "en" ? "View full contact info & map →" : "ดูแผนที่และช่องทางติดต่อทั้งหมด →"}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Sub-footer bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs text-[var(--ink-band-muted)] gap-4">
          <p>
            © {currentYear} {brandName}.{" "}
            {locale === "en" ? "All rights reserved." : "สงวนลิขสิทธิ์ทุกประการ"}
          </p>
          <div className="flex items-center gap-3 text-[11px] text-[var(--ink-band-muted)]">
            <span>Mahachulalongkornrajavidyalaya University</span>
            <span>•</span>
            <span>Weekend Program</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
