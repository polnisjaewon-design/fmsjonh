import { prisma } from "@/shared/lib/infra/prisma";
import type {
  DepartmentSummaryDto,
  DepartmentDto,
} from "../index";
import type {
  DepartmentCreateInput,
  DepartmentUpdateInput,
} from "./validations";

export async function listDepartments(
  tenantId: string,
  options?: { search?: string; isActive?: boolean }
): Promise<DepartmentSummaryDto[]> {
  const where: {
    tenantId: string;
    isActive?: boolean;
    OR?: Array<{ [key: string]: { contains: string; mode: "insensitive" } }>;
  } = { tenantId };

  if (options?.isActive !== undefined) {
    where.isActive = options.isActive;
  }

  if (options?.search?.trim()) {
    const s = options.search.trim();
    where.OR = [
      { nameTh: { contains: s, mode: "insensitive" } },
      { nameEn: { contains: s, mode: "insensitive" } },
      { code: { contains: s, mode: "insensitive" } },
      { facultyNameTh: { contains: s, mode: "insensitive" } },
    ];
  }

  const depts = await prisma.department.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { curriculums: true },
      },
    },
  });

  return depts.map((d) => ({
    id: d.id,
    code: d.code,
    nameTh: d.nameTh,
    nameEn: d.nameEn,
    facultyNameTh: d.facultyNameTh,
    facultyNameEn: d.facultyNameEn,
    headName: d.headName,
    contactEmail: d.contactEmail,
    contactPhone: d.contactPhone,
    officeLocation: d.officeLocation,
    descriptionTh: d.descriptionTh,
    descriptionEn: d.descriptionEn,
    isActive: d.isActive,
    curriculumCount: d._count.curriculums,
    createdAt: d.createdAt.toISOString(),
    updatedAt: d.updatedAt.toISOString(),
  }));
}

export async function getDepartmentById(
  tenantId: string,
  id: string
): Promise<DepartmentDto | null> {
  const d = await prisma.department.findFirst({
    where: { id, tenantId },
    include: {
      curriculums: {
        orderBy: { code: "asc" },
      },
      _count: {
        select: { curriculums: true },
      },
    },
  });

  if (!d) return null;

  return {
    id: d.id,
    code: d.code,
    nameTh: d.nameTh,
    nameEn: d.nameEn,
    facultyNameTh: d.facultyNameTh,
    facultyNameEn: d.facultyNameEn,
    headName: d.headName,
    contactEmail: d.contactEmail,
    contactPhone: d.contactPhone,
    officeLocation: d.officeLocation,
    descriptionTh: d.descriptionTh,
    descriptionEn: d.descriptionEn,
    isActive: d.isActive,
    curriculumCount: d._count.curriculums,
    createdAt: d.createdAt.toISOString(),
    updatedAt: d.updatedAt.toISOString(),
    curriculums: d.curriculums.map((c) => ({
      id: c.id,
      code: c.code,
      nameTh: c.nameTh,
      nameEn: c.nameEn,
      degreeTitleTh: c.degreeTitleTh,
      degreeTitleEn: c.degreeTitleEn,
      totalCredits: c.totalCredits,
      isActive: c.isActive,
    })),
  };
}

export async function createDepartment(
  tenantId: string,
  input: DepartmentCreateInput
): Promise<DepartmentSummaryDto> {
  const existing = await prisma.department.findFirst({
    where: { tenantId, code: input.code.trim().toUpperCase() },
  });

  if (existing) {
    throw new Error(`รหัสภาควิชา/ส่วนงาน "${input.code}" มีอยู่ในระบบแล้ว`);
  }

  const created = await prisma.department.create({
    data: {
      tenantId,
      code: input.code.trim().toUpperCase(),
      nameTh: input.nameTh.trim(),
      nameEn: input.nameEn.trim(),
      facultyNameTh: input.facultyNameTh?.trim() || null,
      facultyNameEn: input.facultyNameEn?.trim() || null,
      headName: input.headName?.trim() || null,
      contactEmail: input.contactEmail?.trim() || null,
      contactPhone: input.contactPhone?.trim() || null,
      officeLocation: input.officeLocation?.trim() || null,
      descriptionTh: input.descriptionTh?.trim() || null,
      descriptionEn: input.descriptionEn?.trim() || null,
      isActive: input.isActive ?? true,
    },
    include: {
      _count: {
        select: { curriculums: true },
      },
    },
  });

  return {
    id: created.id,
    code: created.code,
    nameTh: created.nameTh,
    nameEn: created.nameEn,
    facultyNameTh: created.facultyNameTh,
    facultyNameEn: created.facultyNameEn,
    headName: created.headName,
    contactEmail: created.contactEmail,
    contactPhone: created.contactPhone,
    officeLocation: created.officeLocation,
    descriptionTh: created.descriptionTh,
    descriptionEn: created.descriptionEn,
    isActive: created.isActive,
    curriculumCount: created._count.curriculums,
    createdAt: created.createdAt.toISOString(),
    updatedAt: created.updatedAt.toISOString(),
  };
}

