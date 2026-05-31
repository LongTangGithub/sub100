"use client";

import { Button, toast } from "@sub100/ui";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function VariantsDemo() {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <Button onPress={() => toast.success("Saved")}>Success</Button>
      <Button onPress={() => toast.error("Couldn't save")}>Error</Button>
      <Button onPress={() => toast.info("Heads up")}>Info</Button>
      <Button onPress={() => toast.warning("Check before continuing")}>
        Warning
      </Button>
    </div>
  );
}

export function UndoDemo() {
  return (
    <Button
      variant="destructive"
      onPress={() => {
        toast("Archived", {
          action: {
            label: "Undo",
            onClick: () => toast.success("Restored"),
          },
        });
      }}
    >
      Archive project
    </Button>
  );
}

export function PromiseDemo() {
  const sync = () =>
    delay(1200).then(() => {
      if (Math.random() > 0.7) {
        throw new Error("Sync failed");
      }
      return "ok";
    });

  return (
    <Button
      variant="primary"
      onPress={() => {
        toast.promise(sync(), {
          loading: "Syncing…",
          success: "Synced",
          error: "Couldn't sync",
        });
      }}
    >
      Sync
    </Button>
  );
}
