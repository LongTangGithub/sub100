"use client";

import { useState } from "react";
import { Button } from "@sub100/ui/components/button";
import { useOptimisticAction } from "@sub100/ui/hooks/use-optimistic-action";
import { useMotion } from "@sub100/ui/hooks/use-motion";
import { springs } from "@sub100/ui/lib/springs";

function fakeBackend(): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.3 ? resolve() : reject(new Error("Server error"));
    }, 800);
  });
}

function OptimisticDemo() {
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");

  const { execute, isPending, optimisticState } = useOptimisticAction({
    action: async () => {
      await fakeBackend();
      setStatus("saved");
    },
    optimisticData: "saving" as const,
    onError: () => setStatus("error"),
  });

  const label =
    optimisticState === "saving"
      ? "Saving…"
      : status === "saved"
        ? "Saved"
        : status === "error"
          ? "Failed — retry"
          : "Save";
  const labels = ["Save", "Saving…", "Saved", "Failed — retry"] as const;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-neutral-500 dark:text-neutral-400 text-pretty">
        Optimistic action — fails ~30% of the time
      </p>
      <Button
        variant={status === "error" ? "destructive" : "primary"}
        onPress={execute}
        disabled={isPending}
        className="self-start"
      >
        <span className="relative inline-grid">
          {labels.map((l) => (
            <span
              key={l}
              className="col-start-1 row-start-1 transition-opacity duration-[120ms]"
              style={{ opacity: l === label ? 1 : 0 }}
              aria-hidden={l !== label}
            >
              {l}
            </span>
          ))}
        </span>
      </Button>
      {status === "error" && (
        <p className="text-sm text-red-500">Something went wrong. Try again.</p>
      )}
    </div>
  );
}

function ReducedMotionDemo() {
  const motion = useMotion(springs.press);
  const isReduced = motion.duration === 0;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-neutral-500 dark:text-neutral-400 text-pretty">
        Motion preference:{" "}
        <span className="font-medium text-neutral-900 dark:text-neutral-100">
          {isReduced ? "reduced" : "full"}
        </span>{" "}
        — toggle in OS settings → the press transition should become instant
      </p>
      <Button variant="primary" className="self-start">
        Press me
      </Button>
    </div>
  );
}

export default function ButtonPreview() {
  return (
    <main className="min-h-screen p-12 flex flex-col gap-12 max-w-2xl dark:bg-neutral-950">
      <div>
        <h1 className="text-2xl font-semibold mb-1 text-balance dark:text-neutral-100">Button</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 text-pretty">
          Press fires on pointerdown. Transforms commit in &lt;16ms.
        </p>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
          Variants
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="default">Default</Button>
          <Button variant="primary">Primary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
          Sizes
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" size="sm">
            Small
          </Button>
          <Button variant="primary" size="md">
            Medium
          </Button>
          <Button variant="primary" size="lg">
            Large
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
          States
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="default" disabled>
            Disabled default
          </Button>
          <Button variant="primary" disabled>
            Disabled primary
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
          Focus Ring ( keyboard navigation )
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 text-pretty">
          Tab to each button - the ring should appear on keyboard focus only
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="default">Default</Button>
          <Button variant="primary">Primary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
          Reduced motion
        </h2>
        <ReducedMotionDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
          Optimistic action
        </h2>
        <OptimisticDemo />
      </section>
    </main>
  );
}
