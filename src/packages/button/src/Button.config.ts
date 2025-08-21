import { cn } from "../../../utils/cn";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "ghost"
  | "link"
  | "text"
  | "solid"
  | "outlined"
  | "dashed"
  | "filled"
  | "gradient";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonShape = "default" | "circle" | "round";

export const baseClasses = cn(
  "ubmisg-inline-flex",
  "ubmisg-items-center",
  "ubmisg-justify-center",
  "ubmisg-font-medium",
  "ubmisg-transition-colors",
  "ubmisg-focus:outline-none",
  "ubmisg-focus:ring-2",
  "ubmisg-focus:ring-offset-2",
  "ubmisg-disabled:opacity-50",
  "ubmisg-disabled:cursor-not-allowed"
);

export const sizeClasses = {
  sm: cn("ubmisg-h-8", "ubmisg-px-3", "ubmisg-text-sm"),
  md: cn("ubmisg-h-10", "ubmisg-px-4", "ubmisg-text-base"),
  lg: cn("ubmisg-h-12", "ubmisg-px-5", "ubmisg-text-lg")
};

export const shapePadding = {
  default: {
    sm: "ubmisg-px-3",
    md: "ubmisg-px-4",
    lg: "ubmisg-px-5"
  },
  round: {
    sm: "ubmisg-px-3.5",
    md: "ubmisg-px-5",
    lg: "ubmisg-px-6"
  },
  circle: {
    sm: "ubmisg-w-8",
    md: "ubmisg-w-10",
    lg: "ubmisg-w-12"
  }
};

export const shapeRadius = {
  default: "ubmisg-rounded-md",
  round: "ubmisg-rounded-full",
  circle: "ubmisg-rounded-full"
};

export const variantClasses = {
  light: {
    filled: cn(
      "ubmisg-bg-gray-200",
      "ubmisg-text-gray-800",
      "ubmisg-hover:bg-gray-300",
      "ubmisg-focus:ring-gray-300"
    ),
    gradient: cn(
      "ubmisg-bg-gradient-to-r",
      "ubmisg-from-blue-500",
      "ubmisg-via-purple-500",
      "ubmisg-to-pink-500",
      "ubmisg-text-white",
      "ubmisg-hover:from-blue-600",
      "ubmisg-hover:via-purple-600",
      "ubmisg-hover:to-pink-600",
      "ubmisg-focus:ring-purple-500"
    ),
    primary: cn(
      "ubmisg-bg-blue-600",
      "ubmisg-text-white",
      "ubmisg-hover:bg-blue-700",
      "ubmisg-focus:ring-blue-500"
    ),
    secondary: cn(
      "ubmisg-bg-gray-100",
      "ubmisg-text-gray-900",
      "ubmisg-hover:bg-gray-200",
      "ubmisg-focus:ring-gray-400"
    ),
    danger: cn(
      "ubmisg-bg-red-600",
      "ubmisg-text-white",
      "ubmisg-hover:bg-red-700",
      "ubmisg-focus:ring-red-500"
    ),
    ghost: cn(
      "ubmisg-bg-transparent",
      "ubmisg-hover:bg-gray-100",
      "ubmisg-text-gray-900",
      "ubmisg-focus:ring-gray-300"
    ),
    link: cn(
      "ubmisg-bg-transparent",
      "ubmisg-underline",
      "ubmisg-text-blue-600",
      "ubmisg-hover:text-blue-800",
      "ubmisg-focus:ring-blue-500"
    ),
    text: cn(
      "ubmisg-bg-transparent",
      "ubmisg-text-gray-700",
      "ubmisg-hover:text-black",
      "ubmisg-hover:bg-gray-100",
      "ubmisg-focus:ring-gray-300"
    ),
    solid: cn(
      "ubmisg-bg-gray-800",
      "ubmisg-text-white",
      "ubmisg-hover:bg-gray-900",
      "ubmisg-focus:ring-gray-700"
    ),
    outlined: cn(
      "ubmisg-border",
      "ubmisg-border-gray-300",
      "ubmisg-text-gray-800",
      "ubmisg-hover:bg-gray-100",
      "ubmisg-focus:ring-gray-300"
    ),
    dashed: cn(
      "ubmisg-border",
      "ubmisg-border-dashed",
      "ubmisg-border-gray-400",
      "ubmisg-text-gray-800",
      "ubmisg-hover:bg-gray-100",
      "ubmisg-focus:ring-gray-300"
    )
  },
  dark: {
    filled: cn(
      "ubmisg-bg-gray-700",
      "ubmisg-text-gray-100",
      "ubmisg-hover:bg-gray-600",
      "ubmisg-focus:ring-gray-500"
    ),
    gradient: cn(
      "ubmisg-bg-gradient-to-r",
      "ubmisg-from-blue-400",
      "ubmisg-via-purple-400",
      "ubmisg-to-pink-400",
      "ubmisg-text-gray-900",
      "ubmisg-hover:from-blue-300",
      "ubmisg-hover:via-purple-300",
      "ubmisg-hover:to-pink-300",
      "ubmisg-focus:ring-purple-400"
    ),
    primary: cn(
      "ubmisg-bg-blue-500",
      "ubmisg-text-white",
      "ubmisg-hover:bg-blue-400",
      "ubmisg-focus:ring-blue-400"
    ),
    secondary: cn(
      "ubmisg-bg-gray-600",
      "ubmisg-text-gray-100",
      "ubmisg-hover:bg-gray-500",
      "ubmisg-focus:ring-gray-400"
    ),
    danger: cn(
      "ubmisg-bg-red-500",
      "ubmisg-text-white",
      "ubmisg-hover:bg-red-400",
      "ubmisg-focus:ring-red-400"
    ),
    ghost: cn(
      "ubmisg-bg-transparent",
      "ubmisg-hover:bg-gray-700",
      "ubmisg-text-gray-200",
      "ubmisg-focus:ring-gray-500"
    ),
    link: cn(
      "ubmisg-bg-transparent",
      "ubmisg-underline",
      "ubmisg-text-blue-400",
      "ubmisg-hover:text-blue-300",
      "ubmisg-focus:ring-blue-400"
    ),
    text: cn(
      "ubmisg-bg-transparent",
      "ubmisg-text-gray-300",
      "ubmisg-hover:text-white",
      "ubmisg-hover:bg-gray-700",
      "ubmisg-focus:ring-gray-500"
    ),
    solid: cn(
      "ubmisg-bg-gray-200",
      "ubmisg-text-gray-900",
      "ubmisg-hover:bg-gray-300",
      "ubmisg-focus:ring-gray-400"
    ),
    outlined: cn(
      "ubmisg-border",
      "ubmisg-border-gray-500",
      "ubmisg-text-gray-200",
      "ubmisg-hover:bg-gray-700",
      "ubmisg-focus:ring-gray-500"
    ),
    dashed: cn(
      "ubmisg-border",
      "ubmisg-border-dashed",
      "ubmisg-border-gray-500",
      "ubmisg-text-gray-200",
      "ubmisg-hover:bg-gray-700",
      "ubmisg-focus:ring-gray-500"
    )
  }
};
