"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Eye, ArrowLeft, Globe, Languages } from "lucide-react";
import type { NewsArticleDto } from "@/features/news";

interface Props {
  article: NewsArticleDto;
  formattedDate: string;
}

export function NewsDetailView({ article, formattedDate }: Props) {
  const hasEnglish = Boolean(article.titleEn && (article.contentEn || article.summaryEn));
  const [lang, setLang] = useState<"th" | "en">("th");

  const displayTitle = lang === "en" && article.titleEn ? article.titleEn : article.titleTh;
  const displaySummary =
    lang === "en" ? (article.summaryEn || article.summaryTh) : article.summaryTh;
  const displayContent =
    lang === "en" && article.contentEn ? article.contentEn : article.contentTh;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      {/* Top Navigation & Language Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-amber-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === "en" ? "Back to News & Events" : "กลับไปยังหน้ารวมข่าวสาร"}</span>
        </Link>

        {hasEnglish && (
          <div className="inline-flex items-center gap-1 p-1 bg-stone-100 rounded-xl border border-stone-200/80 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setLang("th")}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                lang === "th"
                  ? "bg-white text-stone-900 shadow-xs font-semibold"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <span>🇹🇭 ภาษาไทย</span>
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                lang === "en"
                  ? "bg-amber-800 text-white shadow-xs font-semibold"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              <span>🇬🇧 English</span>
            </button>
          </div>
        )}
      </div>

      {/* Article Header */}
      <div className="space-y-4 border-b border-stone-200/80 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          {article.categoryName && (
            <span className="inline-block px-3 py-1 rounded-md bg-amber-100 text-amber-900 text-xs font-semibold">
              {article.categoryName}
            </span>
          )}
          {hasEnglish && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-purple-50 text-purple-700 border border-purple-200">
              <Globe className="w-3 h-3" />
              Bilingual (๒ ภาษา)
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 font-serif leading-tight">
          {displayTitle}
        </h1>

        {lang === "th" && article.titleEn && (
          <p className="text-sm text-stone-500 font-sans italic">{article.titleEn}</p>
        )}
        {lang === "en" && article.titleTh && (
          <p className="text-sm text-stone-500 font-sans italic">{article.titleTh}</p>
        )}

        <div className="flex items-center gap-4 text-xs text-stone-500 pt-2">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Eye className="w-4 h-4" />
            <span>{article.viewCount} {lang === "en" ? "views" : "ครั้ง"}</span>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      {article.coverImageUrl && (
        <div className="rounded-2xl overflow-hidden shadow-md max-h-[460px] bg-stone-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.coverImageUrl}
            alt={displayTitle}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Summary Box */}
      {displaySummary && (
        <div className="p-5 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-950 text-sm sm:text-base leading-relaxed font-medium">
          {displaySummary}
        </div>
      )}

      {/* Content */}
      {/<[a-z][\s\S]*>/i.test(displayContent) ? (
        <div
          className="prose prose-stone max-w-none text-stone-800 leading-relaxed text-base sm:text-lg [&_h1]:text-2xl sm:[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-stone-900 [&_h1]:mt-8 [&_h1]:mb-4 [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-stone-900 [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-lg sm:[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-stone-900 [&_h3]:mt-5 [&_h3]:mb-2 [&_h4]:text-base [&_h4]:font-semibold [&_h4]:text-stone-900 [&_h4]:mt-4 [&_h4]:mb-2 [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-1.5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:space-y-1.5 [&_li]:leading-relaxed [&_blockquote]:border-l-4 [&_blockquote]:border-amber-600 [&_blockquote]:pl-4 [&_blockquote]:py-2 [&_blockquote]:my-4 [&_blockquote]:italic [&_blockquote]:text-stone-700 [&_blockquote]:bg-amber-50/60 [&_blockquote]:rounded-r-lg [&_table]:w-full [&_table]:border-collapse [&_table]:my-6 [&_th]:border [&_th]:border-stone-200 [&_th]:bg-stone-100 [&_th]:p-3 [&_th]:text-left [&_th]:font-semibold [&_td]:border [&_td]:border-stone-200 [&_td]:p-3 [&_a]:text-amber-800 [&_a]:underline hover:[&_a]:text-amber-900"
          dangerouslySetInnerHTML={{ __html: displayContent }}
        />
      ) : (
        <div className="prose prose-stone max-w-none text-stone-800 leading-relaxed whitespace-pre-line text-base sm:text-lg">
          {displayContent}
        </div>
      )}

      {/* Footer Share */}
      <div className="pt-8 border-t border-stone-200/80 flex items-center justify-between">
        <Link
          href="/news"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{lang === "en" ? "Explore more announcements & news" : "ดูข่าวประชาสัมพันธ์อื่นๆ"}</span>
        </Link>
      </div>
    </div>
  );
}
