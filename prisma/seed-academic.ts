import { PrismaClient } from "../src/generated/prisma";

export async function seedAcademicData(prisma: PrismaClient, tenantId: string) {
  console.log("[seed-academic] กำลังสร้างข้อมูลหลักสูตร ข่าวสาร และคณาจารย์ มจร...");

  // ๑. สร้างหมวดหมู่ข่าวสาร
  const catVipassana = await prisma.newsCategory.upsert({
    where: { tenantId_slug: { tenantId, slug: "vipassana-retreats" } },
    update: {},
    create: {
      tenantId,
      slug: "vipassana-retreats",
      nameTh: "กิจกรรมวิปัสสนาภาวนา",
      nameEn: "Vipassana Retreats",
    },
  });

  const catAdmission = await prisma.newsCategory.upsert({
    where: { tenantId_slug: { tenantId, slug: "admissions" } },
    update: {},
    create: {
      tenantId,
      slug: "admissions",
      nameTh: "ข่าวการรับสมัครนิสิต",
      nameEn: "Admissions",
    },
  });

  await prisma.newsCategory.upsert({
    where: { tenantId_slug: { tenantId, slug: "academic" } },
    update: {},
    create: {
      tenantId,
      slug: "academic",
      nameTh: "ข่าววิชาการและงานวิจัย",
      nameEn: "Academic & Research",
    },
  });

  // ๒. สร้างข่าวสารประชาสัมพันธ์
  const now = new Date();
  await prisma.newsArticle.upsert({
    where: { tenantId_slug: { tenantId, slug: "admission-open-2569" } },
    update: {},
    create: {
      tenantId,
      categoryId: catAdmission.id,
      slug: "admission-open-2569",
      titleTh: "เปิดรับสมัครนิสิตใหม่ระดับปริญญาโท สาขาวิชาวิปัสสนาภาวนาศึกษา (ภาคเสาร์-อาทิตย์) ประจำปีการศึกษา ๒๕๖๙",
      titleEn: "Online Admission Open for M.A. in Vipassana Meditation Studies (Weekend Program) Academic Year 2026",
      summaryTh: "หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา มจร เปิดรับสมัครทั้งบรรพชิตและคฤหัสถ์ เรียนวันเสาร์และอาทิตย์",
      summaryEn: "MCU welcomes both monastics and laypersons to apply for the Weekend Master's Degree in Vipassana Meditation.",
      contentTh: `หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา (ภาคเสาร์-อาทิตย์) บัณฑิตวิทยาลัย มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย เปิดรับสมัครผู้สนใจเข้าศึกษาต่อเพื่อพัฒนาจิตปัญญาและวิจัยเชิงลึกด้านวิปัสสนากรรมฐาน

คุณสมบัติผู้สมัคร:
๑. เป็นพระภิกษุ สามเณร หรือคฤหัสถ์ (อุบาสก อุบาสิกา)
๒. สำเร็จการศึกษาระดับปริญญาตรีทุกสาขา หรือเทียบเท่า (เปรียญธรรม ๙ ประโยค)
๓. มีความสนใจและมุ่งมั่นในการปฏิบัติวิปัสสนาภาวนาตามแนวสติปัฏฐาน ๔

กำหนดการรับสมัคร:
- เปิดรับสมัครออนไลน์ตั้งแต่บัดนี้เป็นต้นไป
- สัมภาษณ์และสอบข้อเขียนตามประกาศของหลักสูตร`,
      coverImageUrl: "https://images.unsplash.com/photo-1609619385002-f40f1df9b7eb?q=80&w=1200",
      isPinned: true,
      isPublished: true,
      publishedAt: now,
      viewCount: 350,
    },
  });

  await prisma.newsArticle.upsert({
    where: { tenantId_slug: { tenantId, slug: "annual-vipassana-retreat-2569" } },
    update: {},
    create: {
      tenantId,
      categoryId: catVipassana.id,
      slug: "annual-vipassana-retreat-2569",
      titleTh: "ขอเชิญร่วมโครงการปฏิบัติวิปัสสนากรรมฐาน ประจำปีการศึกษา ๒๕๖๙ ณ สถาบันวิปัสสนาธุระ มจร วังน้อย",
      titleEn: "Annual Intensive Vipassana Meditation Retreat at Vipassana Institute MCU Wang Noi",
      summaryTh: "การปฏิบัติวิปัสสนากรรมฐานเข้มข้นสำหรับนิสิตระดับบัณฑิตศึกษา พร้อมการสอบอารมณ์โดยพระวิปัสสนาจารย์ผู้ทรงคุณวุฒิ",
      contentTh: `สถาบันวิปัสสนาธุระ ร่วมกับภาควิชาวิปัสสนาภาวนาศึกษา จัดโครงการปฏิบัติวิปัสสนากรรมฐานเข้มข้นระยะเวลา ๓๐ วัน เพื่อเสริมสร้างสมาธิและปัญญาญาณตามหลักสติปัฏฐานกถา

กิจกรรมสำคัญ:
- การเดินจงกรมและนั่งสมาธิตามตารางปฏิบัติประจำวัน
- การสอบอารมณ์รายบุคคลกับพระวิปัสสนาจารย์
- การฟังธรรมบรรยายและธรรมปฏิบัติเชิงลึก`,
      coverImageUrl: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1200",
      isPinned: true,
      isPublished: true,
      publishedAt: now,
      viewCount: 520,
    },
  });

  // ๒.๕ สร้างภาควิชาและส่วนงาน (Departments & Academic Units)
  const deptBuddhism = await prisma.department.upsert({
    where: { tenantId_code: { tenantId, code: "DEPT-BUDDHISM" } },
    update: {
      nameTh: "ภาควิชาพระพุทธศาสนา",
      nameEn: "Department of Buddhism",
      facultyNameTh: "คณะพุทธศาสตร์",
      facultyNameEn: "Faculty of Buddhism",
      headName: "พระมหาดนัย ชิตมาโร (ดร.)",
      contactEmail: "buddhism@mcu.ac.th",
      contactPhone: "035-248-000 ต่อ 8100",
      officeLocation: "อาคารเรียนรวม โซน B ชั้น ๓ มจร วังน้อย",
      descriptionTh: "มุ่งเน้นการจัดการศึกษา วิจัย ค้นคว้า และบริการวิชาการด้านพระไตรปิฎก พระพุทธศาสนาเถรวาทและมหายาน",
    },
    create: {
      tenantId,
      code: "DEPT-BUDDHISM",
      nameTh: "ภาควิชาพระพุทธศาสนา",
      nameEn: "Department of Buddhism",
      facultyNameTh: "คณะพุทธศาสตร์",
      facultyNameEn: "Faculty of Buddhism",
      headName: "พระมหาดนัย ชิตมาโร (ดร.)",
      contactEmail: "buddhism@mcu.ac.th",
      contactPhone: "035-248-000 ต่อ 8100",
      officeLocation: "อาคารเรียนรวม โซน B ชั้น ๓ มจร วังน้อย",
      descriptionTh: "มุ่งเน้นการจัดการศึกษา วิจัย ค้นคว้า และบริการวิชาการด้านพระไตรปิฎก พระพุทธศาสนาเถรวาทและมหายาน",
      isActive: true,
    },
  });

  await prisma.department.upsert({
    where: { tenantId_code: { tenantId, code: "DEPT-REL-PHIL" } },
    update: {
      nameTh: "ภาควิชาศาสนาและปรัชญา",
      nameEn: "Department of Religion and Philosophy",
      facultyNameTh: "คณะพุทธศาสตร์",
      facultyNameEn: "Faculty of Buddhism",
      headName: "รศ.ดร.สุรศักดิ์ สุขวัฒน์",
      contactEmail: "relphil@mcu.ac.th",
      contactPhone: "035-248-000 ต่อ 8105",
      officeLocation: "อาคารเรียนรวม โซน B ชั้น ๓ มจร วังน้อย",
      descriptionTh: "ศึกษาเปรียบเทียบศาสนา ปรัชญาตะวันออกและตะวันตก",
    },
    create: {
      tenantId,
      code: "DEPT-REL-PHIL",
      nameTh: "ภาควิชาศาสนาและปรัชญา",
      nameEn: "Department of Religion and Philosophy",
      facultyNameTh: "คณะพุทธศาสตร์",
      facultyNameEn: "Faculty of Buddhism",
      headName: "รศ.ดร.สุรศักดิ์ สุขวัฒน์",
      contactEmail: "relphil@mcu.ac.th",
      contactPhone: "035-248-000 ต่อ 8105",
      officeLocation: "อาคารเรียนรวม โซน B ชั้น ๓ มจร วังน้อย",
      descriptionTh: "ศึกษาเปรียบเทียบศาสนา ปรัชญาตะวันออกและตะวันตก",
      isActive: true,
    },
  });

  await prisma.department.upsert({
    where: { tenantId_code: { tenantId, code: "VIPASSANA-INST" } },
    update: {
      nameTh: "สถาบันวิปัสสนาธุระ (ส่วนงานวิปัสสนาภาวนา)",
      nameEn: "Vipassana Bhavana Academic Division",
      facultyNameTh: "บัณฑิตวิทยาลัย / สถาบันวิปัสสนาธุระ",
      facultyNameEn: "Graduate School / Vipassana Institute",
      headName: "พระธรรมวัชราจารย์ (ผู้ช่วยเจ้าอาวาสวัดปากน้ำ)",
      contactEmail: "vipassana@mcu.ac.th",
      contactPhone: "035-248-000 ต่อ 8400",
      officeLocation: "อาคาร ๗๒ พรรษา พระธรรมปัญญาบดี มจร วังน้อย",
      descriptionTh: "ศูนย์กลางการศึกษา ค้นคว้า และส่งเสริมการปฏิบัติวิปัสสนากรรมฐานระดับสากล",
    },
    create: {
      tenantId,
      code: "VIPASSANA-INST",
      nameTh: "สถาบันวิปัสสนาธุระ (ส่วนงานวิปัสสนาภาวนา)",
      nameEn: "Vipassana Bhavana Academic Division",
      facultyNameTh: "บัณฑิตวิทยาลัย / สถาบันวิปัสสนาธุระ",
      facultyNameEn: "Graduate School / Vipassana Institute",
      headName: "พระธรรมวัชราจารย์ (ผู้ช่วยเจ้าอาวาสวัดปากน้ำ)",
      contactEmail: "vipassana@mcu.ac.th",
      contactPhone: "035-248-000 ต่อ 8400",
      officeLocation: "อาคาร ๗๒ พรรษา พระธรรมปัญญาบดี มจร วังน้อย",
      descriptionTh: "ศูนย์กลางการศึกษา ค้นคว้า และส่งเสริมการปฏิบัติวิปัสสนากรรมฐานระดับสากล",
      isActive: true,
    },
  });

  // ๓. สร้างหรืออัปเดตหลักสูตรตาม มคอ. ๒
  const existingCurr = await prisma.curriculum.findFirst({
    where: { tenantId, isActive: true },
  });

  const curriculum = await prisma.curriculum.upsert({
    where: existingCurr ? { id: existingCurr.id } : { tenantId_code: { tenantId, code: "6742061" } },
    update: {
      departmentId: deptBuddhism.id,
      code: "6742061",
      nameTh: "หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา (หลักสูตรใหม่ พ.ศ. ๒๕๖๗)",
      nameEn: "Master of Buddhism Program in Vipassanabhavana Studies (New Curriculum 2024)",
      degreeTitleTh: "พุทธศาสตรมหาบัณฑิต (วิปัสสนาภาวนาศึกษา) / พธ.ม. (วิปัสสนาภาวนาศึกษา)",
      degreeTitleEn: "Master of Buddhism (Vipassanabhavana Studies) / M.B. (Vipassanabhavana Studies)",
      totalCredits: 36,
      descriptionTh: "มุ่งเน้นผลิตมหาบัณฑิตที่มีความรู้ ความเข้าใจในหลักการและวิธีการปฏิบัติวิปัสสนาภาวนาตามแนวสติปัฏฐานอย่างถ่องแท้ มีความสามารถในการปฏิบัติ การวิจัย และการถ่ายทอดองค์ความรู้ด้านวิปัสสนาภาวนาสู่สังคมร่วมสมัยอย่างมีประสิทธิภาพและมีจริยธรรม",
      descriptionEn: "Aims to produce master's graduates with deep comprehension of Vipassana meditation principles based on Satipatthana, capable of rigorous practice, contemplative research, and effective knowledge propagation in contemporary society.",
      isActive: true,
    },
    create: {
      tenantId,
      departmentId: deptBuddhism.id,
      code: "6742061",
      nameTh: "หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา (หลักสูตรใหม่ พ.ศ. ๒๕๖๗)",
      nameEn: "Master of Buddhism Program in Vipassanabhavana Studies (New Curriculum 2024)",
      degreeTitleTh: "พุทธศาสตรมหาบัณฑิต (วิปัสสนาภาวนาศึกษา) / พธ.ม. (วิปัสสนาภาวนาศึกษา)",
      degreeTitleEn: "Master of Buddhism (Vipassanabhavana Studies) / M.B. (Vipassanabhavana Studies)",
      totalCredits: 36,
      descriptionTh: "มุ่งเน้นผลิตมหาบัณฑิตที่มีความรู้ ความเข้าใจในหลักการและวิธีการปฏิบัติวิปัสสนาภาวนาตามแนวสติปัฏฐานอย่างถ่องแท้ มีความสามารถในการปฏิบัติ การวิจัย และการถ่ายทอดองค์ความรู้ด้านวิปัสสนาภาวนาสู่สังคมร่วมสมัยอย่างมีประสิทธิภาพและมีจริยธรรม",
      descriptionEn: "Aims to produce master's graduates with deep comprehension of Vipassana meditation principles based on Satipatthana, capable of rigorous practice, contemplative research, and effective knowledge propagation in contemporary society.",
      isActive: true,
    },
  });

  // แผนการเรียน ๒ แผน ตาม มคอ. ๒
  await prisma.studyPlan.upsert({
    where: { id: "00000000-0000-0000-0000-000000000001" },
    update: {
      curriculumId: curriculum.id,
      planType: "PLAN_1",
      nameTh: "แผน ๑ (ทำวิทยานิพนธ์และศึกษารายวิชา)",
      nameEn: "Plan 1 (Coursework & Master's Thesis)",
      descriptionTh: "ศึกษารายวิชา ๒๔ หน่วยกิต (วิชาสัมพันธ์ ๙, วิชาเฉพาะ ๙, วิชาเลือก ๖) และทำวิทยานิพนธ์ ๑๒ หน่วยกิต รวม ๓๖ หน่วยกิต (พร้อมวิชาเสริมพื้นฐาน ๓ วิชา ไม่นับหน่วยกิต)",
      totalCredits: 36,
    },
    create: {
      id: "00000000-0000-0000-0000-000000000001",
      tenantId,
      curriculumId: curriculum.id,
      planType: "PLAN_1",
      nameTh: "แผน ๑ (ทำวิทยานิพนธ์และศึกษารายวิชา)",
      nameEn: "Plan 1 (Coursework & Master's Thesis)",
      descriptionTh: "ศึกษารายวิชา ๒๔ หน่วยกิต (วิชาสัมพันธ์ ๙, วิชาเฉพาะ ๙, วิชาเลือก ๖) และทำวิทยานิพนธ์ ๑๒ หน่วยกิต รวม ๓๖ หน่วยกิต (พร้อมวิชาเสริมพื้นฐาน ๓ วิชา ไม่นับหน่วยกิต)",
      totalCredits: 36,
    },
  });

  await prisma.studyPlan.upsert({
    where: { id: "00000000-0000-0000-0000-000000000002" },
    update: {
      curriculumId: curriculum.id,
      planType: "PLAN_2",
      nameTh: "แผน ๒ (ศึกษารายวิชาและทำสารนิพนธ์)",
      nameEn: "Plan 2 (Coursework & Thematic Paper)",
      descriptionTh: "ศึกษารายวิชา ๓๐ หน่วยกิต (วิชาสัมพันธ์ ๙, วิชาเฉพาะ ๑๒, วิชาเลือก ๙) และทำสารนิพนธ์ ๖ หน่วยกิต รวม ๓๖ หน่วยกิต (พร้อมวิชาเสริมพื้นฐาน ๓ วิชา ไม่นับหน่วยกิต)",
      totalCredits: 36,
    },
    create: {
      id: "00000000-0000-0000-0000-000000000002",
      tenantId,
      curriculumId: curriculum.id,
      planType: "PLAN_2",
      nameTh: "แผน ๒ (ศึกษารายวิชาและทำสารนิพนธ์)",
      nameEn: "Plan 2 (Coursework & Thematic Paper)",
      descriptionTh: "ศึกษารายวิชา ๓๐ หน่วยกิต (วิชาสัมพันธ์ ๙, วิชาเฉพาะ ๑๒, วิชาเลือก ๙) และทำสารนิพนธ์ ๖ หน่วยกิต รวม ๓๖ หน่วยกิต (พร้อมวิชาเสริมพื้นฐาน ๓ วิชา ไม่นับหน่วยกิต)",
      totalCredits: 36,
    },
  });

  // รายวิชาทั้ง ๓๑ รายวิชาตามเอกสารหลักสูตร มคอ. ๒
  const tqfCourses = [
    // ๑. วิชาเสริมพื้นฐาน (ไม่นับหน่วยกิต)
    {
      code: "600 104",
      nameTh: "การใช้ภาษาอังกฤษสำหรับบัณฑิตศึกษา",
      nameEn: "English for Graduate Studies",
      credits: 3,
      lecture: 3,
      lab: 0,
      self: 6,
      type: "BASIC",
      descTh: "ศึกษาทักษะการใช้ภาษาอังกฤษเพื่อการสื่อสารทางวิชาการ การอ่านและทำความเข้าใจบทความวิชาการทางพระพุทธศาสนา การเขียนสรุปความ และการนำเสนอผลงานทางวิชาการเป็นภาษาอังกฤษ",
    },
    {
      code: "102 302",
      nameTh: "การใช้ภาษาบาลี ๑",
      nameEn: "Pali Usage I",
      credits: 3,
      lecture: 3,
      lab: 0,
      self: 6,
      type: "BASIC",
      descTh: "ศึกษาไวยากรณ์บาลีเบื้องต้น โครงสร้างประโยค ศัพท์ และสำนวนภาษาบาลี เพื่อการสืบค้นและแปลความหมายจากคัมภีร์พระพุทธศาสนาชั้นต้น",
    },
    {
      code: "102 306",
      nameTh: "การใช้ภาษาบาลี ๒",
      nameEn: "Pali Usage II",
      credits: 3,
      lecture: 3,
      lab: 0,
      self: 6,
      type: "BASIC",
      descTh: "ศึกษาไวยากรณ์บาลีขั้นสูง การแปลพระไตรปิฎก อรรถกถา และฎีกา เน้นคำศัพท์และรูปประโยคที่เกี่ยวข้องกับการปฏิบัติสมถะและวิปัสสนาภาวนา",
    },

    // ๒. หมวดวิชาสัมพันธ์ / บังคับ (๙ หน่วยกิต)
    {
      code: "600 101",
      nameTh: "พระไตรปิฎกวิเคราะห์",
      nameEn: "Analytical Study of Tipitaka",
      credits: 3,
      lecture: 3,
      lab: 0,
      self: 6,
      type: "CORE",
      descTh: "ศึกษาประวัติ ความเป็นมา โครงสร้าง และสาระสำคัญของพระวินัยปิฎก พระสุตตันตปิฎก และพระอภิธรรมปิฎก การวิเคราะห์หลักธรรมสำคัญเพื่อการประยุกต์ใช้ในการปฏิบัติและการแก้ปัญหาสังคมร่วมสมัย",
    },
    {
      code: "606 202",
      nameTh: "สติปัฏฐานภาวนา",
      nameEn: "Satipatthana Bhavana",
      credits: 3,
      lecture: 3,
      lab: 0,
      self: 6,
      type: "CORE",
      descTh: "ศึกษาวิเคราะห์มหาสติปัฏฐานสูตรในพระสุตตันตปิฎก และอรรถกถาฎีกาที่เกี่ยวข้อง ทั้งกายานุปัสสนา เวทนานุปัสสนา จิตตานุปัสสนา และธัมมานุปัสสนา เพื่อเป็นรากฐานการปฏิบัติวิปัสสนาภาวนา",
    },
    {
      code: "606 203",
      nameTh: "ระเบียบวิธีวิจัยทางวิปัสสนาภาวนา",
      nameEn: "Research Methodology in Vipassana Meditation",
      credits: 3,
      lecture: 3,
      lab: 0,
      self: 6,
      type: "CORE",
      descTh: "ศึกษาหลักการและกระบวนการวิจัยทางพระพุทธศาสนา ระเบียบวิธีวิจัยเชิงคุณภาพ เชิงปริมาณ และเชิงปฏิบัติการ การออกแบบงานวิจัยด้านวิปัสสนาภาวนา การรวบรวมข้อมูล การวิเคราะห์ข้อมูล และการเขียนรายงานการวิจัย",
    },

    // ๓. หมวดวิชาเฉพาะด้านวิปัสสนาและปฏิบัติ
    {
      code: "606 105",
      nameTh: "สมถภาวนา",
      nameEn: "Samatha Bhavana",
      credits: 3,
      lecture: 3,
      lab: 0,
      self: 6,
      type: "SPECIALIZED",
      descTh: "ศึกษาหลักธรรม อารมณ์ และวิธีการเจริญสมถกัมมัฏฐาน ๔๐ วิธีตามแนวคัมภีร์วิสุทธิมรรค องค์ฌาน อุปจารสมาธิ อัปปนาสมาธิ และการนำสมถะมาเป็นบาทฐานแก่วิปัสสนาภาวนา",
    },
    {
      code: "606 206",
      nameTh: "วิปัสสนาภาวนา",
      nameEn: "Vipassana Bhavana",
      credits: 3,
      lecture: 3,
      lab: 0,
      self: 6,
      type: "SPECIALIZED",
      descTh: "ศึกษากระบวนการและลำดับขั้นตอนการเจริญวิปัสสนาภาวนา อารมณ์ของวิปัสสนา วิปัสสนาภูมิ ๖ วิสุทธิ ๗ และการเกิดขึ้นของวิปัสสนาญาณ ๑๖ อย่างเป็นระบบ",
    },
    {
      code: "606 307",
      nameTh: "สัมมนาวิปัสสนาภาวนา",
      nameEn: "Seminar on Vipassana Bhavana",
      credits: 3,
      lecture: 3,
      lab: 0,
      self: 6,
      type: "SPECIALIZED",
      descTh: "การสัมมนาแลกเปลี่ยนประเด็นปัญหา ประสบการณ์ และปรากฏการณ์ที่เกิดขึ้นจากการปฏิบัติวิปัสสนาภาวนา การวิเคราะห์ตามคัมภีร์เถรวาท และการนำเสนอแนวทางแก้ไขข้อขัดข้องในการปฏิบัติ",
    },
    {
      code: "606 408",
      nameTh: "ปฏิบัติวิปัสสนาภาวนา",
      nameEn: "Vipassana Meditation Practice",
      credits: 3,
      lecture: 1,
      lab: 4,
      self: 4,
      type: "PRACTICE_VIPASSANA",
      descTh: "การเข้าปฏิบัติวิปัสสนากรรมฐานอย่างเข้มข้นต่อเนื่องเป็นเวลาไม่น้อยกว่า ๓ เดือน (๙๐ วัน) ตามแนวสติปัฏฐาน ๔ ณ สถาบันวิปัสสนาธุระ หรือสำนักวิปัสสนากรรมฐานที่มหาวิทยาลัยให้การรับรอง มีการส่งและสอบอารมณ์สม่ำเสมอ",
    },

    // ๔. หมวดวิชาเลือกเฉพาะสาขา (Electives)
    {
      code: "606 109",
      nameTh: "ปรมัตถธรรมวิเคราะห์",
      nameEn: "Analytical Study of Paramattha Dhamma",
      credits: 3,
      lecture: 3,
      lab: 0,
      self: 6,
      type: "ELECTIVE",
      descTh: "ศึกษาวิเคราะห์สภาวธรรมอันเป็นปรมัตถ์ คือ จิต เจตสิก รูป และนิพพาน ตามแนวพระอภิธรรมปิฎก เพื่อความเข้าใจสภาพธรรมที่เกิดขึ้นจริงในขณะเจริญวิปัสสนา",
    },
    {
      code: "606 310",
      nameTh: "การเป็นวิทยากรและการจัดค่ายวิปัสสนาภาวนา",
      nameEn: "Being a Speaker and Organizing Vipassana Retreats",
      credits: 3,
      lecture: 2,
      lab: 2,
      self: 5,
      type: "ELECTIVE",
      descTh: "ศึกษาบทบาท เทคนิค และคุณสมบัติของวิทยากรวิปัสสนาภาวนา การออกแบบหลักสูตรค่าย การจัดกิจกรรมและการประเมินผลการจัดค่ายปฏิบัติธรรมสำหรับเยาวชนและประชาชนทั่วไป",
    },
    {
      code: "606 311",
      nameTh: "การประเมินผลการปฏิบัติวิปัสสนาภาวนา",
      nameEn: "Evaluation of Vipassana Meditation Practice",
      credits: 3,
      lecture: 2,
      lab: 2,
      self: 5,
      type: "ELECTIVE",
      descTh: "ศึกษาเครื่องมือ เทคนิค และมาตรฐานในการติดตามและประเมินผลสภาวธรรมของผู้ปฏิบัติวิปัสสนาภาวนา การบันทึกสภาวะ การสัมภาษณ์และการสอบอารมณ์ตามหลักเกณฑ์ในคัมภีร์",
    },
    {
      code: "606 112",
      nameTh: "วิปัสสนาภาวนากับสังคมร่วมสมัย",
      nameEn: "Vipassana Meditation and Contemporary Society",
      credits: 3,
      lecture: 3,
      lab: 0,
      self: 6,
      type: "ELECTIVE",
      descTh: "ศึกษาการประยุกต์ใช้วิปัสสนาภาวนาในการบำบัดความเครียด ภาวะซึมเศร้า และการพัฒนาคุณภาพชีวิตของคนในสังคมปัจจุบัน การสร้างภูมิคุ้มกันทางจิตใจในยุคดิจิทัล",
    },
    {
      code: "606 213",
      nameTh: "ชีวิตและผลงานพระวิปัสสนาจารย์ไทย",
      nameEn: "Lives and Works of Thai Vipassana Masters",
      credits: 3,
      lecture: 3,
      lab: 0,
      self: 6,
      type: "ELECTIVE",
      descTh: "ศึกษาชีวประวัติ ปฏิปทา วิธีการสอน และคุณูปการของพระวิปัสสนาจารย์ที่มีชื่อเสียงของประเทศไทย เช่น พระมงคลเทพมุนี (สด จนฺทสโร), หลวงปู่มั่น ภูริทตฺโต, หลวงพ่อเทียน จิตฺตสุโภ, พระธรรมธีรราชมหามุนี (โชดก ญาณสิทฺธิ) เป็นต้น",
    },
    {
      code: "606 314",
      nameTh: "เทคโนโลยีสารสนเทศเพื่อการเผยแผ่วิปัสสนาภาวนา",
      nameEn: "Information Technology for Vipassana Meditation Propagation",
      credits: 3,
      lecture: 2,
      lab: 2,
      self: 5,
      type: "ELECTIVE",
      descTh: "ศึกษาการนำเทคโนโลยีดิจิทัล สื่อออนไลน์ แอปพลิเคชัน และแพลตฟอร์มการเรียนรู้สมัยใหม่มาใช้ในการเผยแผ่และการสอนวิปัสสนาภาวนาสู่กลุ่มเป้าหมายสากล",
    },
    {
      code: "606 315",
      nameTh: "การศึกษาอิสระทางวิปัสสนาภาวนา",
      nameEn: "Independent Study in Vipassana Meditation",
      credits: 3,
      lecture: 0,
      lab: 0,
      self: 9,
      type: "ELECTIVE",
      descTh: "การค้นคว้า วิจัย หรือศึกษาประเด็นเฉพาะด้านวิปัสสนาภาวนาที่นิสิตมีความสนใจ ภายใต้คำแนะนำของอาจารย์ที่ปรึกษา และจัดทำรายงานวิชาการ",
    },
    {
      code: "606 116",
      nameTh: "จรณะศึกษา",
      nameEn: "Carana Studies",
      credits: 3,
      lecture: 3,
      lab: 0,
      self: 6,
      type: "ELECTIVE",
      descTh: "ศึกษาหลักจรณะ ๑๕ ประการ อันเป็นความประพฤติและศีลธรรมที่เอื้อต่อการบรรลุวิชชาและวิปัสสนาญาณ เพื่อพัฒนาจริยวัตรและจิตสำนึกแห่งการเป็นผู้นำทางจิตวิญญาณ",
    },
    {
      code: "606 317",
      nameTh: "วิปัสสนาภาวนาในคัมภีร์พระพุทธศาสนา",
      nameEn: "Vipassana Meditation in Buddhist Scriptures",
      credits: 3,
      lecture: 3,
      lab: 0,
      self: 6,
      type: "ELECTIVE",
      descTh: "ศึกษาวิเคราะห์คำสอนเรื่องวิปัสสนาภาวนาที่ปรากฏในคัมภีร์ปฏิสัมภิทามรรค เนตติปกรณ์ และมิลินทปัญหา เพื่อความกระจ่างแจ้งในรากฐานทางคัมภีร์",
    },
    {
      code: "606 318",
      nameTh: "เทคนิคและกระบวนการสอนวิปัสสนาภาวนา",
      nameEn: "Techniques and Processes of Teaching Vipassana Meditation",
      credits: 3,
      lecture: 2,
      lab: 2,
      self: 5,
      type: "ELECTIVE",
      descTh: "ศึกษาจิตวิทยาการสอน ทักษะการสื่อสาร กระบวนการให้คำปรึกษา และเทคนิคการแนะนำอารมณ์กรรมฐานแก่ผู้ปฏิบัติที่มีพื้นฐานและปัญหาแตกต่างกัน",
    },
    {
      code: "606 319",
      nameTh: "กัมมัฏฐานในคัมภีร์พระอภิธรรม",
      nameEn: "Kammatthana in Abhidhamma",
      credits: 3,
      lecture: 3,
      lab: 0,
      self: 6,
      type: "ELECTIVE",
      descTh: "ศึกษาหมวดกัมมัฏฐานในอภิธัมมัตถสังคหะ คัมภีร์ยมก และคัมภีร์ปัฏฐาน เพื่อเข้าใจความสัมพันธ์ระหว่างสภาพจิตและอารมณ์ภาวนาอย่างละเอียดลึกซึ้ง",
    },
    {
      code: "606 220",
      nameTh: "วิปัสสนาญาณ ๑๖",
      nameEn: "The Sixteen Stages of Vipassana Knowledge",
      credits: 3,
      lecture: 3,
      lab: 0,
      self: 6,
      type: "ELECTIVE",
      descTh: "ศึกษาวิเคราะห์พัฒนาการของวิปัสสนาญาณทั้ง ๑๖ ขั้น ตั้งแต่นามรูปปริจเฉทญาณ จนถึงมัคคญาณ ผลญาณ และปัจจเวกขณญาณ รวมถึงวิปัสสนูปกิเลส ๑๐",
    },
    {
      code: "606 321",
      nameTh: "ภาษาอังกฤษเพื่อการสอนวิปัสสนาภาวนา",
      nameEn: "English for Teaching Vipassana Meditation",
      credits: 3,
      lecture: 3,
      lab: 0,
      self: 6,
      type: "ELECTIVE",
      descTh: "ศึกษาคำศัพท์ สำนวน และทักษะภาษาอังกฤษที่ใช้ในการนำปฏิบัติ การบรรยายธรรม และการสอบอารมณ์กรรมฐานแก่ชาวต่างชาติ",
    },
    {
      code: "606 122",
      nameTh: "ภาษาบาลีเพื่อการวิจัยวิปัสสนาภาวนา",
      nameEn: "Pali for Vipassana Meditation Research",
      credits: 3,
      lecture: 3,
      lab: 0,
      self: 6,
      type: "ELECTIVE",
      descTh: "ศึกษาคำศัพท์และโครงสร้างภาษาบาลีเฉพาะด้านสมถะและวิปัสสนา เพื่อประโยชน์ในการตรวจสอบเทียบเคียงคัมภีร์และการทำวิจัยเชิงคัมภีร์",
    },
    {
      code: "606 323",
      nameTh: "ยุทธศาสตร์การบริหารศูนย์วิปัสสนาภาวนา",
      nameEn: "Strategic Management of Vipassana Meditation Centers",
      credits: 3,
      lecture: 3,
      lab: 0,
      self: 6,
      type: "ELECTIVE",
      descTh: "ศึกษาหลักการบริหารจัดการสำนักปฏิบัติธรรม การวางแผนยุทธศาสตร์ การบริหารบุคลากร งบประมาณ และการสร้างเครือข่ายความร่วมมือทั้งในและต่างประเทศ",
    },
    {
      code: "606 324",
      nameTh: "วิปัสสนาภาวนากับการพัฒนาสังคม",
      nameEn: "Vipassana Meditation and Social Development",
      credits: 3,
      lecture: 3,
      lab: 0,
      self: 6,
      type: "ELECTIVE",
      descTh: "ศึกษาบทบาทของวิปัสสนาภาวนาในการเสริมสร้างสันติภาพ ความสมานฉันท์ในชุมชน และการขับเคลื่อนองค์กรคุณธรรมเพื่อการพัฒนาสังคมที่ยั่งยืน",
    },
    {
      code: "606 325",
      nameTh: "การศึกษาวิเคราะห์วิปัสสนากับสมาธิทั่วไป",
      nameEn: "Analytical Study of Vipassana and General Meditation",
      credits: 3,
      lecture: 3,
      lab: 0,
      self: 6,
      type: "ELECTIVE",
      descTh: "ศึกษาเปรียบเทียบความเหมือนและความต่างระหว่างวิปัสสนาภาวนาตามแนวพุทธศาสนากับการทำสมาธิในศาสนาและลัทธิอื่น เช่น โยคะ เซน ทรานเซนเดนทัล เป็นต้น",
    },
    {
      code: "606 326",
      nameTh: "การบูรณาการวิปัสสนาภาวนากับศาสตร์สมัยใหม่",
      nameEn: "Integration of Vipassana Meditation with Modern Sciences",
      credits: 3,
      lecture: 3,
      lab: 0,
      self: 6,
      type: "ELECTIVE",
      descTh: "ศึกษาการบูรณาการหลักวิปัสสนาภาวนากับวิทยาศาสตร์ทางสมอง (Neuroscience) จิตวิทยาการรู้คิด (Cognitive Psychology) และการแพทย์เชิงป้องกัน",
    },
    {
      code: "606 327",
      nameTh: "อานาปานสติภาวนาศึกษา",
      nameEn: "Anapanasati Bhavana Studies",
      credits: 3,
      lecture: 3,
      lab: 0,
      self: 6,
      type: "ELECTIVE",
      descTh: "ศึกษาวิเคราะห์อานาปานสติสูตร ขั้นตอนการเจริญอานาปานสติ ๑๖ ขั้น และการต่อยอดจากลมหายใจเข้า-ออกสู่การรู้แจ้งในวิปัสสนาญาณ",
    },

    // ๕. หมวดวิจัย / วิทยานิพนธ์ (Research / Thesis)
    {
      code: "602 200",
      nameTh: "วิทยานิพนธ์",
      nameEn: "Master's Thesis",
      credits: 12,
      lecture: 0,
      lab: 0,
      self: 36,
      type: "THESIS",
      descTh: "การทำวิทยานิพนธ์ที่มีมาตรฐานทางวิชาการ ก่อให้เกิดองค์ความรู้ใหม่ทางวิปัสสนาภาวนาและพระพุทธศาสนา ภายใต้การควบคุมของคณะกรรมการที่ปรึกษาวิทยานิพนธ์และเผยแพร่ตามเกณฑ์มาตรฐาน",
    },
    {
      code: "602 400",
      nameTh: "สารนิพนธ์",
      nameEn: "Thematic Paper",
      credits: 6,
      lecture: 0,
      lab: 0,
      self: 18,
      type: "THESIS",
      descTh: "การศึกษา ค้นคว้า และเรียบเรียงสารนิพนธ์ในหัวข้อเฉพาะทางด้านวิปัสสนาภาวนาที่มีระเบียบวิธีวิจัยถูกต้อง พร้อมทั้งการสอบปากเปล่าและการเผยแพร่งานวิชาการ",
    },
  ];

  for (const c of tqfCourses) {
    await prisma.course.upsert({
      where: { tenantId_courseCode: { tenantId, courseCode: c.code } },
      update: {
        curriculumId: curriculum.id,
        nameTh: c.nameTh,
        nameEn: c.nameEn,
        creditTotal: c.credits,
        creditLecture: c.lecture,
        creditLab: c.lab,
        creditSelf: c.self,
        courseType: c.type,
        descriptionTh: c.descTh,
      },
      create: {
        tenantId,
        curriculumId: curriculum.id,
        courseCode: c.code,
        nameTh: c.nameTh,
        nameEn: c.nameEn,
        creditTotal: c.credits,
        creditLecture: c.lecture,
        creditLab: c.lab,
        creditSelf: c.self,
        courseType: c.type,
        descriptionTh: c.descTh,
      },
    });
  }

  // ๔. สร้างข้อมูลทำเนียบคณาจารย์และพระวิปัสสนาจารย์
  const facultyMembers = [
    {
      titleTh: "พระธรรมวัชรบัณฑิต",
      academicRank: "ศ.ดร.",
      firstNameTh: "",
      monasticName: "สมจินต์ สมฺมาปญฺโญ",
      monasticRank: "พระราชาคณะชั้นธรรม, ป.ธ.๙",
      templeName: "วัดปากน้ำ ภาษีเจริญ กรุงเทพฯ",
      positionTh: "อธิการบดี มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย",
      isVipassanaMaster: false,
      isExecutive: true,
      expertise: "พระพุทธศาสนา, พระไตรปิฎกศึกษา, ปรัชญาการศึกษาเชิงพุทธ",
      sortOrder: 1,
    },
    {
      titleTh: "พระมหาสมบูรณ์",
      academicRank: "รศ.ดร.",
      firstNameTh: "",
      monasticName: "วุฑฺฒิกโร",
      monasticRank: "เปรียญธรรม ๗ ประโยค",
      templeName: "วัดหงส์รัตนาราม กรุงเทพฯ",
      positionTh: "คณบดีบัณฑิตวิทยาลัย มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย",
      isVipassanaMaster: false,
      isExecutive: true,
      expertise: "พระพุทธศาสนามหายานและเถรวาท, ระเบียบวิธีวิจัยทางพระพุทธศาสนา",
      sortOrder: 2,
    },
    {
      titleTh: "พระครูปลัดสุวัฒนวชิรคุณ",
      academicRank: "ผศ.ดร.",
      firstNameTh: "ไสว",
      monasticName: "ฐิตสิริ",
      monasticRank: "พระครูสัญญาบัตร",
      templeName: "วัดยานนาวา กรุงเทพฯ",
      positionTh: "ผู้อำนวยการหลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา",
      isVipassanaMaster: true,
      isExecutive: true,
      expertise: "วิปัสสนากรรมฐาน, คัมภีร์วิสุทธิมรรค, การสอบอารมณ์กรรมฐาน",
      sortOrder: 3,
    },
    {
      titleTh: "พระครูภาวนาวรานุวัตร",
      academicRank: "ดร.",
      firstNameTh: "",
      monasticName: "เขมธโร",
      monasticRank: "พระวิปัสสนาจารย์",
      templeName: "สถาบันวิปัสสนาธุระ มจร วังน้อย อยุธยา",
      positionTh: "พระวิปัสสนาจารย์ประจำหลักสูตร",
      isVipassanaMaster: true,
      isExecutive: false,
      expertise: "สติปัฏฐาน ๔, การปฏิบัติวิปัสสนาเชิงลึก, การฝึกจิตตภาวนา",
      sortOrder: 4,
    },
    {
      titleTh: "รศ.ดร.",
      academicRank: "รศ.ดร.",
      firstNameTh: "เวทย์",
      lastNameTh: "บรรณกรกุล",
      monasticName: null,
      monasticRank: null,
      templeName: null,
      positionTh: "อาจารย์ประจำหลักสูตรและผู้ทรงคุณวุฒิ",
      isVipassanaMaster: false,
      isExecutive: false,
      expertise: "พระอภิธรรมปิฎก, จิต เจตสิก รูป นิพพาน, ปริยัติธรรมสู่การปฏิบัติ",
      sortOrder: 5,
    },
  ];

  for (const f of facultyMembers) {
    await prisma.facultyMember.create({
      data: {
        tenantId,
        titleTh: f.titleTh,
        academicRank: f.academicRank,
        firstNameTh: f.firstNameTh,
        lastNameTh: f.lastNameTh ?? null,
        monasticName: f.monasticName,
        monasticRank: f.monasticRank,
        templeName: f.templeName,
        positionTh: f.positionTh,
        isVipassanaMaster: f.isVipassanaMaster,
        isExecutive: f.isExecutive,
        expertise: f.expertise,
        sortOrder: f.sortOrder,
      },
    });
  }

  // ๕. สร้างรอบรับสมัครเรียน
  const round = await prisma.admissionRound.upsert({
    where: { id: "00000000-0000-0000-0000-000000000010" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000010",
      tenantId,
      year: 2569,
      term: 1,
      titleTh: "รับสมัครนิสิตระดับปริญญาโท สาขาวิชาวิปัสสนาภาวนาศึกษา รุ่นที่ ๑๕ ประจำปีการศึกษา ๒๕๖๙",
      titleEn: "Master's Degree Admissions Batch 15 Academic Year 2026",
      startDate: new Date("2026-01-01"),
      endDate: new Date("2026-12-31"),
      feeAmount: 500,
      isActive: true,
    },
  });

  // ผู้สมัครตัวอย่าง
  await prisma.application.upsert({
    where: { tenantId_applicationNo: { tenantId, applicationNo: "VIP-2569-0001" } },
    update: {},
    create: {
      tenantId,
      roundId: round.id,
      applicationNo: "VIP-2569-0001",
      applicantType: "MONK",
      titleTh: "พระ",
      firstNameTh: "สมชาย",
      monasticName: "ชิตมาโร",
      templeName: "วัดมหาธาตุยุวราชรังสฤษฎิ์ กรุงเทพฯ",
      idCardOrPassport: "1100200300401",
      phone: "081-234-5678",
      email: "somchai.monk@mcu.local",
      educationBackground: "พธ.บ. (พระพุทธศาสนา), น.ธ.เอก",
      status: "PAYMENT_VERIFIED",
    },
  });

  // ๖. ข้อมูลทะเบียนนิสิตตัวอย่าง
  const student = await prisma.studentProfile.upsert({
    where: { tenantId_studentCode: { tenantId, studentCode: "6801201001" } },
    update: {},
    create: {
      tenantId,
      studentCode: "6801201001",
      applicantType: "MONK",
      titleTh: "พระมหา",
      firstNameTh: "อานนท์",
      monasticName: "อาภสฺสโร",
      monasticRank: "เปรียญธรรม ๙ ประโยค",
      templeName: "วัดอรุณราชวราราม กรุงเทพฯ",
      ecclesiasticalProvince: "ภาค ๑",
      batchYear: 2568,
      status: "STUDYING",
      phone: "089-987-6543",
      email: "ananda@mcu.local",
    },
  });

  // ๗. แบบคำร้องและคำร้องตัวอย่าง
  const template1 = await prisma.documentTemplate.upsert({
    where: { tenantId_code: { tenantId, code: "REQ-LEAVE-RETREAT" } },
    update: {},
    create: {
      tenantId,
      code: "REQ-LEAVE-RETREAT",
      titleTh: "คำร้องขอลาปฏิบัติธรรมกรรมฐานประจำปี",
      description: "สำหรับนิสิตที่ประสงค์เข้าร่วมโครงการปฏิบัติวิปัสสนากรรมฐานเข้มข้น ณ ศูนย์ปฏิบัติธรรม มจร",
      isActive: true,
    },
  });

  await prisma.studentPetition.upsert({
    where: { tenantId_petitionNo: { tenantId, petitionNo: "REQ-2569-0001" } },
    update: {},
    create: {
      tenantId,
      studentId: student.id,
      templateId: template1.id,
      petitionNo: "REQ-2569-0001",
      title: "ขออนุมัติเข้าร่วมโครงการปฏิบัติวิปัสสนากรรมฐาน ๓๐ วัน",
      reason: "เพื่อเก็บหน่วยกิตวิชาปฏิบัติวิปัสสนาภาวนาขั้นสูงและฝึกจิตตภาวนาตามหลักสูตร",
      status: "APPROVED",
      currentStep: 2,
      approverNote: "เห็นควรอนุมัติเพื่อพัฒนาจิตตปัญญาตามแนวสติปัฏฐาน",
    },
  });

  // ๘. ตารางเรียนภาคเสาร์-อาทิตย์ และห้องเรียน Zoom
  const semester = await prisma.academicSemester.upsert({
    where: { tenantId_year_semester: { tenantId, year: 2569, semester: 1 } },
    update: {},
    create: {
      tenantId,
      year: 2569,
      semester: 1,
      nameTh: "ภาคการศึกษาที่ ๑/๒๕๖๙",
      isCurrent: true,
    },
  });

  const schedules = [
    {
      courseCode: "600 101",
      courseName: "พระไตรปิฎกวิเคราะห์",
      instructorName: "พระมหาสมบูรณ์ วุฑฺฒิกโร, รศ.ดร.",
      dayOfWeek: "SATURDAY",
      startTime: "09:00",
      endTime: "12:00",
      roomNumber: "ห้องบรรยาย บัณฑิตศึกษา ๔๐๑",
      teachingMode: "HYBRID",
      onlineMeetingUrl: "https://zoom.us/j/9876543210",
      onlineMeetingPasscode: "MCU600101",
    },
    {
      courseCode: "606 202",
      courseName: "สติปัฏฐานภาวนา",
      instructorName: "พระครูปลัดสุวัฒนวชิรคุณ, ผศ.ดร.",
      dayOfWeek: "SATURDAY",
      startTime: "13:00",
      endTime: "16:00",
      roomNumber: "ห้องบรรยาย บัณฑิตศึกษา ๔๐๑",
      teachingMode: "HYBRID",
      onlineMeetingUrl: "https://zoom.us/j/9876543211",
      onlineMeetingPasscode: "MCU606202",
    },
    {
      courseCode: "606 408",
      courseName: "ปฏิบัติวิปัสสนาภาวนา (สอบอารมณ์)",
      instructorName: "พระครูภาวนาวรานุวัตร, ดร.",
      dayOfWeek: "SUNDAY",
      startTime: "09:00",
      endTime: "16:00",
      roomNumber: "ศูนย์พัฒนาจิตตปัญญา มจร วังน้อย",
      teachingMode: "ONSITE",
    },
  ];

  for (const s of schedules) {
    await prisma.classSchedule.create({
      data: {
        tenantId,
        semesterId: semester.id,
        courseCode: s.courseCode,
        courseName: s.courseName,
        instructorName: s.instructorName,
        dayOfWeek: s.dayOfWeek,
        startTime: s.startTime,
        endTime: s.endTime,
        roomNumber: s.roomNumber,
        teachingMode: s.teachingMode,
        onlineMeetingUrl: s.onlineMeetingUrl ?? null,
        onlineMeetingPasscode: s.onlineMeetingPasscode ?? null,
      },
    });
  }

  // ๙. คลังวิทยานิพนธ์เพื่อสร้างองค์ความรู้ใหม่ (Theses)
  await prisma.thesis.upsert({
    where: { id: "00000000-0000-0000-0000-000000000101" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000101",
      tenantId,
      studentId: student.id,
      authorName: "พระมหาอานนท์ อาภสฺสโร",
      titleTh: "การศึกษาวิเคราะห์การเจริญสติปัฏฐาน ๔ ในคัมภีร์วิสุทธิมรรคเพื่อเยียวยาภาวะจิตตกังวลในสังคมร่วมสมัย",
      titleEn: "An Analytical Study of the Four Foundations of Mindfulness in Visuddhimagga for Healing Anxiety in Contemporary Society",
      advisorName: "พระครูปลัดสุวัฒนวชิรคุณ, ผศ.ดร.",
      coAdvisorName: "รศ.ดร.เวทย์ บรรณกรกุล",
      status: "PUBLISHED",
      abstractTh: "งานวิจัยนี้มีวัตถุประสงค์เพื่อศึกษาหลักการปฏิบัติวิปัสสนากรรมฐานตามแนวสติปัฏฐานในคัมภีร์วิสุทธิมรรค และประยุกต์ใช้ในการปรับสมดุลสภาวะจิตใจเพื่อลดความวิตกกังวล ผลการวิจัยพบว่าการตามรู้กาย เวทนา จิต ธรรม อย่างเป็นปัจจุบันช่วยลดปฏิกิริยาอัตโนมัติของสมองส่วนอารมณ์ และสร้างความมั่นคงทางจิตปัญญาอย่างยั่งยืน",
      keywords: "สติปัฏฐาน ๔, วิสุทธิมรรค, วิปัสสนาภาวนา, การเยียวยาจิตใจ, มจร",
      similarityPercentage: 4.5,
      defenseDate: new Date("2026-03-15"),
      newBodyOfKnowledge: "โมเดลบูรณาการวิปัสสนาภาวนาบำบัด (Vipassana Mindfulness Therapy Model) ที่สังเคราะห์จากอรรถกถาวิสุทธิมรรคเข้ากับจิตวิทยาการเจริญสติ",
      yearGraduated: 2568,
    },
  });

  console.log("[seed-academic] สำเร็จเรียบร้อยครบทั้ง ๘ ฟีเจอร์!");
}
