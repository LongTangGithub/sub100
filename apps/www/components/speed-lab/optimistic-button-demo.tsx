"use client";

import { Button } from "@sub100/ui";
import { useEffect, useRef, useState } from "react";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function BaselineButton() {
  const [status, setStatus] = useState<"idle" | "loading" | "saved">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const handleClick = async () => {
    if (status !== "idle") return;
    setStatus("loading");
    await delay(800);
    setStatus("saved");
    timer.current = setTimeout(() => setStatus("idle"), 1800);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={status === "loading"}
      className="inline-flex items-center justify-center h-9 px-4 rounded-md text-sm font-medium bg-neutral-100 text-neutral-900 hover:bg-neutral-200 disabled:opacity-60 disabled:cursor-not-allowed transition-colors min-w-[9rem]"
    >
      {status === "idle" && "Save"}
      {status === "loading" && "Saving…"}
      {status === "saved" && "Saved · just now"}
    </button>
  );
}

export function Sub100Button() {
  const [saved, setSaved] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const handlePress = () => {
    if (saved) return;
    setSaved(true);
    // async work runs in background — user already sees "Saved"
    delay(800).then(() => {
      timer.current = setTimeout(() => setSaved(false), 1800);
    });
  };

  return (
    <Button
      variant="primary"
      onPress={handlePress}
      className="min-w-[9rem]"
      data-speed-lab="sub100-button"
    >
      <span className="inline-block min-w-[7rem] text-center">
        {saved ? "Saved · just now" : "Save"}
      </span>
    </Button>
  );
}
