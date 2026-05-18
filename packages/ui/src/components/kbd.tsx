"use client";

import type { HTMLAttributes } from "react";
import type { VariantProps } from "tailwind-variants";
import { useMotion } from "../hooks/use-motion";
import { springs } from "../lib/springs";
import { kbdVariants } from "./kbd.variants";

interface KbdProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof kbdVariants> {}

export function Kbd({ children, size, className, ...props }: KbdProps) {
  const motion = useMotion(springs.press);

  return (
    <kbd
      className={kbdVariants({ size, className })}
      style={{
        transitionDuration: `${motion.duration}ms`,
        transitionTimingFunction: motion.easing,
      }}
      {...props}
    >
      {children}
    </kbd>
  );
}
