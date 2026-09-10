import { prisma } from "@/shared/lib/infra/prisma";
import type { StudentPetitionDto, DocumentTemplateDto } from "../index";
import type { CreatePetitionInput, ReviewPetitionInput } from "./validations";

export async function listDocumentTemplates(tenantId: string): Promise<DocumentTemplateDto[]> {
  const list = await prisma.documentTemplate.findMany({
    where: { tenantId, isActive: true },
    orderBy: { createdAt: "asc" },
  });

  return list.map((t) => ({
    id: t.id,
    code: t.code,
    titleTh: t.titleTh,
    description: t.description,
  }));
}

export async function listAdminPetitions(tenantId: string): Promise<StudentPetitionDto[]> {
  const list = await prisma.studentPetition.findMany({
    where: { tenantId },
    include: { student: true, template: true },
    orderBy: { createdAt: "desc" },
  });

  return list.map((p) => ({
    id: p.id,
    petitionNo: p.petitionNo,
    studentCode: p.student.studentCode,
    studentName: `${p.student.titleTh}${p.student.firstNameTh} ${p.student.lastNameTh ?? ""}`,
    templateTitle: p.template.titleTh,
    title: p.title,
    reason: p.reason,
    status: p.status,
    currentStep: p.currentStep,
    approverNote: p.approverNote,
    createdAt: p.createdAt.toISOString(),
  }));
}

export async function submitPetition(tenantId: string, input: CreatePetitionInput): Promise<StudentPetitionDto> {
  const student = await prisma.studentProfile.findFirstOrThrow({
    where: { tenantId, studentCode: input.studentCode },
  });

  const count = await prisma.studentPetition.count({ where: { tenantId } });
  const petitionNo = `REQ-${new Date().getFullYear() + 543}-${String(count + 1).padStart(4, "0")}`;

  const created = await prisma.studentPetition.create({
    data: {
      tenantId,
      studentId: student.id,
      templateId: input.templateId,
      petitionNo,
      title: input.title,
      reason: input.reason,
      status: "PENDING",
      currentStep: 1,
    },
    include: { student: true, template: true },
  });

  return {
    id: created.id,
    petitionNo: created.petitionNo,
    studentCode: created.student.studentCode,
    studentName: `${created.student.titleTh}${created.student.firstNameTh} ${created.student.lastNameTh ?? ""}`,
    templateTitle: created.template.titleTh,
    title: created.title,
    reason: created.reason,
    status: created.status,
    currentStep: created.currentStep,
    approverNote: created.approverNote,
    createdAt: created.createdAt.toISOString(),
  };
}

export async function reviewPetition(tenantId: string, input: ReviewPetitionInput): Promise<void> {
  await prisma.studentPetition.updateMany({
    where: { id: input.id, tenantId },
    data: {
      status: input.status,
      approverNote: input.approverNote ?? null,
    },
  });
}
