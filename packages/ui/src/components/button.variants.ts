import { tv } from "tailwind-variants";

export const buttonVariants = tv({
  base: [
    "inline-flex items-center justify-center rounded-md font-medium",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring",
    "disabled:pointer-events-none disabled:opacity-50",
    "select-none cursor-default",
    "will-change-transform",
  ],
  variants: {
    variant: {
      default: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200",
      primary:
        "bg-neutral-900 text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200",
      ghost:
        "bg-transparent text-neutral-700 ring-1 ring-neutral-200 hover:bg-neutral-100 hover:ring-0 dark:text-neutral-300 dark:ring-neutral-700 dark:hover:bg-neutral-800",
      destructive: "bg-red-600 text-white hover:bg-red-700",
    },
    size: {
      sm: "h-8 px-3 text-sm",
      md: "h-9 px-4 text-sm",
      lg: "h-10 px-6 text-base",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});
