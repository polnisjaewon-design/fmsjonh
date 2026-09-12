import { z } from "zod";

export const createArticleSchema = z.object({
  titleTh: z.string().min(1, "กรุณาระบุหัวข้อข่าวภาษาไทย").max(255),
  titleEn: z.string().max(255).optional().nullable(),
  categoryId: z.string().uuid().optional().nullable(),
  summaryTh: z.string().optional().nullable(),
  summaryEn: z.string().optional().nullable(),
  contentTh: z.string().min(1, "กรุณาระบุเนื้อหาข่าว"),
  contentEn: z.string().optional().nullable(),
  coverImageUrl: z.string().max(500).optional().nullable(),
  isPinned: z.boolean().default(false),
  isPublished: z.boolean().default(true),
});

export const updateArticleSchema = createArticleSchema.partial().extend({
  id: z.string().uuid(),
});

export const deleteArticleSchema = z.object({
  id: z.string().uuid(),
});

export type CreateArticleInput = z.infer<typeof createArticleSchema>;
export type UpdateArticleInput = z.infer<typeof updateArticleSchema>;

export const translateNewsSchema = z.object({
  titleTh: z.string().trim().min(1, "news.titleThRequired"),
  summaryTh: z.string().optional().nullable(),
  contentTh: z.string().trim().min(1, "news.contentThRequired"),
});
export type TranslateNewsInput = z.infer<typeof translateNewsSchema>;

export interface TranslatedNewsResult {
  titleEn: string;
  summaryEn: string;
  contentEn: string;
}
