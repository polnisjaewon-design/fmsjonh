export interface ClassScheduleDto {
  id: string;
  courseCode: string;
  courseName: string;
  instructorName: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  roomNumber: string;
  teachingMode: string;
  onlineMeetingUrl?: string | null;
  onlineMeetingPasscode?: string | null;
}
