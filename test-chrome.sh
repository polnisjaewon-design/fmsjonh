#!/usr/bin/env bash

# ==============================================================================
# FMS MCU - Interactive Chrome Feature Test Launcher
# ==============================================================================

BASE_URL="http://localhost:3010"

show_menu() {
  clear
  echo "=================================================================="
  echo "  ระบบสารสนเทศหลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา มจร"
  echo "  เมนูเปิดทดสอบฟีเจอร์บน Google Chrome (พอร์ต 3010)"
  echo "=================================================================="
  echo ""
  echo "  [ หมวด ๑: หน้าสำหรับบุคคลทั่วไปและนิสิต (Portal) ]"
  echo "    1) หน้าแรก & Focus AI Hero Section ($BASE_URL/)"
  echo "    2) ระบบรับสมัครนิสิตใหม่ออนไลน์ ($BASE_URL/admissions)"
  echo "    3) โครงสร้างหลักสูตรและรายวิชา ($BASE_URL/curriculum)"
  echo "    4) ทำเนียบคณาจารย์และพระวิปัสสนาจารย์ ($BASE_URL/faculty)"
  echo "    5) คลังวิทยานิพนธ์และงานวิจัยภาวนา ($BASE_URL/theses)"
  echo "    6) ตารางเรียนและปฏิทินการศึกษา ($BASE_URL/schedules)"
  echo "    7) ระบบยื่นและติดตามคำร้องนิสิต ($BASE_URL/petitions)"
  echo "    8) ข่าวสารและกิจกรรมประชาสัมพันธ์ ($BASE_URL/news)"
  echo ""
  echo "  [ หมวด ๒: ระบบจัดการหลังบ้าน (Admin System) ]"
  echo "    9) หน้าเข้าสู่ระบบ ($BASE_URL/login)"
  echo "   10) แดชบอร์ดผู้บริหาร ($BASE_URL/dashboard)"
  echo "   11) จัดการรับสมัครนิสิต ($BASE_URL/admission-management)"
  echo "   12) ทะเบียนและประวัตินิสิต ($BASE_URL/student-management)"
  echo "   13) บริหารหลักสูตรและวิชา ($BASE_URL/curriculum-management)"
  echo "   14) จัดการคณาจารย์ ($BASE_URL/faculty-management)"
  echo "   15) พิจารณาคำร้องออนไลน์ ($BASE_URL/petition-management)"
  echo "   16) จัดการตารางเรียน ($BASE_URL/schedule-management)"
  echo "   17) บริหารวิทยานิพนธ์ ($BASE_URL/thesis-management)"
  echo "   18) จัดการข่าวสาร ($BASE_URL/news-management)"
  echo "   19) จัดการผู้ใช้และสิทธิ์ RBAC ($BASE_URL/users)"
  echo "   20) ตั้งค่าสถาบัน, อัปโหลด Logo, สลับ Palette ($BASE_URL/settings)"
  echo ""
  echo "  [ หมวด ๓: คำสั่งเปิดทดสอบชุดใหญ่ ]"
  echo "   21) เปิดหน้า Portal ครบทุกแท็บพร้อมกัน (1-8)"
  echo "   22) เปิดหน้า Admin ครบทุกแท็บพร้อมกัน (10-20)"
  echo "   23) รันสคริปต์ตรวจสอบความพร้อมอัตโนมัติ (Automated 22-Endpoint Audit)"
  echo "   24) รันการสาธิตสดอัตโนมัติบน Chrome (Live Auto Demo & Animation Walkthrough)"
  echo "   25) Deploy ขึ้น Docker Desktop Production (scripts/docker-deploy.sh)"
  echo "   26) แสดงลิงก์แชร์ออนไลน์ผ่าน Cloudflare Tunnel (scripts/tunnel.sh)"
  echo "    0) ออกจากเมนู (Exit)"
  echo ""
  echo "  * บัญชี Admin: admin@app.local / รหัสผ่าน: Passw0rd!vibe"
  echo "=================================================================="
  echo -n "เลือกหมายเลขที่ต้องการทดสอบ [0-26]: "
}

open_url() {
  echo ""
  echo "🚀 กำลังเปิด: $1 บน Google Chrome..."
  open -a "Google Chrome" "$1"
  sleep 1
}

