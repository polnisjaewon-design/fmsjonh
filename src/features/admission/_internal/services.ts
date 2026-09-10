import { prisma } from "@/shared/lib/infra/prisma";
import type { AdmissionRoundDto, ApplicationDto } from "../index";
import type { CreateApplicationInput, UpdateApplicationStatusInput } from "./validations";

function formatApplicantFullName(a: {
  titleTh: string;
  firstNameTh: string;
  lastNameTh?: string | null;
  monasticName?: string | null;
}): string {
  const parts: string[] = [a.titleTh + a.firstNameTh];
  if (a.monasticName) parts.push(`(${a.monasticName})`);
  if (a.lastNameTh) parts.push(a.lastNameTh);
  return parts.join(" ");
}

export async function getActiveAdmissionRound(tenantId: string): Promise<AdmissionRoundDto | null> {
  const round = await prisma.admissionRound.findFirst({
    where: { tenantId, isActive: true },
    orderBy: { createdAt: "desc" },
  });
  if (!round) return null;

  return {
    id: round.id,
    year: round.year,
    term: round.term,
    titleTh: round.titleTh,
    titleEn: round.titleEn,
    startDate: round.startDate.toISOString(),
    endDate: round.endDate.toISOString(),
    feeAmount: Number(round.feeAmount),
    isActive: round.isActive,
  };
}

export async function listAdminApplications(tenantId: string): Promise<ApplicationDto[]> {
  const list = await prisma.application.findMany({
    where: { tenantId },
    orderBy: { createdAt: "desc" },
  });

  return list.map((a) => ({
    id: a.id,
    roundId: a.roundId,
    applicationNo: a.applicationNo,
    applicantType: a.applicantType,
    titleTh: a.titleTh,
    firstNameTh: a.firstNameTh,
    lastNameTh: a.lastNameTh,
    monasticName: a.monasticName,
    fullNameTh: formatApplicantFullName(a),
    templeName: a.templeName,
    phone: a.phone,
    email: a.email,
    educationBackground: a.educationBackground,
    paymentSlipUrl: a.paymentSlipUrl,
    status: a.status,
    createdAt: a.createdAt.toISOString(),
  }));
}

export async function submitApplication(tenantId: string, input: CreateApplicationInput): Promise<ApplicationDto> {
  const count = await prisma.application.count({ where: { tenantId } });
  const applicationNo = `VIP-${new Date().getFullYear() + 543}-${String(count + 1).padStart(4, "0")}`;

  const created = await prisma.application.create({
    data: {
      tenantId,
      roundId: input.roundId,
      applicationNo,
      applicantType: input.applicantType,
      titleTh: input.titleTh,
      firstNameTh: input.firstNameTh,
      lastNameTh: input.lastNameTh ?? null,
      monasticName: input.monasticName ?? null,
      monasticRank: input.monasticRank ?? null,
      templeName: input.templeName ?? null,
      idCardOrPassport: input.idCardOrPassport,
      phone: input.phone,
      email: input.email,
      educationBackground: input.educationBackground ?? null,
      paymentSlipUrl: input.paymentSlipUrl ?? null,
      status: "SUBMITTED",
    },
  });

  return {
    id: created.id,
    roundId: created.roundId,
    applicationNo: created.applicationNo,
    applicantType: created.applicantType,
    titleTh: created.titleTh,
    firstNameTh: created.firstNameTh,
    lastNameTh: created.lastNameTh,
    monasticName: created.monasticName,
    fullNameTh: formatApplicantFullName(created),
    templeName: created.templeName,
    phone: created.phone,
    email: created.email,
    educationBackground: created.educationBackground,
    paymentSlipUrl: created.paymentSlipUrl,
    status: created.status,
    createdAt: created.createdAt.toISOString(),
  };
}

export async function updateApplicationStatus(tenantId: string, input: UpdateApplicationStatusInput): Promise<void> {
  await prisma.application.updateMany({
    where: { id: input.id, tenantId },
    data: {
      status: input.status,
      reviewerNote: input.reviewerNote ?? null,
    },
  });
}
