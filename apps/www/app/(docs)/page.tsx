"use client";

import { Button, Kbd } from "@sub100/ui";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { InstallCommand } from "@/components/install-command";
import { INSTALL_COMMAND } from "@/lib/site";

const COMPONENTS = [
  {
    name: "Button",
    href: "/docs/components/button",
    desc: "Optimistic press feedback and async actions",
  },
  {
    name: "Kbd",
    href: "/docs/components/kbd",
    desc: "Cross-platform shortcut display",
  },
  {
    name: "CommandMenu",
    href: "/docs/components/command-menu",
    desc: "Search and navigate with ⌘K",
  },
  {
    name: "Dialog",
    href: "/docs/components/dialog",
    desc: "Modal with optimistic confirm",
  },
  {
    name: "Toast",
    href: "/docs/components/toast",
    desc: "Async feedback that doesn't block",
  },
] as const;

export default function LandingPage() {
  const [saved, setSaved] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const handleSave = () => {
    setSaved(true);
    if (resetTimer.current) clearTimeout(resetTimer.current);
    // Async work — 600ms simulated round trip; label resets shortly after.
    setTimeout(() => {
      resetTimer.current = setTimeout(() => setSaved(false), 1800);
    }, 600);
  };

  return (
    <div className="px-4 md:px-8">
      <section className="max-w-2xl mx-auto pt-24 md:pt-32 pb-20 flex flex-col gap-8">
        <h1 className="font-mono text-5xl md:text-6xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          sub100
        </h1>

        <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-xl text-balance">
          A component library where perceived speed is the design system.
        </p>

        <div className="flex flex-col gap-2 items-start">
          <Button onPress={handleSave}>
            {saved ? "Saved · just now" : "Save changes"}
          </Button>
          <span className="text-xs text-neutral-400 dark:text-neutral-600 pl-1">
            Try it →
          </span>
        </div>

        <InstallCommand command={INSTALL_COMMAND} />

        <p className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-2 flex-wrap">
          <span>Press</span>
          <Kbd size="sm">⌘</Kbd>
          <Kbd size="sm">K</Kbd>
          <span>to navigate ·</span>
          <Link
            href="/speed-lab"
            className="text-neutral-700 dark:text-neutral-300 underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-600 hover:decoration-neutral-500"
          >
            View Speed Lab
          </Link>
        </p>
      </section>

      <section className="max-w-2xl mx-auto pb-24 flex flex-col gap-6">
        <h2 className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          What's inside
        </h2>
        <ul className="flex flex-col">
          {COMPONENTS.map((c) => (
            <li
              key={c.href}
              className="border-b border-neutral-100 dark:border-neutral-900 last:border-b-0"
            >
              <Link
                href={c.href}
                className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 py-3 group"
              >
                <span className="font-mono font-medium text-neutral-900 dark:text-neutral-100 group-hover:underline underline-offset-4">
                  {c.name}
                </span>
                <span className="hidden sm:inline text-neutral-400 dark:text-neutral-600">
                  —
                </span>
                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                  {c.desc}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
