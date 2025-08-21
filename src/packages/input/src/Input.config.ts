import { cn } from "../../../utils/cn";

export const wrapperBaseClasses = cn(
  "ubmisg-relative ubmisg-flex ubmisg-items-center ubmisg-w-full ubmisg-border ubmisg-rounded-md ubmisg-bg-white ubmisg-transition-all ubmisg-duration-200 ubmisg-overflow-hidden",
  "focus-within:ubmisg-shadow-[0_0_0_2px_rgba(25,118,210,0.2)]"
);

export const inputBaseClasses = cn(
  "ubmisg-peer ubmisg-bg-transparent ubmisg-outline-none ubmisg-text-gray-900 ubmisg-placeholder-gray-400",
  "ubmisg-text-base ubmisg-leading-6 ubmisg-pt-2 ubmisg-pb-2 ubmisg-px-3"
);

export const sizeClasses = {
  small: cn("ubmisg-w-32 ubmisg-text-sm"), // ~128px wide
  medium: cn("ubmisg-w-48 ubmisg-text-base"), // ~192px wide
  large: cn("ubmisg-w-72 ubmisg-text-lg") // ~288px wide
} as const;

export type InputSize = keyof typeof sizeClasses;

export const statusClasses = {
  default: cn("ubmisg-border-gray-300 focus-within:ubmisg-border-blue-500"),
  success: cn("ubmisg-border-green-500 focus-within:ubmisg-border-green-600"),
  warning: cn("ubmisg-border-amber-500 focus-within:ubmisg-border-amber-600"),
  error: cn("ubmisg-border-red-500 focus-within:ubmisg-border-red-600")
} as const;

export type InputStatus = keyof typeof statusClasses;

export const disabledClasses = cn(
  "ubmisg-bg-gray-100 ubmisg-text-gray-500 ubmisg-border-gray-200 ubmisg-cursor-not-allowed"
);

export const labelClasses = cn(
  "ubmisg-block ubmisg-mb-1 ubmisg-text-sm ubmisg-font-medium ubmisg-text-black-600"
);

export const requiredMarkClasses = cn("ubmisg-text-red-500 ubmisg-ml-0.5");

export const prefixClasses = cn(
  "ubmisg-self-stretch ubmisg-flex ubmisg-items-center ubmisg-bg-gray-100 ubmisg-text-gray-600 ubmisg-px-3"
  // optional divider: "ubmisg-border-r ubmisg-border-gray-200"
);

export const suffixClasses = cn(
  "ubmisg-self-stretch ubmisg-flex ubmisg-items-center ubmisg-bg-gray-100 ubmisg-text-gray-600 ubmisg-px-3"
  // optional divider: "ubmisg-border-l ubmisg-border-gray-200"
);

export const helpTextClasses = cn("ubmisg-mt-1 ubmisg-text-xs ubmisg-text-gray-500");

export const errorTextClasses = cn("ubmisg-mt-1 ubmisg-text-xs ubmisg-text-red-500");

export const clearButtonClasses = cn(
  "ubmisg-absolute ubmisg-right-2 ubmisg-text-gray-400 hover:ubmisg-text-gray-600",
  "focus:ubmisg-outline-none ubmisg-bg-transparent"
);

export const numberInputNoArrows = cn(
  "[&_input[type=number]::-webkit-inner-spin-button]:ubmisg-appearance-none",
  "[&_input[type=number]::-webkit-outer-spin-button]:ubmisg-appearance-none",
  "[&_input[type=number]]:ubmisg-m-0",
  "[&_input[type=number]]:ubmisg-[appearance:textfield]" // Firefox
);
