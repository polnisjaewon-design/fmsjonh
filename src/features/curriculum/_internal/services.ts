import { prisma } from "@/shared/lib/infra/prisma";
import type { CurriculumDto, CourseDto } from "../index";

export async function getActiveCurriculum(tenantId: string): Promise<CurriculumDto | null> {
  const curr = await prisma.curriculum.findFirst({
    where: { tenantId, isActive: true },
    include: {
      department: true,
      studyPlans: { orderBy: { createdAt: "asc" } },
      courses: { orderBy: { courseCode: "asc" } },
    },
  });

  if (!curr) return null;

  return {
    id: curr.id,
    code: curr.code,
    nameTh: curr.nameTh,
    nameEn: curr.nameEn,
    degreeTitleTh: curr.degreeTitleTh,
    degreeTitleEn: curr.degreeTitleEn,
    totalCredits: curr.totalCredits,
    descriptionTh: curr.descriptionTh,
    descriptionEn: curr.descriptionEn,
    departmentId: curr.departmentId,
    departmentNameTh: curr.department?.nameTh ?? null,
    departmentNameEn: curr.department?.nameEn ?? null,
    facultyNameTh: curr.department?.facultyNameTh ?? null,
    facultyNameEn: curr.department?.facultyNameEn ?? null,
    studyPlans: curr.studyPlans.map((sp) => ({
      id: sp.id,
      planType: sp.planType,
      nameTh: sp.nameTh,
      nameEn: sp.nameEn,
      descriptionTh: sp.descriptionTh,
      descriptionEn: sp.descriptionEn,
      totalCredits: sp.totalCredits,
    })),
    courses: curr.courses.map((c) => ({
      id: c.id,
      courseCode: c.courseCode,
      nameTh: c.nameTh,
      nameEn: c.nameEn,
      creditTotal: c.creditTotal,
      creditLecture: c.creditLecture,
      creditLab: c.creditLab,
      creditSelf: c.creditSelf,
      courseType: c.courseType,
      descriptionTh: c.descriptionTh,
      descriptionEn: c.descriptionEn,
    })),
  };
}

export async function listCoursesByCurriculum(tenantId: string, curriculumId: string): Promise<CourseDto[]> {
  const courses = await prisma.course.findMany({
    where: { tenantId, curriculumId },
    orderBy: { courseCode: "asc" },
  });

  return courses.map((c) => ({
    id: c.id,
    courseCode: c.courseCode,
    nameTh: c.nameTh,
    nameEn: c.nameEn,
    creditTotal: c.creditTotal,
    creditLecture: c.creditLecture,
    creditLab: c.creditLab,
    creditSelf: c.creditSelf,
    courseType: c.courseType,
    descriptionTh: c.descriptionTh,
    descriptionEn: c.descriptionEn,
  }));
}

export async function createCourse(
  tenantId: string,
  curriculumId: string,
  input: {
    courseCode: string;
    nameTh: string;
    nameEn?: string | null;
    creditTotal: number;
    creditLecture?: number;
    creditLab?: number;
    creditSelf?: number;
    courseType?: "BASIC" | "CORE" | "SPECIALIZED" | "PRACTICE_VIPASSANA" | "THESIS";
    descriptionTh?: string | null;
    descriptionEn?: string | null;
  }
): Promise<CourseDto> {
  const created = await prisma.course.create({
    data: {
      tenantId,
      curriculumId,
      courseCode: input.courseCode,
      nameTh: input.nameTh,
      nameEn: input.nameEn ?? "",
      creditTotal: input.creditTotal,
      creditLecture: input.creditLecture ?? 3,
      creditLab: input.creditLab ?? 0,
      creditSelf: input.creditSelf ?? 6,
      courseType: input.courseType ?? "CORE",
      descriptionTh: input.descriptionTh ?? null,
      descriptionEn: input.descriptionEn ?? null,
    },
  });

  return {
    id: created.id,
    courseCode: created.courseCode,
    nameTh: created.nameTh,
    nameEn: created.nameEn,
    creditTotal: created.creditTotal,
    creditLecture: created.creditLecture,
    creditLab: created.creditLab,
    creditSelf: created.creditSelf,
    courseType: created.courseType,
    descriptionTh: created.descriptionTh,
    descriptionEn: created.descriptionEn,
  };
}

export async function updateCourse(
  tenantId: string,
  input: {
    id: string;
    courseCode?: string;
    nameTh?: string;
    nameEn?: string | null;
    creditTotal?: number;
    creditLecture?: number;
    creditLab?: number;
    creditSelf?: number;
    courseType?: "BASIC" | "CORE" | "SPECIALIZED" | "PRACTICE_VIPASSANA" | "THESIS";
    descriptionTh?: string | null;
    descriptionEn?: string | null;
  }
): Promise<CourseDto> {
  const updated = await prisma.course.update({
    where: { id: input.id, tenantId },
    data: {
      courseCode: input.courseCode,
      nameTh: input.nameTh,
      nameEn: input.nameEn !== undefined ? (input.nameEn ?? "") : undefined,
      creditTotal: input.creditTotal,
      creditLecture: input.creditLecture,
      creditLab: input.creditLab,
      creditSelf: input.creditSelf,
      courseType: input.courseType,
      descriptionTh: input.descriptionTh,
      descriptionEn: input.descriptionEn,
    },
  });


  return {
    id: updated.id,
    courseCode: updated.courseCode,
    nameTh: updated.nameTh,
    nameEn: updated.nameEn,
    creditTotal: updated.creditTotal,
    creditLecture: updated.creditLecture,
    creditLab: updated.creditLab,
    creditSelf: updated.creditSelf,
    courseType: updated.courseType,
    descriptionTh: updated.descriptionTh,
    descriptionEn: updated.descriptionEn,
  };
}

export async function deleteCourse(tenantId: string, id: string): Promise<void> {
  await prisma.course.deleteMany({
    where: { id, tenantId },
  });
}

