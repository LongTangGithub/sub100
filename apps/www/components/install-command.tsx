import { CopyButton } from "./copy-button";

export function InstallCommand({
  command,
  className = "",
}: {
  command: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-lg border border-neutral-200 dark:border-neutral-800 ring-1 ring-neutral-200/60 dark:ring-neutral-800 bg-neutral-50 dark:bg-neutral-950/50 px-4 py-3 ${className || "max-w-2xl"}`}
    >
      <pre className="font-mono text-sm text-neutral-800 dark:text-neutral-200 overflow-x-auto">
        <span className="select-none text-neutral-400 dark:text-neutral-500 mr-2">
          $
        </span>
        {command}
      </pre>
      <CopyButton value={command} />
    </div>
  );
}
