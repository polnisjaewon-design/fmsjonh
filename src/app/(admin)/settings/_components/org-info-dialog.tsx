"use client";

import React, { useState } from "react";
import {
  Building2,
  FileText,
  Globe,
  Check,
  Award,
} from "lucide-react";
import {
  LiyonDialog,
  LiyonDialogHeader,
  LiyonDialogCloseButton,
  LiyonDialogBody,
  LiyonDialogFooter,
  LiyonField,
} from "@/shared/components/liyon";
import { Button } from "@/components/ui/button";
import { useT } from "@/shared/lib/i18n/client";
import { cn } from "@/shared/lib/utils";
import type { OrgInfo } from "@/features/identity";

interface OrgInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nameTh: string;
  nameEn: string;
  orgInfo: OrgInfo;
  onSave: (data: { nameTh: string; nameEn: string; orgInfo: OrgInfo }) => void;
}

export function OrgInfoDialog({
  open,
  onOpenChange,
  nameTh: initialNameTh,
  nameEn: initialNameEn,
  orgInfo: initialOrgInfo,
  onSave,
}: OrgInfoDialogProps) {
  const t = useT();

  const [activeTab, setActiveTab] = useState<"general" | "vision" | "contact">("general");
  const [nameTh, setNameTh] = useState(initialNameTh);
  const [nameEn, setNameEn] = useState(initialNameEn);
  const [data, setData] = useState<OrgInfo>({ ...initialOrgInfo });

  const handleSave = () => {
    onSave({
      nameTh,
      nameEn,
      orgInfo: data,
    });
    onOpenChange(false);
  };

  return (
    <LiyonDialog open={open} onOpenChange={onOpenChange} wide>
      <LiyonDialogCloseButton label={t("settings.cancel")} />
      <LiyonDialogHeader
        title={
          <span className="flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-500" />
            {t("settings.editWorldOrgBtn")}
          </span>
        }
        description={t("settings.worldOrgDesc")}
      />

      <LiyonDialogBody className="space-y-4">
        {/* Navigation Tabs */}
        <div className="flex border-b border-border/60 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("general")}
            className={cn(
              "px-3 py-2 text-xs font-semibold border-b-2 -mb-px transition-colors flex items-center gap-1.5",
              activeTab === "general"
                ? "border-brand text-brand"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <Building2 className="h-3.5 w-3.5" />
            ข้อมูลทั่วไปและสโลแกน
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("vision")}
            className={cn(
              "px-3 py-2 text-xs font-semibold border-b-2 -mb-px transition-colors flex items-center gap-1.5",
              activeTab === "vision"
                ? "border-brand text-brand"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <FileText className="h-3.5 w-3.5" />
            วิสัยทัศน์และพันธกิจ
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("contact")}
            className={cn(
              "px-3 py-2 text-xs font-semibold border-b-2 -mb-px transition-colors flex items-center gap-1.5",
              activeTab === "contact"
                ? "border-brand text-brand"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <Globe className="h-3.5 w-3.5" />
            ที่อยู่และช่องทางติดต่อ
          </button>
        </div>

        {/* TAB 1: General & Slogan */}
        {activeTab === "general" && (
          <div className="space-y-3.5 pt-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <LiyonField label={t("settings.nameTh")} htmlFor="org-name-th">
                <input
                  id="org-name-th"
                  value={nameTh}
                  onChange={(e) => setNameTh(e.target.value)}
                  placeholder="เช่น หลักสูตรพุทธศาสตรมหาบัณฑิต..."
                />
              </LiyonField>
              <LiyonField label={t("settings.nameEn")} htmlFor="org-name-en">
                <input
                  id="org-name-en"
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                  placeholder="e.g. Master of Arts Program in Vipassana..."
                />
              </LiyonField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <LiyonField label={t("settings.orgTaglineTh")} htmlFor="org-tagline-th">
                <input
                  id="org-tagline-th"
                  value={data.taglineTh}
                  onChange={(e) => setData({ ...data, taglineTh: e.target.value })}
                  placeholder="สโลแกนหรือคำขวัญภาษาไทย"
                />
              </LiyonField>
              <LiyonField label={t("settings.orgTaglineEn")} htmlFor="org-tagline-en">
                <input
                  id="org-tagline-en"
                  value={data.taglineEn}
                  onChange={(e) => setData({ ...data, taglineEn: e.target.value })}
                  placeholder="Official English Tagline"
                />
              </LiyonField>
            </div>
          </div>
        )}

        {/* TAB 2: Vision & Mission */}
        {activeTab === "vision" && (
          <div className="space-y-3.5 pt-1">
            <LiyonField label={t("settings.orgDescTh")} htmlFor="org-desc-th">
              <textarea
                id="org-desc-th"
                rows={3}
                value={data.descriptionTh}
                onChange={(e) => setData({ ...data, descriptionTh: e.target.value })}
                placeholder="ระบุวิสัยทัศน์ พันธกิจ หรือรายละเอียดองค์กรภาษาไทย"
                className="w-full text-sm bg-background border border-border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand/40"
              />
            </LiyonField>

            <LiyonField label={t("settings.orgDescEn")} htmlFor="org-desc-en">
              <textarea
                id="org-desc-en"
                rows={3}
                value={data.descriptionEn}
                onChange={(e) => setData({ ...data, descriptionEn: e.target.value })}
                placeholder="Official Vision, Mission, or institutional profile in English"
                className="w-full text-sm bg-background border border-border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-brand/40"
              />
            </LiyonField>
          </div>
        )}

        {/* TAB 3: Global Address & Contact */}
        {activeTab === "contact" && (
          <div className="space-y-3.5 pt-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <LiyonField label={t("settings.orgAddressTh")} htmlFor="org-addr-th">
                <input
                  id="org-addr-th"
                  value={data.addressTh}
                  onChange={(e) => setData({ ...data, addressTh: e.target.value })}
                  placeholder="ที่อยู่สำนักงาน / สถาบันภาษาไทย"
                />
              </LiyonField>
              <LiyonField label={t("settings.orgAddressEn")} htmlFor="org-addr-en">
                <input
                  id="org-addr-en"
                  value={data.addressEn}
                  onChange={(e) => setData({ ...data, addressEn: e.target.value })}
                  placeholder="Official Address in English"
                />
              </LiyonField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <LiyonField label={t("settings.orgEmail")} htmlFor="org-email">
                <input
                  id="org-email"
                  type="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  placeholder="contact@example.org"
                />
              </LiyonField>
              <LiyonField label={t("settings.orgPhone")} htmlFor="org-phone">
                <input
                  id="org-phone"
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                  placeholder="035-248-000 หรือ +66..."
                />
              </LiyonField>
              <LiyonField label={t("settings.orgWebsite")} htmlFor="org-web">
                <input
                  id="org-web"
                  type="url"
                  value={data.website}
                  onChange={(e) => setData({ ...data, website: e.target.value })}
                  placeholder="https://www.example.org"
                />
              </LiyonField>
            </div>
          </div>
        )}
      </LiyonDialogBody>

      <LiyonDialogFooter>
        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
          {t("settings.cancel")}
        </Button>
        <Button
          type="button"
          onClick={handleSave}
          className="gap-2 bg-brand text-white hover:bg-brand/90"
        >
          <Check className="h-4 w-4" />
          นำไปใช้และอัปเดต
        </Button>
      </LiyonDialogFooter>
    </LiyonDialog>
  );
}
