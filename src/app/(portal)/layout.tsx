import { PortalNavbar } from "./_components/portal-navbar";
import { PortalFooter } from "./_components/portal-footer";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50/50 text-foreground">
      <PortalNavbar />
      <main className="flex-1">{children}</main>
      <PortalFooter />
    </div>
  );
}
