import type { PermissionDef } from "@/shared/lib/permission-def";

export const NEWS_P = {
  newsRead: "news:read",
  newsManage: "news:manage",
} as const;

export const NEWS_PERMISSIONS: readonly PermissionDef[] = [
  { code: NEWS_P.newsRead, module: "news", action: "read", description: "อ่านข่าวสารประชาสัมพันธ์" },
  { code: NEWS_P.newsManage, module: "news", action: "manage", description: "สร้าง แก้ไข และลบข่าวสารประชาสัมพันธ์" },
];
