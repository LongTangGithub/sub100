type Platform = "mac" | "other";

function detectPlatform(): Platform {
  // SSR note: returns "other" when navigator is undefined.
  // Means Mac users see "Ctrl" → "⌘" mismatch if Kbd is rendered server-side.
  // Every v0.1 consumer is client-side ('use client'), so this doesn't fire.
  // Fix in v0.2: return null on SSR, let consumers resolve client-side via useSyncExternalStore.
  if (typeof navigator === "undefined") return "other";
  const platform = (
    (navigator as any).userAgentData?.platform ??
    navigator.platform ??
    ""
  ).toLowerCase();
  return platform.includes("mac") ? "mac" : "other";
}

const MAC_GLYPHS: Record<string, string> = {
  mod: "⌘",
  shift: "⇧",
  alt: "⌥",
  option: "⌥",
  ctrl: "⌃",
  control: "⌃",
};

const OTHER_LABELS: Record<string, string> = {
  mod: "Ctrl",
  shift: "Shift",
  alt: "Alt",
  option: "Alt",
  ctrl: "Ctrl",
  control: "Ctrl",
};

const COMMON_LABELS: Record<string, string> = {
  enter: "Enter",
  return: "Enter",
  space: "Space",
  esc: "Esc",
  escape: "Esc",
  backspace: "⌫",
  delete: "Del",
  tab: "Tab",
  up: "↑",
  down: "↓",
  left: "←",
  right: "→",
};

function formatToken(token: string, platform: Platform): string {
  const key = token.toLowerCase();
  if (platform === "mac" && key in MAC_GLYPHS) return MAC_GLYPHS[key];
  if (platform === "other" && key in OTHER_LABELS) return OTHER_LABELS[key];
  if (key in COMMON_LABELS) return COMMON_LABELS[key];
  return token.length === 1 ? token.toUpperCase() : token;
}

export function formatShortcut(shortcut: string): string[] {
  const platform = detectPlatform();
  return shortcut
    .split("+")
    .map((token) => formatToken(token.trim(), platform));
}
