"use client";

import { usePress } from "../hooks/use-press";
import { useMotion } from "../hooks/use-motion";
import { buttonVariants } from "./button.variants";
import { springs } from "../lib/springs";
import type { VariantProps } from "tailwind-variants";

interface ButtonProps
  extends VariantProps<typeof buttonVariants>,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onPress"> {
  children: React.ReactNode;
  onPress?: () => void;
}

export function Button({
  children,
  onPress,
  disabled,
  variant,
  size,
  className,
  ...rest
}: ButtonProps) {
  const { isPressed, pressProps } = usePress({ onPress, disabled });
  const motion = useMotion(springs.press);

  return (
    <button
      type="button"
      disabled={disabled}
      data-pressed={isPressed || undefined}
      className={buttonVariants({ variant, size, className })}
      style={{
        transform: isPressed ? "scale(0.96)" : "scale(1)",
        filter: isPressed ? "brightness(0.92)" : "brightness(1)",
        transition: `transform ${motion.duration}ms ${motion.easing}, filter ${motion.duration}ms ${motion.easing}`,
      }}
      {...pressProps}
      {...rest}
    >
      {children}
    </button>
  );
}
