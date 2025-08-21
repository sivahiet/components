import { render, screen } from "@testing-library/react";
import { Search } from "lucide-react";
import { describe, expect, test } from "vitest";

import Button from "./Button";

describe("Variants", () => {
  (
    [
      "primary",
      "secondary",
      "danger",
      "ghost",
      "link",
      "text",
      "solid",
      "outlined",
      "dashed",
      "filled",
      "gradient"
    ] as const
  ).forEach(variant => {
    test(`renders ${variant} variant`, () => {
      render(<Button variant={variant}>Click Here</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });
});

describe("Sizes", () => {
  (["sm", "md", "lg"] as const).forEach(size => {
    test(`renders size ${size}`, () => {
      render(<Button size={size}>Click Here</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });
});

describe("Shapes", () => {
  (["default", "circle", "round"] as const).forEach(shape => {
    test(`renders shape ${shape}`, () => {
      render(<Button shape={shape}>Click Here</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });

  test("does not render children when shape is circle", () => {
    render(<Button shape="circle" prefixIcon={<Search />} ariaLabel="circle-icon" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});

describe("Boolean states", () => {
  test("renders loading state", () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("renders disabled state", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("renders fullWidth button", () => {
    render(
      <Button fullWidth ariaLabel="full-width">
        Full Width
      </Button>
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});

describe("Icons", () => {
  test("renders prefix icon with children", () => {
    render(
      <Button prefixIcon={<Search />} ariaLabel="with-prefix">
        Icon
      </Button>
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("renders suffix icon with children", () => {
    render(
      <Button suffixIcon={<Search />} ariaLabel="with-suffix">
        Icon
      </Button>
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("renders suffix icon when not loading and no children", () => {
    render(<Button suffixIcon={<Search />} ariaLabel="suffix-only" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("renders prefix icon without children", () => {
    render(<Button prefixIcon={<Search />} ariaLabel="icon-only" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("does not render suffix icon when loading", () => {
    render(<Button suffixIcon={<Search />} loading ariaLabel="no-suffix" />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  test("renders suffix icon with children", () => {
    render(
      <Button suffixIcon={<Search />} ariaLabel="with-suffix">
        Icon
      </Button>
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("renders prefix icon without children", () => {
    render(<Button prefixIcon={<Search />} ariaLabel="icon-only" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("does not render suffix icon when loading", () => {
    render(<Button suffixIcon={<Search />} loading ariaLabel="no-suffix" />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
