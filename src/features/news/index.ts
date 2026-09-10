export interface NewsArticleDto {
  id: string;
  categoryId?: string | null;
  categoryName?: string | null;
  titleTh: string;
  titleEn?: string | null;
  slug: string;
  summaryTh?: string | null;
  summaryEn?: string | null;
  contentTh: string;
  contentEn?: string | null;
  coverImageUrl?: string | null;
  isPinned: boolean;
  isPublished: boolean;
  publishedAt?: string | null;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface NewsCategoryDto {
  id: string;
  nameTh: string;
  nameEn: string;
  slug: string;
  articleCount?: number;
}
