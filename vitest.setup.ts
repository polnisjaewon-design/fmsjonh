vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), refresh: vi.fn(), back: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
  redirect: vi.fn(),
  // `runAction` เรียกตัวนี้ในทุก catch เพื่อไม่กลืน redirect() ของ Next — ตัวจำลองต้อง "ไม่ throw"
  // เพราะเทสต์ของ runAction ส่ง error ธรรมดาเข้าไป (ของจริงก็ปล่อยผ่าน error ที่ไม่ใช่ของ Next เช่นกัน)
  unstable_rethrow: vi.fn(),
}));

// jsdom ไม่ implement ResizeObserver — เติมตัวจำลองให้คอมโพเนนต์ Radix ที่เรียกใช้
// (เขียนผ่านตัวแปรที่ประกาศชนิดเป็น optional แทน `"ResizeObserver" in window`: ตัวหลัง TS จะแคบชนิด
//  ของ window ในกิ่ง else เป็น never แล้วฟ้อง TS2339 — เห็นได้หลังจาก type-check:tests เริ่มครอบไฟล์นี้)
const w = window as Window & typeof globalThis & { ResizeObserver?: typeof ResizeObserver };
if (!w.ResizeObserver) {
  w.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} } as unknown as typeof ResizeObserver;
}
if (!Element.prototype.scrollIntoView) Element.prototype.scrollIntoView = () => {};
if (!Element.prototype.hasPointerCapture) Element.prototype.hasPointerCapture = () => false;
if (!Element.prototype.setPointerCapture) Element.prototype.setPointerCapture = () => {};
if (!Element.prototype.releasePointerCapture) Element.prototype.releasePointerCapture = () => {};

if (!window.PointerEvent) {
  class MockPointerEvent extends MouseEvent {
    pointerType = "mouse";
    constructor(type: string, params: MouseEventInit = {}) {
      super(type, params);
    }
  }
  // @ts-expect-error polyfill
  window.PointerEvent = MockPointerEvent;
}


