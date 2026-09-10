"use server";

import { revalidatePath } from "next/cache";
import { runAction, type ActionResult } from "@/shared/lib/result";
import { requirePermission } from "@/features/identity/server";
import { THESIS_P } from "../permissions";
import type { ThesisDto } from "../index";
import { createThesisSchema, updateThesisSchema } from "./validations";
import { listAdminTheses, createThesis, updateThesis, deleteThesis } from "./services";

export async function getAdminThesesAction(): Promise<ActionResult<ThesisDto[]>> {
  return runAction(async () => {
    const ctx = await requirePermission(THESIS_P.thesisRead);
    return listAdminTheses(ctx.tenantId);
  });
}

export async function createThesisAction(input: unknown): Promise<ActionResult<ThesisDto>> {
  return runAction(async () => {
    const ctx = await requirePermission(THESIS_P.thesisManage);
    const parsed = createThesisSchema.parse(input);
    const res = await createThesis(ctx.tenantId, parsed);
    revalidatePath("/theses");
    revalidatePath("/thesis-management");
    return res;
  });
}

export async function updateThesisAction(input: unknown): Promise<ActionResult<ThesisDto>> {
  return runAction(async () => {
    const ctx = await requirePermission(THESIS_P.thesisManage);
    const parsed = updateThesisSchema.parse(input);
    const res = await updateThesis(ctx.tenantId, parsed);
    revalidatePath("/theses");
    revalidatePath("/thesis-management");
    return res;
  });
}

export async function deleteThesisAction(id: string): Promise<ActionResult<void>> {
  return runAction(async () => {
    const ctx = await requirePermission(THESIS_P.thesisManage);
    await deleteThesis(ctx.tenantId, id);
    revalidatePath("/theses");
    revalidatePath("/thesis-management");
  });
}

