import { tv } from "tailwind-variants";

export const dialogVariants = tv({
  slots: {
    overlay: [
      "fixed inset-0",
      "bg-black/50 dark:bg-black/70",
      "backdrop-blur-sm",
      "transition-opacity duration-150",
      "data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
    ],
    content: [
      // vertically and horizontally centered
      "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
      "w-full max-w-md",
      "bg-white dark:bg-neutral-900",
      "border border-neutral-200 dark:border-transparent",
      "dark:shadow-[0_0_0_1px_rgba(255,255,255,0.08)]",
      "rounded-xl shadow-2xl",
      "p-6",
      // reveal transform applied as inline style via useMotion(springs.reveal)
    ],
    title: [
      "text-lg font-semibold",
      "text-balance",
      "text-neutral-900 dark:text-neutral-100",
    ],
    description: [
      "mt-1 text-sm",
      "text-neutral-500 dark:text-neutral-400",
      "text-pretty",
    ],
    body: ["py-2 text-sm text-neutral-700 dark:text-neutral-300"],
    footer: ["flex justify-end gap-2 pt-4"],
  },
});
