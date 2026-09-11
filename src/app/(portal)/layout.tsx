import { PortalNavbar } from "./_components/portal-navbar";
import { PortalFooter } from "./_components/portal-footer";
import { resolveTenantSettings } from "@/features/identity/server";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const settings = await resolveTenantSettings();

  return (
    <div className="min-h-screen flex flex-col bg-stone-50/50 text-foreground">
      <PortalNavbar
        logoUrl={settings?.logoUrl}
        nameTh={settings?.nameTh}
        nameEn={settings?.nameEn}
        taglineTh={settings?.orgInfo?.taglineTh}
        taglineEn={settings?.orgInfo?.taglineEn}
      />
      <main className="flex-1">{children}</main>
      <PortalFooter
        logoUrl={settings?.logoUrl}
        nameTh={settings?.nameTh}
        nameEn={settings?.nameEn}
        taglineTh={settings?.orgInfo?.taglineTh}
        taglineEn={settings?.orgInfo?.taglineEn}
      />
    </div>
  );
}
