import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeAll } from "vitest";
import { CommandMenu } from "../command-menu";

function mount(props: React.ComponentProps<typeof CommandMenu> = { children: null }) {
    return render(
        <CommandMenu {...props}>
            <CommandMenu.Input placeholder="Search" />
            <CommandMenu.List>
                <CommandMenu.Empty>No results.</CommandMenu.Empty>
                <CommandMenu.Item value="apple">apple</CommandMenu.Item>
                <CommandMenu.Item value="banana">banana</CommandMenu.Item>
                <CommandMenu.Item value="cherry">cherry</CommandMenu.Item>
            </CommandMenu.List>
        </CommandMenu>,
    );
}

describe("CommandMenu", () => {
    beforeAll(() => {
        Object.defineProperty(navigator, "platform", {
            value: "MacIntel",
            configurable: true,
        });
    });

    it("renders when open (controlled)", () => {
        mount({ open: true, children: null });
        expect(screen.getByText("banana")).toBeInTheDocument();
    });

    it("does not render when closed (controlled)", () => {
        mount({ open: false, children: null });
        expect(screen.queryByText("banana")).not.toBeInTheDocument();
    });

    it("fires onOpenChange(false) on Esc", async () => {
        const onOpenChange = vi.fn();
        mount({ open: true, onOpenChange, children: null });
        await userEvent.keyboard("{Escape}");
        expect(onOpenChange).toHaveBeenCalledWith(false);
    });
    it("filters items as you type", async () => {
        mount({ open: true, children: null });
        await userEvent.type(screen.getByPlaceholderText("Search"), "ban");
        expect(screen.getByText("banana")).toBeInTheDocument();
        expect(screen.queryByText("apple")).not.toBeInTheDocument();
        expect(screen.queryByText("cherry")).not.toBeInTheDocument();
    });

    it("fires onSelect when an item is chosen via Enter", async () => {
        const onSelect = vi.fn();
        render(
            <CommandMenu open={true}>
                <CommandMenu.Input placeholder="Search" />
                <CommandMenu.List>
                    <CommandMenu.Item value="apple" onSelect={onSelect}>
                        apple
                    </CommandMenu.Item>
                </CommandMenu.List>
            </CommandMenu>,
        );
        await userEvent.type(screen.getByPlaceholderText("Search"), "app");
        await userEvent.keyboard("{Enter}");
        expect(onSelect).toHaveBeenCalled();
    });

    it("shows empty state when no item matches", async () => {
        mount({ open: true, children: null });
        await userEvent.type(screen.getByPlaceholderText("Search"), "zzzzz");
        expect(screen.getByText("No results.")).toBeInTheDocument();
    });

    it("global ⌘K opens an uncontrolled instance", () => {
        mount();
        expect(screen.queryByText("banana")).not.toBeInTheDocument();
        act(() => {
            window.dispatchEvent(
                new KeyboardEvent("keydown", { key: "k", metaKey: true }),
            );
        });
        expect(screen.getByText("banana")).toBeInTheDocument();
    });

    it("global ⌘K does NOT open a controlled instance", () => {
        mount({ open: false, children: null });
        act(() => {
            window.dispatchEvent(
                new KeyboardEvent("keydown", { key: "k", metaKey: true }),
            );
        });
        expect(screen.queryByText("banana")).not.toBeInTheDocument();
    });

    it("auto-closes on select", async () => {
        mount();
        act(() => {
            window.dispatchEvent(
                new KeyboardEvent("keydown", { key: "k", metaKey: true }),
            );
        });
        expect(screen.getByText("banana")).toBeInTheDocument();
        await userEvent.type(screen.getByPlaceholderText("Search"), "ban");
        await userEvent.keyboard("{Enter}");
        expect(screen.queryByText("banana")).not.toBeInTheDocument();
    });

    it("respects closeOnSelect=false", async () => {
        render(
            <CommandMenu>
                <CommandMenu.Input placeholder="Search" />
                <CommandMenu.List>
                    <CommandMenu.Item value="stay" closeOnSelect={false}>
                        stay
                    </CommandMenu.Item>
                </CommandMenu.List>
            </CommandMenu>,
        );
        act(() => {
            window.dispatchEvent(
                new KeyboardEvent("keydown", { key: "k", metaKey: true }),
            );
        });
        expect(screen.getByText("stay")).toBeInTheDocument();
        await userEvent.keyboard("{Enter}");
        expect(screen.getByText("stay")).toBeInTheDocument();
    });
});