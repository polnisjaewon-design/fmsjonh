"use server";

import { revalidatePath } from "next/cache";
import { runAction, type ActionResult } from "@/shared/lib/result";
import { requirePermission } from "@/features/identity/server";
import { ADMISSION_P } from "../permissions";
import type { ApplicationDto } from "../index";
import { createApplicationSchema, updateApplicationStatusSchema } from "./validations";
import { submitApplication, updateApplicationStatus, listAdminApplications } from "./services";
import { getDefaultTenantId } from "@/features/news/server";

export async function submitApplicationPublicAction(input: unknown): Promise<ActionResult<ApplicationDto>> {
  return runAction(async () => {
    const tenantId = await getDefaultTenantId();
    const parsed = createApplicationSchema.parse(input);
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
    const parsed = updateApplicationStatusSchema.parse(input);
    await updateApplicationStatus(ctx.tenantId, parsed);
    revalidatePath("/admission-management");
  });
}
