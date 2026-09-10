import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export function PortalFooter() {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: About Program */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-600 flex items-center justify-center text-white font-bold font-serif text-lg">
                พธ.ม.
              </div>
              <div>
                <h3 className="text-white font-semibold text-base leading-tight">
                  หลักสูตรพุทธศาสตรมหาบัณฑิต
                </h3>
                <p className="text-amber-400 text-xs font-medium">
                  สาขาวิชาวิปัสสนาภาวนาศึกษา (ภาคเสาร์-อาทิตย์)
                </p>
              </div>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed pr-6">
              มุ่งเน้นสร้างองค์ความรู้ใหม่และการวิจัยเชิงลึกด้านวิปัสสนากรรมฐาน บูรณาการปริยัติธรรมและปฏิบัติธรรมตามหลักพระไตรปิฎก เพื่อพัฒนาจิตปัญญาและเผยแผ่หลักธรรมคำสอนสู่สังคมสากล
            </p>
            <p className="text-xs text-stone-500">
              บัณฑิตวิทยาลัย มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย (มจร)
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">
              เมนูหลักสูตร
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors">หน้าแรก</Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-amber-400 transition-colors">ข่าวสารและกิจกรรม</Link>
              </li>
              <li>
                <Link href="/curriculum" className="hover:text-amber-400 transition-colors">โครงสร้างหลักสูตร (มคอ.๒)</Link>
              </li>
              <li>
                <Link href="/faculty" className="hover:text-amber-400 transition-colors">ทำเนียบคณาจารย์และพระวิปัสสนาจารย์</Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-amber-400 transition-colors">ระบบบริหารงานหลังบ้าน</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Info */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">
              ติดต่อหลักสูตร
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">
                  อาคารมหาจุฬาบรรณาคาร มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย ต.ลำไทร อ.วังน้อย จ.พระนครศรีอยุธยา ๑๓๑๗๐
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-xs">๐๓๕-๒๔๘-๐๐๐ ต่อ ๘๐๕๐</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-xs">vipassana@mcu.ac.th</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row justify-between items-center text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา มจร. สงวนลิขสิทธิ์ทุกประการ</p>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Mahachulalongkornrajavidyalaya University</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
