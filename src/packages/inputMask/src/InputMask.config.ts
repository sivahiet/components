import { cn } from "../../../utils/cn";

export const wrapperBaseClasses = cn(
  "ubmisg-relative ubmisg-flex ubmisg-items-center ubmisg-border ubmisg-rounded-md ubmisg-bg-white ubmisg-transition-all ubmisg-duration-200",
  "focus-within:ubmisg-shadow-[0_0_0_2px_rgba(25,118,210,0.2)]"
);

export const inputBaseClasses = cn(
  "ubmisg-peer ubmisg-bg-transparent ubmisg-outline-none ubmisg-text-gray-900 ubmisg-placeholder-gray-400",
  "ubmisg-text-base ubmisg-leading-6 ubmisg-py-2 ubmisg-px-3 ubmisg-pt-4 ubmisg-pb-4"
);

export const sizeClasses = {
  small: cn("ubmisg-w-32 ubmisg-text-sm"), // 128px width
  medium: cn("ubmisg-w-48 ubmisg-text-base"), // 192px width
  large: cn("ubmisg-w-72 ubmisg-text-lg") // 288px width
} as const;

export const statusClasses = {
  default: cn("ubmisg-border-gray-300 focus-within:ubmisg-border-blue-500"),
  success: cn("ubmisg-border-green-500 focus-within:ubmisg-border-green-600"),
  warning: cn("ubmisg-border-amber-500 focus-within:ubmisg-border-amber-600"),
  error: cn("ubmisg-border-red-500 focus-within:ubmisg-border-red-600")
} as const;

export const disabledClasses = cn(
  "ubmisg-bg-gray-100 ubmisg-text-gray-500 ubmisg-border-gray-200 ubmisg-cursor-not-allowed"
);

export const prefixClasses = cn("ubmisg-mr-2 ubmisg-flex ubmisg-items-center ubmisg-text-gray-500");

export const suffixClasses = cn("ubmisg-ml-2 ubmisg-flex ubmisg-items-center ubmisg-text-gray-500");

export const helpTextClasses = cn("ubmisg-mt-1 ubmisg-text-xs ubmisg-text-gray-500");

export const clearButtonClasses = cn(
  "ubmisg-absolute ubmisg-right-2 ubmisg-text-gray-400 hover:ubmisg-text-gray-600",
  "focus:ubmisg-outline-none ubmisg-bg-transparent"
);
