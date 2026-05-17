import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useOptimisticAction } from "../use-optimistic-action";

describe("useOptimisticAction", () => {
  it("commits optimistic state immediately on execute", () => {
    const action = vi.fn((): Promise<void> => new Promise(() => {}));
    const { result } = renderHook(() =>
      useOptimisticAction({ action, optimisticData: "loading" }),
    );

    act(() => {
      result.current.execute();
    });

    expect(result.current.optimisticState).toBe("loading");
    expect(result.current.isPending).toBe(true);
  });

  it("clears pending state on success", async () => {
    const action = vi.fn((): Promise<void> => Promise.resolve());
    const { result } = renderHook(() =>
      useOptimisticAction({ action, optimisticData: "loading" }),
    );

    await act(async () => {
      await result.current.execute();
    });

    expect(result.current.isPending).toBe(false);
  });

  it("calls onError and clears pending on failure", async () => {
    const onError = vi.fn();
    const action = vi.fn(
      (): Promise<void> => Promise.reject(new Error("fail")),
    );
    const { result } = renderHook(() =>
      useOptimisticAction({ action, optimisticData: "loading", onError }),
    );

    await act(async () => {
      await result.current.execute();
    });

    expect(onError).toHaveBeenCalledTimes(1);
    expect(result.current.isPending).toBe(false);
  });
});
