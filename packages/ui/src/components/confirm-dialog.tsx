"use client";

import { Button } from "./button";
import { Dialog } from "./dialog";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "primary" | "destructive";
  onConfirm: () => void | Promise<void>;
  onError?: (error: unknown) => void;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "primary",
  onConfirm,
  onError,
}: ConfirmDialogProps) {
  const handleConfirm = async () => {
    onOpenChange(false);
    try {
      await onConfirm();
    } catch (err) {
      onError?.(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Title>{title}</Dialog.Title>
      {description && <Dialog.Description>{description}</Dialog.Description>}
      <Dialog.Footer>
        <Button variant="ghost" onPress={() => onOpenChange(false)}>
          {cancelLabel}
        </Button>
        <Button variant={variant} onPress={handleConfirm}>
          {confirmLabel}
        </Button>
      </Dialog.Footer>
    </Dialog>
  );
}
