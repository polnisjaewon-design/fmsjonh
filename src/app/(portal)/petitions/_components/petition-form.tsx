"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { CheckCircle2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { DocumentTemplateDto } from "@/features/petition";
import { submitPetitionPublicAction } from "@/features/petition/actions";

export function PetitionClientForm({ templates }: { templates: DocumentTemplateDto[] }) {
  const [studentCode, setStudentCode] = useState("");
  const [templateId, setTemplateId] = useState(templates[0]?.id || "");
  const [title, setTitle] = useState("");
  const [reason, setReason] = useState("");
  const [submittedNo, setSubmittedNo] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!studentCode.trim() || !title.trim() || !reason.trim()) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    startTransition(async () => {
      const res = await submitPetitionPublicAction({
        studentCode,
        templateId,
        title,
        reason,
      });

      if (res.ok) {
        setSubmittedNo(res.data.petitionNo);
        toast.success("ยื่นคำร้องสำเร็จ!");
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
          <h2 className="text-2xl font-bold text-stone-900 font-serif">ยื่นคำร้องออนไลน์เรียบร้อยแล้ว</h2>
          <p className="text-stone-600 text-sm">เลขที่คำร้องของคุณคือ:</p>
          <div className="text-2xl font-mono font-extrabold text-amber-800 bg-amber-50 px-4 py-2 rounded-xl inline-block border border-amber-200">
            {submittedNo}
          </div>
        </div>
        <p className="text-xs text-stone-500 max-w-md mx-auto">
          เรื่องจะถูกส่งต่อไปยังอาจารย์ที่ปรึกษาและคณะกรรมการบริหารหลักสูตรเพื่อพิจารณาอนุมัติต่อไป
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border shadow-xs space-y-6">
      <div>
        <label className="text-xs font-semibold text-stone-700 block mb-1">รหัสนิสิต (เช่น 6801201001) *</label>
        <input
          className="w-full rounded-xl border px-3 py-2 text-sm"
          value={studentCode}
          onChange={(e) => setStudentCode(e.target.value)}
          placeholder="รหัสนิสิต มจร ๑๐ หลัก"
          required
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-stone-700 block mb-1">ประเภทคำร้อง *</label>
        <select
          className="w-full rounded-xl border px-3 py-2 text-sm bg-white"
          value={templateId}
          onChange={(e) => setTemplateId(e.target.value)}
        >
          {templates.map((t) => (
            <option key={t.id} value={t.id}>{t.titleTh}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-semibold text-stone-700 block mb-1">เรื่องที่ยื่นคำร้อง *</label>
        <input
          className="w-full rounded-xl border px-3 py-2 text-sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="เช่น ขอลาปฏิบัติวิปัสสนากรรมฐาน ๓๐ วัน"
          required
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-stone-700 block mb-1">เหตุผลความจำเป็นและรายละเอียด *</label>
        <textarea
          className="w-full rounded-xl border px-3 py-2 text-sm"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="ระบุเหตุผลและช่วงเวลา..."
          rows={5}
          required
        />
      </div>

      <div className="pt-2 flex justify-end">
        <Button
          type="submit"
          disabled={isPending}
          className="px-8 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-semibold gap-2"
        >
          <Send className="w-4 h-4" />
          <span>{isPending ? "กำลังส่งคำร้อง..." : "ส่งคำร้อง"}</span>
        </Button>
      </div>
    </form>
  );
}
