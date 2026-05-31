"use client";

import { useState, useCallback, useRef } from "react";

interface UsePressOptions {
  onPress?: () => void;
  disabled?: boolean;
}

interface UsePressResult {
  isPressed: boolean;
  pressProps: {
    onPointerDown: (e: React.PointerEvent) => void;
    onPointerUp: (e: React.PointerEvent) => void;
    onPointerCancel: (e: React.PointerEvent) => void;
    onPointerLeave: (e: React.PointerEvent) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    onKeyUp: (e: React.KeyboardEvent) => void;
  };
}

export function usePress({
  onPress,
  disabled,
}: UsePressOptions): UsePressResult {
  const [isPressed, setIsPressed] = useState(false);
  const isPressedRef = useRef(false);

  const cancel = useCallback(() => {
    if (!isPressedRef.current) return;
    isPressedRef.current = false;
    setIsPressed(false);
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (disabled || isPressedRef.current) return;
      isPressedRef.current = true;
      setIsPressed(true);
      e.currentTarget?.setPointerCapture?.(e.pointerId);
      onPress?.();
    },
    [disabled, onPress],
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      e.currentTarget?.releasePointerCapture?.(e.pointerId);
      cancel();
    },
    [cancel],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled || isPressedRef.current) return;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        isPressedRef.current = true;
        setIsPressed(true);
        onPress?.();
      }
    },
    [disabled, onPress],
  );

  const onKeyUp = useCallback((e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      isPressedRef.current = false;
      setIsPressed(false);
    }
  }, []);

  return {
    isPressed,
    pressProps: {
      onPointerDown,
      onPointerUp,
      onPointerCancel: cancel,
      onPointerLeave: cancel,
      onKeyDown,
      onKeyUp,
    },
  };
}
