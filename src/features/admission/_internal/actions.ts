"use server";

import { revalidatePath } from "next/cache";
import { runAction, type ActionResult } from "@/shared/lib/result";
import { requirePermission, getDefaultTenantId } from "@/features/identity/server";
import { getLocale } from "@/shared/lib/i18n/server";
import { zodErrorMap } from "@/shared/lib/i18n/zod-locale";
import { ADMISSION_P } from "../permissions";
import type { ApplicationDto } from "../index";
import { createApplicationSchema, updateApplicationStatusSchema } from "./validations";
import { submitApplication, updateApplicationStatus, listAdminApplications } from "./services";

export async function submitApplicationPublicAction(input: unknown): Promise<ActionResult<ApplicationDto>> {
  return runAction(async () => {
    const locale = await getLocale();
    const tenantId = await getDefaultTenantId();
    const parsed = createApplicationSchema.parse(input, { error: zodErrorMap(locale) });
    const result = await submitApplication(tenantId, parsed);
    revalidatePath("/admissions");
    revalidatePath("/admission-management");
    return result;
  });
}

export async function getAdminApplicationsAction(): Promise<ActionResult<ApplicationDto[]>> {
  return runAction(async () => {
    const ctx = await requirePermission(ADMISSION_P.admissionRead);
    return listAdminApplications(ctx.tenantId);
  });
}

export async function updateApplicationStatusAction(input: unknown): Promise<ActionResult<void>> {
  return runAction(async () => {
    const ctx = await requirePermission(ADMISSION_P.admissionManage);
    const locale = await getLocale();
    const parsed = updateApplicationStatusSchema.parse(input, { error: zodErrorMap(locale) });
    await updateApplicationStatus(ctx.tenantId, parsed, ctx.userId);
    revalidatePath("/admission-management");
  });
}
