import { requirePermission, hasPermission } from "@/features/identity/server";
import { FACULTY_P } from "@/features/faculty/permissions";
import { listFacultyMembers } from "@/features/faculty/server";
import { FacultyAdminClient } from "./_components/faculty-admin-client";

export default async function FacultyManagementPage() {
  const ctx = await requirePermission(FACULTY_P.facultyRead);
  const facultyMembers = await listFacultyMembers(ctx.tenantId);

  return (
    <FacultyAdminClient
      initialMembers={facultyMembers}
      canManage={hasPermission(ctx, FACULTY_P.facultyManage)}
    />
  );
}
