"use server";

import { revalidatePath } from "next/cache";
import { runAction, type ActionResult } from "@/shared/lib/result";
import { requirePermission } from "@/features/identity/server";
import { getLocale } from "@/shared/lib/i18n/server";
import { zodErrorMap } from "@/shared/lib/i18n/zod-locale";
import { CURRICULUM_P } from "../permissions";
import type { CurriculumDto, CourseDto } from "../index";
import { courseSchema, updateCourseSchema } from "./validations";
import { getActiveCurriculum, createCourse, updateCourse, deleteCourse } from "./services";

export async function getCurriculumAction(): Promise<ActionResult<CurriculumDto | null>> {
  return runAction(async () => {
    const ctx = await requirePermission(CURRICULUM_P.curriculumRead);
    return getActiveCurriculum(ctx.tenantId);
  });
}

export async function createCourseAction(
  curriculumId: string,
  input: unknown
): Promise<ActionResult<CourseDto>> {
  return runAction(async () => {
    const ctx = await requirePermission(CURRICULUM_P.curriculumManage);
    const locale = await getLocale();
    const parsed = courseSchema.parse(input, { error: zodErrorMap(locale) });
    const result = await createCourse(ctx.tenantId, curriculumId, parsed);
    revalidatePath("/curriculum");
    revalidatePath("/curriculum-management");
    return result;
  });
}

export async function updateCourseAction(input: unknown): Promise<ActionResult<CourseDto>> {
  return runAction(async () => {
    const ctx = await requirePermission(CURRICULUM_P.curriculumManage);
    const locale = await getLocale();
    const parsed = updateCourseSchema.parse(input, { error: zodErrorMap(locale) });
    const result = await updateCourse(ctx.tenantId, parsed);
    revalidatePath("/curriculum");
    revalidatePath("/curriculum-management");
    return result;
  });
}

export async function deleteCourseAction(id: string): Promise<ActionResult<void>> {
  return runAction(async () => {
    const ctx = await requirePermission(CURRICULUM_P.curriculumManage);
    await deleteCourse(ctx.tenantId, id);
    revalidatePath("/curriculum");
    revalidatePath("/curriculum-management");
  });
}

