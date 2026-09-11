"use server";

import { revalidatePath } from "next/cache";
import { runAction, type ActionResult } from "@/shared/lib/result";
import { requirePermission } from "@/features/identity/server";
import { getLocale } from "@/shared/lib/i18n/server";
import { zodErrorMap } from "@/shared/lib/i18n/zod-locale";
import { STUDENT_P } from "../permissions";
import type { StudentProfileDto } from "../index";
import { studentProfileSchema, updateStudentProfileSchema } from "./validations";
import { listStudents, createStudent, updateStudent, deleteStudent } from "./services";

export async function getStudentsAction(): Promise<ActionResult<StudentProfileDto[]>> {
  return runAction(async () => {
    const ctx = await requirePermission(STUDENT_P.studentRead);
    return listStudents(ctx.tenantId);
  });
}

export async function createStudentAction(input: unknown): Promise<ActionResult<StudentProfileDto>> {
  return runAction(async () => {
    const ctx = await requirePermission(STUDENT_P.studentManage);
    const locale = await getLocale();
    const parsed = studentProfileSchema.parse(input, { error: zodErrorMap(locale) });
    const result = await createStudent(ctx.tenantId, parsed);
    revalidatePath("/student-management");
    return result;
  });
}

export async function updateStudentAction(input: unknown): Promise<ActionResult<StudentProfileDto>> {
  return runAction(async () => {
    const ctx = await requirePermission(STUDENT_P.studentManage);
    const locale = await getLocale();
    const parsed = updateStudentProfileSchema.parse(input, { error: zodErrorMap(locale) });
    const result = await updateStudent(ctx.tenantId, parsed);
    revalidatePath("/student-management");
    return result;
  });
}

export async function deleteStudentAction(id: string): Promise<ActionResult<void>> {
  return runAction(async () => {
    const ctx = await requirePermission(STUDENT_P.studentManage);
    await deleteStudent(ctx.tenantId, id, ctx.userId);
    revalidatePath("/student-management");
  });
}

