"use client";

import { Button, ConfirmDialog, toast } from "@sub100/ui";
import { useState } from "react";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function BaselineToastDemo() {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const handleDelete = async () => {
    if (status === "loading") return;
    setStatus("loading");
    await delay(600);
    // always fails — error persists until manual reset
    setStatus("error");
  };

  return (
    <div className="flex flex-col items-start gap-3">
      <button
        type="button"
        onClick={handleDelete}
        disabled={status === "loading"}
        className="inline-flex items-center justify-center h-9 px-4 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {status === "loading" ? "Deleting…" : "Delete project"}
      </button>
      {status === "error" && (
        <div className="w-full px-4 py-3 rounded-md bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400">
          Couldn't delete. Try again.
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="ml-2 underline text-xs opacity-70 hover:opacity-100"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}

export function Sub100ToastDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="destructive"
        onPress={() => setOpen(true)}
        data-speed-lab="sub100-toast-trigger"
      >
        Delete project
      </Button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete this project?"
        description="This can't be undone."
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={async () => {
          await delay(200);
          // always fails
          throw new Error("Server returned 500");
        }}
        onError={() => {
          toast.error("Couldn't delete", {
            description: "Server returned 500",
          });
        }}
      />
    </>
  );
}
