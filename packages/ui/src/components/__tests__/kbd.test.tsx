import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Kbd } from "../kbd";

describe("Kbd", () => {
  it("renders a semantic kbd element", () => {
    render(<Kbd>⌘</Kbd>);
    expect(screen.getByText("⌘").tagName).toBe("KBD");
  });

  it("renders children", () => {
    render(<Kbd>⌘</Kbd>);
    expect(screen.getByText("⌘")).toBeInTheDocument();
  });

  it("applies sm size class", () => {
    render(<Kbd size="sm">⌘</Kbd>);
    expect(screen.getByText("⌘").className).toContain("h-5");
  });

  it("applies md size class by default", () => {
    render(<Kbd>⌘</Kbd>);
    expect(screen.getByText("⌘").className).toContain("h-6");
  });

  it("forwards arbitrary props", () => {
    render(
      <Kbd aria-label="Command key" data-testid="cmd">
        ⌘
      </Kbd>,
    );
    const el = screen.getByTestId("cmd");
    expect(el).toHaveAttribute("aria-label", "Command key");
  });

  it("has parent-affordance lift classes", () => {
    render(<Kbd>⌘</Kbd>);
    const className = screen.getByText("⌘").className;
    expect(className).toContain("group-hover:-translate-y-px");
    expect(className).toContain("group-focus-visible:-translate-y-px");
  });

  it("has no interactive role or tabindex by default", () => {
    render(<Kbd>⌘</Kbd>);
    const el = screen.getByText("⌘");
    expect(el).not.toHaveAttribute("role");
    expect(el).not.toHaveAttribute("tabindex");
  });
});
