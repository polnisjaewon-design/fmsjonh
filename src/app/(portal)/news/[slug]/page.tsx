import { notFound } from "next/navigation";
import { getLocale } from "@/shared/lib/i18n/server";
import { formatDate } from "@/shared/lib/format";
import { getDefaultTenantId } from "@/features/identity/server";
import { getArticleBySlug } from "@/features/news/server";
import { NewsDetailView } from "./_components/news-detail-view";

export default async function NewsDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const locale = await getLocale();
  const tenantId = await getDefaultTenantId();

  let slug = params.slug;
  try {
    slug = decodeURIComponent(params.slug);
  } catch {}

  const article = (await getArticleBySlug(tenantId, slug)) ?? (await getArticleBySlug(tenantId, params.slug));
  if (!article) notFound();

  const formattedDate = article.publishedAt
    ? formatDate(new Date(article.publishedAt), locale)
    : "—";

  return <NewsDetailView article={article} formattedDate={formattedDate} />;
}

