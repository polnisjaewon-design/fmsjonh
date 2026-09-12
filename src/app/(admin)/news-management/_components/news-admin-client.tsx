"use client";

import { useState, useTransition } from "react";
import { Plus, Edit2, Trash2, Newspaper, AlertCircle, Pin, Sparkles, Loader2, Languages } from "lucide-react";
import { toast } from "sonner";
import { useT, useLocale } from "@/shared/lib/i18n/client";
import { formatDate } from "@/shared/lib/format";
import { cn } from "@/shared/lib/utils";
import {
  LiyonCard,
  DataTable,
  StatusPill,
  LiyonDialog,
  LiyonDialogCloseButton,
  LiyonDialogHeader,
  LiyonDialogBody,
  LiyonDialogFooter,
  LiyonField,
  LiyonSelect,
  LiyonSwitchRow,
  RowMenuItem,
  type DataTableColumn,
} from "@/shared/components/liyon";
import { Button } from "@/components/ui/button";
import type { NewsArticleDto, NewsCategoryDto } from "@/features/news";
import {
  createArticleAction,
  updateArticleAction,
  deleteArticleAction,
  getAdminArticlesAction,
  translateNewsWithGeminiAction,
} from "@/features/news/actions";

interface Props {
  initialArticles: NewsArticleDto[];
  categories: NewsCategoryDto[];
  canManage: boolean;
}

