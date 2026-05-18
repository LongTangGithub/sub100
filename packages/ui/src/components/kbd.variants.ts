// Note: no will-change-transform here. Kbd renders in volume (CommandMenu rows),
// and preemptive will-change would allocate a GPU layer per keycap. If we observe
// stutter in practice, add hover-scoped: group-hover:[will-change:transform]
import { tv } from "tailwind-variants";

export const kbdVariants = tv({
  base: [
    // reset + typography
    "inline-flex items-center justify-center",
    "font-mono tabular-nums font-medium leading-none",
    //keycap elevation
    "rounded-[4px]",
    "border border-neutral-300 dark:border-neutral-700",
    "bg-neutral-50 dark:bg-neutral-800",
    "text-neutral-500 dark:text-neutral-400",
    "shadow-[inset_0_-1px_0_0_rgb(0_0_0/_0.08)] dark:shadow-[inset_0_1px_0_0_rgb(255_255_255/_0.06)]",
    // parent affordance lift
    "transition-transform",
    "group-hover:-translate-y-px group-focus-visible:-translate-y-px",
  ],
  variants: {
    size: {
      sm: "h-5 px-1 text-xs",
      md: "h-6 px-1.5 text-sm",
    },
  },
  defaultVariants: {
    size: "md",
  },
});