export async function updateDepartment(
  tenantId: string,
  input: DepartmentUpdateInput
): Promise<DepartmentSummaryDto> {
  if (input.code) {
    const conflict = await prisma.department.findFirst({
      where: {
        tenantId,
        code: input.code.trim().toUpperCase(),
        NOT: { id: input.id },
      },
    });
    if (conflict) {
      throw new Error(`รหัสภาควิชา/ส่วนงาน "${input.code}" ซ้ำกับภาควิชาอื่นในระบบ`);
    }
  }

  const updated = await prisma.department.update({
    where: { id: input.id, tenantId },
    data: {
      code: input.code ? input.code.trim().toUpperCase() : undefined,
      nameTh: input.nameTh?.trim(),
      nameEn: input.nameEn?.trim(),
      facultyNameTh: input.facultyNameTh !== undefined ? (input.facultyNameTh?.trim() || null) : undefined,
      facultyNameEn: input.facultyNameEn !== undefined ? (input.facultyNameEn?.trim() || null) : undefined,
      headName: input.headName !== undefined ? (input.headName?.trim() || null) : undefined,
      contactEmail: input.contactEmail !== undefined ? (input.contactEmail?.trim() || null) : undefined,
      contactPhone: input.contactPhone !== undefined ? (input.contactPhone?.trim() || null) : undefined,
      officeLocation: input.officeLocation !== undefined ? (input.officeLocation?.trim() || null) : undefined,
      descriptionTh: input.descriptionTh !== undefined ? (input.descriptionTh?.trim() || null) : undefined,
      descriptionEn: input.descriptionEn !== undefined ? (input.descriptionEn?.trim() || null) : undefined,
      isActive: input.isActive,
    },
    include: {
      _count: {
        select: { curriculums: true },
      },
    },
  });

  return {
    id: updated.id,
    code: updated.code,
    nameTh: updated.nameTh,
    nameEn: updated.nameEn,
    facultyNameTh: updated.facultyNameTh,
    facultyNameEn: updated.facultyNameEn,
    headName: updated.headName,
    contactEmail: updated.contactEmail,
    contactPhone: updated.contactPhone,
    officeLocation: updated.officeLocation,
    descriptionTh: updated.descriptionTh,
    descriptionEn: updated.descriptionEn,
    isActive: updated.isActive,
    curriculumCount: updated._count.curriculums,
    createdAt: updated.createdAt.toISOString(),
    updatedAt: updated.updatedAt.toISOString(),
  };
}

export async function deleteDepartment(
  tenantId: string,
  id: string
): Promise<void> {
  // ยกเลิกการผูกหลักสูตรก่อนลบภาควิชา เพื่อไม่ให้ข้อมูลหลักสูตรสูญหาย
  await prisma.curriculum.updateMany({
    where: { tenantId, departmentId: id },
    data: { departmentId: null },
  });

  await prisma.department.deleteMany({
    where: { id, tenantId },
  });
}

export async function assignCurriculumsToDepartment(
  tenantId: string,
  departmentId: string,
  curriculumIds: string[]
): Promise<void> {
  await prisma.$transaction(async (tx) => {
    // 1. ถอดหลักสูตรเดิมที่เคยอยู่ในภาควิชานี้ แต่ไม่อยู่ในรายการใหม่
    await tx.curriculum.updateMany({
      where: {
        tenantId,
        departmentId,
        NOT: { id: { in: curriculumIds } },
      },
      data: { departmentId: null },
    });

    // 2. ผูกหลักสูตรตามรายการใหม่เข้าสู่ภาควิชานี้
    if (curriculumIds.length > 0) {
      await tx.curriculum.updateMany({
        where: {
          tenantId,
          id: { in: curriculumIds },
        },
        data: { departmentId },
      });
    }
  });
}

export async function listAllCurriculumsForSelection(
  tenantId: string
): Promise<Array<{ id: string; code: string; nameTh: string; nameEn: string; departmentId: string | null }>> {
  const list = await prisma.curriculum.findMany({
    where: { tenantId },
    select: {
      id: true,
      code: true,
      nameTh: true,
      nameEn: true,
      departmentId: true,
    },
    orderBy: { code: "asc" },
  });

  return list;
}
