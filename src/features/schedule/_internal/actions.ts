"use server";

import { revalidatePath } from "next/cache";
import { runAction, type ActionResult } from "@/shared/lib/result";
import { requirePermission, getDefaultTenantId } from "@/features/identity/server";
import { getLocale } from "@/shared/lib/i18n/server";
import { zodErrorMap } from "@/shared/lib/i18n/zod-locale";
import { SCHEDULE_P } from "../permissions";
import type { ClassScheduleDto } from "../index";
import { createScheduleSchema } from "./validations";
import { listCurrentSchedules, createScheduleItem, deleteScheduleItem } from "./services";

export async function getPublicSchedulesAction(): Promise<ActionResult<ClassScheduleDto[]>> {
  return runAction(async () => {
    const tenantId = await getDefaultTenantId();
    return listCurrentSchedules(tenantId);
  });
}

export async function getAdminSchedulesAction(): Promise<ActionResult<ClassScheduleDto[]>> {
  return runAction(async () => {
    const ctx = await requirePermission(SCHEDULE_P.scheduleRead);
    return listCurrentSchedules(ctx.tenantId);
  });
}

export async function createScheduleAction(input: unknown): Promise<ActionResult<ClassScheduleDto>> {
  return runAction(async () => {
    const ctx = await requirePermission(SCHEDULE_P.scheduleManage);
    const locale = await getLocale();
    const parsed = createScheduleSchema.parse(input, { error: zodErrorMap(locale) });
    const res = await createScheduleItem(ctx.tenantId, parsed);
    revalidatePath("/schedules");
    revalidatePath("/schedule-management");
    return res;
  });
}

export async function deleteScheduleAction(id: string): Promise<ActionResult<void>> {
  return runAction(async () => {
    const ctx = await requirePermission(SCHEDULE_P.scheduleManage);
    await deleteScheduleItem(ctx.tenantId, id);
    revalidatePath("/schedules");
    revalidatePath("/schedule-management");
  });
}
