import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Button } from "../button";

describe("Button", () => {
    it("renders with default variant", () => {
        render(<Button>Click me</Button>);
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("has type=button by default", () => {
        render(<Button>Click me</Button>);
        expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    it("fires onPress on pointerdown", async () => {
        const onPress = vi.fn();
        render(<Button onPress={onPress}>Click me</Button>);
        const btn = screen.getByRole("button");
        await userEvent.pointer({ target: btn, keys: "[MouseLeft>]" });
        expect(onPress).toHaveBeenCalledTimes(1);
    });

    it("does not fire onPress when disabled", async () => {
        const onPress = vi.fn();
        render(<Button onPress={onPress} disabled>Click me</Button>);
        const btn = screen.getByRole("button");
        await userEvent.pointer({ target: btn, keys: "[MouseLeft>]" });
        expect(onPress).not.toHaveBeenCalled();
    });

    it("renders all variants without crashing", () => {
        const variants = ["default", "primary", "ghost", "destructive"] as const;
        for (const variant of variants) {
            const { unmount } = render(<Button variant={variant}>Label</Button>);
            expect(screen.getByRole("button")).toBeInTheDocument();
            unmount();
        }
    });

    it("is keyboard accessible — Space triggers onPress", async () => {
        const onPress = vi.fn();
        render(<Button onPress={onPress}>Click me</Button>);
        screen.getByRole("button").focus();
        await userEvent.keyboard(" ");
        expect(onPress).toHaveBeenCalled();
    });
});