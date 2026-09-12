"use server";

import { revalidatePath } from "next/cache";
import { runAction, type ActionResult } from "@/shared/lib/result";
import { requirePermission } from "@/features/identity/server";
import { getLocale } from "@/shared/lib/i18n/server";
import { zodErrorMap } from "@/shared/lib/i18n/zod-locale";
import { DEPARTMENT_P } from "./permissions";
import type { DepartmentSummaryDto, DepartmentDto } from "./index";
import {
  departmentSchema,
  updateDepartmentSchema,
  assignCurriculumsSchema,
} from "./_internal/validations";
import {
  listDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  assignCurriculumsToDepartment,
} from "./_internal/services";

export async function getDepartmentsAction(): Promise<ActionResult<DepartmentSummaryDto[]>> {
  return runAction(async () => {
    const ctx = await requirePermission(DEPARTMENT_P.departmentRead);
    return listDepartments(ctx.tenantId);
  });
}

export async function getDepartmentDetailAction(
  id: string
): Promise<ActionResult<DepartmentDto | null>> {
  return runAction(async () => {
    const ctx = await requirePermission(DEPARTMENT_P.departmentRead);
    return getDepartmentById(ctx.tenantId, id);
  });
}

export async function createDepartmentAction(
  input: unknown
): Promise<ActionResult<DepartmentSummaryDto>> {
  return runAction(async () => {
    const ctx = await requirePermission(DEPARTMENT_P.departmentManage);
    const locale = await getLocale();
    const parsed = departmentSchema.parse(input, { error: zodErrorMap(locale) });
    const result = await createDepartment(ctx.tenantId, parsed);
    revalidatePath("/department-management");
    revalidatePath("/curriculum-management");
    revalidatePath("/curriculum");
    return result;
  });
}

export async function updateDepartmentAction(
  input: unknown
): Promise<ActionResult<DepartmentSummaryDto>> {
  return runAction(async () => {
    const ctx = await requirePermission(DEPARTMENT_P.departmentManage);
    const locale = await getLocale();
    const parsed = updateDepartmentSchema.parse(input, { error: zodErrorMap(locale) });
    const result = await updateDepartment(ctx.tenantId, parsed);
    revalidatePath("/department-management");
    revalidatePath("/curriculum-management");
    revalidatePath("/curriculum");
    return result;
  });
}

export async function deleteDepartmentAction(id: string): Promise<ActionResult<void>> {
  return runAction(async () => {
    const ctx = await requirePermission(DEPARTMENT_P.departmentManage);
    await deleteDepartment(ctx.tenantId, id);
    revalidatePath("/department-management");
    revalidatePath("/curriculum-management");
    revalidatePath("/curriculum");
  });
}

export async function assignCurriculumsAction(
  input: unknown
): Promise<ActionResult<void>> {
  return runAction(async () => {
    const ctx = await requirePermission(DEPARTMENT_P.departmentManage);
    const locale = await getLocale();
    const parsed = assignCurriculumsSchema.parse(input, { error: zodErrorMap(locale) });
    await assignCurriculumsToDepartment(ctx.tenantId, parsed.departmentId, parsed.curriculumIds);
    revalidatePath("/department-management");
    revalidatePath("/curriculum-management");
    revalidatePath("/curriculum");
  });
}
