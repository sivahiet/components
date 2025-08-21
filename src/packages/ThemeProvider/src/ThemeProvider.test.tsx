import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it } from "vitest";

import { ThemeProvider } from "./ThemeProvider";
import { useTheme } from "./useTheme";

// Dummy component to consume theme context
const TestComponent: React.FC = () => {
  const { theme } = useTheme();
  return <div data-testid="theme">{theme}</div>;
};

describe("ThemeProvider", () => {
  afterEach(() => {
    cleanup();
    // Remove all theme classes from document.documentElement after each test
    document.documentElement.classList.remove("light", "dark");
  });

  it("renders children", () => {
    render(
      <ThemeProvider theme="dark">
        <div data-testid="child">Child content</div>
      </ThemeProvider>
    );
    expect(screen.getByTestId("child")).toHaveTextContent("Child content");
  });

  it("defaults theme to 'light' if no theme prop passed", () => {
    render(
      <ThemeProvider>
        <div>Test</div>
      </ThemeProvider>
    );
    expect(document.documentElement.classList.contains("light")).toBe(true);
  });

  it("provides theme context value to children", () => {
    render(
      <ThemeProvider theme="dark">
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
  });

  it("updates document.documentElement class when theme prop changes", () => {
    const { rerender } = render(
      <ThemeProvider theme="light">
        <div>Test</div>
      </ThemeProvider>
    );
    expect(document.documentElement.classList.contains("light")).toBe(true);

    rerender(
      <ThemeProvider theme="dark">
        <div>Test</div>
      </ThemeProvider>
    );

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(document.documentElement.classList.contains("light")).toBe(false);
  });
});
