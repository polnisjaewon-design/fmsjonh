"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";
import {
  Menu,
  X,
  BookOpen,
  GraduationCap,
  Users,
  Newspaper,
  LogIn,
  ChevronRight,
  ChevronDown,
  LayoutDashboard,
  User as UserIcon,
  Settings,
  LogOut,
} from "lucide-react";
import { useLocale } from "@/shared/lib/i18n/client";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { useAppSession } from "@/hooks/use-session";
import { hasPermission, P } from "@/features/identity";
import { cn } from "@/shared/lib/utils";

export interface PortalNavbarProps {
  logoUrl?: string | null;
  nameTh?: string | null;
  nameEn?: string | null;
  taglineTh?: string | null;
  taglineEn?: string | null;
}

export function PortalNavbar({
  logoUrl,
  nameTh,
  nameEn,
  taglineTh,
  taglineEn,
}: PortalNavbarProps = {}) {
  const locale = useLocale();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, roles, permissions, isSuperAdmin, isAuthenticated } = useAppSession();

  // Dynamic brand state with live event updates
  const [overrideBrand, setOverrideBrand] = useState<{
    logoUrl?: string | null;
    nameTh?: string;
    nameEn?: string;
    taglineTh?: string;
    taglineEn?: string;
  } | null>(null);

  useEffect(() => {
    const handleUpdate = (
      e: CustomEvent<{
        logoUrl?: string | null;
        nameTh?: string;
        nameEn?: string;
        taglineTh?: string;
        taglineEn?: string;
      }>
    ) => {
      if (e.detail) {
        setOverrideBrand((prev) => ({ ...prev, ...e.detail }));
      }
    };
    window.addEventListener("tenant-brand-updated", handleUpdate as EventListener);
    return () =>
      window.removeEventListener("tenant-brand-updated", handleUpdate as EventListener);
  }, []);

  const liveLogoUrl = overrideBrand?.logoUrl !== undefined ? overrideBrand.logoUrl : logoUrl;
  const liveNameTh = overrideBrand?.nameTh !== undefined ? overrideBrand.nameTh : nameTh;
  const liveNameEn = overrideBrand?.nameEn !== undefined ? overrideBrand.nameEn : nameEn;
  const liveTaglineTh = overrideBrand?.taglineTh !== undefined ? overrideBrand.taglineTh : taglineTh;
  const liveTaglineEn = overrideBrand?.taglineEn !== undefined ? overrideBrand.taglineEn : taglineEn;

  const defaultNameTh =
    "หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา(ภาคเสาร์-อาทิตย์) ภาควิชาพระพุทธศาสนา คณะพุทธศาสตร์ มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย";
  const defaultNameEn =
    "Master of Arts Program in Vipassana Meditation Studies (Weekend Session), Department of Buddhism, Faculty of Buddhism, Mahachulalongkornrajavidyalaya University";
  const defaultTaglineTh = "หลักสูตรพุทธศาสตรมหาบัณฑิต (ภาคเสาร์-อาทิตย์)";
  const defaultTaglineEn = "Master of Arts Program (Weekend Session)";

  const brandName =
    locale === "en"
      ? liveNameEn || liveNameTh || defaultNameEn
      : liveNameTh || liveNameEn || defaultNameTh;

  const brandTagline =
    locale === "en"
      ? liveTaglineEn || liveTaglineTh || defaultTaglineEn
      : liveTaglineTh || liveTaglineEn || defaultTaglineTh;

  const initials = (user?.name ?? "?").trim().charAt(0).toUpperCase() || "?";
  const ctx = { roles, permissions, isSuperAdmin };

  const navLinks = [
    { href: "/", label: locale === "th" ? "หน้าแรก" : "Home", icon: BookOpen },
    { href: "/news", label: locale === "th" ? "ข่าวสาร" : "News", icon: Newspaper },
    { href: "/admissions", label: locale === "th" ? "รับสมัครเรียน" : "Admissions", icon: GraduationCap },
    { href: "/curriculum", label: locale === "th" ? "หลักสูตร" : "Curriculum", icon: BookOpen },
    { href: "/faculty", label: locale === "th" ? "คณาจารย์" : "Faculty", icon: Users },
    { href: "/schedules", label: locale === "th" ? "ตารางเรียน" : "Timetable", icon: BookOpen },
    { href: "/theses", label: locale === "th" ? "คลังวิทยานิพนธ์" : "Theses", icon: GraduationCap },
    { href: "/petitions", label: locale === "th" ? "คำร้องออนไลน์" : "Petitions", icon: Newspaper },
  ];

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top Banner: สถาบันการศึกษา */}
      <div className="bg-stone-900/90 dark:bg-stone-950 text-stone-200 dark:text-stone-300 border-b border-stone-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 text-[11px] font-medium tracking-wide flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (มจร) • บัณฑิตวิทยาลัย</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-stone-400">
            <span>ภาคเสาร์-อาทิตย์ (Weekend Program)</span>
          </div>
        </div>
      </div>

      {/* Main Navbar: Admin Liyon Glassmorphic aesthetic */}
      <div className="relative bg-glass backdrop-blur-xl border-b border-glass-border/50 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          {/* Brand Block matching Admin .brand-blk styling */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 group"
            title={`${brandName} - ${brandTagline}`}
          >
            <i className="w-[34px] h-[34px] rounded-md bg-brand text-on-brand flex items-center justify-center font-normal overflow-hidden shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-150">
              {liveLogoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={liveLogoUrl}
                  alt={brandName}
                  className="h-full w-full object-contain p-0.5 rounded-[inherit]"
                />
              ) : (
                <svg className="w-[19px] h-[19px]" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                  <path d="M22 10 12 5 2 10l10 5 10-5Z" />
                  <path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
                </svg>
              )}
            </i>
            <div className="flex flex-col min-w-0 max-w-[200px] sm:max-w-[320px]">
              <b className="text-[0.92rem] font-bold tracking-tight text-foreground leading-snug whitespace-nowrap overflow-hidden text-ellipsis group-hover:text-brand transition-colors">
                {brandName}
              </b>
              <span className="text-[0.72rem] text-text-2 leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                {brandTagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {navLinks.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-2.5 py-1.5 rounded-lg text-[0.84rem] font-medium transition-all duration-150 whitespace-nowrap",
                    active
                      ? "bg-brand/10 text-brand font-semibold shadow-2xs"
                      : "text-text-2 hover:text-text hover:bg-glass-strong"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Tools: Language, Theme Toggle, Avatar Menu / Staff Login */}
          <div className="hidden sm:flex items-center gap-1.5">
            {/* Language Switcher */}
            <LanguageSwitcher className="lang" />

            {/* Theme Toggle (Sun/Moon) */}
            <button
              type="button"
              className="icon-btn"
              aria-label={locale === "th" ? "สลับโหมดสี" : "Toggle theme"}
              title={locale === "th" ? "สลับโหมดสี" : "Toggle theme"}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <svg className="sun" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
              <svg className="moon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            </button>

            {/* User Avatar Menu or Staff Login Button */}
            {isAuthenticated && user ? (
              <div className="acct ml-1">
                <DropdownMenuPrimitive.Root>
                  <DropdownMenuPrimitive.Trigger asChild>
                    <button
                      type="button"
                      className="flex items-center gap-2 py-1 pl-1 pr-2.5 rounded-full hover:bg-glass-strong transition-colors cursor-pointer border border-glass-border/60"
                    >
                      <span className="who" aria-hidden="true">
                        {user.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={user.image}
                            alt=""
                            className="h-full w-full rounded-full object-cover"
                          />
                        ) : (
                          initials
                        )}
                      </span>
                      <span className="nm max-w-[120px] truncate text-xs sm:text-sm font-semibold text-foreground">
                        {user.name}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-text-2 opacity-70 transition-transform" />
                    </button>
                  </DropdownMenuPrimitive.Trigger>
                  <DropdownMenuPrimitive.Portal>
                    <DropdownMenuPrimitive.Content
                      className="menu-list"
                      align="end"
                      sideOffset={8}
                      style={{ position: "static" }}
                    >
                      <DropdownMenuPrimitive.Label asChild>
                        <div className="px-2.5 py-2">
                          <p className="text-sm font-semibold">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </DropdownMenuPrimitive.Label>
                      <DropdownMenuPrimitive.Separator asChild>
                        <hr />
                      </DropdownMenuPrimitive.Separator>
                      <DropdownMenuPrimitive.Item asChild>
                        <Link href="/dashboard" className="flex items-center gap-2">
                          <LayoutDashboard className="h-4 w-4 text-brand" />
                          <span>{locale === "th" ? "ระบบจัดการ (Console)" : "Staff Console"}</span>
                        </Link>
                      </DropdownMenuPrimitive.Item>
                      <DropdownMenuPrimitive.Item asChild>
                        <Link href="/me" className="flex items-center gap-2">
                          <UserIcon className="h-4 w-4" />
                          <span>{locale === "th" ? "ข้อมูลส่วนตัว" : "Profile"}</span>
                        </Link>
                      </DropdownMenuPrimitive.Item>
                      {hasPermission(ctx, P.settingsManage) && (
                        <DropdownMenuPrimitive.Item asChild>
                          <Link href="/settings" className="flex items-center gap-2">
                            <Settings className="h-4 w-4" />
                            <span>{locale === "th" ? "ตั้งค่าระบบ" : "Settings"}</span>
                          </Link>
                        </DropdownMenuPrimitive.Item>
                      )}
                      <DropdownMenuPrimitive.Separator asChild>
                        <hr />
                      </DropdownMenuPrimitive.Separator>
                      <DropdownMenuPrimitive.Item asChild onSelect={() => signOut({ callbackUrl: "/login" })}>
                        <button type="button" className="danger w-full flex items-center gap-2 text-left">
                          <LogOut className="h-4 w-4" />
                          <span>{locale === "th" ? "ออกจากระบบ" : "Sign out"}</span>
                        </button>
                      </DropdownMenuPrimitive.Item>
                    </DropdownMenuPrimitive.Content>
                  </DropdownMenuPrimitive.Portal>
                </DropdownMenuPrimitive.Root>
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 ml-1 px-3.5 py-1.5 rounded-lg bg-brand hover:brightness-110 active:brightness-95 text-on-brand text-xs font-semibold shadow-xs transition-all"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{locale === "th" ? "เข้าสู่ระบบเจ้าหน้าที่" : "Staff Login"}</span>
              </Link>
            )}
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-1">
            <LanguageSwitcher className="lang h-8 w-8 text-xs" />
            <button
              type="button"
              className="icon-btn sm:hidden"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              <svg className="sun" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
              <svg className="moon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="icon-btn"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b bg-background/95 backdrop-blur-xl px-4 pt-2 pb-6 space-y-1.5 shadow-xl">
          {navLinks.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  active
                    ? "bg-brand/10 text-brand font-semibold"
                    : "text-foreground hover:bg-muted"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn("w-4 h-4", active ? "text-brand" : "text-muted-foreground")} />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Link>
            );
          })}

          {isAuthenticated && user ? (
            <div className="pt-3 border-t space-y-2">
              <div className="flex items-center gap-3 px-2 py-1">
                <span className="who w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-brand text-on-brand shrink-0">
                  {user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={user.image} alt="" className="h-full w-full rounded-full object-cover" />
                  ) : (
                    initials
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-brand text-on-brand font-medium text-xs shadow-xs hover:brightness-110 transition-all"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>{locale === "th" ? "ระบบจัดการ" : "Console"}</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut({ callbackUrl: "/login" });
                  }}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-destructive/30 text-destructive hover:bg-destructive/10 font-medium text-xs transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{locale === "th" ? "ออกจากระบบ" : "Logout"}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-3 border-t">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-brand text-on-brand font-semibold text-sm shadow-xs hover:brightness-110 transition-all"
              >
                <LogIn className="w-4 h-4" />
                <span>{locale === "th" ? "เข้าสู่ระบบเจ้าหน้าที่" : "Staff Login"}</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
