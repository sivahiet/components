import { Loader2 } from "lucide-react";
import React, { ButtonHTMLAttributes, ReactNode, useEffect, useState } from "react";

import { cn } from "../../../utils/cn";
import {
  ButtonShape,
  ButtonSize,
  ButtonVariant,
  baseClasses,
  shapePadding,
  shapeRadius,
  sizeClasses,
  variantClasses
} from "./Button.config";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  ariaLabel?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  loading?: boolean;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  children?: ReactNode;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      shape = "default",
      loading = false,
      prefixIcon,
      suffixIcon,
      children,
      disabled,
      fullWidth,
      className,
      ...props
    },
    ref
  ) => {
    const [mode, setMode] = useState<keyof typeof variantClasses>("light");
    const isDisabled = disabled || loading;

    useEffect(() => {
      const html = document.documentElement;
      const updateTheme = () => {
        if (html.classList.contains("dark")) setMode("dark");
        else setMode("light");
      };

      // Initial check
      updateTheme();

      // Optional: Listen for mutations to <html class="">
      const observer = new MutationObserver(updateTheme);
      observer.observe(html, { attributes: true, attributeFilter: ["class"] });

      return () => observer.disconnect();
    }, []);

    return (
      <button
        ref={ref}
        aria-label={props["aria-label"] || props.ariaLabel}
        disabled={isDisabled}
        className={cn(
          baseClasses,
          sizeClasses[size],
          shape !== "circle" && shapePadding[shape][size],
          shapeRadius[shape],
          variantClasses[mode][variant],
          fullWidth && "ubmisg-w-full",
          className
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="ubmisg-animate-spin ubmisg-h-4 ubmisg-w-4 ubmisg-mr-2" />
        ) : prefixIcon ? (
          <span className={children ? "ubmisg-mr-2" : ""} aria-hidden="true">
            {prefixIcon}
          </span>
        ) : null}
        {shape !== "circle" && children}
        {suffixIcon && !loading && (
          <span className={children ? "ubmisg-ml-2" : ""} aria-hidden="true">
            {suffixIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
