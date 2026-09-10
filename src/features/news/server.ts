import { prisma } from "@/shared/lib/infra/prisma";
import { listPublishedArticles, getArticleBySlug, listNewsCategories, listAllAdminArticles } from "./_internal/services";

export { listPublishedArticles, getArticleBySlug, listNewsCategories, listAllAdminArticles };

export async function getDefaultTenantId(): Promise<string> {
  const mcuTenant = await prisma.tenant.findFirst({
    where: { code: "MCU-VIPASSANA", isActive: true },
    select: { id: true },
  });
  if (mcuTenant) return mcuTenant.id;

  const tenant = await prisma.tenant.findFirst({
    where: { isActive: true },
    select: { id: true },
  });
  return tenant?.id ?? "";
}
