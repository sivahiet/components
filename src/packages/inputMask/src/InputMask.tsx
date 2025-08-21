import React, {
  ChangeEvent,
  ClipboardEvent,
  FocusEvent,
  forwardRef,
  KeyboardEvent,
  Ref,
  useImperativeHandle,
  useRef,
  useState
} from "react";

import {
  clearButtonClasses,
  disabledClasses,
  helpTextClasses,
  inputBaseClasses,
  prefixClasses,
  sizeClasses,
  statusClasses,
  suffixClasses,
  wrapperBaseClasses
} from "./InputMask.config";

export type InputMaskSize = keyof typeof sizeClasses;
export type InputMaskStatus = keyof typeof statusClasses;

export interface InputMaskRef {
  focus: () => void;
  blur: () => void;
  clear: () => void;
  getRawValue: () => string;
}

export interface InputMaskProps {
  id: string;
  mask: string; // e.g., "999-999-9999"
  value?: string;
  defaultValue?: string;
  name?: string;
  placeholder?: string;
  placeholderChar?: string;
  size?: InputMaskSize;
  status?: InputMaskStatus;
  disabled?: boolean;
  readOnly?: boolean;
  allowClear?: boolean;
  label?: string;
  helpText?: string;
  required?: boolean;
  className?: string;
  style?: React.CSSProperties;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;

  onChange?: (maskedValue: string, rawValue?: string) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onClear?: () => void;
}

//
// Masking helper
//
const applyMask = (value: string, mask: string, placeholderChar = "*") => {
  let masked = "";
  let raw = "";
  let vi = 0;

  for (let mi = 0; mi < mask.length; mi++) {
    const m = mask[mi];

    if (m === "9") {
      const digit = value[vi++];
      if (/\d/.test(digit || "")) {
        masked += digit;
        raw += digit;
      } else {
        masked += placeholderChar;
      }
    } else {
      masked += m; // literal char
      if (value[vi] === m) {
        vi++;
      }
    }
  }

  return { masked, raw };
};

//
// Component
//
const InputMask = forwardRef<InputMaskRef, InputMaskProps>(
  (
    {
      id,
      mask,
      value,
      defaultValue,
      name,
      placeholder = "",
      placeholderChar = "*",
      size = "medium",
      status = "default",
      disabled = false,
      readOnly = false,
      allowClear = false,
      helpText,
      required,
      className = "",
      style,
      prefix,
      suffix,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      onClear
    },
    ref: Ref<InputMaskRef>
  ) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const isControlled = value !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue || "");

    const currentValue = isControlled ? value! : uncontrolledValue;
    const { masked, raw } = applyMask(currentValue, mask, placeholderChar);

    //
    // Handle input typing
    //
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const inputEl = e.target;
      const cursorPos = inputEl.selectionStart || 0;

      // raw digits only
      const rawInput = inputEl.value.replace(/\D/g, "");
      const { masked, raw } = applyMask(rawInput, mask, placeholderChar);

      if (!isControlled) {
        setUncontrolledValue(raw);
      }
      onChange?.(masked, raw);

      // restore caret
      requestAnimationFrame(() => {
        if (internalRef.current) {
          let newPos = cursorPos;
          // if caret lands on a literal, skip forward
          while (newPos < masked.length && /[^0-9_]/.test(masked[newPos])) {
            newPos++;
          }
          internalRef.current.setSelectionRange(newPos, newPos);
        }
      });
    };

    //
    // Handle Backspace/Delete over literals
    //
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      const inputEl = e.currentTarget;
      const pos = inputEl.selectionStart || 0;

      if (e.key === "Backspace" && pos > 0) {
        if (/[^0-9_]/.test(mask[pos - 1])) {
          e.preventDefault();
          requestAnimationFrame(() => {
            inputEl.setSelectionRange(pos - 1, pos - 1);
          });
        }
      }

      if (e.key === "Delete" && pos < mask.length) {
        if (/[^0-9_]/.test(mask[pos])) {
          e.preventDefault();
          requestAnimationFrame(() => {
            inputEl.setSelectionRange(pos + 1, pos + 1);
          });
        }
      }

      onKeyDown?.(e);
    };

    //
    // Handle Paste
    //
    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const text = e.clipboardData.getData("Text").replace(/\D/g, "");
      const { masked, raw } = applyMask(text, mask, placeholderChar);

      if (!isControlled) {
        setUncontrolledValue(raw);
      }
      onChange?.(masked, raw);

      requestAnimationFrame(() => {
        if (internalRef.current) {
          let pos = masked.indexOf(placeholderChar);
          if (pos === -1) pos = masked.length;
          internalRef.current.setSelectionRange(pos, pos);
        }
      });
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      const inputEl = e.target;
      const rawInput = inputEl.value.replace(/\D/g, ""); // get only digits

      // Apply mask again to ensure it's formatted
      const { masked, raw } = applyMask(rawInput, mask, placeholderChar);

      if (!isControlled) {
        setUncontrolledValue(raw);
      }
      onChange?.(masked, raw);
      onBlur?.(e);
    };

    //
    // Handle Click -> jump to first empty caret
    //
    const handleClick = () => {
      if (internalRef.current) {
        let pos = masked.indexOf(placeholderChar);
        if (pos === -1) pos = masked.length;
        internalRef.current.setSelectionRange(pos, pos);
      }
    };

    //
    // Clear input
    //
    const handleClear = () => {
      if (!isControlled) {
        setUncontrolledValue("");
      }
      onClear?.();
      onChange?.("", "");
      internalRef.current?.focus();
    };

    //
    // Ref API
    //
    useImperativeHandle(ref, () => ({
      focus: () => internalRef.current?.focus(),
      blur: () => internalRef.current?.blur(),
      clear: handleClear,
      getRawValue: () => raw
    }));

    return (
      <div className={`ubmisg-w-full ${className}`} style={style}>
        <div
          className={`${wrapperBaseClasses} ${sizeClasses[size]} ${statusClasses[status]} ${
            disabled ? disabledClasses : ""
          }`}
        >
          {prefix && <span className={prefixClasses}>{prefix}</span>}

          <input
            ref={internalRef}
            id={id}
            name={name}
            value={masked}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            aria-invalid={status === "error"}
            aria-required={required}
            aria-describedby={helpText ? `${id}-help` : undefined}
            className={`${inputBaseClasses} ubmisg-pr-8`}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onFocus={e => {
              // jump to first empty caret on focus
              let pos = masked.indexOf(placeholderChar);
              if (pos === -1) pos = masked.length;
              requestAnimationFrame(() => {
                internalRef.current?.setSelectionRange(pos, pos);
              });
              onFocus?.(e);
            }}
            onClick={handleClick}
          />

          {allowClear && !!raw && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear input"
              className={clearButtonClasses}
            >
              ✕
            </button>
          )}

          {suffix && <span className={suffixClasses}>{suffix}</span>}
        </div>

        {helpText && (
          <p id={`${id}-help`} className={helpTextClasses} aria-live="polite">
            {helpText}
          </p>
        )}
      </div>
    );
  }
);

InputMask.displayName = "InputMask";
export default InputMask;
