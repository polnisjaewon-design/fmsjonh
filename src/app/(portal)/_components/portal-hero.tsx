"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Volume2,
  VolumeX,
  Flame,
} from "lucide-react";
import { useLocale } from "@/shared/lib/i18n/client";

export interface PortalHeroProps {
  nameTh?: string | null;
  nameEn?: string | null;
}

export function PortalHero({ nameTh, nameEn }: PortalHeroProps = {}) {
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isAmbianceActive, setIsAmbianceActive] = useState<boolean>(true);

  const programTitle =
    locale === "en"
      ? nameEn || "Master of Arts in Vipassana Meditation Studies"
      : nameTh || "สาขาวิชาวิปัสสนาภาวนาศึกษา";

  // Focus Flow 5 Dimensions (Adapted from Focus AI template tabs)
  const dimensions = [
    {
      id: "satipatthana",
      tabTh: "สติปัฏฐาน ๔",
      tabEn: "Satipatthana",
      titleTh: "การเจริญสติปัฏฐาน ๔ เชิงประยุกต์",
      titleEn: "Applied Four Foundations of Mindfulness",
      tagTh: "กาย เวทนา จิต ธรรม",
      tagEn: "Body, Feeling, Mind, & Dhamma",
      descTh:
        "ฝึกฝนจิตให้รู้เท่าทันอารมณ์และความคิดตามความเป็นจริง ผ่านแนวทางการปฏิบัติที่ถูกต้องตามพระไตรปิฎก เพื่อสร้างความสงบนิ่งและจิตปัญญาที่มั่นคงในชีวิตประจำวัน",
      descEn:
        "Cultivating moment-to-moment mindful awareness across all four contemplation domains, bridging authentic canonical practice with modern life.",
      featuresTh: [
        "ฝึกการระลึกรู้ลมหายใจ (อานาปานสติ)",
        "กำหนดรู้อิริยาบถและการเคลื่อนไหว",
        "เท่าทันผัสสะและเวทนาทั้งปวง",
      ],
      featuresEn: [
        "Breath awareness contemplation (Anapanasati)",
        "Postural mindfulness and somatic stillness",
        "Observing mental states without attachment",
      ],
      href: "/curriculum",
    },
    {
      id: "abhidhamma",
      tabTh: "พระอภิธรรม",
      tabEn: "Abhidhamma",
      titleTh: "คัมภีร์พระอภิธรรมและวิสุทธิมรรค",
      titleEn: "Abhidhamma & Visuddhimagga Mastery",
      tagTh: "ปรมัตถธรรม ๔",
      tagEn: "Ultimate Realities (Paramattha)",
      descTh:
        "ทำความเข้าใจโครงสร้างการทำงานของจิต เจตสิก รูป และนิพพาน อย่างเป็นระบบ เพื่อเป็นฐานรองรับการเจริญปัญญาญาณในระดับวิปัสสนาอย่างแม่นยำ",
      descEn:
        "Systematic investigation of mind, mental factors, and matter to build an unerring conceptual foundation for experiential Vipassana insight.",
      featuresTh: [
        "วิเคราะห์กระบวนการเกิด-ดับของจิต",
        "ศึกษาคัมภีร์วิสุทธิมรรค ๗ ขั้น",
        "บูรณาการสู่ประสาทวิทยาศาสตร์สากล",
      ],
      featuresEn: [
        "Cognitive flow analysis (Citta & Cetasika)",
        "Seven stages of purification (Visuddhi)",
        "Dialogue with modern cognitive neuroscience",
      ],
      href: "/curriculum",
    },
    {
      id: "retreat",
      tabTh: "สอบอารมณ์",
      tabEn: "Guidance",
      titleTh: "การปฏิบัติเข้มข้นและสอบอารมณ์กรรมฐาน",
      titleEn: "Intensive Retreat & Master Guidance",
      tagTh: "พระวิปัสสนาจารย์ผู้ทรงคุณวุฒิ",
      tagEn: "One-on-One Master Mentorship",
      descTh:
        "เข้าค่ายปฏิบัติธรรมในสถานที่สัปปายะ พร้อมรับการชี้แนะและสอบอารมณ์กรรมฐานแบบตัวต่อตัวจากพระวิปัสสนาจารย์และผู้เชี่ยวชาญระดับชาติ",
      descEn:
        "Immersive meditation retreats in tranquil sanctuaries featuring personal daily interviews and troubleshooting with venerable meditation masters.",
      featuresTh: [
        "ปฏิบัติธรรมวิเวกในศูนย์สัปปายะ",
        "สอบอารมณ์กรรมฐานรายบุคคลอย่างต่อเนื่อง",
        "แก้ไขอุปสรรคและวิปัสสนูปกิเลสอย่างถูกทาง",
      ],
      featuresEn: [
        "Tranquil secluded retreat environment",
        "Continuous personal contemplation review",
        "Resolving meditation obstacles (Upakkilesa)",
      ],
      href: "/faculty",
    },
    {
      id: "theses",
      tabTh: "วิจัยวิทยานิพนธ์",
      tabEn: "Research",
      titleTh: "การวิจัยจิตปัญญาและนวัตกรรมภาวนา",
      titleEn: "Spiritual Innovation & Scholarly Theses",
      tagTh: "มาตรฐานวิชาการระดับสากล",
      tagEn: "Peer-Reviewed Scholarly Impact",
      descTh:
        "สร้างสรรค์งานวิจัยและวิทยานิพนธ์ที่เชื่อมโยงพุทธธรรมเข้ากับศาสตร์สมัยใหม่ เช่น จิตวิทยา การศึกษา และสุขภาวะของสังคม",
      descEn:
        "Producing rigorous academic theses that interface Buddhist contemplative insights with psychology, leadership, healthcare, and contemporary society.",
      featuresTh: [
        "อาจารย์ที่ปรึกษาระดับศาสตราจารย์และพระเถระ",
        "ตีพิมพ์ในวารสาร TCI และฐานข้อมูลสากล",
        "ทุนสนับสนุนงานวิจัยนวัตกรรมภาวนา",
      ],
      featuresEn: [
        "Supervision by senior scholars and monastic sages",
        "Publications in accredited peer-reviewed journals",
        "Dedicated contemplative research grants",
      ],
      href: "/theses",
    },
    {
      id: "weekend",
      tabTh: "ภาคเสาร์-อาทิตย์",
      tabEn: "Weekend",
      titleTh: "ตารางเรียนยืดหยุ่นสำหรับผู้ทำงานประจำ",
      titleEn: "Executive Weekend Learning Format",
      tagTh: "บรรพชิตและคฤหัสถ์",
      tagEn: "Designed for Working Leaders & Monastics",
      descTh:
        "จัดการเรียนการสอนในวันเสาร์และวันอาทิตย์ ผสมผสานชั้นเรียนในห้องเรียนและระบบห้องเรียนดิจิทัล เพื่อให้ผู้บริหาร ครูอาจารย์ และพระภิกษุเข้าถึงได้สะดวก",
      descEn:
        "Carefully orchestrated weekend schedule combining interactive seminar sessions with cutting-edge digital learning resources.",
      featuresTh: [
        "เรียนเฉพาะวันเสาร์ - อาทิตย์ (๐๘:๓๐ - ๑๗:๐๐ น.)",
        "ระบบบันทึกคำบรรยายทบทวนย้อนหลังได้ตลอดเวลา",
        "เครือข่ายเพื่อนร่วมชั้นเรียนจากหลากหลายวิชาชีพ",
      ],
      featuresEn: [
        "Classes on Saturday & Sunday (08:30 - 17:00)",
        "On-demand session replays & digital library",
        "Inspiring multi-disciplinary cohort network",
      ],
      href: "/schedules",
    },
  ];

  const metrics = [
    {
      value: "เสาร์-อาทิตย์",
      valueEn: "Weekend",
      labelTh: "เวลาเรียนยืดหยุ่น",
      labelEn: "Flexible Schedule",
    },
    {
      value: "๒ ปี (๔ ภาค)",
      valueEn: "2 Years (4 Terms)",
      labelTh: "ระยะเวลาการศึกษา",
      labelEn: "Standard Program",
    },
    {
      value: "๓๖ หน่วยกิต",
      valueEn: "36 Credits",
      labelTh: "โครงสร้างหลักสูตร",
      labelEn: "Total Credits",
    },
    {
      value: "พธ.ม. (มจร)",
      valueEn: "M.A. (MCU)",
      labelTh: "รับรองโดยกระทรวง อว.",
      labelEn: "MHESI Accredited",
    },
  ];

  const cur = dimensions[activeTab];

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* ๑. CSS KEYFRAMES EMBEDDED SAFELY FOR SMOOTH HARDWARE-ACCELERATED ANIMATIONS */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes focus-kenburns {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          @keyframes focus-drift-1 {
            0% { transform: translateX(-4%) translateY(0); }
            50% { transform: translateX(4%) translateY(-6px); }
            100% { transform: translateX(-4%) translateY(0); }
          }
          @keyframes focus-drift-2 {
            0% { transform: translateX(3%) translateY(0); }
            50% { transform: translateX(-3%) translateY(5px); }
            100% { transform: translateX(3%) translateY(0); }
          }
          @keyframes focus-breathe-glow {
            0%, 100% { opacity: 0.35; transform: scale(1); }
            50% { opacity: 0.65; transform: scale(1.08); }
          }
          @keyframes focus-sparkle {
            0%, 100% { opacity: 0.2; transform: translateY(0) scale(0.8); }
            50% { opacity: 0.9; transform: translateY(-12px) scale(1.2); }
          }
          @keyframes soundwave-bar {
            0%, 100% { height: 4px; }
            50% { height: 16px; }
          }
        `,
        }}
      />

      {/* ๒. THE CINEMATIC HERO CARD (Focus in a Distracted World) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] sm:rounded-[44px] border border-white/20 shadow-2xl bg-stone-950 min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex flex-col justify-between p-6 sm:p-10 lg:p-14 text-white">
          {/* Background Artwork with Subtle Ken-Burns Motion */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/focus_hero_bg.jpg"
              alt="Contemplative Vipassana Meditation on Summit"
              className="w-full h-full object-cover object-center sm:object-top opacity-95 transition-transform duration-1000"
              style={{ animation: "focus-kenburns 28s ease-in-out infinite" }}
            />

            {/* Ambient Radial Golden Dusk Glow */}
            <div
              className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[500px] bg-radial from-amber-400/25 via-rose-400/15 to-transparent blur-3xl pointer-events-none rounded-full"
              style={{ animation: "focus-breathe-glow 8s ease-in-out infinite" }}
              aria-hidden="true"
            />

            {/* Drifting Mist & Cloud Layer 1 */}
            <div
              className="absolute bottom-[-10%] left-[-15%] right-[-15%] h-[240px] bg-gradient-to-t from-stone-950/90 via-purple-950/30 to-transparent blur-2xl opacity-75 pointer-events-none"
              style={{ animation: "focus-drift-1 22s ease-in-out infinite" }}
              aria-hidden="true"
            />

            {/* Drifting Mist & Cloud Layer 2 */}
            <div
              className="absolute bottom-[-5%] left-[-10%] right-[-10%] h-[180px] bg-gradient-to-t from-stone-950/80 via-amber-950/20 to-transparent blur-xl opacity-60 pointer-events-none"
              style={{ animation: "focus-drift-2 30s ease-in-out infinite" }}
              aria-hidden="true"
            />

            {/* Floating Wisdom Starlight / Sparkles */}
            <div
              className="absolute top-[28%] left-[22%] w-2 h-2 rounded-full bg-amber-200 blur-[1px]"
              style={{ animation: "focus-sparkle 4s ease-in-out infinite" }}
              aria-hidden="true"
            />
            <div
              className="absolute top-[35%] right-[25%] w-2.5 h-2.5 rounded-full bg-rose-200 blur-[1px]"
              style={{ animation: "focus-sparkle 5s ease-in-out 1.5s infinite" }}
              aria-hidden="true"
            />
            <div
              className="absolute top-[48%] left-[15%] w-1.5 h-1.5 rounded-full bg-white blur-[0.5px]"
              style={{ animation: "focus-sparkle 6s ease-in-out 2.5s infinite" }}
              aria-hidden="true"
            />
            <div
              className="absolute top-[22%] right-[18%] w-2 h-2 rounded-full bg-amber-100 blur-[1px]"
              style={{ animation: "focus-sparkle 4.5s ease-in-out 3s infinite" }}
              aria-hidden="true"
            />

            {/* Top dark gradient for crystal clear text readability */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-stone-950/75 via-stone-950/35 to-stone-950/70 pointer-events-none"
              aria-hidden="true"
            />
          </div>

          {/* Top Bar inside Hero: Live Admissions Badge & Audio Meditation Pill */}
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Live Admissions Pulse Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/40 border border-white/20 text-xs sm:text-sm font-medium backdrop-blur-md shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-stone-200 tracking-wider font-mono text-[11px] sm:text-xs">
                {locale === "en"
                  ? "ADMISSIONS OPEN // ACADEMIC YEAR 2026"
                  : "เปิดรับสมัครนิสิตใหม่ // ประจำปีการศึกษา ๒๕๖๙"}
              </span>
            </div>

            {/* Audio / Meditation Ambiance Wave Pill */}
            <button
              type="button"
              onClick={() => setIsAmbianceActive(!isAmbianceActive)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-xs font-medium text-stone-200 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              title={locale === "en" ? "Contemplative Ambiance" : "บรรยากาศสัปปายะ"}
            >
              {isAmbianceActive ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                  <span className="text-[11px] font-mono tracking-wider">
                    {locale === "en" ? "FOCUS AMBIANCE" : "บรรยากาศภาวนา"}
                  </span>
                  <div className="flex items-end gap-[2px] h-3.5 ml-1">
                    <span
                      className="w-[2px] bg-amber-300 rounded-full"
                      style={{ animation: "soundwave-bar 1.2s ease-in-out infinite" }}
                    />
                    <span
                      className="w-[2px] bg-amber-300 rounded-full"
                      style={{ animation: "soundwave-bar 0.9s ease-in-out 0.2s infinite" }}
                    />
                    <span
                      className="w-[2px] bg-amber-300 rounded-full"
                      style={{ animation: "soundwave-bar 1.4s ease-in-out 0.4s infinite" }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-stone-400" />
                  <span className="text-[11px] font-mono text-stone-400">
                    {locale === "en" ? "AMBIANCE MUTED" : "ปิดเสียง"}
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Central Monumental Headline (Focus in a Distracted World) */}
          <div className="relative z-10 my-auto py-10 sm:py-14 text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-medium text-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>
                {locale === "en"
                  ? "Graduate School • Mahachulalongkornrajavidyalaya University"
                  : "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย • บัณฑิตวิทยาลัย"}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-serif leading-[1.12]">
              <span className="block text-stone-100 drop-shadow-md">
                {locale === "en" ? "Focus in a" : "ความสงบสุขท่ามกลาง"}
              </span>
              <span className="bg-gradient-to-r from-amber-200 via-rose-100 to-amber-300 bg-clip-text text-transparent italic font-serif drop-shadow-lg">
                {locale === "en" ? "Distracted World" : "โลกที่วุ่นวาย"}
              </span>
            </h1>

            <div className="space-y-1">
              <h2 className="text-lg sm:text-2xl font-semibold text-amber-300/90 font-serif tracking-wide">
                {locale === "en"
                  ? "Master of Arts in Vipassana Meditation Studies"
                  : "หลักสูตรพุทธศาสตรมหาบัณฑิต"}
              </h2>
              <p className="text-base sm:text-xl font-medium text-stone-200">
                {programTitle}
              </p>
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed drop-shadow-xs">
              {locale === "en"
                ? "Dedicated to in-depth scriptural research and intensive contemplation based on the Satipatthana framework, cultivating inner stillness and spiritual wisdom for modern times."
                : "มุ่งเน้นการวิจัยเชิงลึกและปฏิบัติวิปัสสนากรรมฐานตามแนวสติปัฏฐาน ๔ บูรณาการคัมภีร์พระอภิธรรมเพื่อพัฒนาจิตปัญญาและสร้างความสงบนิ่งภายในท่ามกลางความผันแปรของโลกสมัยใหม่"}
            </p>

            {/* Dual Cinematic Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
              <Link
                href="/admissions"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white font-bold text-base shadow-xl shadow-amber-900/40 transition-all hover:scale-105 active:scale-95 border border-amber-400/40"
              >
                <span>{locale === "en" ? "Apply Online" : "สมัครเรียนออนไลน์"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/curriculum"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-black/40 hover:bg-white/15 text-white border border-white/20 font-semibold text-base backdrop-blur-md transition-all hover:border-white/40"
              >
                <BookOpen className="w-4 h-4 text-amber-300" />
                <span>{locale === "en" ? "Curriculum (TQF.2)" : "โครงสร้างหลักสูตร (มคอ.๒)"}</span>
              </Link>
            </div>
          </div>

          {/* Floating Subtle Footer note inside Hero */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-300/80 gap-2">
            <div className="flex items-center gap-2">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {locale === "en"
                  ? "Mindfulness • Wisdom • Scriptural Integrity • Contemplation"
                  : "สติ • ปัญญา • ปริยัติ • ปฏิบัติ • ปฏิเวธ"}
              </span>
            </div>
            <div className="font-mono text-[11px] tracking-wider text-amber-200/70">
              MCU GRADUATE SCHOOL // TQF.2
            </div>
          </div>
        </div>
      </section>

      {/* ๓. FOCUS FLOW INTERACTIVE SPLIT SECTION (Directly from Focus AI Landing template) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Transitional Header: "So you can feel at peace, anywhere." */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
            {locale === "en"
              ? "So you can feel at peace, anywhere."
              : "เพื่อให้คุณค้นพบความสงบแท้จริงได้ในทุกที่"}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto leading-relaxed">
            {locale === "en"
              ? "Bridging ancient Buddhist contemplative traditions with contemporary life through 5 essential pillars of practice and research."
              : "เชื่อมโยงภูมิปัญญาพระพุทธศาสนาดั้งเดิมสู่ชีวิตจริง ผ่าน ๕ เสาหลักแห่งการศึกษาค้นคว้าและการปฏิบัติภาวนา"}
          </p>
        </div>

        {/* Dual Split Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Card: Interactive Dimension Tab Explorer (col-span-7) */}
          <div className="lg:col-span-7 bg-stone-900 text-white rounded-3xl p-6 sm:p-9 border border-stone-800 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Interactive Horizontal Tab Selector */}
              <div className="flex flex-wrap gap-2 pb-2 border-b border-white/10">
                {dimensions.map((dim, idx) => {
                  const isActive = activeTab === idx;
                  return (
                    <button
                      key={dim.id}
                      type="button"
                      onClick={() => setActiveTab(idx)}
                      className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-amber-500 text-stone-950 shadow-md font-bold scale-105"
                          : "bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white border border-white/10"
                      }`}
                    >
                      {locale === "en" ? dim.tabEn : dim.tabTh}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Content View with Smooth Fade Transition */}
              <div key={cur.id} className="space-y-4 animate-in fade-in duration-300">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{locale === "en" ? cur.tagEn : cur.tagTh}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-stone-100">
                  {locale === "en" ? cur.titleEn : cur.titleTh}
                </h3>

                <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                  {locale === "en" ? cur.descEn : cur.descTh}
                </p>

                {/* Feature Bullet Points */}
                <div className="space-y-2.5 pt-3">
                  {(locale === "en" ? cur.featuresEn : cur.featuresTh).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3 text-xs sm:text-sm text-stone-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Action Link */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <Link
                href={cur.href}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-400 hover:text-amber-300 group transition-colors"
              >
                <span>{locale === "en" ? "Explore this dimension" : "ดูรายละเอียดและวิชาที่เกี่ยวข้อง"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <span className="text-xs font-mono text-stone-500">
                [ 0{activeTab + 1} / 0{dimensions.length} ]
              </span>
            </div>
          </div>

          {/* Right Card: Night Contemplation & Sanctuary Visual (col-span-5) */}
          <div className="lg:col-span-5 relative overflow-hidden rounded-3xl bg-stone-950 border border-stone-800 shadow-xl min-h-[380px] lg:min-h-[440px] flex flex-col justify-end p-6 sm:p-8 text-white group">
            {/* Background Art */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/focus_night_study_art.jpg"
              alt="Night Sacred Study and Mindfulness Sanctuary"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
            />

            {/* Dark overlay for contrast */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent pointer-events-none"
              aria-hidden="true"
            />

            {/* Sparkle fireflies on night card */}
            <div
              className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-amber-300 blur-[1px]"
              style={{ animation: "focus-sparkle 3s ease-in-out infinite" }}
              aria-hidden="true"
            />
            <div
              className="absolute top-1/3 left-1/5 w-1.5 h-1.5 rounded-full bg-emerald-200 blur-[1px]"
              style={{ animation: "focus-sparkle 4s ease-in-out 1s infinite" }}
              aria-hidden="true"
            />

            {/* Text Overlay on Card */}
            <div className="relative z-10 space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-black/60 border border-white/20 text-xs font-medium text-amber-300 backdrop-blur-md">
                {locale === "en" ? "Mindful Sanctuary" : "พื้นที่สัปปายะเพื่อการเรียนรู้"}
              </span>
              <h4 className="text-xl sm:text-2xl font-bold font-serif text-white leading-snug">
                {locale === "en"
                  ? "Where ancient wisdom meets quiet contemplation."
                  : "ที่ซึ่งพุทธปัญญาดั้งเดิมผสานความสงบวิเวก"}
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed line-clamp-3">
                {locale === "en"
                  ? "Access both tranquil physical retreat sanctuaries and a rich 24/7 digital canonical archive designed for deep meditation scholars."
                  : "สัมผัสบรรยากาศศูนย์ปฏิบัติธรรมสัปปายะ พร้อมคลังข้อมูลพระไตรปิฎกและวิทยานิพนธ์ออนไลน์สำหรับนิสิตระดับปริญญาโท"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ๔. KEY METRICS CAPSULE STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 sm:p-6 rounded-2xl bg-white shadow-sm border border-stone-200/80">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className={`text-center py-2 px-3 ${
                idx > 0 ? "md:border-l border-stone-200" : ""
              }`}
            >
              <div className="text-xl sm:text-3xl font-extrabold text-amber-800 font-serif">
                {locale === "en" ? m.valueEn : m.value}
              </div>
              <div className="text-xs sm:text-sm text-stone-600 mt-1 font-medium">
                {locale === "en" ? m.labelEn : m.labelTh}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
