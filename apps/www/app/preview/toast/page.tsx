"use client";

import { toast } from "@sub100/ui";
import { Button } from "@sub100/ui/components/button";

function fireFive() {
  for (let i = 1; i <= 5; i++) {
    setTimeout(() => toast(`Notification ${i}`), i * 100);
  }
}

export default function ToastPreview() {
  return (
    <main className="min-h-screen p-12 flex flex-col gap-12 max-w-2xl dark:bg-neutral-950">
      <div>
        <h1 className="text-2xl font-semibold mb-1 text-balance dark:text-neutral-100">
          Toast
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 text-pretty">
          Built on Sonner. Bottom-center, auto-dismiss after 4 seconds, hover to
          pause.
        </p>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
          Variants
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 text-pretty">
          Four built-in variants with sub100 tokens.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button onPress={() => toast("Plain notification")}>Default</Button>
          <Button onPress={() => toast.success("Saved successfully")}>
            Success
          </Button>
          <Button
            variant="destructive"
            onPress={() => toast.error("Something failed")}
          >
            Error
          </Button>
          <Button onPress={() => toast.warning("Heads up")}>Warning</Button>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
          Action button
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 text-pretty">
          Toasts can carry one action. Clicking it dismisses the toast and runs
          your callback.
        </p>
        <Button
          onPress={() =>
            toast("File deleted", {
              description: "old-design.fig moved to trash",
              action: {
                label: "Undo",
                onClick: () => toast.success("Restored"),
              },
            })
          }
        >
          Delete file
        </Button>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
          Promise
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 text-pretty">
          Promise toasts swap between loading, success, and error states
          automatically. The killer pattern for async.
        </p>
        <Button
          onPress={() =>
            toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
              loading: "Saving…",
              success: "Saved",
              error: "Failed",
            })
          }
        >
          Save with promise
        </Button>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
          Stacking
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 text-pretty">
          Up to 3 visible, the rest queue. Hover to expand the stack.
        </p>
        <Button onPress={fireFive}>Fire 5 toasts</Button>
      </section>
    </main>
  );
}
