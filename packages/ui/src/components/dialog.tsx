"use client";

import * as RadixDialog from "@radix-ui/react-dialog";
import { useMotion } from "../hooks/use-motion";
import { springs } from "../lib/springs";
import { dialogVariants } from "./dialog.variants";

const styles = dialogVariants();

interface DialogProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
    /**Optional sr-only fallback title. Prefer rendering <Dialog.Title> explicitly */
    label?: string;
}

function DialogRoot({ open, onOpenChange, children, label }: DialogProps) {
    const motion = useMotion(springs.reveal);

    return (
        <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
            <RadixDialog.Portal>
                <RadixDialog.Overlay className={styles.overlay()} />
                <RadixDialog.Content
                    className={[
                        styles.content(),
                        "data-[state=closed]:scale-95 data-[state=closed]:opacity-0",
                        "data-[state=open]:scale-100 data-[state=open]:opacity-100",
                    ].join(" ")}
                    style={{
                        transitionProperty: "transform, opacity",
                        transitionDuration: `${motion.duration}ms`,
                        transitionTimingFunction: motion.easing,
                    }}
                >
                    {label && (
                        <RadixDialog.Title className="sr-only">{label}</RadixDialog.Title>
                    )}
                    {children}
                </RadixDialog.Content>
            </RadixDialog.Portal>
        </RadixDialog.Root>
    )
}

function DialogTitle(
    props: React.ComponentProps<typeof RadixDialog.Title>,
) {
    return <RadixDialog.Title className={styles.title()} {...props} />;
}

function DialogDescription(
    props: React.ComponentProps<typeof RadixDialog.Description>,
) {
    return <RadixDialog.Description className={styles.description()} {...props} />
}

function DialogBody({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={styles.body({ className })} {...props}>
            {children}
        </div>
    );
}

function DialogFooter({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={styles.footer({ className })} {...props}>
            {children}
        </div>
    );
}

// Dialog.Trigger + Dialog.Close intentionally removed —
// the wrapper renders children inside Radix Content, so Trigger never mounts
// when the dialog is closed. Re-introduce once Dialog is refactored to render
// children at Root level (SUB-X follow-up). Until then, control via
// `open` / `onOpenChange` and an external Button.
export const Dialog = Object.assign(DialogRoot, {
    Title: DialogTitle,
    Description: DialogDescription,
    Body: DialogBody,
    Footer: DialogFooter,
});