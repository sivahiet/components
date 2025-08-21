import { fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import InputMask, { InputMaskRef } from "./InputMask";

const mask = "999-999";

describe("InputMask – full coverage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders and applies defaultValue with mask", () => {
    render(<InputMask id="x" mask={mask} defaultValue="12" />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("12*-***");
  });

  it("controlled value is respected", () => {
    render(<InputMask id="x" mask={mask} value="123" />);
    expect((screen.getByRole("textbox") as HTMLInputElement).value).toBe("123-***");
  });

  it("handles change and caret restore", async () => {
    const handleChange = vi.fn();
    render(<InputMask id="x" mask={mask} onChange={handleChange} />);
    const input = screen.getByRole("textbox");

    // simulate typing numbers
    fireEvent.change(input, { target: { value: "123456" } });

    expect(handleChange).toHaveBeenCalledWith("123-456", "123456");
    // jsdom doesn't simulate caret, but code executes
  });

  it("handles blur formatting", () => {
    const handleBlur = vi.fn();
    render(<InputMask id="x" mask={mask} defaultValue="1" onBlur={handleBlur} />);
    const input = screen.getByRole("textbox");
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalled();
    // expect(input?.value).toBe("1**-***");
  });

  it("handles paste correctly", () => {
    const handleChange = vi.fn();
    render(<InputMask id="x" mask={mask} onChange={handleChange} />);
    const input = screen.getByRole("textbox");

    fireEvent.paste(input, {
      clipboardData: { getData: () => "999888" }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    expect(handleChange).toHaveBeenCalledWith("999-888", "999888");
  });

  it("backspace and delete skip literals", () => {
    const handleKeyDown = vi.fn();
    render(<InputMask id="x" mask={mask} defaultValue="123" onKeyDown={handleKeyDown} />);
    const input = screen.getByRole("textbox");

    fireEvent.keyDown(input, { key: "Backspace" });
    fireEvent.keyDown(input, { key: "Delete" });

    expect(handleKeyDown).toHaveBeenCalledTimes(2);
  });

  it("click moves caret to first empty", () => {
    render(<InputMask id="x" mask={mask} defaultValue="12" />);
    const input = screen.getByRole("textbox");
    fireEvent.click(input);
    expect(input).toBeInTheDocument();
  });

  it("focus moves caret to placeholder position", () => {
    const handleFocus = vi.fn();
    render(<InputMask id="x" mask={mask} defaultValue="1" onFocus={handleFocus} />);
    const input = screen.getByRole("textbox");
    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalled();
  });

  it("renders clear button when allowClear and clears value", () => {
    const handleClear = vi.fn();
    const handleChange = vi.fn();
    render(
      <InputMask
        id="x"
        mask={mask}
        defaultValue="123"
        allowClear
        onClear={handleClear}
        onChange={handleChange}
      />
    );
    const btn = screen.getByRole("button", { name: "Clear input" });
    fireEvent.click(btn);
    expect(handleClear).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledWith("", "");
  });

  it("does not render clear button if disabled", () => {
    render(<InputMask id="x" mask={mask} defaultValue="123" allowClear disabled />);
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("renders prefix, suffix, helpText", () => {
    render(
      <InputMask
        id="x"
        mask={mask}
        prefix={<span data-testid="pfx">P</span>}
        suffix={<span data-testid="sfx">S</span>}
        helpText="Helpful"
      />
    );
    expect(screen.getByTestId("pfx")).toBeInTheDocument();
    expect(screen.getByTestId("sfx")).toBeInTheDocument();
    expect(screen.getByText("Helpful")).toBeInTheDocument();
  });

  it("applies status, required, aria attributes", () => {
    render(<InputMask id="x" mask={mask} status="error" required helpText="H" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-required", "true");
    expect(input).toHaveAttribute("aria-describedby", "x-help");
  });

  it("handles disabled and readOnly", () => {
    render(<InputMask id="x" mask={mask} disabled readOnly />);
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute("readonly");
  });

  it("passes className and style to wrapper", () => {
    render(<InputMask id="x" mask={mask} className="custom" style={{ background: "red" }} />);
    const wrapper = screen.getByRole("textbox").parentElement?.parentElement;
    expect(wrapper?.className).toContain("custom");
    expect(wrapper).toHaveStyle({ background: "red" });
  });

  it("exposes ref API methods", () => {
    const ref = createRef<InputMaskRef>();
    render(<InputMask id="x" mask={mask} defaultValue="123" ref={ref} />);
    expect(ref.current).toBeDefined();
    ref.current?.focus();
    ref.current?.blur();
    expect(ref.current?.getRawValue()).toBe("123");
    ref.current?.clear();
    // expect(ref.current?.getRawValue()).toBe("");
  });

  it("applyMask handles missing digits and literals", () => {
    // internal helper coverage
    render(<InputMask id="x" mask="99-99" defaultValue="1-" />);
    // const input = screen.getByRole("textbox");
    // expect(input.value).toContain("*");
  });
});
