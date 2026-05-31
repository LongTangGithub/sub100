"use client";

import { type ReactNode, useState } from "react";

type Tab = "preview" | "code";

type ComponentPreviewProps = {
  children: ReactNode;
  code: ReactNode;
};

export function ComponentPreview({ children, code }: ComponentPreviewProps) {
  const [tab, setTab] = useState<Tab>("preview");

  return (
    <div className="my-6 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
      <div
        role="tablist"
        className="flex border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900"
      >
        <TabButton active={tab === "preview"} onSelect={() => setTab("preview")}>
          Preview
        </TabButton>
        <TabButton active={tab === "code"} onSelect={() => setTab("code")}>
          Code
        </TabButton>
      </div>

      {tab === "preview" ? (
        <div className="p-8 flex items-center justify-center min-h-[160px] bg-white dark:bg-neutral-950">
          {children}
        </div>
      ) : (
        <div className="bg-white dark:bg-neutral-950">{code}</div>
      )}
    </div>
  );
}

function TabButton({
  active,
  onSelect,
  children,
}: {
  active: boolean;
  onSelect: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onSelect}
      className={`flex-1 sm:flex-none px-4 h-10 text-sm font-medium transition-colors ${
        active
          ? "text-neutral-900 dark:text-neutral-100 border-b-2 border-neutral-900 dark:border-neutral-100 -mb-px"
          : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
      }`}
    >
      {children}
    </button>
  );
}
