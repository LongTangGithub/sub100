"use client";

import { Button, toast, useOptimisticAction } from "@sub100/ui";
import { useEffect, useRef, useState } from "react";

export function VariantsGrid() {
  const variants = ["default", "primary", "destructive", "ghost"] as const;
  const sizes = ["sm", "md", "lg"] as const;

  return (
    <div className="grid grid-cols-3 gap-3 justify-items-start">
      {variants.flatMap((variant) =>
        sizes.map((size) => (
          <Button key={`${variant}-${size}`} variant={variant} size={size}>
            {variant}
          </Button>
        )),
      )}
    </div>
  );
}

export function OptimisticDemo() {
  const [saved, setSaved] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const handleSave = () => {
    setSaved(true);
    if (resetTimer.current) clearTimeout(resetTimer.current);
    setTimeout(() => {
      resetTimer.current = setTimeout(() => setSaved(false), 1800);
    }, 600);
  };

  return (
    <Button variant="primary" onPress={handleSave}>
      <span className="inline-block min-w-[7rem] text-center tabular-nums">
        {saved ? "Saved · just now" : "Save changes"}
      </span>
    </Button>
  );
}

export function AsyncErrorDemo() {
  const { execute, isPending } = useOptimisticAction({
    action: async () => {
      await new Promise((r) => setTimeout(r, 600));
      if (Math.random() > 0.7) {
        throw new Error("Server returned 500");
      }
      toast.success("Synced");
    },
    optimisticData: true,
    onError: (err) => {
      toast.error("Couldn't sync", {
        description: err instanceof Error ? err.message : String(err),
      });
    },
  });

  return (
    <Button variant="primary" onPress={execute} disabled={isPending}>
      <span className="inline-block min-w-[4rem] text-center tabular-nums">
        {isPending ? "Syncing…" : "Sync"}
      </span>
    </Button>
  );
}
