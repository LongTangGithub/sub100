"use client";

import { usePress } from "../hooks/use-press";
import { buttonVariants } from "./button.variants";
import { springs } from "../lib/springs";
import type { VariantProps } from "tailwind-variants";

interface ButtonProps extends VariantProps<typeof buttonVariants> {
    children: React.ReactNode;
    onPress?: () => void;
    disabled?: boolean;
    className?: string;
}

export function Button({
    children,
    onPress,
    disabled,
    variant,
    size,
    className,
}: ButtonProps) {
    const { isPressed, pressProps } = usePress({ onPress, disabled });

    return (
        <button
            type="button"
            disabled={disabled}
            data-pressed={isPressed || undefined}
            className={buttonVariants({ variant, size, className })}
            style={{
                transform: isPressed ? "scale(0.96)" : "scale(1)",
                filter: isPressed ? "brightness(0.92)" : "brightness(1)",
                transition: `transform ${springs.press.duration}ms ${springs.press.easing}, filter ${springs.press.duration}ms ${springs.press.easing}`,
            }}
            {...pressProps}
        >
            {children}
        </button>
    );
}
