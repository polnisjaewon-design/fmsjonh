import { prisma } from "@/shared/lib/infra/prisma";
import type { ClassScheduleDto } from "../index";
import type { CreateScheduleInput } from "./validations";

export async function listCurrentSchedules(tenantId: string): Promise<ClassScheduleDto[]> {
  const currentSemester = await prisma.academicSemester.findFirst({
    where: { tenantId, isCurrent: true },
  });

  if (!currentSemester) return [];

  const items = await prisma.classSchedule.findMany({
    where: { tenantId, semesterId: currentSemester.id },
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
  });

  return items.map((i) => ({
    id: i.id,
    courseCode: i.courseCode,
    courseName: i.courseName,
    instructorName: i.instructorName,
    dayOfWeek: i.dayOfWeek,
    startTime: i.startTime,
    endTime: i.endTime,
    roomNumber: i.roomNumber,
    teachingMode: i.teachingMode,
    onlineMeetingUrl: i.onlineMeetingUrl,
    onlineMeetingPasscode: i.onlineMeetingPasscode,
  }));
}

export async function createScheduleItem(tenantId: string, input: CreateScheduleInput): Promise<ClassScheduleDto> {
  let semester = await prisma.academicSemester.findFirst({
    where: { tenantId, isCurrent: true },
  });

  if (!semester) {
    semester = await prisma.academicSemester.create({
      data: {
        tenantId,
        year: 2569,
        semester: 1,
        nameTh: "ภาคการศึกษาที่ ๑/๒๕๖๙",
        isCurrent: true,
      },
    });
  }

  const created = await prisma.classSchedule.create({
    data: {
      tenantId,
      semesterId: semester.id,
      courseCode: input.courseCode,
      courseName: input.courseName,
      instructorName: input.instructorName,
      dayOfWeek: input.dayOfWeek,
      startTime: input.startTime,
      endTime: input.endTime,
      roomNumber: input.roomNumber,
      teachingMode: input.teachingMode,
      onlineMeetingUrl: input.onlineMeetingUrl ?? null,
      onlineMeetingPasscode: input.onlineMeetingPasscode ?? null,
    },
  });

  return {
    id: created.id,
    courseCode: created.courseCode,
    courseName: created.courseName,
    instructorName: created.instructorName,
    dayOfWeek: created.dayOfWeek,
    startTime: created.startTime,
    endTime: created.endTime,
    roomNumber: created.roomNumber,
    teachingMode: created.teachingMode,
    onlineMeetingUrl: created.onlineMeetingUrl,
    onlineMeetingPasscode: created.onlineMeetingPasscode,
  };
}

export async function deleteScheduleItem(tenantId: string, id: string): Promise<void> {
  await prisma.classSchedule.deleteMany({
    where: { id, tenantId },
  });
}
