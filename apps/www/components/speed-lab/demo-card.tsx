import type { ReactNode } from "react";

interface DemoCardProps {
  title: string;
  description: string;
  caption: string;
  baseline: ReactNode;
  sub100: ReactNode;
}

export function DemoCard({
  title,
  description,
  caption,
  baseline,
  sub100,
}: DemoCardProps) {
  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm dark:shadow-none overflow-hidden">
      <div className="px-6 pt-6 pb-4">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          {title}
        </h2>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400 text-pretty">
          {description}
        </p>
        <p className="mt-1.5 text-xs text-neutral-400 dark:text-neutral-500 italic">
          {caption}
        </p>
      </div>

      <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-800 border-t border-neutral-200 dark:border-neutral-800">
        {/* Baseline column */}
        <div className="flex-1 p-6">
          <p className="text-xs font-semibold font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-4">
            Baseline
          </p>
          {baseline}
        </div>

        {/* sub100 column — subtle green identity ring */}
        <div className="flex-1 p-6 bg-emerald-500/3 dark:bg-emerald-500/5 ring-1 ring-inset ring-emerald-500/10 dark:ring-emerald-500/15">
          <p className="text-xs font-semibold font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-4">
            sub100
          </p>
          {sub100}
        </div>
      </div>
    </div>
  );
}