if [ $# -gt 0 ]; then
  case "$1" in
    1|home) open_url "$BASE_URL/" ;;
    2|admissions) open_url "$BASE_URL/admissions" ;;
    3|curriculum) open_url "$BASE_URL/curriculum" ;;
    4|faculty) open_url "$BASE_URL/faculty" ;;
    5|theses) open_url "$BASE_URL/theses" ;;
    6|schedules) open_url "$BASE_URL/schedules" ;;
    7|petitions) open_url "$BASE_URL/petitions" ;;
    8|news) open_url "$BASE_URL/news" ;;
    9|login) open_url "$BASE_URL/login" ;;
    10|dashboard) open_url "$BASE_URL/dashboard" ;;
    11|admin-admissions) open_url "$BASE_URL/admission-management" ;;
    12|admin-students) open_url "$BASE_URL/student-management" ;;
    13|admin-curriculum) open_url "$BASE_URL/curriculum-management" ;;
    14|admin-faculty) open_url "$BASE_URL/faculty-management" ;;
    15|admin-petitions) open_url "$BASE_URL/petition-management" ;;
    16|admin-schedules) open_url "$BASE_URL/schedule-management" ;;
    17|admin-theses) open_url "$BASE_URL/thesis-management" ;;
    18|admin-news) open_url "$BASE_URL/news-management" ;;
    19|users) open_url "$BASE_URL/users" ;;
    20|settings) open_url "$BASE_URL/settings" ;;
    all-portal) open_url "$BASE_URL/ $BASE_URL/admissions $BASE_URL/curriculum $BASE_URL/faculty $BASE_URL/theses $BASE_URL/schedules $BASE_URL/petitions $BASE_URL/news" ;;
    all-admin) open_url "$BASE_URL/dashboard $BASE_URL/settings $BASE_URL/users $BASE_URL/admission-management $BASE_URL/student-management $BASE_URL/curriculum-management $BASE_URL/petition-management" ;;
    audit) python3 scripts/audit-endpoints.py ;;
    24|demo) npx tsx scripts/demo-chrome-test.ts ;;
    25|deploy) ./scripts/docker-deploy.sh ;;
    26|tunnel) ./scripts/tunnel.sh ;;
    *) echo "ไม่พบตัวเลือกที่ระบุ: $1" ;;
  esac
  exit 0
fi

while true; do
  show_menu
  read choice
  case "$choice" in
    1) open_url "$BASE_URL/" ;;
    2) open_url "$BASE_URL/admissions" ;;
    3) open_url "$BASE_URL/curriculum" ;;
    4) open_url "$BASE_URL/faculty" ;;
    5) open_url "$BASE_URL/theses" ;;
    6) open_url "$BASE_URL/schedules" ;;
    7) open_url "$BASE_URL/petitions" ;;
    8) open_url "$BASE_URL/news" ;;
    9) open_url "$BASE_URL/login" ;;
    10) open_url "$BASE_URL/dashboard" ;;
    11) open_url "$BASE_URL/admission-management" ;;
    12) open_url "$BASE_URL/student-management" ;;
    13) open_url "$BASE_URL/curriculum-management" ;;
    14) open_url "$BASE_URL/faculty-management" ;;
    15) open_url "$BASE_URL/petition-management" ;;
    16) open_url "$BASE_URL/schedule-management" ;;
    17) open_url "$BASE_URL/thesis-management" ;;
    18) open_url "$BASE_URL/news-management" ;;
    19) open_url "$BASE_URL/users" ;;
    20) open_url "$BASE_URL/settings" ;;
    21) open_url "$BASE_URL/ $BASE_URL/admissions $BASE_URL/curriculum $BASE_URL/faculty $BASE_URL/theses $BASE_URL/schedules $BASE_URL/petitions $BASE_URL/news" ;;
    22) open_url "$BASE_URL/dashboard $BASE_URL/settings $BASE_URL/users $BASE_URL/admission-management $BASE_URL/student-management $BASE_URL/curriculum-management $BASE_URL/petition-management" ;;
    23)
      echo ""
      echo "🔍 กำลังเริ่มการทดสอบอัตโนมัติ 22 Endpoints..."
      python3 scripts/audit-endpoints.py
      echo ""
      echo "กด Enter เพื่อกลับสู่เมนูหลัก..."
      read
      ;;
    24)
      echo ""
      echo "🎬 กำลังเริ่มการสาธิตสดอัตโนมัติบน Google Chrome..."
      npx tsx scripts/demo-chrome-test.ts
      echo ""
      echo "กด Enter เพื่อกลับสู่เมนูหลัก..."
      read
      ;;
    25)
      echo ""
      echo "🚀 กำลังเริ่มกระบวนการ Deploy ขึ้น Docker Desktop..."
      ./scripts/docker-deploy.sh
      echo ""
      echo "กด Enter เพื่อกลับสู่เมนูหลัก..."
      read
      ;;
    26)
      echo ""
      ./scripts/tunnel.sh
      echo ""
      echo "กด Enter เพื่อกลับสู่เมนูหลัก..."
      read
      ;;
    0) echo "ออกจากระบบทดสอบ"; exit 0 ;;
    *) echo "ตัวเลือกไม่ถูกต้อง กรุณาระบุ 0-26"; sleep 1 ;;
  esac
done
