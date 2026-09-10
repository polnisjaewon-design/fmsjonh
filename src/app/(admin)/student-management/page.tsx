import { requirePermission, hasPermission } from "@/features/identity/server";
import { STUDENT_P } from "@/features/student/permissions";
import { listStudents } from "@/features/student/server";
import { StudentAdminClient } from "./_components/student-admin-client";

export default async function StudentManagementPage() {
  const ctx = await requirePermission(STUDENT_P.studentRead);
  const students = await listStudents(ctx.tenantId);

  return (
    <StudentAdminClient
      initialStudents={students}
      canManage={hasPermission(ctx, STUDENT_P.studentManage)}
    />
  );
}
