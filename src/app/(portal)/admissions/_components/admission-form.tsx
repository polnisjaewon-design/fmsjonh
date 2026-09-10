"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { CheckCircle2, User, BookOpen, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AdmissionRoundDto } from "@/features/admission";
import { submitApplicationPublicAction } from "@/features/admission/actions";

export function AdmissionClientForm({ round }: { round: AdmissionRoundDto }) {
  const [applicantType, setApplicantType] = useState<"MONK" | "NOVICE" | "NUN" | "LAYPERSON">("MONK");
  const [titleTh, setTitleTh] = useState("พระ");
  const [firstNameTh, setFirstNameTh] = useState("");
  const [lastNameTh, setLastNameTh] = useState("");
  const [monasticName, setMonasticName] = useState("");
  const [monasticRank, setMonasticRank] = useState("");
  const [templeName, setTempleName] = useState("");
  const [idCardOrPassport, setIdCardOrPassport] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [educationBackground, setEducationBackground] = useState("");
  const [paymentSlipUrl, setPaymentSlipUrl] = useState("");
  const [submittedNo, setSubmittedNo] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstNameTh.trim() || !idCardOrPassport.trim() || !phone.trim() || !email.trim()) {
      toast.error("กรุณากรอกข้อมูลสำคัญให้ครบถ้วน");
      return;
    }

    startTransition(async () => {
      const res = await submitApplicationPublicAction({
        roundId: round.id,
        applicantType,
        titleTh,
        firstNameTh,
        lastNameTh: lastNameTh || null,
        monasticName: monasticName || null,
        monasticRank: monasticRank || null,
        templeName: templeName || null,
        idCardOrPassport,
        phone,
        email,
        educationBackground: educationBackground || null,
        paymentSlipUrl: paymentSlipUrl || null,
      });

      if (res.ok) {
        setSubmittedNo(res.data.applicationNo);
        toast.success("ยื่นใบสมัครสำเร็จ!");
      } else {
        toast.error(res.error.message);
      }
    });
  }

  if (submittedNo) {
    return (
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-emerald-200 shadow-md text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-stone-900 font-serif">ยื่นใบสมัครออนไลน์เรียบร้อยแล้ว</h2>
          <p className="text-stone-600 text-sm">
            เลขที่ใบสมัครของคุณคือ:
          </p>
          <div className="text-2xl font-mono font-extrabold text-amber-800 bg-amber-50 px-4 py-2 rounded-xl inline-block border border-amber-200">
            {submittedNo}
          </div>
        </div>
        <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
          เจ้าหน้าที่บัณฑิตวิทยาลัยจะดำเนินการตรวจสอบหลักฐานการศึกษาและสลิปค่าสมัคร จากนั้นจะแจ้งกำหนดการสัมภาษณ์ทางอีเมลและโทรศัพท์
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border shadow-xs space-y-8">
      {/* Round Info Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm">
        <div>
          <span className="font-bold">{round.titleTh}</span>
          <p className="text-xs text-amber-800 mt-0.5">ค่าสมัคร {round.feeAmount} บาท</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
          เปิดรับสมัคร
        </span>
      </div>

      {/* ๑. สถานะผู้สมัคร */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-stone-900 flex items-center gap-2">
          <User className="w-4 h-4 text-amber-800" />
          <span>๑. สถานะผู้สมัคร</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(
            [
              ["MONK", "พระภิกษุ"],
              ["NOVICE", "สามเณร"],
              ["NUN", "แม่ชี"],
              ["LAYPERSON", "คฤหัสถ์"],
            ] as const
          ).map(([val, label]) => (
            <button
              type="button"
              key={val}
              onClick={() => {
                setApplicantType(val);
                if (val === "MONK") setTitleTh("พระ");
                else if (val === "NOVICE") setTitleTh("สามเณร");
                else if (val === "NUN") setTitleTh("แม่ชี");
                else setTitleTh("นาย");
              }}
              className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                applicantType === val
                  ? "bg-amber-800 text-white border-amber-800 shadow-2xs font-semibold"
                  : "bg-white hover:bg-stone-50 text-stone-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ๒. ข้อมูลชื่อ-ฉายา และสังกัด */}
      <div className="space-y-4">
        <label className="text-sm font-semibold text-stone-900">๒. ข้อมูลชื่อและข้อมูลการติดต่อ</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-medium text-stone-600 block mb-1">คำนำหน้าชื่อ *</label>
            <input
              className="w-full rounded-xl border px-3 py-2 text-sm bg-stone-50"
              value={titleTh}
              onChange={(e) => setTitleTh(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-xs font-medium text-stone-600 block mb-1">ชื่อ *</label>
            <input
              className="w-full rounded-xl border px-3 py-2 text-sm"
              value={firstNameTh}
              onChange={(e) => setFirstNameTh(e.target.value)}
              placeholder="ชื่อภาษาไทย"
              required
            />
          </div>
          <div>
            <label className="text-xs font-medium text-stone-600 block mb-1">
              {applicantType === "MONK" || applicantType === "NOVICE" ? "ฉายา (ถ้ามี)" : "นามสกุล *"}
            </label>
            {applicantType === "MONK" || applicantType === "NOVICE" ? (
              <input
                className="w-full rounded-xl border px-3 py-2 text-sm"
                value={monasticName}
                onChange={(e) => setMonasticName(e.target.value)}
                placeholder="เช่น ชิตมาโร"
              />
            ) : (
              <input
                className="w-full rounded-xl border px-3 py-2 text-sm"
                value={lastNameTh}
                onChange={(e) => setLastNameTh(e.target.value)}
                placeholder="นามสกุล"
                required
              />
            )}
          </div>
        </div>

        {(applicantType === "MONK" || applicantType === "NOVICE") && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label className="text-xs font-medium text-stone-600 block mb-1">วัดสังกัด / ที่พักสงฆ์ *</label>
              <input
                className="w-full rounded-xl border px-3 py-2 text-sm"
                value={templeName}
                onChange={(e) => setTempleName(e.target.value)}
                placeholder="เช่น วัดมหาธาตุยุวราชรังสฤษฎิ์ กรุงเทพฯ"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-stone-600 block mb-1">สมณศักดิ์ / วิทยฐานะบาลี</label>
              <input
                className="w-full rounded-xl border px-3 py-2 text-sm"
                value={monasticRank}
                onChange={(e) => setMonasticRank(e.target.value)}
                placeholder="เช่น เปรียญธรรม ๙ ประโยค, พระครู..."
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div>
            <label className="text-xs font-medium text-stone-600 block mb-1">เลขประจำตัวประชาชน / พาสปอร์ต *</label>
            <input
              className="w-full rounded-xl border px-3 py-2 text-sm"
              value={idCardOrPassport}
              onChange={(e) => setIdCardOrPassport(e.target.value)}
              placeholder="๑๓ หลัก"
              required
            />
          </div>
          <div>
            <label className="text-xs font-medium text-stone-600 block mb-1">เบอร์โทรศัพท์ *</label>
            <input
              className="w-full rounded-xl border px-3 py-2 text-sm"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="08X-XXX-XXXX"
              required
            />
          </div>
          <div>
            <label className="text-xs font-medium text-stone-600 block mb-1">อีเมล *</label>
            <input
              type="email"
              className="w-full rounded-xl border px-3 py-2 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mcu.ac.th"
              required
            />
          </div>
        </div>
      </div>

      {/* ๓. วุฒิการศึกษาและหลักฐาน */}
      <div className="space-y-4 pt-2 border-t">
        <label className="text-sm font-semibold text-stone-900 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-800" />
          <span>๓. วุฒิการศึกษาและหลักฐานการสมัคร</span>
        </label>
        <div>
          <label className="text-xs font-medium text-stone-600 block mb-1">วุฒิการศึกษาสูงสุดและสถาบันที่สำเร็จการศึกษา</label>
          <input
            className="w-full rounded-xl border px-3 py-2 text-sm"
            value={educationBackground}
            onChange={(e) => setEducationBackground(e.target.value)}
            placeholder="เช่น พุทธศาสตรบัณฑิต มจร, ศศ.บ. ม.รามคำแหง..."
          />
        </div>
        <div>
          <label className="text-xs font-medium text-stone-600 block mb-1">ลิงก์ภาพสลิปชำระเงินค่าสมัคร (หรือใบเสร็จ)</label>
          <input
            className="w-full rounded-xl border px-3 py-2 text-sm"
            value={paymentSlipUrl}
            onChange={(e) => setPaymentSlipUrl(e.target.value)}
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="pt-4 border-t flex justify-end">
        <Button
          type="submit"
          disabled={isPending}
          className="px-8 py-3 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-semibold text-base gap-2"
        >
          <Send className="w-4 h-4" />
          <span>{isPending ? "กำลังบันทึก..." : "ยืนยันการส่งใบสมัคร"}</span>
        </Button>
      </div>
    </form>
  );
}
