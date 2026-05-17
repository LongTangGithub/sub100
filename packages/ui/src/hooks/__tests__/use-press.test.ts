import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { usePress } from "../use-press";

describe("usePress", () => {
    it("fires onPress on pointerdown", () => {
        const onPress = vi.fn();
        const { result } = renderHook(() => usePress({ onPress }));

        act(() => {
            result.current.pressProps.onPointerDown(
                new PointerEvent("pointerdown") as any
            );
        });

        expect(onPress).toHaveBeenCalledTimes(1);
    });

    it("sets isPressed true on pointerdown", () => {
        const { result } = renderHook(() => usePress({}));

        act(() => {
            result.current.pressProps.onPointerDown(
                new PointerEvent("pointerdown") as any
            );
        });

        expect(result.current.isPressed).toBe(true);
    });

    it("cancels on pointercancel", () => {
        const onPress = vi.fn();
        const { result } = renderHook(() => usePress({ onPress }));

        act(() => {
            result.current.pressProps.onPointerDown(
                new PointerEvent("pointerdown") as any
            );
            result.current.pressProps.onPointerCancel(
                new PointerEvent("pointercancel") as any
            );
        });

        expect(result.current.isPressed).toBe(false);
    });
    
    it("cancels on pointerleave", () => {
        const { result } = renderHook(() => usePress({}));

        act(() => {
            result.current.pressProps.onPointerDown(
                new PointerEvent("pointerdown") as any
            );
            result.current.pressProps.onPointerLeave(
                new PointerEvent("pointerleave") as any
            );
        });

        expect(result.current.isPressed).toBe(false);
    });

    it("does not double-fire on repeated pointerdown", () => {
        const onPress = vi.fn();
        const { result } = renderHook(() => usePress({ onPress }));

        act(() => {
            result.current.pressProps.onPointerDown(
                new PointerEvent("pointerdown") as any
            );
            result.current.pressProps.onPointerDown(
                new PointerEvent("pointerdown") as any
            );
        });

        expect(onPress).toHaveBeenCalledTimes(1);
    });
});