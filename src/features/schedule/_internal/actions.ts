"use server";

import { revalidatePath } from "next/cache";
import { runAction, type ActionResult } from "@/shared/lib/result";
import { requirePermission } from "@/features/identity/server";
import { SCHEDULE_P } from "../permissions";
import type { ClassScheduleDto } from "../index";
import { createScheduleSchema } from "./validations";
import { listCurrentSchedules, createScheduleItem, deleteScheduleItem } from "./services";
import { getDefaultTenantId } from "@/features/news/server";

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
    const parsed = createScheduleSchema.parse(input);
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
