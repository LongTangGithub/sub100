"use client";

import { Kbd } from "@sub100/ui/components/kbd";
import { formatShortcut } from "@sub100/ui/lib/format-shortcut";

const SHORTCUTS = [
  { label: "Search files", shortcut: "mod+k" },
  { label: "New document", shortcut: "mod+n" },
  { label: "Open settings", shortcut: "mod+shift+p" },
] as const;

const DEMO_SHORTCUTS = [
  { label: "mod+k", keys: formatShortcut("mod+k") },
  { label: "mod+shift+p", keys: formatShortcut("mod+shift+p") },
  { label: "ctrl+space", keys: formatShortcut("ctrl+space") },
] as const;

export default function KbdPreview() {
  return (
    <main className="min-h-screen p-12 flex flex-col gap-12 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold mb-1 text-balance">Kbd</h1>
        <p className="text-sm text-neutral-500">
          Semantic keycap. Lifts on parent hover. Respects reduced motion.
        </p>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
          Single keycaps
        </h2>
        <div className="flex flex-wrap items-center gap-1">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
          <Kbd>Enter</Kbd>
          <Kbd>Esc</Kbd>
          <Kbd>⇧</Kbd>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
          Sizes
        </h2>
        <div className="flex items-end gap-6">
          <div className="flex flex-col items-center gap-2">
            <Kbd size="sm">⌘</Kbd>
            <span className="text-xs text-neutral-400">sm</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Kbd size="md">⌘</Kbd>
            <span className="text-xs text-neutral-400">md</span>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
          Multi-key shortcuts
        </h2>
        <div className="flex flex-col gap-3">
          {DEMO_SHORTCUTS.map(({ label, keys }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-sm text-neutral-500 font-mono">
                {label}
              </span>
              <div className="flex items-center gap-1">
                {keys.map((key, i) => (
                  <Kbd key={i}>{key}</Kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
          Parent affordance lift
        </h2>
        <p className="text-sm text-neutral-500">
          Hover a row — the keycap lifts by 1px.
        </p>
        {/* Parent must have className="group" for Kbd to react */}
        <div className="flex flex-col">
          {SHORTCUTS.map(({ label, shortcut }) => (
            <div
              key={label}
              className="group flex items-center justify-between px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <span className="text-sm text-neutral-700 dark:text-neutral-300">
                {label}
              </span>
              <div className="flex items-center gap-1">
                {formatShortcut(shortcut).map((key, i) => (
                  <Kbd key={i}>{key}</Kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <p className="text-xs text-neutral-400">
        Toggle your OS dark mode setting to see the dark theme variant. No
        in-page toggle in v0.1.
      </p>
    </main>
  );
}
