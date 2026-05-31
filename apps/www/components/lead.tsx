import type { ReactNode } from "react";

export function Lead({ children }: { children: ReactNode }) {
  return (
    <p className="max-w-2xl text-lg leading-8 text-neutral-600 dark:text-neutral-400 mt-2 mb-8 text-pretty">
      {children}
    </p>
  );
}
