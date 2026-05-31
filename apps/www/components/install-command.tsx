import { CopyButton } from "./copy-button";

export function InstallCommand({ command }: { command: string }) {
  return (
    <div className="flex items-center justify-between gap-3 w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-4 py-3">
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
