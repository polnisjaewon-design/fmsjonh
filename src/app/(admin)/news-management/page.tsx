import { requirePermission, hasPermission } from "@/features/identity/server";
import { NEWS_P } from "@/features/news/permissions";
import { listAllAdminArticles, listNewsCategories } from "@/features/news/server";
import { NewsAdminClient } from "./_components/news-admin-client";

export default async function AdminNewsPage() {
  const ctx = await requirePermission(NEWS_P.newsRead);
  const [initialArticles, categories] = await Promise.all([
    listAllAdminArticles(ctx.tenantId),
    listNewsCategories(ctx.tenantId),
  ]);

  return (
    <NewsAdminClient
      initialArticles={initialArticles}
      categories={categories}
      canManage={hasPermission(ctx, NEWS_P.newsManage)}
    />
  );
}
