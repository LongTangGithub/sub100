"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
    return (
        <SonnerToaster
            position="bottom-center"
            theme="system"
            richColors
            duration={4000}
            expand={false}
            visibleToasts={3}
            toastOptions={{
                classNames: {
                    toast: "rounded-xl font-sans text-sm shadow-2xl",
                    title:
                        "text-sm font-medium text-neutral-900 dark:text-neutral-100",
                    description:
                        "text-xs text-neutral-500 dark:text-neutral-400",
                    actionButton:
                        "bg-neutral-900 text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 rounded-md px-3 h-8 text-xs font-medium",
                    cancelButton:
                        "bg-transparent text-neutral-700 ring-1 ring-neutral-200 hover:bg-neutral-100 hover:ring-0 dark:text-neutral-300 dark:ring-neutral-700 dark:hover:bg-neutral-800 rounded-md px-3 h-8 text-xs font-medium",
                    closeButton:
                        "bg-transparent text-neutral-700 ring-1 ring-neutral-200 hover:bg-neutral-100 hover:ring-0 dark:text-neutral-300 dark:ring-neutral-700 dark:hover:bg-neutral-800",
                },
            }}
        />
    );
}
