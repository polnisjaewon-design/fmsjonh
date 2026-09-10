import { prisma } from "@/shared/lib/infra/prisma";
import type { StudentProfileDto } from "../index";
import type { StudentProfileInput } from "./validations";

function formatStudentFullName(s: {
  titleTh: string;
  firstNameTh: string;
  lastNameTh?: string | null;
  monasticName?: string | null;
}): string {
  const parts: string[] = [s.titleTh + s.firstNameTh];
  if (s.monasticName) parts.push(`(${s.monasticName})`);
  if (s.lastNameTh) parts.push(s.lastNameTh);
  return parts.join(" ");
}

export async function listStudents(tenantId: string): Promise<StudentProfileDto[]> {
  const students = await prisma.studentProfile.findMany({
    where: { tenantId },
    orderBy: [{ batchYear: "desc" }, { studentCode: "asc" }],
  });

  return students.map((s) => ({
    id: s.id,
    studentCode: s.studentCode,
    applicantType: s.applicantType,
    titleTh: s.titleTh,
    firstNameTh: s.firstNameTh,
    lastNameTh: s.lastNameTh,
    monasticName: s.monasticName,
    fullNameTh: formatStudentFullName(s),
    monasticRank: s.monasticRank,
    templeName: s.templeName,
    ecclesiasticalProvince: s.ecclesiasticalProvince,
    batchYear: s.batchYear,
    status: s.status,
    phone: s.phone,
    email: s.email,
    enrollmentDate: s.enrollmentDate?.toISOString() ?? null,
  }));
}

export async function createStudent(tenantId: string, input: StudentProfileInput): Promise<StudentProfileDto> {
  const created = await prisma.studentProfile.create({
    data: {
      tenantId,
      studentCode: input.studentCode,
      applicantType: input.applicantType,
      titleTh: input.titleTh,
      firstNameTh: input.firstNameTh,
      lastNameTh: input.lastNameTh ?? null,
      monasticName: input.monasticName ?? null,
      monasticRank: input.monasticRank ?? null,
      templeName: input.templeName ?? null,
      ecclesiasticalProvince: input.ecclesiasticalProvince ?? null,
      batchYear: input.batchYear,
      status: input.status,
      phone: input.phone ?? null,
      email: input.email ?? null,
      enrollmentDate: new Date(),
    },
  });

  return {
    id: created.id,
    studentCode: created.studentCode,
    applicantType: created.applicantType,
    titleTh: created.titleTh,
    firstNameTh: created.firstNameTh,
    lastNameTh: created.lastNameTh,
    monasticName: created.monasticName,
    fullNameTh: formatStudentFullName(created),
    monasticRank: created.monasticRank,
    templeName: created.templeName,
    ecclesiasticalProvince: created.ecclesiasticalProvince,
    batchYear: created.batchYear,
    status: created.status,
    phone: created.phone,
    email: created.email,
    enrollmentDate: created.enrollmentDate?.toISOString() ?? null,
  };
}

export async function updateStudent(
  tenantId: string,
  input: { id: string } & Partial<StudentProfileInput>
): Promise<StudentProfileDto> {
  const updated = await prisma.studentProfile.update({
    where: { id: input.id, tenantId },
    data: {
      studentCode: input.studentCode,
      applicantType: input.applicantType,
      titleTh: input.titleTh,
      firstNameTh: input.firstNameTh,
      lastNameTh: input.lastNameTh,
      monasticName: input.monasticName,
      monasticRank: input.monasticRank,
      templeName: input.templeName,
      ecclesiasticalProvince: input.ecclesiasticalProvince,
      batchYear: input.batchYear,
      status: input.status,
      phone: input.phone,
      email: input.email,
    },
  });

  return {
    id: updated.id,
    studentCode: updated.studentCode,
    applicantType: updated.applicantType,
    titleTh: updated.titleTh,
    firstNameTh: updated.firstNameTh,
    lastNameTh: updated.lastNameTh,
    monasticName: updated.monasticName,
    fullNameTh: formatStudentFullName(updated),
    monasticRank: updated.monasticRank,
    templeName: updated.templeName,
    ecclesiasticalProvince: updated.ecclesiasticalProvince,
    batchYear: updated.batchYear,
    status: updated.status,
    phone: updated.phone,
    email: updated.email,
    enrollmentDate: updated.enrollmentDate?.toISOString() ?? null,
  };
}

export async function deleteStudent(tenantId: string, id: string): Promise<void> {
  await prisma.studentProfile.deleteMany({
    where: { id, tenantId },
  });
}

