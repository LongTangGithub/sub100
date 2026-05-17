import { useState, useCallback } from "react";

interface UseOptimisticActionOptions<T> {
  action: () => Promise<void>;
  optimisticData: T;
  onError?: (error: unknown) => void;
}

interface UseOptimisticActionResult<T> {
  execute: () => Promise<void>;
  isPending: boolean;
  optimisticState: T | undefined;
}

export function useOptimisticAction<T>({
  action,
  optimisticData,
  onError,
}: UseOptimisticActionOptions<T>): UseOptimisticActionResult<T> {
  const [isPending, setIsPending] = useState(false);
  const [optimisticState, setOptimisticState] = useState<T | undefined>(
    undefined,
  );

  const execute = useCallback(async () => {
    setIsPending(true);
    setOptimisticState(optimisticData);
    try {
      await action();
    } catch (err) {
      onError?.(err);
    } finally {
      setIsPending(false);
      setOptimisticState(undefined);
    }
  }, [action, optimisticData, onError]);

  return { execute, isPending, optimisticState };
}
