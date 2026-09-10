import { prisma } from "@/shared/lib/infra/prisma";
import type { FacultyMemberDto } from "../index";

function formatFullName(m: {
  titleTh: string;
  academicRank?: string | null;
  firstNameTh: string;
  lastNameTh?: string | null;
  monasticName?: string | null;
}): string {
  const parts: string[] = [];
  if (m.academicRank) parts.push(m.academicRank);
  parts.push(m.titleTh + m.firstNameTh);
  if (m.monasticName) parts.push(`(${m.monasticName})`);
  if (m.lastNameTh) parts.push(m.lastNameTh);
  return parts.join(" ");
}

export async function listFacultyMembers(tenantId: string): Promise<FacultyMemberDto[]> {
  const members = await prisma.facultyMember.findMany({
    where: { tenantId, isActive: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  return members.map((m) => ({
    id: m.id,
    academicRank: m.academicRank,
    monasticRank: m.monasticRank,
    titleTh: m.titleTh,
    firstNameTh: m.firstNameTh,
    lastNameTh: m.lastNameTh,
    monasticName: m.monasticName,
    fullNameTh: formatFullName(m),
    titleEn: m.titleEn,
    firstNameEn: m.firstNameEn,
    lastNameEn: m.lastNameEn,
    templeName: m.templeName,
    positionTh: m.positionTh,
    positionEn: m.positionEn,
    isVipassanaMaster: m.isVipassanaMaster,
    isExecutive: m.isExecutive,
    expertise: m.expertise,
    educationHistory: m.educationHistory,
    email: m.email,
    phone: m.phone,
    avatarUrl: m.avatarUrl,
    sortOrder: m.sortOrder,
  }));
}

export async function listVipassanaMasters(tenantId: string): Promise<FacultyMemberDto[]> {
  const members = await prisma.facultyMember.findMany({
    where: { tenantId, isActive: true, isVipassanaMaster: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  return members.map((m) => ({
    id: m.id,
    academicRank: m.academicRank,
    monasticRank: m.monasticRank,
    titleTh: m.titleTh,
    firstNameTh: m.firstNameTh,
    lastNameTh: m.lastNameTh,
    monasticName: m.monasticName,
    fullNameTh: formatFullName(m),
    titleEn: m.titleEn,
    firstNameEn: m.firstNameEn,
    lastNameEn: m.lastNameEn,
    templeName: m.templeName,
    positionTh: m.positionTh,
    positionEn: m.positionEn,
    isVipassanaMaster: m.isVipassanaMaster,
    isExecutive: m.isExecutive,
    expertise: m.expertise,
    educationHistory: m.educationHistory,
    email: m.email,
    phone: m.phone,
    avatarUrl: m.avatarUrl,
    sortOrder: m.sortOrder,
  }));
}

export async function createFacultyMember(
  tenantId: string,
  input: {
    titleTh: string;
    firstNameTh: string;
    lastNameTh?: string | null;
    monasticName?: string | null;
    monasticRank?: string | null;
    academicRank?: string | null;
    templeName?: string | null;
    positionTh: string;
    positionEn?: string | null;
    isVipassanaMaster?: boolean;
    isExecutive?: boolean;
    expertise?: string | null;
    educationHistory?: string | null;
    email?: string | null;
    phone?: string | null;
    avatarUrl?: string | null;
    sortOrder?: number;
  }
): Promise<FacultyMemberDto> {
  const created = await prisma.facultyMember.create({
    data: {
      tenantId,
      titleTh: input.titleTh,
      firstNameTh: input.firstNameTh,
      lastNameTh: input.lastNameTh ?? null,
      monasticName: input.monasticName ?? null,
      monasticRank: input.monasticRank ?? null,
      academicRank: input.academicRank ?? null,
      templeName: input.templeName ?? null,
      positionTh: input.positionTh,
      positionEn: input.positionEn ?? null,
      isVipassanaMaster: input.isVipassanaMaster ?? false,
      isExecutive: input.isExecutive ?? false,
      expertise: input.expertise ?? null,
      educationHistory: input.educationHistory ?? null,
      email: input.email ?? null,
      phone: input.phone ?? null,
      avatarUrl: input.avatarUrl ?? null,
      sortOrder: input.sortOrder ?? 0,
    },
  });

  return {
    id: created.id,
    academicRank: created.academicRank,
    monasticRank: created.monasticRank,
    titleTh: created.titleTh,
    firstNameTh: created.firstNameTh,
    lastNameTh: created.lastNameTh,
    monasticName: created.monasticName,
    fullNameTh: formatFullName(created),
    titleEn: created.titleEn,
    firstNameEn: created.firstNameEn,
    lastNameEn: created.lastNameEn,
    templeName: created.templeName,
    positionTh: created.positionTh,
    positionEn: created.positionEn,
    isVipassanaMaster: created.isVipassanaMaster,
    isExecutive: created.isExecutive,
    expertise: created.expertise,
    educationHistory: created.educationHistory,
    email: created.email,
    phone: created.phone,
    avatarUrl: created.avatarUrl,
    sortOrder: created.sortOrder,
  };
}

export async function updateFacultyMember(
  tenantId: string,
  input: {
    id: string;
    titleTh?: string;
    firstNameTh?: string;
    lastNameTh?: string | null;
    monasticName?: string | null;
    monasticRank?: string | null;
    academicRank?: string | null;
    templeName?: string | null;
    positionTh?: string;
    positionEn?: string | null;
    isVipassanaMaster?: boolean;
    isExecutive?: boolean;
    expertise?: string | null;
    educationHistory?: string | null;
    email?: string | null;
    phone?: string | null;
    avatarUrl?: string | null;
    sortOrder?: number;
  }
): Promise<FacultyMemberDto> {
  const updated = await prisma.facultyMember.update({
    where: { id: input.id, tenantId },
    data: {
      titleTh: input.titleTh,
      firstNameTh: input.firstNameTh,
      lastNameTh: input.lastNameTh,
      monasticName: input.monasticName,
      monasticRank: input.monasticRank,
      academicRank: input.academicRank,
      templeName: input.templeName,
      positionTh: input.positionTh,
      positionEn: input.positionEn,
      isVipassanaMaster: input.isVipassanaMaster,
      isExecutive: input.isExecutive,
      expertise: input.expertise,
      educationHistory: input.educationHistory,
      email: input.email,
      phone: input.phone,
      avatarUrl: input.avatarUrl,
      sortOrder: input.sortOrder,
    },
  });

  return {
    id: updated.id,
    academicRank: updated.academicRank,
    monasticRank: updated.monasticRank,
    titleTh: updated.titleTh,
    firstNameTh: updated.firstNameTh,
    lastNameTh: updated.lastNameTh,
    monasticName: updated.monasticName,
    fullNameTh: formatFullName(updated),
    titleEn: updated.titleEn,
    firstNameEn: updated.firstNameEn,
    lastNameEn: updated.lastNameEn,
    templeName: updated.templeName,
    positionTh: updated.positionTh,
    positionEn: updated.positionEn,
    isVipassanaMaster: updated.isVipassanaMaster,
    isExecutive: updated.isExecutive,
    expertise: updated.expertise,
    educationHistory: updated.educationHistory,
    email: updated.email,
    phone: updated.phone,
    avatarUrl: updated.avatarUrl,
    sortOrder: updated.sortOrder,
  };
}

export async function deleteFacultyMember(tenantId: string, id: string): Promise<void> {
  await prisma.facultyMember.deleteMany({
    where: { id, tenantId },
  });
}

