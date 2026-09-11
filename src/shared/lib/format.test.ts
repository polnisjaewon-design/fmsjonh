import { describe, it, expect } from "vitest";
import { formatDate, localizedName, academicYearLabel, formatThaiMonasticFullName } from "./format";

const d = new Date("2026-09-07T03:04:00Z");

describe("formatDate", () => {
  it("ไทยแสดง พ.ศ. อังกฤษแสดง ค.ศ.", () => {
    expect(formatDate(d, "th")).toContain("2569");
    expect(formatDate(d, "en")).toContain("2026");
  });
  it("null/undefined ให้ขีด", () => {
    expect(formatDate(null, "th")).toBe("—");
  });
  it("รับสตริง ISO ได้", () => {
    expect(formatDate(d.toISOString(), "en")).toContain("2026");
  });
  it("{ time: true } แสดงเวลาด้วย (03:04 UTC = 10:04 เวลาไทย)", () => {
    const dateOnly = formatDate(d, "en");
    const withTime = formatDate(d, "en", { time: true });
    expect(withTime).toContain("10");
    expect(withTime).toContain("04");
    expect(withTime.length).toBeGreaterThan(dateOnly.length);
  });
});

describe("localizedName", () => {
  const e = { nameTh: "คณะวิศวกรรมศาสตร์", nameEn: "Faculty of Engineering" };
  it("เลือกตามภาษา", () => {
    expect(localizedName(e, "th")).toBe(e.nameTh);
    expect(localizedName(e, "en")).toBe(e.nameEn);
  });
  it("ไม่มีอังกฤษถอยไปไทย", () => {
    expect(localizedName({ nameTh: "ก", nameEn: null }, "en")).toBe("ก");
    expect(localizedName({ nameTh: "ก", nameEn: "" }, "en")).toBe("ก");
    expect(localizedName({ nameTh: "ก", nameEn: undefined }, "en")).toBe("ก");
  });
});

describe("academicYearLabel", () => {
  it("ไทย = ปีการศึกษา พ.ศ. · อังกฤษ = AY ค.ศ.", () => {
    expect(academicYearLabel(2569, "th")).toBe("ปีการศึกษา 2569");
    expect(academicYearLabel(2569, "en")).toBe("AY 2026");
  });
});

describe("formatThaiMonasticFullName", () => {
  it("พระภิกษุมีฉายาและนามสกุล", () => {
    const monk = {
      titleTh: "พระ",
      firstNameTh: "สมชาย",
      monasticName: "ปญฺญาธโร",
      lastNameTh: "ใจดี",
    };
    expect(formatThaiMonasticFullName(monk)).toBe("พระสมชาย (ปญฺญาธโร) ใจดี");
  });

  it("พระสงฆ์มีสมณศักดิ์ ตำแหน่งทางวิชาการ และฉายา", () => {
    const monk = {
      academicRank: "ศ.ดร.",
      titleTh: "พระธรรมวัชรบัณฑิต",
      firstNameTh: "",
      monasticName: "สมจินต์ สมฺมาปญฺโญ",
    };
    expect(formatThaiMonasticFullName(monk)).toBe("ศ.ดร. พระธรรมวัชรบัณฑิต (สมจินต์ สมฺมาปญฺโญ)");
  });

  it("คฤหัสถ์ทั่วไป ไม่มีฉายา", () => {
    const layman = {
      titleTh: "นาย",
      firstNameTh: "สมศักดิ์",
      lastNameTh: "รักพุทธธรรม",
    };
    expect(formatThaiMonasticFullName(layman)).toBe("นายสมศักดิ์ รักพุทธธรรม");
  });

  it("แม่ชีหรือผู้ปฏิบัติธรรม", () => {
    const nun = {
      titleTh: "แม่ชี",
      firstNameTh: "กรรณิการ์",
      lastNameTh: "สมาธิธรรม",
    };
    expect(formatThaiMonasticFullName(nun)).toBe("แม่ชีกรรณิการ์ สมาธิธรรม");
  });
});

