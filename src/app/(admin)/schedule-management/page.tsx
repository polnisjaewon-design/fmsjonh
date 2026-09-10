import { requirePermission, hasPermission } from "@/features/identity/server";
import { SCHEDULE_P } from "@/features/schedule/permissions";
import { listCurrentSchedules } from "@/features/schedule/server";
import { ScheduleAdminClient } from "./_components/schedule-admin-client";

export default async function ScheduleManagementPage() {
  const ctx = await requirePermission(SCHEDULE_P.scheduleRead);
  const schedules = await listCurrentSchedules(ctx.tenantId);

  return (
    <ScheduleAdminClient
      initialSchedules={schedules}
      canManage={hasPermission(ctx, SCHEDULE_P.scheduleManage)}
    />
  );
}
