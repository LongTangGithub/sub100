import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Dialog } from "../dialog";

function mount(open: boolean, onOpenChange?: (open: boolean) => void) {
    return render(
        <Dialog open={open} onOpenChange={onOpenChange}>
            <Dialog.Title>Delete file</Dialog.Title>
            <Dialog.Description>This action cannot be undone.</Dialog.Description>
            <Dialog.Body>Body content here.</Dialog.Body>
            <Dialog.Footer>
                <button type="button">Cancel</button>
                <button type="button">Confirm</button>
            </Dialog.Footer>
        </Dialog>,
    );
}

describe("Dialog", () => {
    it("renders when open", () => {
        mount(true);
        expect(screen.getByText("Delete file")).toBeInTheDocument();
        expect(screen.getByText("Body content here.")).toBeInTheDocument();
    });

    it("does not render when closed", () => {
        mount(false);
        expect(screen.queryByText("Delete file")).not.toBeInTheDocument();
    });

    it("fires onOpenChange(false) on Esc", async () => {
        const onOpenChange = vi.fn();
        mount(true, onOpenChange);
        await userEvent.keyboard("{Escape}");
        expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it("renders Title as a heading-like element", () => {
        mount(true);
        // Radix Dialog.Title renders as <h2> by default
        const title = screen.getByText("Delete file");
        expect(title.tagName).toBe("H2");
    });

    it("renders Footer children", () => {
        mount(true);
        expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Confirm" })).toBeInTheDocument();
    });

    it("wires Description to aria-describedby on Content", () => {
        mount(true);
        const description = screen.getByText("This action cannot be undone.");
        const dialog = screen.getByRole("dialog");
        expect(dialog).toHaveAttribute("aria-describedby", description.id);
    });
});