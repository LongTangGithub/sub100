import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ConfirmDialog } from "../confirm-dialog";

function mount(
    props: Partial<React.ComponentProps<typeof ConfirmDialog>> = {},
) {
    const defaults = {
        open: true,
        onOpenChange: vi.fn(),
        title: "Delete file",
        onConfirm: vi.fn(),
    };
    return render(<ConfirmDialog {...defaults} {...props} />);
}

describe("ConfirmDialog", () => {
    it("Cancel fires onOpenChange(false) without calling onConfirm", async () => {
        const onOpenChange = vi.fn();
        const onConfirm = vi.fn();
        mount({ onOpenChange, onConfirm });

        await userEvent.click(screen.getByRole("button", { name: "Cancel" }));

        expect(onOpenChange).toHaveBeenCalledWith(false);
        expect(onConfirm).not.toHaveBeenCalled();
    });

    it("Confirm calls onConfirm and closes the dialog", async () => {
        const onOpenChange = vi.fn();
        const onConfirm = vi.fn();
        mount({ onOpenChange, onConfirm });

        await userEvent.click(screen.getByRole("button", { name: "Confirm" }));

        expect(onOpenChange).toHaveBeenCalledWith(false);
        expect(onConfirm).toHaveBeenCalled();
    });

    it("destructive variant changes the Confirm button styling", () => {
        // Brittle-class-check avoided: compare className between variants
        // rather than asserting a specific Tailwind utility.
        const { unmount } = mount({ variant: "primary" });
        const primaryClass = screen.getByRole("button", { name: "Confirm" }).className;
        unmount();

        mount({ variant: "destructive" });
        const destructiveClass = screen.getByRole("button", { name: "Confirm" }).className;

        expect(destructiveClass).not.toBe(primaryClass);
    });

    it("onError fires when onConfirm rejects", async () => {
        const onError = vi.fn();
        const onConfirm = vi.fn().mockRejectedValue(new Error("boom"));
        mount({ onConfirm, onError });

        await userEvent.click(screen.getByRole("button", { name: "Confirm" }));

        await waitFor(() => {
            expect(onError).toHaveBeenCalledWith(expect.any(Error));
        });
    });

    it("renders without description prop", () => {
        mount({ description: undefined });

        expect(screen.getByText("Delete file")).toBeInTheDocument();
        // No description element — no text content beyond Title + button labels
        expect(screen.queryByText(/cannot be undone/i)).not.toBeInTheDocument();
    });
});