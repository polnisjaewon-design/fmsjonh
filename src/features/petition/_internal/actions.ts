"use server";

import { revalidatePath } from "next/cache";
import { runAction, type ActionResult } from "@/shared/lib/result";
import { requirePermission } from "@/features/identity/server";
import { PETITION_P } from "../permissions";
import type { StudentPetitionDto, DocumentTemplateDto } from "../index";
import { createPetitionSchema, reviewPetitionSchema } from "./validations";
import { listAdminPetitions, listDocumentTemplates, submitPetition, reviewPetition } from "./services";
import { getDefaultTenantId } from "@/features/news/server";

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
    const tenantId = await getDefaultTenantId();
    const parsed = createPetitionSchema.parse(input);
    const res = await submitPetition(tenantId, parsed);
    revalidatePath("/petitions");
    revalidatePath("/petition-management");
    return res;
  });
}

export async function reviewPetitionAction(input: unknown): Promise<ActionResult<void>> {
  return runAction(async () => {
    const ctx = await requirePermission(PETITION_P.petitionApprove);
    const parsed = reviewPetitionSchema.parse(input);
    await reviewPetition(ctx.tenantId, parsed);
    revalidatePath("/petition-management");
  });
}
