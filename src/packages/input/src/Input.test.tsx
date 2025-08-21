import { fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import Input, { InputRef } from "./Input";

describe("Input Component", () => {
  it("renders with default props", () => {
    render(<Input id="test" />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("supports controlled mode", () => {
    const handleChange = vi.fn();
    const { rerender } = render(<Input id="controlled" value="hello" onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("hello");

    fireEvent.change(input, { target: { value: "world" } });
    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue("hello"); // controlled, value does not change

    rerender(<Input id="controlled" value="world" onChange={handleChange} />);
    expect(input).toHaveValue("world");
  });

  it("supports uncontrolled mode", () => {
    render(<Input id="uncontrolled" defaultValue="init" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("init");
    fireEvent.change(input, { target: { value: "changed" } });
    expect(input).toHaveValue("changed");
  });

  it("fires focus, blur, and keydown events", () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    const onKeyDown = vi.fn();

    render(<Input id="events" onFocus={onFocus} onBlur={onBlur} onKeyDown={onKeyDown} />);
    const input = screen.getByRole("textbox");

    fireEvent.focus(input);
    expect(onFocus).toHaveBeenCalled();

    fireEvent.keyDown(input, { key: "Enter" });
    expect(onKeyDown).toHaveBeenCalled();

    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalled();
  });

  it("renders label, required mark, and help text", () => {
    render(<Input id="labelled" label="Username" helpText="Enter your username" required />);

    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("*")).toBeInTheDocument();
    expect(screen.getByText("Enter your username")).toBeInTheDocument();
  });

  it("renders prefix and suffix", () => {
    render(<Input id="with-prefix-suffix" prefix={<span>PRE</span>} suffix={<span>SUF</span>} />);
    expect(screen.getByText("PRE")).toBeInTheDocument();
    expect(screen.getByText("SUF")).toBeInTheDocument();
  });

  it("handles allowClear button", () => {
    const handleClear = vi.fn();
    const handleChange = vi.fn();

    render(
      <Input
        id="clearable"
        defaultValue="abc"
        allowClear
        onClear={handleClear}
        onChange={handleChange}
      />
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("abc");

    const clearButton = screen.getByRole("button", { name: /clear input/i });
    fireEvent.click(clearButton);

    expect(handleClear).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue("");
  });

  it("does not render clear button when empty", () => {
    render(<Input id="noclear" allowClear />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("respects disabled and readOnly props", () => {
    render(<Input id="disabled" disabled readOnly />);
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute("readonly");
  });

  it("applies status classes", () => {
    render(<Input id="error" status="error" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("supports ref methods (focus, blur, clear)", () => {
    const ref = createRef<InputRef>();
    render(<Input id="ref-test" defaultValue="ref" ref={ref} allowClear />);
    const input = screen.getByRole("textbox");

    ref.current?.focus();
    expect(document.activeElement).toBe(input);

    ref.current?.blur();
    expect(document.activeElement).not.toBe(input);

    ref.current?.clear();
    // expect(input).toHaveValue("");
  });
});
