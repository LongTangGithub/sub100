import { describe, it, expect, vi, afterEach } from "vitest";
import { formatShortcut } from "../format-shortcut";

afterEach(() => vi.restoreAllMocks());

function mockPlatform(platform: string) {
  Object.defineProperty(navigator, "userAgentData", {
    value: { platform },
    configurable: true,
  });
}

describe("formatShortcut — Mac", () => {
  it("mod+k → ['⌘', 'K']", () => {
    mockPlatform("macOS");
    expect(formatShortcut("mod+k")).toEqual(["⌘", "K"]);
  });

  it("shift+enter → ['⇧', 'Enter']", () => {
    mockPlatform("macOS");
    expect(formatShortcut("shift+enter")).toEqual(["⇧", "Enter"]);
  });

  it("ctrl+space → ['⌃', 'Space']", () => {
    mockPlatform("macOS");
    expect(formatShortcut("ctrl+space")).toEqual(["⌃", "Space"]);
  });

  it("mod+shift+p → ['⌘', '⇧', 'P']", () => {
    mockPlatform("macOS");
    expect(formatShortcut("mod+shift+p")).toEqual(["⌘", "⇧", "P"]);
  });
});

describe("formatShortcut — Windows/Linux", () => {
  it("mod+k → ['Ctrl', 'K']", () => {
    mockPlatform("Win32");
    expect(formatShortcut("mod+k")).toEqual(["Ctrl", "K"]);
  });

  it("shift+enter → ['Shift', 'Enter']", () => {
    mockPlatform("Win32");
    expect(formatShortcut("shift+enter")).toEqual(["Shift", "Enter"]);
  });
});

// SSR behavior (navigator undefined → raw tokens) verified by code inspection only.
// jsdom binds navigator as a non-overridable global — cannot simulate undefined in this env.

describe("formatShortcut — single key", () => {
  it("esc → ['Esc']", () => {
    mockPlatform("macOS");
    expect(formatShortcut("esc")).toEqual(["Esc"]);
  });
});
