import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useMotion } from "../use-motion";
const preset = { duration: 120, easing: "cubic-bezier(0.2, 0, 0, 1)" };

function makeMatchMedia(initialMatches: boolean) {
  const listeners: Array<(e: any) => void> = [];
  const stub = {
    matches: initialMatches,
    addEventListener: (_: string, cb: any) => listeners.push(cb),
    removeEventListener: vi.fn(),
    dispatchChange(val: boolean) {
      this.matches = val;
      listeners.forEach((cb) => cb({ matches: val }));
    },
  };
  return stub;
}

describe("useMotion", () => {
  it("returns preset when reduced motion is off", () => {
    const stub = makeMatchMedia(false);
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: () => stub,
    });

    const { result } = renderHook(() => useMotion(preset));
    expect(result.current).toEqual(preset);
  });

  it("returns zeroed config when reduced motion is on", () => {
    const stub = makeMatchMedia(true);
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: () => stub,
    });

    const { result } = renderHook(() => useMotion(preset));
    expect(result.current).toEqual({ duration: 0, easing: "linear" });
  });

  it("updates when media query change fires", () => {
    const stub = makeMatchMedia(false);
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: () => stub,
    });

    const { result } = renderHook(() => useMotion(preset));
    expect(result.current).toEqual(preset);

    act(() => stub.dispatchChange(true));
    expect(result.current).toEqual({ duration: 0, easing: "linear" });
  });

  it("removes event listener on unmount", () => {
    const stub = makeMatchMedia(false);
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: () => stub,
    });

    const { unmount } = renderHook(() => useMotion(preset));
    unmount();
    expect(stub.removeEventListener).toHaveBeenCalledOnce();
  });
});
