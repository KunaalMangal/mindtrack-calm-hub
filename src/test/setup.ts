import "@testing-library/jest-dom";
import { beforeEach } from "vitest";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// ResizeObserver stub for Recharts / Radix in jsdom
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
// @ts-expect-error attach to global
window.ResizeObserver = window.ResizeObserver || ResizeObserverStub;

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});
