"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Globe, Menu, X, BookOpen, GraduationCap, Users, Newspaper, LogIn, ChevronRight } from "lucide-react";
import { useLocale } from "@/shared/lib/i18n/client";
import { LOCALE_COOKIE } from "@/shared/lib/i18n/config";

export function PortalNavbar() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function toggleLanguage() {
    const nextLocale = locale === "th" ? "en" : "th";
    document.cookie = `${LOCALE_COOKIE}=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    startTransition(() => {
      router.refresh();
    });
  }

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
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-md shadow-xs">
      {/* Top Banner: สถาบันการศึกษา */}
      <div className="bg-amber-900 text-amber-50 px-4 py-1.5 text-xs text-center font-medium tracking-wide flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (มจร) • บัณฑิตวิทยาลัย</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-amber-200">
          <span>ภาคเสาร์-อาทิตย์ (Weekend Program)</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Department Branding */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-white shadow-md shadow-amber-900/20 group-hover:scale-105 transition-transform duration-200">
              <span className="text-xl font-bold font-serif">พธ.ม.</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-bold text-foreground leading-tight group-hover:text-amber-700 transition-colors">
                สาขาวิชาวิปัสสนาภาวนาศึกษา
              </span>
              <span className="text-xs text-muted-foreground">
                หลักสูตรพุทธศาสตรมหาบัณฑิต (ภาคเสาร์-อาทิตย์)
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? "bg-amber-100 text-amber-900 font-semibold shadow-2xs"
                      : "text-foreground/80 hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Language Switcher */}
            <button
              type="button"
              onClick={toggleLanguage}
              disabled={isPending}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium hover:bg-muted transition-colors cursor-pointer"
              title="สลับภาษา / Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-amber-700" />
              <span>{locale === "th" ? "EN" : "ไทย"}</span>
            </button>

            {/* Admin/Console Link */}
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-700 hover:bg-amber-800 text-white text-sm font-medium transition-colors shadow-xs"
            >
              <LogIn className="w-4 h-4" />
              <span>{locale === "th" ? "ระบบจัดการ" : "Console"}</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-md border text-xs font-medium"
            >
              {locale === "th" ? "EN" : "ไทย"}
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-foreground hover:bg-muted focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background px-4 pt-2 pb-6 space-y-2 shadow-lg">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium text-foreground hover:bg-amber-50 hover:text-amber-900"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-amber-700" />
                <span>{item.label}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </Link>
          ))}
          <div className="pt-3 border-t">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-amber-700 text-white font-medium shadow-xs"
            >
              <LogIn className="w-4 h-4" />
              <span>{locale === "th" ? "เข้าสู่ระบบจัดการหลังบ้าน" : "Sign in to Console"}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
