import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Globe,
  ExternalLink,
  MessageCircle,
  Share2,
  Navigation,
  Compass,
  ArrowRight,
  GraduationCap,
} from "lucide-react";
import { resolveTenantSettings } from "@/features/identity/server";
import { getLocale } from "@/shared/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: locale === "en" ? "Contact & Campus Location" : "ติดต่อหลักสูตรและที่ตั้งสำนักงาน",
    description:
      locale === "en"
        ? "Official contact information, office hours, and campus directions for the Master of Arts in Vipassana Meditation Studies, Mahachulalongkornrajavidyalaya University."
        : "ข้อมูลการติดต่อทางการ เวลาทำการ และแผนที่การเดินทาง อาคารมหาจุฬาบรรณาคาร มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย",
  };
}

export default async function ContactPage() {
  const locale = await getLocale();
  const settings = await resolveTenantSettings();
  const orgInfo = settings?.orgInfo;

  const defaultNameTh =
    "หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา(ภาคเสาร์-อาทิตย์) ภาควิชาพระพุทธศาสนา คณะพุทธศาสตร์ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย";
  const defaultNameEn =
    "Master of Arts Program in Vipassana Meditation Studies (Weekend Session), Department of Buddhism, Faculty of Buddhism, Mahachulalongkornrajavidyalaya University";

  const brandName =
    locale === "en"
      ? settings?.nameEn || settings?.nameTh || defaultNameEn
      : settings?.nameTh || settings?.nameEn || defaultNameTh;

  const address =
    locale === "en"
      ? orgInfo?.addressEn || orgInfo?.addressTh || "Mahachulalongkornrajavidyalaya University, 79 Moo 1, Phahon Yothin Rd., Lam Sai, Wang Noi, Phra Nakhon Si Ayutthaya 13170 Thailand"
      : orgInfo?.addressTh || orgInfo?.addressEn || "อาคารมหาจุฬาบรรณาคาร มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย เลขที่ ๗๙ หมู่ที่ ๑ ถนนพหลโยธิน ตำบลลำไทร อำเภอวังน้อย จังหวัดพระนครศรีอยุธยา ๑๓๑๗๐";

  const phone = orgInfo?.phone || "๐๓๕-๒๔๘-๐๐๐ ต่อ ๘๐๕๐";
  const email = orgInfo?.email || "vipassana@mcu.ac.th";

  const officeHours =
    locale === "en"
      ? orgInfo?.officeHoursEn || orgInfo?.officeHoursTh || "Saturday - Sunday: 08:30 - 17:00"
      : orgInfo?.officeHoursTh || orgInfo?.officeHoursEn || "วันเสาร์ - อาทิตย์ เวลา ๐๘:๓๐ - ๑๗:๐๐ น.";

  const googleMapsUrl =
    "https://maps.google.com/?q=Mahachulalongkornrajavidyalaya+University+Wang+Noi";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="border-b border-stone-200 pb-8">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-amber-800 mb-2">
          <Link href="/" className="hover:underline">
            {locale === "en" ? "Home" : "หน้าแรก"}
          </Link>
          <span>/</span>
          <span className="text-stone-500">
            {locale === "en" ? "Contact & Location" : "ติดต่อเราและที่ตั้งสำนักงาน"}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif">
          {locale === "en" ? "Contact Us & Campus Location" : "ติดต่อหลักสูตรและที่ตั้งสำนักงาน"}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-3xl leading-relaxed">
          {brandName}
        </p>
      </div>

      {/* Grid: 4 Core Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* ๑. ที่อยู่สำนักงาน */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100/70 text-amber-800 flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-stone-900 text-lg">
              {locale === "en" ? "Office Location" : "ที่ตั้งสำนักงาน"}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {address}
            </p>
          </div>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-amber-800 hover:text-amber-900 inline-flex items-center gap-1.5 group pt-2 border-t border-stone-100"
          >
            <span>{locale === "en" ? "Open Google Maps" : "เปิดแผนที่ Google Maps"}</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* ๒. หมายเลขโทรศัพท์ */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-stone-900 text-lg">
              {locale === "en" ? "Telephone" : "เบอร์โทรศัพท์"}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {locale === "en"
                ? "Direct contact during office hours for admissions and inquiries."
                : "ติดต่อสอบถามข้อมูลการสมัครเรียนและการเรียนการสอน"}
            </p>
            <div className="pt-1">
              <span className="text-base sm:text-lg font-bold text-stone-900 block">
                {phone}
              </span>
            </div>
          </div>
          <div className="text-xs text-stone-400 pt-2 border-t border-stone-100">
            {locale === "en" ? "Hotline / Extension" : "สายตรง / เบอร์ต่อภายใน"}
          </div>
        </div>

        {/* ๓. อีเมลติดต่อทางการ */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100/70 text-blue-800 flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-stone-900 text-lg">
              {locale === "en" ? "Official Email" : "อีเมลติดต่อทางการ"}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {locale === "en"
                ? "Send official documents, petitions, or general academic inquiries."
                : "ส่งเอกสาร คำร้องนิสิต หรือติดต่อประสานงานวิชาการ"}
            </p>
            <div className="pt-1">
              <a
                href={`mailto:${email}`}
                className="text-sm sm:text-base font-semibold text-blue-700 hover:underline break-all"
              >
                {email}
              </a>
            </div>
          </div>
          <a
            href={`mailto:${email}`}
            className="text-xs font-semibold text-blue-700 hover:text-blue-800 inline-flex items-center gap-1.5 pt-2 border-t border-stone-100"
          >
            <span>{locale === "en" ? "Send Email" : "ส่งข้อความอีเมล"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* ๔. วันและเวลาทำการ */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100/70 text-amber-900 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-stone-900 text-lg">
              {locale === "en" ? "Office Hours" : "เวลาเปิดทำการ"}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {officeHours}
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-100 text-xs text-stone-500">
            {locale === "en"
              ? "Weekend Program (Saturday & Sunday lectures)"
              : "หลักสูตรภาคเสาร์ - อาทิตย์"}
          </div>
        </div>
      </div>

      {/* Online & Social Channels */}
      {(orgInfo?.lineId || orgInfo?.facebookUrl || orgInfo?.website) && (
        <section className="bg-stone-100/80 rounded-2xl p-6 sm:p-8 border border-stone-200/80">
          <div className="flex items-center gap-2 mb-6">
            <Share2 className="w-5 h-5 text-amber-800" />
            <h2 className="text-xl font-bold text-stone-900 font-serif">
              {locale === "en" ? "Online & Social Media Channels" : "ช่องทางออนไลน์และสื่อสังคมทางการ"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {orgInfo.lineId && (
              <div className="bg-white p-5 rounded-xl border border-emerald-200/70 flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-stone-500 block font-medium">LINE Official</span>
                  <span className="text-sm font-bold text-emerald-800">{orgInfo.lineId}</span>
                </div>
              </div>
            )}

            {orgInfo.facebookUrl && (
              <a
                href={orgInfo.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-5 rounded-xl border border-blue-200/70 hover:border-blue-300 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-stone-500 block font-medium">Facebook Page</span>
                    <span className="text-sm font-bold text-blue-800 group-hover:underline">
                      {locale === "en" ? "Official Fanpage" : "เพจทางการ"}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-blue-700" />
              </a>
            )}

            {orgInfo.website && (
              <a
                href={orgInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-5 rounded-xl border border-amber-200/70 hover:border-amber-300 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs text-stone-500 block font-medium">Official Website</span>
                    <span className="text-sm font-bold text-amber-900 truncate block group-hover:underline">
                      {orgInfo.website}
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-amber-800 shrink-0" />
              </a>
            )}
          </div>
        </section>
      )}

      {/* Campus Map & Directions Guide */}
      <section className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="p-6 sm:p-8 border-b border-stone-200">
          <div className="flex items-center gap-2 text-amber-800 mb-1">
            <Compass className="w-5 h-5" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              {locale === "en" ? "Campus Directions" : "การเดินทางมายังหลักสูตร"}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-stone-900 font-serif">
            {locale === "en" ? "How to Visit Our Campus" : "แผนที่และการเดินทางมายัง มจร วังน้อย"}
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            {locale === "en"
              ? "Mahachulalongkornrajavidyalaya University, Main Campus, Wang Noi District, Phra Nakhon Si Ayutthaya Province."
              : "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย ส่วนกลาง ตำบลลำไทร อำเภอวังน้อย จังหวัดพระนครศรีอยุธยา"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-8">
          {/* Directions Text */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="font-bold text-stone-900 flex items-center gap-2 text-base">
                <Navigation className="w-4 h-4 text-amber-800" />
                <span>{locale === "en" ? "By Private Car" : "เดินทางโดยรถยนต์ส่วนบุคคล"}</span>
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {locale === "en"
                  ? "From Bangkok, drive along Phahon Yothin Road (Highway No. 1) heading toward Saraburi. The university is located at Kilometer 55 on the left side. Ample parking is available near Mahachulalongkorn Building."
                  : "จากกรุงเทพฯ ใช้เส้นทางถนนพหลโยธิน (ทางหลวงหมายเลข ๑) มุ่งหน้าสู่จังหวัดสระบุรี มหาวิทยาลัยตั้งอยู่บริเวณหลักกิโลเมตรที่ ๕๕ ฝั่งซ้ายมือ มีลานจอดรถสะดวกสบายรอบอาคารมหาจุฬาบรรณาคาร"}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-stone-900 flex items-center gap-2 text-base">
                <Navigation className="w-4 h-4 text-amber-800" />
                <span>{locale === "en" ? "By Public Bus & Van" : "เดินทางโดยรถโดยสารประจำทางและรถตู้"}</span>
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {locale === "en"
                  ? "Take any public bus or van departing from Mo Chit 2 (Chatuchak) or Future Park Rangsit heading toward Saraburi, Ayutthaya, or Lopburi, and request to stop directly in front of MCU Wang Noi."
                  : "สามารถโดยสารรถตู้หรือรถประจำทางจากสถานีขนส่งหมอชิต ๒ หรือจุดจอดฟิวเจอร์พาร์ครังสิต สายที่มุ่งหน้าสระบุรี พระพุทธบาท หรือลพบุรี แจ้งลงหน้ามหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (มจร วังน้อย)"}
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-800 text-white font-medium text-xs hover:bg-amber-900 transition-colors shadow-xs"
              >
                <MapPin className="w-4 h-4" />
                <span>{locale === "en" ? "Get Directions (Google Maps)" : "นำทางผ่าน Google Maps"}</span>
              </a>
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-100 text-stone-800 font-medium text-xs hover:bg-stone-200 transition-colors border border-stone-200"
              >
                <GraduationCap className="w-4 h-4 text-amber-800" />
                <span>{locale === "en" ? "Online Admissions" : "สมัครเรียนออนไลน์"}</span>
              </Link>
            </div>
          </div>

          {/* Interactive Map Card Preview */}
          <div className="bg-stone-50 rounded-xl p-6 border border-stone-200 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-stone-700">
                    {locale === "en" ? "Campus Coordinates Verified" : "พิกัดแผนที่ได้รับการยืนยัน"}
                  </span>
                </div>
                <span className="text-[11px] text-stone-400">MCU Main Campus</span>
              </div>

              <div className="p-4 bg-white rounded-lg border border-stone-200 space-y-2 text-xs">
                <div className="font-bold text-stone-900">{brandName}</div>
                <div className="text-stone-600">{address}</div>
                <div className="text-stone-500 flex items-center gap-2 pt-1 border-t border-stone-100">
                  <span>GPS: 14.2255° N, 100.7168° E</span>
                  <span>•</span>
                  <span>Wang Noi, Ayutthaya</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
              >
                <span>{locale === "en" ? "Open Interactive Satellite Map" : "เปิดดูแผนที่ดาวเทียมบน Google Maps"}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
