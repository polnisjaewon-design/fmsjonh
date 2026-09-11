"use server";

import { revalidatePath } from "next/cache";
import { runAction, type ActionResult } from "@/shared/lib/result";
import { requirePermission, getDefaultTenantId } from "@/features/identity/server";
import { getLocale } from "@/shared/lib/i18n/server";
import { zodErrorMap } from "@/shared/lib/i18n/zod-locale";
import { PETITION_P } from "../permissions";
import type { StudentPetitionDto, DocumentTemplateDto } from "../index";
import { createPetitionSchema, reviewPetitionSchema } from "./validations";
import { listAdminPetitions, listDocumentTemplates, submitPetition, reviewPetition } from "./services";

export async function getDocumentTemplatesAction(): Promise<ActionResult<DocumentTemplateDto[]>> {
  return runAction(async () => {
    const tenantId = await getDefaultTenantId();
    return listDocumentTemplates(tenantId);
  });
}

export async function getAdminPetitionsAction(): Promise<ActionResult<StudentPetitionDto[]>> {
  return runAction(async () => {
    const ctx = await requirePermission(PETITION_P.petitionRead);
    return listAdminPetitions(ctx.tenantId);
  });
}

export async function submitPetitionPublicAction(input: unknown): Promise<ActionResult<StudentPetitionDto>> {
  return runAction(async () => {
    const locale = await getLocale();
    const tenantId = await getDefaultTenantId();
    const parsed = createPetitionSchema.parse(input, { error: zodErrorMap(locale) });
    const res = await submitPetition(tenantId, parsed);
    revalidatePath("/petitions");
    revalidatePath("/petition-management");
    return res;
  });
}

export async function reviewPetitionAction(input: unknown): Promise<ActionResult<void>> {
  return runAction(async () => {
    const ctx = await requirePermission(PETITION_P.petitionApprove);
    const locale = await getLocale();
    const parsed = reviewPetitionSchema.parse(input, { error: zodErrorMap(locale) });
    await reviewPetition(ctx.tenantId, parsed, ctx.userId);
    revalidatePath("/petition-management");
  });
}
