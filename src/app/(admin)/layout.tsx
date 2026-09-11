import { resolveTenantSettings } from "@/features/identity/server";
import { AdminLayoutClient } from "./_components/admin-layout-client";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const settings = await resolveTenantSettings();

  return (
    <AdminLayoutClient
      logoUrl={settings?.logoUrl}
      tenantNameTh={settings?.nameTh}
      tenantNameEn={settings?.nameEn}
      taglineTh={settings?.orgInfo?.taglineTh}
      taglineEn={settings?.orgInfo?.taglineEn}
    >
      {children}
    </AdminLayoutClient>
  );
}
