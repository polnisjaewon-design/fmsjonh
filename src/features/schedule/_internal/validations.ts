import { z } from "zod";

export const createScheduleSchema = z.object({
  courseCode: z.string().min(1, "กรุณาระบุรหัสวิชา").max(50),
  courseName: z.string().min(1, "กรุณาระบุชื่อวิชา").max(255),
  instructorName: z.string().min(1, "กรุณาระบุอาจารย์ผู้สอน").max(255),
  dayOfWeek: z.enum(["SATURDAY", "SUNDAY"]).default("SATURDAY"),
  startTime: z.string().min(1, "กรุณาระบุเวลาเริ่ม").max(10),
  endTime: z.string().min(1, "กรุณาระบุเวลาสิ้นสุด").max(10),
  roomNumber: z.string().min(1, "กรุณาระบุห้องเรียน").max(50),
  teachingMode: z.enum(["ONSITE", "ONLINE", "HYBRID"]).default("HYBRID"),
  onlineMeetingUrl: z.string().url("URL ไม่ถูกต้อง").optional().nullable(),
  onlineMeetingPasscode: z.string().optional().nullable(),
});

export type CreateScheduleInput = z.infer<typeof createScheduleSchema>;
