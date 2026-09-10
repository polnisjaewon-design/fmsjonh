import { prisma } from "@/shared/lib/infra/prisma";
import type { Prisma } from "@/generated/prisma";
import type { NewsArticleDto, NewsCategoryDto } from "../index";
import type { CreateArticleInput, UpdateArticleInput } from "./validations";

function generateSlug(title: string): string {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^\u0E00-\u0E7Fa-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${base || "article"}-${Date.now().toString(36)}`;
}

export async function listPublishedArticles(tenantId: string, limit = 20, categorySlug?: string): Promise<NewsArticleDto[]> {
  const where: Prisma.NewsArticleWhereInput = {
    tenantId,
    isPublished: true,
    ...(categorySlug ? { category: { slug: categorySlug } } : {}),
  };

  const items = await prisma.newsArticle.findMany({
    where,
    include: { category: true },
    orderBy: [{ isPinned: "desc" }, { publishedAt: "desc" }, { createdAt: "desc" }],
    take: limit,
  });

  return items.map((item) => ({
    id: item.id,
    categoryId: item.categoryId,
    categoryName: item.category?.nameTh ?? null,
    titleTh: item.titleTh,
    titleEn: item.titleEn,
    slug: item.slug,
    summaryTh: item.summaryTh,
    summaryEn: item.summaryEn,
    contentTh: item.contentTh,
    contentEn: item.contentEn,
    coverImageUrl: item.coverImageUrl,
    isPinned: item.isPinned,
    isPublished: item.isPublished,
    publishedAt: item.publishedAt?.toISOString() ?? null,
    viewCount: item.viewCount,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }));
}

export async function getArticleBySlug(tenantId: string, slug: string): Promise<NewsArticleDto | null> {
  const item = await prisma.newsArticle.findFirst({
    where: { tenantId, slug, isPublished: true },
    include: { category: true },
  });
  if (!item) return null;

  // Increment view count asynchronously
  prisma.newsArticle.update({
    where: { id: item.id },
    data: { viewCount: { increment: 1 } },
  }).catch(() => {});

  return {
    id: item.id,
    categoryId: item.categoryId,
    categoryName: item.category?.nameTh ?? null,
    titleTh: item.titleTh,
    titleEn: item.titleEn,
    slug: item.slug,
    summaryTh: item.summaryTh,
    summaryEn: item.summaryEn,
    contentTh: item.contentTh,
    contentEn: item.contentEn,
    coverImageUrl: item.coverImageUrl,
    isPinned: item.isPinned,
    isPublished: item.isPublished,
    publishedAt: item.publishedAt?.toISOString() ?? null,
    viewCount: item.viewCount,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  };
}

export async function listAllAdminArticles(tenantId: string): Promise<NewsArticleDto[]> {
  const items = await prisma.newsArticle.findMany({
    where: { tenantId },
    include: { category: true },
    orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
  });

  return items.map((item) => ({
    id: item.id,
    categoryId: item.categoryId,
    categoryName: item.category?.nameTh ?? null,
    titleTh: item.titleTh,
    titleEn: item.titleEn,
    slug: item.slug,
    summaryTh: item.summaryTh,
    summaryEn: item.summaryEn,
    contentTh: item.contentTh,
    contentEn: item.contentEn,
    coverImageUrl: item.coverImageUrl,
    isPinned: item.isPinned,
    isPublished: item.isPublished,
    publishedAt: item.publishedAt?.toISOString() ?? null,
    viewCount: item.viewCount,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }));
}

export async function createArticle(tenantId: string, input: CreateArticleInput, authorId?: string): Promise<NewsArticleDto> {
  const slug = generateSlug(input.titleTh);
  const now = new Date();
  const created = await prisma.newsArticle.create({
    data: {
      tenantId,
      categoryId: input.categoryId ?? null,
      titleTh: input.titleTh,
      titleEn: input.titleEn ?? null,
      slug,
      summaryTh: input.summaryTh ?? null,
      summaryEn: input.summaryEn ?? null,
      contentTh: input.contentTh,
      contentEn: input.contentEn ?? null,
      coverImageUrl: input.coverImageUrl ?? null,
      isPinned: input.isPinned,
      isPublished: input.isPublished,
      publishedAt: input.isPublished ? now : null,
      authorId: authorId ?? null,
    },
    include: { category: true },
  });

  return {
    id: created.id,
    categoryId: created.categoryId,
    categoryName: created.category?.nameTh ?? null,
    titleTh: created.titleTh,
    titleEn: created.titleEn,
    slug: created.slug,
    summaryTh: created.summaryTh,
    summaryEn: created.summaryEn,
    contentTh: created.contentTh,
    contentEn: created.contentEn,
    coverImageUrl: created.coverImageUrl,
    isPinned: created.isPinned,
    isPublished: created.isPublished,
    publishedAt: created.publishedAt?.toISOString() ?? null,
    viewCount: created.viewCount,
    createdAt: created.createdAt.toISOString(),
    updatedAt: created.updatedAt.toISOString(),
  };
}

export async function updateArticle(tenantId: string, input: UpdateArticleInput): Promise<NewsArticleDto> {
  const existing = await prisma.newsArticle.findFirstOrThrow({
    where: { id: input.id, tenantId },
  });

  const updated = await prisma.newsArticle.update({
    where: { id: input.id },
    data: {
      categoryId: input.categoryId !== undefined ? input.categoryId : existing.categoryId,
      titleTh: input.titleTh ?? existing.titleTh,
      titleEn: input.titleEn !== undefined ? input.titleEn : existing.titleEn,
      summaryTh: input.summaryTh !== undefined ? input.summaryTh : existing.summaryTh,
      summaryEn: input.summaryEn !== undefined ? input.summaryEn : existing.summaryEn,
      contentTh: input.contentTh ?? existing.contentTh,
      contentEn: input.contentEn !== undefined ? input.contentEn : existing.contentEn,
      coverImageUrl: input.coverImageUrl !== undefined ? input.coverImageUrl : existing.coverImageUrl,
      isPinned: input.isPinned !== undefined ? input.isPinned : existing.isPinned,
      isPublished: input.isPublished !== undefined ? input.isPublished : existing.isPublished,
      publishedAt: input.isPublished && !existing.publishedAt ? new Date() : existing.publishedAt,
    },
    include: { category: true },
  });

  return {
    id: updated.id,
    categoryId: updated.categoryId,
    categoryName: updated.category?.nameTh ?? null,
    titleTh: updated.titleTh,
    titleEn: updated.titleEn,
    slug: updated.slug,
    summaryTh: updated.summaryTh,
    summaryEn: updated.summaryEn,
    contentTh: updated.contentTh,
    contentEn: updated.contentEn,
    coverImageUrl: updated.coverImageUrl,
    isPinned: updated.isPinned,
    isPublished: updated.isPublished,
    publishedAt: updated.publishedAt?.toISOString() ?? null,
    viewCount: updated.viewCount,
    createdAt: updated.createdAt.toISOString(),
    updatedAt: updated.updatedAt.toISOString(),
  };
}

export async function deleteArticle(tenantId: string, id: string): Promise<void> {
  await prisma.newsArticle.deleteMany({
    where: { id, tenantId },
  });
}

export async function listNewsCategories(tenantId: string): Promise<NewsCategoryDto[]> {
  const categories = await prisma.newsCategory.findMany({
    where: { tenantId },
    include: { _count: { select: { articles: true } } },
    orderBy: { createdAt: "asc" },
  });

  return categories.map((c) => ({
    id: c.id,
    nameTh: c.nameTh,
    nameEn: c.nameEn,
    slug: c.slug,
    articleCount: c._count.articles,
  }));
}