export function NewsAdminClient({ initialArticles, categories, canManage }: Props) {
  const t = useT();
  const locale = useLocale();
  const [articles, setArticles] = useState<NewsArticleDto[]>(initialArticles);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<NewsArticleDto | null>(null);
  const [editingArticle, setEditingArticle] = useState<NewsArticleDto | null>(null);
  const [isPending, startTransition] = useTransition();

  // Form states
  const [formTitleTh, setFormTitleTh] = useState("");
  const [formTitleEn, setFormTitleEn] = useState("");
  const [formCategoryId, setFormCategoryId] = useState("");
  const [formSummaryTh, setFormSummaryTh] = useState("");
  const [formSummaryEn, setFormSummaryEn] = useState("");
  const [formContentTh, setFormContentTh] = useState("");
  const [formContentEn, setFormContentEn] = useState("");
  const [formCoverImageUrl, setFormCoverImageUrl] = useState("");
  const [formIsPinned, setFormIsPinned] = useState(false);
  const [formIsPublished, setFormIsPublished] = useState(true);
  const [activeLangTab, setActiveLangTab] = useState<"th" | "en">("th");
  const [isTranslating, setIsTranslating] = useState(false);

  function resetForm() {
    setEditingArticle(null);
    setFormTitleTh("");
    setFormTitleEn("");
    setFormCategoryId(categories[0]?.id || "");
    setFormSummaryTh("");
    setFormSummaryEn("");
    setFormContentTh("");
    setFormContentEn("");
    setFormCoverImageUrl("");
    setFormIsPinned(false);
    setFormIsPublished(true);
    setActiveLangTab("th");
  }

  function openCreateDialog() {
    resetForm();
    setModalOpen(true);
  }

  function openEditDialog(article: NewsArticleDto) {
    setEditingArticle(article);
    setFormTitleTh(article.titleTh);
    setFormTitleEn(article.titleEn || "");
    setFormCategoryId(article.categoryId || categories[0]?.id || "");
    setFormSummaryTh(article.summaryTh || "");
    setFormSummaryEn(article.summaryEn || "");
    setFormContentTh(article.contentTh);
    setFormContentEn(article.contentEn || "");
    setFormCoverImageUrl(article.coverImageUrl || "");
    setFormIsPinned(article.isPinned);
    setFormIsPublished(article.isPublished);
    setActiveLangTab("th");
    setModalOpen(true);
  }

  async function handleAiTranslate() {
    if (!formTitleTh.trim()) {
      toast.error(t("news.aiTranslateEmptyThai"));
      return;
    }
    if (!formContentTh.trim()) {
      toast.error(t("news.contentThRequired"));
      return;
    }

    setIsTranslating(true);
    try {
      const res = await translateNewsWithGeminiAction({
        titleTh: formTitleTh,
        summaryTh: formSummaryTh || "",
        contentTh: formContentTh,
      });

      if (res.ok) {
        setFormTitleEn(res.data.titleEn);
        if (res.data.summaryEn) setFormSummaryEn(res.data.summaryEn);
        if (res.data.contentEn) setFormContentEn(res.data.contentEn);
        toast.success(t("news.aiTranslateSuccess"));
        setActiveLangTab("en");
      } else {
        const errorMsg = res.error?.message ? t(res.error.message) : t("news.aiTranslateFailed");
        toast.error(errorMsg);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t("news.aiTranslateFailed"));
    } finally {
      setIsTranslating(false);
    }
  }

  function handleSave() {
    if (!formTitleTh.trim()) {
      toast.error(t("news.titleThRequired"));
      return;
    }
    if (!formContentTh.trim()) {
      toast.error(t("news.contentThRequired"));
      return;
    }

    startTransition(async () => {
      const payload = {
        titleTh: formTitleTh,
        titleEn: formTitleEn || null,
        categoryId: formCategoryId || null,
        summaryTh: formSummaryTh || null,
        summaryEn: formSummaryEn || null,
        contentTh: formContentTh,
        contentEn: formContentEn || null,
        coverImageUrl: formCoverImageUrl || null,
        isPinned: formIsPinned,
        isPublished: formIsPublished,
      };

      if (editingArticle) {
        const res = await updateArticleAction({ ...payload, id: editingArticle.id });
        if (res.ok) {
          toast.success(t("sample.updateSuccess"));
          setModalOpen(false);
          const ref = await getAdminArticlesAction();
          if (ref.ok) setArticles(ref.data);
        } else {
          toast.error(res.error.message);
        }
      } else {
        const res = await createArticleAction(payload);
        if (res.ok) {
          toast.success(t("sample.createSuccess"));
          setModalOpen(false);
          const ref = await getAdminArticlesAction();
          if (ref.ok) setArticles(ref.data);
        } else {
          toast.error(res.error.message);
        }
      }
    });
  }

  function handleDelete(article: NewsArticleDto) {
    startTransition(async () => {
      const res = await deleteArticleAction(article.id);
      if (res.ok) {
        toast.success(t("sample.deleteSuccess"));
        setDeleteConfirmItem(null);
        setArticles((prev) => prev.filter((i) => i.id !== article.id));
      } else {
        toast.error(res.error.message);
      }
    });
  }

  const columns: DataTableColumn<NewsArticleDto>[] = [
    {
      key: "title",
      header: t("news.titleTh"),
      render: (row) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 font-medium text-foreground">
            {row.isPinned && <Pin className="w-3.5 h-3.5 text-amber-600 fill-amber-600 shrink-0" />}
            <span className="line-clamp-1">{row.titleTh}</span>
            {row.titleEn && (
              <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 font-medium shrink-0" title={row.titleEn}>
                <Languages className="w-3 h-3" />
                EN
              </span>
            )}
          </div>
          {row.titleEn && (
            <p className="text-xs text-muted-foreground line-clamp-1 italic">{row.titleEn}</p>
          )}
          {row.categoryName && (
            <span className="text-[11px] text-muted-foreground/80">{row.categoryName}</span>
          )}
        </div>
      ),
    },
    {
      key: "isPublished",
      header: t("news.isPublished"),
      render: (row) => (
        <StatusPill tone={row.isPublished ? "ok" : "off"}>
          {row.isPublished ? t("status.active") : t("status.inactive")}
        </StatusPill>
      ),
    },
    {
      key: "views",
      header: t("news.views"),
      className: "nowrap text-xs text-muted-foreground",
      render: (row) => <span>{row.viewCount}</span>,
    },
    {
      key: "createdAt",
      header: t("news.publishedDate"),
      className: "nowrap text-muted-foreground text-xs",
      render: (row) => <span>{formatDate(new Date(row.createdAt), locale)}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("news.adminTitle")}</h1>
          <p className="text-sm text-muted-foreground">{t("news.adminSubtitle")}</p>
        </div>
        {canManage && (
          <Button onClick={openCreateDialog} className="gap-2 bg-amber-800 hover:bg-amber-900 text-white">
            <Plus className="h-4 w-4" />
            {t("news.create")}
          </Button>
        )}
      </div>

      <LiyonCard>
        <DataTable<NewsArticleDto>
          headHeading={<h2 className="text-base font-semibold">{t("news.adminTitle")}</h2>}
          state={articles.length === 0 ? "empty" : "data"}
          rows={articles}
          columns={columns}
          getRowId={(row) => row.id}
          renderRowMenu={
            canManage
              ? (row) => (
                  <>
                    <RowMenuItem onSelect={() => openEditDialog(row)} icon={<Edit2 className="h-4 w-4" />}>
                      {t("sample.edit")}
                    </RowMenuItem>
                    <RowMenuItem onSelect={() => setDeleteConfirmItem(row)} danger icon={<Trash2 className="h-4 w-4" />}>
                      {t("sample.delete")}
                    </RowMenuItem>
                  </>
                )
              : undefined
          }
          empty={{
            icon: <Newspaper className="h-10 w-10 text-muted-foreground/50" />,
            title: t("news.empty"),
            description: t("news.adminSubtitle"),
          }}
          error={{
            icon: <AlertCircle className="h-10 w-10 text-destructive" />,
            title: t("common.error"),
          }}
        />
      </LiyonCard>

      {/* Dialog สร้าง/แก้ไขข่าว */}
      <LiyonDialog open={modalOpen} onOpenChange={setModalOpen} wide>
        <LiyonDialogCloseButton label={t("common.close")} />
        <LiyonDialogHeader
          title={editingArticle ? t("news.edit") : t("news.create")}
          description={t("news.adminSubtitle")}
        />
        <LiyonDialogBody>
          <div className="space-y-4 py-2">
            {/* AI Assistant Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-purple-500/10 border border-purple-500/25">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-purple-900 dark:text-purple-200">
                    ระบบผู้ช่วยแปล ๒ ภาษาด้วย Gemini AI
                  </h4>
                  <p className="text-[11px] text-purple-700/80 dark:text-purple-300/80">
                    พิมพ์เนื้อหาภาษาไทย แล้วกดปุ่มเพื่อให้ AI แปลและสร้างเนื้อหาภาษาอังกฤษให้อัตโนมัติ
                  </p>
                </div>
              </div>
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={isTranslating || !formTitleTh.trim()}
                onClick={handleAiTranslate}
                className="h-8 gap-1.5 border-purple-500/40 text-purple-700 dark:text-purple-300 hover:bg-purple-500/20 text-xs font-medium shrink-0 self-end sm:self-auto shadow-sm"
              >
                {isTranslating ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>{t("news.aiTranslating")}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                    <span>{t("news.aiTranslateBtn")}</span>
                  </>
                )}
              </Button>
            </div>

            {/* Language Tabs */}
            <div className="flex border-b border-border">
              <button
                type="button"
                onClick={() => setActiveLangTab("th")}
                className={cn(
                  "px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors flex items-center gap-2",
                  activeLangTab === "th"
                    ? "border-amber-800 text-amber-900 dark:text-amber-300 font-semibold"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <span>🇹🇭 {t("news.bilingualTabTh")}</span>
                <span className="text-xs text-red-500">*</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveLangTab("en")}
                className={cn(
                  "px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors flex items-center gap-2",
                  activeLangTab === "en"
                    ? "border-amber-800 text-amber-900 dark:text-amber-300 font-semibold"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <span>🇬🇧 {t("news.bilingualTabEn")}</span>
                {formTitleEn ? (
                  <span className="w-2 h-2 rounded-full bg-emerald-500" title="มีเนื้อหาภาษาอังกฤษแล้ว" />
                ) : (
                  <span className="text-[10px] text-muted-foreground italic">(AI Auto)</span>
                )}
              </button>
            </div>

            {/* Tab: Thai */}
            {activeLangTab === "th" && (
              <div className="space-y-4">
                <LiyonField label={t("news.titleTh")} htmlFor="news-title-th">
                  <input
                    id="news-title-th"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formTitleTh}
                    onChange={(e) => setFormTitleTh(e.target.value)}
                    placeholder="เช่น เปิดรับสมัครนิสิตใหม่ ระดับปริญญาโท ประจำปีการศึกษา ๒๕๖๙"
                    required
                  />
                </LiyonField>

                <LiyonField label={t("news.summaryTh")} htmlFor="news-summary-th">
                  <textarea
                    id="news-summary-th"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formSummaryTh}
                    onChange={(e) => setFormSummaryTh(e.target.value)}
                    placeholder="สรุปย่อข่าวสาร ๒-๓ บรรทัด สำหรับแสดงในการ์ดข่าว..."
                    rows={2}
                  />
                </LiyonField>

                <LiyonField label={t("news.contentTh")} htmlFor="news-content-th">
                  <textarea
                    id="news-content-th"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formContentTh}
                    onChange={(e) => setFormContentTh(e.target.value)}
                    placeholder="เนื้อหาข่าวแบบละเอียด..."
                    rows={6}
                    required
                  />
                </LiyonField>
              </div>
            )}

            {/* Tab: English */}
            {activeLangTab === "en" && (
              <div className="space-y-4">
                <LiyonField label={t("news.titleEn")} htmlFor="news-title-en">
                  <input
                    id="news-title-en"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formTitleEn}
                    onChange={(e) => setFormTitleEn(e.target.value)}
                    placeholder="e.g. Master of Arts Program Admissions Open for Academic Year 2026"
                  />
                </LiyonField>

                <LiyonField label={t("news.summaryEn")} htmlFor="news-summary-en">
                  <textarea
                    id="news-summary-en"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formSummaryEn}
                    onChange={(e) => setFormSummaryEn(e.target.value)}
                    placeholder="Brief news summary in English (1-3 sentences)..."
                    rows={2}
                  />
                </LiyonField>

                <LiyonField label={t("news.contentEn")} htmlFor="news-content-en">
                  <textarea
                    id="news-content-en"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formContentEn}
                    onChange={(e) => setFormContentEn(e.target.value)}
                    placeholder="Detailed news content in English..."
                    rows={6}
                  />
                </LiyonField>
              </div>
            )}

            {/* General Meta Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t">
              <LiyonField label={t("news.category")} htmlFor="news-category">
                <LiyonSelect
                  id="news-category"
                  value={formCategoryId}
                  onChange={(e) => setFormCategoryId(e.target.value)}
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.nameTh}</option>
                  ))}
                </LiyonSelect>
              </LiyonField>

              <LiyonField label={t("news.coverImage")} htmlFor="news-cover">
                <input
                  id="news-cover"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={formCoverImageUrl}
                  onChange={(e) => setFormCoverImageUrl(e.target.value)}
                  placeholder="https://..."
                />
              </LiyonField>
            </div>

            <div className="space-y-2 pt-2 border-t">
              <LiyonSwitchRow
                id="news-pinned"
                label={t("news.isPinned")}
                description="แสดงข่าวนี้ที่ส่วนบนสุดของหน้าแรก"
                checked={formIsPinned}
                onCheckedChange={setFormIsPinned}
              />
              <LiyonSwitchRow
                id="news-published"
                label={t("news.isPublished")}
                description="เปิดให้บุคคลภายนอกเข้าดูข่าวนี้ได้บน Public Portal"
                checked={formIsPublished}
                onCheckedChange={setFormIsPublished}
              />
            </div>
          </div>
        </LiyonDialogBody>
        <LiyonDialogFooter>
          <Button variant="outline" onClick={() => setModalOpen(false)} disabled={isPending}>
            {t("sample.cancel")}
          </Button>
          <Button onClick={handleSave} disabled={isPending} className="bg-amber-800 hover:bg-amber-900 text-white">
            {t("sample.save")}
          </Button>
        </LiyonDialogFooter>
      </LiyonDialog>

      {/* Dialog ยืนยันการลบ */}
      <LiyonDialog open={!!deleteConfirmItem} onOpenChange={(open) => !open && setDeleteConfirmItem(null)} danger>
        <LiyonDialogCloseButton label={t("common.close")} />
        <LiyonDialogHeader
          title={t("news.delete")}
          description={t("news.deleteConfirm")}
        />
        <LiyonDialogBody>
          <p className="text-sm font-medium text-stone-900">
            {deleteConfirmItem?.titleTh}
          </p>
        </LiyonDialogBody>
        <LiyonDialogFooter>
          <Button variant="outline" onClick={() => setDeleteConfirmItem(null)} disabled={isPending}>
            {t("sample.cancel")}
          </Button>
          <Button
            variant="destructive"
            onClick={() => deleteConfirmItem && handleDelete(deleteConfirmItem)}
            disabled={isPending}
          >
            {t("news.delete")}
          </Button>
        </LiyonDialogFooter>
      </LiyonDialog>
    </div>
  );
}
