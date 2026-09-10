import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Eye, ArrowLeft } from "lucide-react";
import { getLocale } from "@/shared/lib/i18n/server";
import { formatDate } from "@/shared/lib/format";
import { getDefaultTenantId, getArticleBySlug } from "@/features/news/server";

export default async function NewsDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const locale = await getLocale();
  const tenantId = await getDefaultTenantId();

  const article = await getArticleBySlug(tenantId, params.slug);
  if (!article) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      {/* Back Link */}
      <div>
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-amber-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>กลับไปยังหน้ารวมข่าวสาร</span>
        </Link>
      </div>

      {/* Article Header */}
      <div className="space-y-4 border-b pb-6">
        {article.categoryName && (
          <span className="inline-block px-3 py-1 rounded-md bg-amber-100 text-amber-900 text-xs font-semibold">
            {article.categoryName}
          </span>
        )}
        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 font-serif leading-tight">
          {article.titleTh}
        </h1>
        {article.titleEn && (
          <p className="text-sm text-stone-500 font-sans italic">{article.titleEn}</p>
        )}
        <div className="flex items-center gap-4 text-xs text-stone-500 pt-2">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{article.publishedAt ? formatDate(new Date(article.publishedAt), locale) : "—"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Eye className="w-4 h-4" />
            <span>{article.viewCount} ครั้ง</span>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      {article.coverImageUrl && (
        <div className="rounded-2xl overflow-hidden shadow-md max-h-[460px] bg-stone-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.coverImageUrl}
            alt={article.titleTh}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Summary Box */}
      {article.summaryTh && (
        <div className="p-5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-950 text-sm sm:text-base leading-relaxed font-medium">
          {article.summaryTh}
        </div>
      )}

      {/* Content */}
      <div className="prose prose-stone max-w-none text-stone-800 leading-relaxed whitespace-pre-line text-base sm:text-lg">
        {article.contentTh}
      </div>

      {/* Footer Share */}
      <div className="pt-8 border-t flex items-center justify-between">
        <Link
          href="/news"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>ดูข่าวประชาสัมพันธ์อื่นๆ</span>
        </Link>
      </div>
    </div>
  );
}
