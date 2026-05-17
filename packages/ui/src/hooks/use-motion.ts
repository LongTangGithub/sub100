import { useSyncExternalStore } from "react";

interface MotionConfig {
  duration: number;
  easing: string;
}

const query = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void): () => void {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getSnapshot(): boolean {
  return window.matchMedia(query).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

export function useMotion(preset: MotionConfig): MotionConfig {
  const reduced = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  return reduced ? { duration: 0, easing: "linear" } : preset;
}
