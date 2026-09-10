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

  // ๓. สร้างหลักสูตร
  const curriculum = await prisma.curriculum.upsert({
    where: { tenantId_code: { tenantId, code: "MCU-MA-VIPASSANA-2567" } },
    update: {},
    create: {
      tenantId,
      code: "MCU-MA-VIPASSANA-2567",
      nameTh: "หลักสูตรพุทธศาสตรมหาบัณฑิต สาขาวิชาวิปัสสนาภาวนาศึกษา (หลักสูตรปรับปรุง พ.ศ. ๒๕๖๗)",
      nameEn: "Master of Buddhism Program in Vipassana Meditation Studies (Revised 2024)",
      degreeTitleTh: "พุทธศาสตรมหาบัณฑิต (วิปัสสนาภาวนาศึกษา) / พธ.ม. (วิปัสสนาภาวนาศึกษา)",
      degreeTitleEn: "Master of Buddhism (Vipassana Meditation Studies) / M.B. (Vipassana Meditation Studies)",
      totalCredits: 36,
      descriptionTh: "มุ่งเน้นการบูรณาการพระไตรปิฎก คัมภีร์วิสุทธิมรรค เข้ากับการปฏิบัติวิปัสสนาภาวนาจริง และการวิจัยเชิงลึกเพื่อสร้างองค์ความรู้ใหม่ทางจิตปัญญา",
      isActive: true,
    },
  });

  // แผนการเรียน
  await prisma.studyPlan.upsert({
    where: { id: "00000000-0000-0000-0000-000000000001" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000001",
      tenantId,
      curriculumId: curriculum.id,
      planType: "PLAN_A1",
      nameTh: "แผน ก แบบ ก ๑ (เน้นการทำวิทยานิพนธ์)",
      nameEn: "Plan A Type A1 (Thesis Research Only)",
      descriptionTh: "ทำเฉพาะวิทยานิพนธ์ที่มีคุณค่าทางวิชาการและองค์ความรู้ใหม่ ไม่น้อยกว่า ๓๖ หน่วยกิต",
      totalCredits: 36,
    },
  });

  await prisma.studyPlan.upsert({
    where: { id: "00000000-0000-0000-0000-000000000002" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000002",
      tenantId,
      curriculumId: curriculum.id,
      planType: "PLAN_A2",
      nameTh: "แผน ก แบบ ก ๒ (ศึกษารายวิชาและทำวิทยานิพนธ์)",
      nameEn: "Plan A Type A2 (Coursework & Thesis)",
      descriptionTh: "ศึกษารายวิชา ๒๔ หน่วยกิต และทำวิทยานิพนธ์ ๑๒ หน่วยกิต รวม ๓๖ หน่วยกิต",
      totalCredits: 36,
    },
  });

  // รายวิชา
  const sampleCourses = [
    { code: "602 101", nameTh: "วิธีวิทยาการวิจัยทางพระพุทธศาสนา", nameEn: "Research Methodology in Buddhism", credits: 3, type: "BASIC" },
    { code: "602 102", nameTh: "พระไตรปิฎกวิเคราะห์", nameEn: "Analytical Study of Tipitaka", credits: 3, type: "CORE" },
    { code: "602 201", nameTh: "ทฤษฎีและประวัติวิปัสสนาภาวนา", nameEn: "Theory and History of Vipassana Meditation", credits: 3, type: "CORE" },
    { code: "602 202", nameTh: "คัมภีร์วิสุทธิมรรคและอภิธรรมภาวนา", nameEn: "Visuddhimagga and Abhidhamma Meditation", credits: 3, type: "SPECIALIZED" },
    { code: "602 301", nameTh: "การปฏิบัติวิปัสสนาภาวนาขั้นสูง ๑", nameEn: "Advanced Vipassana Practice I", credits: 3, type: "PRACTICE_VIPASSANA" },
    { code: "602 302", nameTh: "การปฏิบัติวิปัสสนาภาวนาขั้นสูง ๒", nameEn: "Advanced Vipassana Practice II", credits: 3, type: "PRACTICE_VIPASSANA" },
    { code: "602 400", nameTh: "วิทยานิพนธ์", nameEn: "Master's Thesis", credits: 12, type: "THESIS" },
  ];

  for (const c of sampleCourses) {
    await prisma.course.upsert({
      where: { tenantId_courseCode: { tenantId, courseCode: c.code } },
      update: {},
      create: {
        tenantId,
        curriculumId: curriculum.id,
        courseCode: c.code,
        nameTh: c.nameTh,
        nameEn: c.nameEn,
        creditTotal: c.credits,
        creditLecture: c.type === "THESIS" ? 0 : 3,
        creditLab: 0,
        creditSelf: 6,
        courseType: c.type,
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
      courseCode: "602 101",
      courseName: "วิธีวิทยาการวิจัยทางพระพุทธศาสนา",
      instructorName: "พระมหาสมบูรณ์ วุฑฺฒิกโร, รศ.ดร.",
      dayOfWeek: "SATURDAY",
      startTime: "09:00",
      endTime: "12:00",
      roomNumber: "ห้องบรรยาย บัณฑิตศึกษา ๔๐๑",
      teachingMode: "HYBRID",
      onlineMeetingUrl: "https://zoom.us/j/9876543210",
      onlineMeetingPasscode: "MCU602101",
    },
    {
      courseCode: "602 201",
      courseName: "ทฤษฎีและประวัติวิปัสสนาภาวนา",
      instructorName: "พระครูปลัดสุวัฒนวชิรคุณ, ผศ.ดร.",
      dayOfWeek: "SATURDAY",
      startTime: "13:00",
      endTime: "16:00",
      roomNumber: "ห้องบรรยาย บัณฑิตศึกษา ๔๐๑",
      teachingMode: "HYBRID",
      onlineMeetingUrl: "https://zoom.us/j/9876543211",
      onlineMeetingPasscode: "MCU602201",
    },
    {
      courseCode: "602 301",
      courseName: "การปฏิบัติวิปัสสนาภาวนาขั้นสูง ๑ (สอบอารมณ์)",
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
