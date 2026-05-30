"use client";

import { useState } from "react";
import { toast } from "@sub100/ui";
import { Button } from "@sub100/ui/components/button";
import { ConfirmDialog } from "@sub100/ui/components/confirm-dialog";
import { Dialog } from "@sub100/ui/components/dialog";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function DialogPreview() {
  const [saveOpen, setSaveOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [riskyOpen, setRiskyOpen] = useState(false);

  const handleRiskyConfirm = async () => {
    await delay(600);
    if (Math.random() > 0.7) {
      throw new Error("Operation failed on the server");
    }
    toast.success("Operation succeeded");
  };

  return (
    <main className="min-h-screen p-12 flex flex-col gap-12 max-w-2xl dark:bg-neutral-950">
      <div>
        <h1 className="text-2xl font-semibold mb-1 text-balance dark:text-neutral-100">
          Dialog
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 text-pretty">
          General Modal primitive and a confirmation composition. Press Esc or
          click outside to dismiss.
        </p>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
          Basic Dialog (compound)
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 text-pretty">
          Full compound API - Title, Description, Body, Footer. Uncontrolled via
          Dialog.Trigger
        </p>
        <Dialog>
          <Dialog.Trigger asChild>
            <Button>Open Dialog</Button>
          </Dialog.Trigger>
          <Dialog.Title>New project</Dialog.Title>
          <Dialog.Description>
            A project bundles your components, design tokens, and registry
            endpoints.
          </Dialog.Description>
          <Dialog.Body>
            Projects can be renamed later. Naming things is the hardest part of
            software, but you don't have to get it right the first time.
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.Close asChild>
              <Button variant="ghost">Close</Button>
            </Dialog.Close>
          </Dialog.Footer>
        </Dialog>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
          Confirmdialog - default
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 text-pretty">
          Affirmative Action. Closes immediately on Confirm; async resolves
          silently after 600ms/
        </p>
        <Button onPress={() => setSaveOpen(true)}>Save changes</Button>
        <ConfirmDialog
          open={saveOpen}
          onOpenChange={setSaveOpen}
          title="Save Changes?"
          description="Your edits will be written to the working tree."
          confirmLabel="Save"
          onConfirm={async () => {
            await delay(600);
            toast.success("Saved");
          }}
          onError={(err) => {
            toast.error("Couldn't save", {
              description: err instanceof Error ? err.message : String(err),
            });
          }}
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
          ConfirmDialog — destructive
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 text-pretty">
          Variant maps to Button's destructive styling.
        </p>
        <Button variant="destructive" onPress={() => setDeleteOpen(true)}>
          Delete project
        </Button>
        <ConfirmDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          title="Delete project?"
          description="This permanently removes the project and all its registry entries. This cannot be undone."
          confirmLabel="Delete"
          variant="destructive"
          onConfirm={async () => {
            await delay(600);
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
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
          ConfirmDialog — failure path
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 text-pretty">
          Fails ~30% of the time. Failure routes through Toast.
        </p>
        <Button onPress={() => setRiskyOpen(true)}>Run risky operation</Button>
        <ConfirmDialog
          open={riskyOpen}
          onOpenChange={setRiskyOpen}
          title="Run risky operation?"
          description="This sometimes fails. The error path surfaces via Toast."
          confirmLabel="Run"
          onConfirm={handleRiskyConfirm}
          onError={(err) => {
            const msg = err instanceof Error ? err.message : String(err);
            toast.error("Operation failed", { description: msg });
          }}
        />
      </section>
    </main>
  );
}
