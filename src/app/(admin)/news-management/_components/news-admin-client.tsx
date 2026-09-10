"use client";

import { useState, useTransition } from "react";
import { Plus, Edit2, Trash2, Newspaper, AlertCircle, Pin } from "lucide-react";
import { toast } from "sonner";
import { useT, useLocale } from "@/shared/lib/i18n/client";
import { formatDate } from "@/shared/lib/format";
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
  const [formContentTh, setFormContentTh] = useState("");
  const [formCoverImageUrl, setFormCoverImageUrl] = useState("");
  const [formIsPinned, setFormIsPinned] = useState(false);
  const [formIsPublished, setFormIsPublished] = useState(true);

  function resetForm() {
    setEditingArticle(null);
    setFormTitleTh("");
    setFormTitleEn("");
    setFormCategoryId(categories[0]?.id || "");
    setFormSummaryTh("");
    setFormContentTh("");
    setFormCoverImageUrl("");
    setFormIsPinned(false);
    setFormIsPublished(true);
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
    setFormContentTh(article.contentTh);
    setFormCoverImageUrl(article.coverImageUrl || "");
    setFormIsPinned(article.isPinned);
    setFormIsPublished(article.isPublished);
    setModalOpen(true);
  }

  function handleSave() {
    if (!formTitleTh.trim()) {
      toast.error(t("news.titleTh"));
      return;
    }
    if (!formContentTh.trim()) {
      toast.error(t("news.content"));
      return;
    }

    startTransition(async () => {
      const payload = {
        titleTh: formTitleTh,
        titleEn: formTitleEn || null,
        categoryId: formCategoryId || null,
        summaryTh: formSummaryTh || null,
        contentTh: formContentTh,
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
          </div>
          {row.categoryName && (
            <span className="text-xs text-muted-foreground">{row.categoryName}</span>
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
            <LiyonField label={t("news.titleTh")} htmlFor="news-title-th">
              <input
                id="news-title-th"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={formTitleTh}
                onChange={(e) => setFormTitleTh(e.target.value)}
                placeholder="เช่น เปิดรับสมัครนิสิตใหม่ ๒๕๖๙"
                required
              />
            </LiyonField>

            <LiyonField label={t("news.titleEn")} htmlFor="news-title-en">
              <input
                id="news-title-en"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={formTitleEn}
                onChange={(e) => setFormTitleEn(e.target.value)}
                placeholder="Title in English..."
              />
            </LiyonField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            <LiyonField label={t("news.summary")} htmlFor="news-summary">
              <textarea
                id="news-summary"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={formSummaryTh}
                onChange={(e) => setFormSummaryTh(e.target.value)}
                placeholder="สรุปย่อข่าวสาร ๒-๓ บรรทัด..."
                rows={2}
              />
            </LiyonField>

            <LiyonField label={t("news.content")} htmlFor="news-content">
              <textarea
                id="news-content"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={formContentTh}
                onChange={(e) => setFormContentTh(e.target.value)}
                placeholder="เนื้อหาข่าวแบบละเอียด..."
                rows={6}
                required
              />
            </LiyonField>

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
