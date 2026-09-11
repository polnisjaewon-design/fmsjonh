"use server";

import { revalidatePath } from "next/cache";
import { runAction, type ActionResult } from "@/shared/lib/result";
import { getLocale } from "@/shared/lib/i18n/server";
import { zodErrorMap } from "@/shared/lib/i18n/zod-locale";
import { requirePermission } from "@/features/identity/server";
import { NEWS_P } from "../permissions";
import type { NewsArticleDto, NewsCategoryDto } from "../index";
import { createArticleSchema, updateArticleSchema, deleteArticleSchema } from "./validations";
import {
  listAllAdminArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  listNewsCategories,
} from "./services";

export async function getAdminArticlesAction(): Promise<ActionResult<NewsArticleDto[]>> {
  return runAction(async () => {
    const ctx = await requirePermission(NEWS_P.newsRead);
    return listAllAdminArticles(ctx.tenantId);
  });
}

export async function getNewsCategoriesAction(): Promise<ActionResult<NewsCategoryDto[]>> {
  return runAction(async () => {
    const ctx = await requirePermission(NEWS_P.newsRead);
    return listNewsCategories(ctx.tenantId);
  });
}

export async function createArticleAction(input: unknown): Promise<ActionResult<NewsArticleDto>> {
  return runAction(async () => {
    const ctx = await requirePermission(NEWS_P.newsManage);
    const locale = await getLocale();
    const parsed = createArticleSchema.parse(input, { error: zodErrorMap(locale) });
    const result = await createArticle(ctx.tenantId, parsed, ctx.userId);
    revalidatePath("/news");
    revalidatePath("/news-management");
    return result;
  });
}

export async function updateArticleAction(input: unknown): Promise<ActionResult<NewsArticleDto>> {
  return runAction(async () => {
    const ctx = await requirePermission(NEWS_P.newsManage);
    const locale = await getLocale();
    const parsed = updateArticleSchema.parse(input, { error: zodErrorMap(locale) });
    const result = await updateArticle(ctx.tenantId, parsed);
    revalidatePath("/news");
    revalidatePath("/news-management");
    return result;
  });
}

export async function deleteArticleAction(id: string): Promise<ActionResult<void>> {
  return runAction(async () => {
    const ctx = await requirePermission(NEWS_P.newsManage);
    const locale = await getLocale();
    deleteArticleSchema.parse({ id }, { error: zodErrorMap(locale) });
    await deleteArticle(ctx.tenantId, id);
    revalidatePath("/news");
    revalidatePath("/news-management");
  });
}
