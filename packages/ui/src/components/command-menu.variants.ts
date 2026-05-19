import { tv } from "tailwind-variants";

export const commandMenuVariants = tv({
  slots: {
    overlay: [
      "fixed inset-0",
      "bg-black/25 dark:bg-black/60",
      "backdrop-blur-sm",
      "transition-opacity duration-150",
      "data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
    ],
    content: [
      "fixed top-[20vh] left-1/2 -translate-x-1/2",
      "w-full max-w-lg",
      "bg-white dark:bg-neutral-900",
      "border border-neutral-200 dark:border-neutral-800",
      "rounded-xl shadow-2xl",
      "overflow-hidden",
      // reveal transform applied as inline style via useMotion(springs.reveal)
    ],
    input: [
      "w-full h-12 px-4",
      "border-b border-neutral-200 dark:border-neutral-800",
      "bg-transparent",
      "text-sm text-neutral-900 dark:text-neutral-100",
      "placeholder:text-neutral-400",
      "focus:outline-none",
    ],
    list: ["max-h-[400px] overflow-y-auto", "p-2"],
    empty: ["py-8 text-center text-sm text-neutral-500"],
    group: [
      "mb-1 last:mb-0",
      "[&_[cmdk-group-heading]]:px-3",
      "[&_[cmdk-group-heading]]:pt-2",
      "[&_[cmdk-group-heading]]:pb-1",
      "[&_[cmdk-group-heading]]:text-[11px]",
      "[&_[cmdk-group-heading]]:font-medium",
      "[&_[cmdk-group-heading]]:uppercase",
      "[&_[cmdk-group-heading]]:tracking-wider",
      "[&_[cmdk-group-heading]]:text-neutral-500",
    ],
    item: [
      // layout
      "group flex items-center justify-between gap-2 px-3 py-2 rounded-md",
      // typography
      "text-sm text-neutral-700 dark:text-neutral-300",
      // interaction
      "cursor-default select-none",
      // selected state (keyboard nav via cmdk data-selected)
      "data-[selected=true]:bg-neutral-100 dark:data-[selected=true]:bg-neutral-800",
      "data-[selected=true]:text-neutral-900 dark:data-[selected=true]:text-neutral-100",
      // group class enables group-hover and group-data-[selected=true] on child Kbd
    ],
    shortcut: ["flex items-center gap-1 ml-auto"],
  },
});
