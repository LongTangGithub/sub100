"use client";

import { Button, ConfirmDialog, Dialog, toast } from "@sub100/ui";
import { useState } from "react";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function BasicDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <Button variant="primary" onPress={() => setOpen(true)}>
        Open dialog
      </Button>
      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        Opens a modal over the page.
      </p>
      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Title>Project settings</Dialog.Title>
        <Dialog.Description>
          Configure the basics for this project. You can rename it later.
        </Dialog.Description>
        <Dialog.Body>
          Settings sync to your account in the background. Esc or click
          outside to dismiss without saving.
        </Dialog.Body>
        <Dialog.Footer>
          <Button variant="ghost" onPress={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onPress={() => {
              setOpen(false);
              toast.success("Settings saved");
            }}
          >
            Save
          </Button>
        </Dialog.Footer>
      </Dialog>
    </div>
  );
}

export function ConfirmDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <Button variant="destructive" onPress={() => setOpen(true)}>
        Delete project
      </Button>
      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        Opens a modal over the page.
      </p>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete this project?"
        description="This permanently removes the project and its registry entries. This can't be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="destructive"
        onConfirm={async () => {
          await delay(600);
          if (Math.random() > 0.8) {
            throw new Error("Server returned 500");
          }
          toast("Project deleted", {
            action: {
              label: "Undo",
              onClick: () => toast.success("Restored"),
            },
          });
        }}
        onError={(err) => {
          toast.error("Couldn't delete", {
            description: err instanceof Error ? err.message : String(err),
          });
        }}
      />
    </div>
  );
}
