import { cva } from 'class-variance-authority';

export const checkboxConfig = {
  base: 'flex items-center',
  variants: {
    size: {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg',
    },
  },
};

export const checkboxCva = cva(checkboxConfig.base, {
  variants: checkboxConfig.variants,
  defaultVariants: {
    size: 'medium',
  },
});

export const checkboxIndicatorCva = cva(
  'form-checkbox rounded shadow-sm focus:ring-offset-0 focus:ring-2',
  {
    variants: {
      size: {
        small: 'h-4 w-4',
        medium: 'h-5 w-5',
        large: 'h-6 w-6',
      },
      status: {
        default: 'text-indigo-600 border-gray-300 focus:ring-indigo-500',
        error: 'text-red-600 border-red-300 focus:ring-red-500',
        warning: 'text-yellow-600 border-yellow-300 focus:ring-yellow-500',
        success: 'text-green-600 border-green-300 focus:ring-green-500',
      },
    },
    defaultVariants: {
      size: 'medium',
      status: 'default',
    },
  }
);