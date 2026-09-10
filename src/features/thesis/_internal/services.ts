import { prisma } from "@/shared/lib/infra/prisma";
import type { Prisma } from "@/generated/prisma";
import type { ThesisDto } from "../index";
import type { CreateThesisInput } from "./validations";

export async function listPublishedTheses(tenantId: string, search?: string): Promise<ThesisDto[]> {
  const where: Prisma.ThesisWhereInput = {
    tenantId,
    status: "PUBLISHED",
    ...(search
      ? {
          OR: [
            { titleTh: { contains: search, mode: "insensitive" } },
            { authorName: { contains: search, mode: "insensitive" } },
            { keywords: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const list = await prisma.thesis.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return list.map((t) => ({
    id: t.id,
    authorName: t.authorName,
    titleTh: t.titleTh,
    titleEn: t.titleEn,
    advisorName: t.advisorName,
    coAdvisorName: t.coAdvisorName,
    status: t.status,
    abstractTh: t.abstractTh,
    abstractEn: t.abstractEn,
    keywords: t.keywords,
    similarityPercentage: t.similarityPercentage ? Number(t.similarityPercentage) : null,
    defenseDate: t.defenseDate?.toISOString() ?? null,
    documentUrl: t.documentUrl,
    newBodyOfKnowledge: t.newBodyOfKnowledge,
    yearGraduated: t.yearGraduated,
  }));
}

export async function listAdminTheses(tenantId: string): Promise<ThesisDto[]> {
  const list = await prisma.thesis.findMany({
    where: { tenantId },
    orderBy: { createdAt: "desc" },
  });

  return list.map((t) => ({
    id: t.id,
    authorName: t.authorName,
    titleTh: t.titleTh,
    titleEn: t.titleEn,
    advisorName: t.advisorName,
    coAdvisorName: t.coAdvisorName,
    status: t.status,
    abstractTh: t.abstractTh,
    abstractEn: t.abstractEn,
    keywords: t.keywords,
    similarityPercentage: t.similarityPercentage ? Number(t.similarityPercentage) : null,
    defenseDate: t.defenseDate?.toISOString() ?? null,
    documentUrl: t.documentUrl,
    newBodyOfKnowledge: t.newBodyOfKnowledge,
    yearGraduated: t.yearGraduated,
  }));
}

export async function createThesis(tenantId: string, input: CreateThesisInput): Promise<ThesisDto> {
  const student = await prisma.studentProfile.findFirstOrThrow({
    where: { tenantId, studentCode: input.studentCode },
  });

  const created = await prisma.thesis.create({
    data: {
      tenantId,
      studentId: student.id,
      authorName: input.authorName,
      titleTh: input.titleTh,
      titleEn: input.titleEn ?? null,
      advisorName: input.advisorName,
      coAdvisorName: input.coAdvisorName ?? null,
      status: input.status,
      abstractTh: input.abstractTh ?? null,
      abstractEn: input.abstractEn ?? null,
      keywords: input.keywords ?? null,
      similarityPercentage: input.similarityPercentage ?? null,
      newBodyOfKnowledge: input.newBodyOfKnowledge ?? null,
      documentUrl: input.documentUrl ?? null,
      yearGraduated: input.yearGraduated ?? null,
    },
  });

  return {
    id: created.id,
    authorName: created.authorName,
    titleTh: created.titleTh,
    titleEn: created.titleEn,
    advisorName: created.advisorName,
    coAdvisorName: created.coAdvisorName,
    status: created.status,
    abstractTh: created.abstractTh,
    abstractEn: created.abstractEn,
    keywords: created.keywords,
    similarityPercentage: created.similarityPercentage ? Number(created.similarityPercentage) : null,
    defenseDate: created.defenseDate?.toISOString() ?? null,
    documentUrl: created.documentUrl,
    newBodyOfKnowledge: created.newBodyOfKnowledge,
    yearGraduated: created.yearGraduated,
  };
}

export async function updateThesis(
  tenantId: string,
  input: {
    id: string;
    authorName?: string;
    titleTh?: string;
    titleEn?: string | null;
    advisorName?: string;
    coAdvisorName?: string | null;
    status?: "TOPIC_PROPOSED" | "PROPOSAL_DEFENSE" | "IN_PROGRESS" | "FINAL_DEFENSE" | "COMPLETED" | "PUBLISHED";
    abstractTh?: string | null;
    abstractEn?: string | null;
    keywords?: string | null;
    similarityPercentage?: number | null;
    newBodyOfKnowledge?: string | null;
    documentUrl?: string | null;
    yearGraduated?: number | null;
  }
): Promise<ThesisDto> {
  const updated = await prisma.thesis.update({
    where: { id: input.id, tenantId },
    data: {
      authorName: input.authorName,
      titleTh: input.titleTh,
      titleEn: input.titleEn,
      advisorName: input.advisorName,
      coAdvisorName: input.coAdvisorName,
      status: input.status,
      abstractTh: input.abstractTh,
      abstractEn: input.abstractEn,
      keywords: input.keywords,
      similarityPercentage: input.similarityPercentage,
      newBodyOfKnowledge: input.newBodyOfKnowledge,
      documentUrl: input.documentUrl,
      yearGraduated: input.yearGraduated,
    },
  });

  return {
    id: updated.id,
    authorName: updated.authorName,
    titleTh: updated.titleTh,
    titleEn: updated.titleEn,
    advisorName: updated.advisorName,
    coAdvisorName: updated.coAdvisorName,
    status: updated.status,
    abstractTh: updated.abstractTh,
    abstractEn: updated.abstractEn,
    keywords: updated.keywords,
    similarityPercentage: updated.similarityPercentage ? Number(updated.similarityPercentage) : null,
    defenseDate: updated.defenseDate?.toISOString() ?? null,
    documentUrl: updated.documentUrl,
    newBodyOfKnowledge: updated.newBodyOfKnowledge,
    yearGraduated: updated.yearGraduated,
  };
}

export async function deleteThesis(tenantId: string, id: string): Promise<void> {
  await prisma.thesis.deleteMany({
    where: { id, tenantId },
  });
}

