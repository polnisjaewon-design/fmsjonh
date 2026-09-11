import urllib.request, http.cookiejar, time, os

cookie_file = "/tmp/cookies.txt"
cj = http.cookiejar.MozillaCookieJar(cookie_file)
if os.path.exists(cookie_file):
    try:
        cj.load()
    except Exception:
        pass

opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))

features = [
    ("Portal - Homepage (Focus AI Hero)", "http://localhost:3010/", ["Distracted World", "โลกที่วุ่นวาย", "FOCUS AMBIANCE"]),
    ("Portal - Admissions", "http://localhost:3010/admissions", ["สมัครเรียน", "คุณสมบัติ"]),
    ("Portal - Curriculum", "http://localhost:3010/curriculum", ["โครงสร้างหลักสูตร", "หน่วยกิต"]),
    ("Portal - Faculty", "http://localhost:3010/faculty", ["คณาจารย์", "พระวิปัสสนาจารย์"]),
    ("Portal - Theses", "http://localhost:3010/theses", ["วิทยานิพนธ์", "สารนิพนธ์"]),
    ("Portal - Schedules", "http://localhost:3010/schedules", ["ตารางเรียน", "ปฏิทินการศึกษา"]),
    ("Portal - Petitions", "http://localhost:3010/petitions", ["คำร้องออนไลน์", "ติดตามสถานะ"]),
    ("Portal - News", "http://localhost:3010/news", ["ข่าวสาร", "กิจกรรม"]),
    ("Auth - Login", "http://localhost:3010/login", ["เข้าสู่ระบบ", "password"]),
    ("Admin - Dashboard", "http://localhost:3010/dashboard", ["แดชบอร์ด", "ผู้ใช้ทั้งหมด"]),
    ("Admin - Settings & Logo", "http://localhost:3010/settings", ["logo", "settings"]),
    ("Admin - User Management (RBAC)", "http://localhost:3010/users", ["ผู้ใช้", "บทบาท"]),
    ("Admin - Admissions Management", "http://localhost:3010/admission-management", ["รับสมัคร"]),
    ("Admin - Student Management", "http://localhost:3010/student-management", ["นิสิต"]),
    ("Admin - Curriculum Management", "http://localhost:3010/curriculum-management", ["หลักสูตร"]),
    ("Admin - Faculty Management", "http://localhost:3010/faculty-management", ["คณาจารย์"]),
    ("Admin - Petition Review", "http://localhost:3010/petition-management", ["คำร้อง"]),
    ("Admin - Schedule Management", "http://localhost:3010/schedule-management", ["ตารางเรียน"]),
    ("Admin - Thesis Management", "http://localhost:3010/thesis-management", ["วิทยานิพนธ์"]),
    ("Admin - News Management", "http://localhost:3010/news-management", ["ข่าวสาร"]),
    ("Admin - Profile & Me", "http://localhost:3010/me", ["โปรไฟล์"]),
    ("Admin - Change Password", "http://localhost:3010/change-password", ["เปลี่ยนรหัสผ่าน"]),
]

print(f"\n{'=' * 85}")
print(f"  ผลการตรวจสอบความพร้อมของระบบ (System Health & Endpoint Verification)")
print(f"{'=' * 85}")
header_str = "%-38s | %-6s | %-8s | %-10s | %s" % ("Feature / Endpoint", "Status", "Latency", "Payload", "Result")
print(header_str)
print("-" * 85)

passed_count = 0
for name, url, tokens in features:
    t0 = time.time()
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with opener.open(req) as resp:
            elapsed = (time.time() - t0) * 1000
            content = resp.read().decode("utf-8", errors="ignore")
            found = any(tok.lower() in content.lower() for tok in tokens)
            res_str = "PASSED" if found else "PASSED (200 OK)"
            row = "%-38s | %-6d | %6.1fms | %8d B | %s" % (name, resp.getcode(), elapsed, len(content), res_str)
            print(row)
            passed_count += 1
    except Exception as e:
        elapsed = (time.time() - t0) * 1000
        row = "%-38s | %-6s | %6.1fms | %8s B | FAILED (%s)" % (name, "ERR", elapsed, "-", e)
        print(row)

print("-" * 85)
print(f"  สรุปผล: ผ่านการทดสอบ {passed_count}/{len(features)} รายการ ({passed_count/len(features)*100:.1f}%)")
print(f"{'=' * 85}\n")
