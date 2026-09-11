import Link from "next/link";
import { Calendar, Eye, ArrowRight } from "lucide-react";
import { getLocale } from "@/shared/lib/i18n/server";
import { formatDate } from "@/shared/lib/format";
import { getDefaultTenantId } from "@/features/identity/server";
import { listPublishedArticles, listNewsCategories } from "@/features/news/server";

export default async function NewsIndexPage(props: {
  searchParams: Promise<{ category?: string }>;
}) {
  const searchParams = await props.searchParams;
  const locale = await getLocale();
  const tenantId = await getDefaultTenantId();

  const [articles, categories] = await Promise.all([
    listPublishedArticles(tenantId, 50, searchParams.category),
    listNewsCategories(tenantId),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="border-b pb-6">
        <div className="text-amber-800 text-xs sm:text-sm font-semibold uppercase tracking-wider">
          Announcements & News
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif mt-1">
          ข่าวสารและกิจกรรมประชาสัมพันธ์
        </h1>
        <p className="text-sm text-stone-600 mt-2">
          ติดตามข่าวสาร โครงการปฏิบัติวิปัสสนากรรมฐาน และประกาศของหลักสูตร
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 pt-2">
        <Link
          href="/news"
          className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
            !searchParams.category
              ? "bg-amber-800 text-white"
              : "bg-white border text-stone-700 hover:bg-stone-50"
          }`}
        >
          ทั้งหมด
        </Link>
        {categories.map((cat) => {
          const active = searchParams.category === cat.slug;
          return (
            <Link
              key={cat.id}
              href={`/news?category=${cat.slug}`}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                active
                  ? "bg-amber-800 text-white"
                  : "bg-white border text-stone-700 hover:bg-stone-50"
              }`}
            >
              {cat.nameTh} {cat.articleCount ? `(${cat.articleCount})` : ""}
            </Link>
          );
        })}
      </div>

      {/* Articles Grid */}
      {articles.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border">
          <p className="text-stone-500">ไม่พบข่าวสารในหมวดหมู่นี้</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              {item.coverImageUrl && (
                <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.coverImageUrl}
                    alt={item.titleTh}
                    className="w-full h-full object-cover"
                  />
                  {item.categoryName && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-amber-900/85 text-amber-100 text-xs font-medium backdrop-blur-xs">
                      {item.categoryName}
                    </span>
                  )}
                </div>
              )}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.publishedAt ? formatDate(new Date(item.publishedAt), locale) : "—"}</span>
                  </div>
                  <h2 className="text-base font-bold text-stone-900 line-clamp-2 hover:text-amber-800">
                    <Link href={`/news/${item.slug}`}>{item.titleTh}</Link>
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed">
                    {item.summaryTh || item.contentTh}
                  </p>
                </div>
                <div className="pt-3 border-t flex items-center justify-between">
                  <Link
                    href={`/news/${item.slug}`}
                    className="text-xs font-semibold text-amber-800 hover:underline inline-flex items-center gap-1"
                  >
                    <span>อ่านรายละเอียด</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-xs text-stone-400 flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {item.viewCount}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
