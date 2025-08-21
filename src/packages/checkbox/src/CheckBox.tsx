import React, { useEffect, useRef } from 'react';
import { cn } from '../../../utils/cn';
import { checkboxCva, checkboxIndicatorCva } from './CheckBox.config';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string | React.ReactNode;
  indeterminate?: boolean;
  size?: 'small' | 'medium' | 'large';
  status?: 'default' | 'error' | 'warning' | 'success';
  tooltip?: string | React.ReactNode;
  visuallyHiddenLabel?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      label,
      indeterminate = false,
      size = 'medium',
      status = 'default',
      id,
      disabled,
      visuallyHiddenLabel,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const finalRef = (ref || internalRef) as React.RefObject<HTMLInputElement>;

    useEffect(() => {
      if (finalRef.current) {
        finalRef.current.indeterminate = indeterminate;
      }
    }, [finalRef, indeterminate]);

    const uniqueId = id || React.useId();

    return (
      <label
        htmlFor={uniqueId}
        className={cn(
          checkboxCva({ size }),
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
      >
        <input
          type="checkbox"
          id={uniqueId}
          ref={finalRef}
          disabled={disabled}
          className={cn(checkboxIndicatorCva({ size, status }))}
          {...props}
        />
        {label && (
          <span
            className={cn(
              'ml-2',
              visuallyHiddenLabel && 'sr-only'
            )}
          >
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
