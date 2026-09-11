"use server";

import { revalidatePath } from "next/cache";
import { runAction, type ActionResult } from "@/shared/lib/result";
import { requirePermission } from "@/features/identity/server";
import { getLocale } from "@/shared/lib/i18n/server";
import { zodErrorMap } from "@/shared/lib/i18n/zod-locale";
import { FACULTY_P } from "../permissions";
import type { FacultyMemberDto } from "../index";
import { facultyMemberSchema, updateFacultyMemberSchema } from "./validations";
import {
  listFacultyMembers,
  createFacultyMember,
  updateFacultyMember,
  deleteFacultyMember,
} from "./services";

export async function getFacultyMembersAction(): Promise<ActionResult<FacultyMemberDto[]>> {
  return runAction(async () => {
    const ctx = await requirePermission(FACULTY_P.facultyRead);
    return listFacultyMembers(ctx.tenantId);
  });
}

export async function createFacultyMemberAction(input: unknown): Promise<ActionResult<FacultyMemberDto>> {
  return runAction(async () => {
    const ctx = await requirePermission(FACULTY_P.facultyManage);
    const locale = await getLocale();
    const parsed = facultyMemberSchema.parse(input, { error: zodErrorMap(locale) });
    const result = await createFacultyMember(ctx.tenantId, parsed);
    revalidatePath("/faculty");
    revalidatePath("/faculty-management");
    return result;
  });
}

export async function updateFacultyMemberAction(input: unknown): Promise<ActionResult<FacultyMemberDto>> {
  return runAction(async () => {
    const ctx = await requirePermission(FACULTY_P.facultyManage);
    const locale = await getLocale();
    const parsed = updateFacultyMemberSchema.parse(input, { error: zodErrorMap(locale) });
    const result = await updateFacultyMember(ctx.tenantId, parsed);
    revalidatePath("/faculty");
    revalidatePath("/faculty-management");
    return result;
  });
}

export async function deleteFacultyMemberAction(id: string): Promise<ActionResult<void>> {
  return runAction(async () => {
    const ctx = await requirePermission(FACULTY_P.facultyManage);
    await deleteFacultyMember(ctx.tenantId, id);
    revalidatePath("/faculty");
    revalidatePath("/faculty-management");
  });
}

