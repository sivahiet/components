import React, {
  ChangeEvent,
  CSSProperties,
  FocusEvent,
  forwardRef,
  KeyboardEvent,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import * as Yup from "yup";

import {
  clearButtonClasses,
  disabledClasses,
  errorTextClasses,
  helpTextClasses,
  inputBaseClasses,
  labelClasses,
  numberInputNoArrows,
  prefixClasses,
  requiredMarkClasses,
  sizeClasses,
  statusClasses,
  suffixClasses,
  wrapperBaseClasses
} from "./Input.config";

export type InputSize = keyof typeof sizeClasses;
export type InputStatus = keyof typeof statusClasses;

export interface InputRef {
  focus: () => void;
  blur: () => void;
  clear: () => void;
}

export interface InputProps {
  id: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  type?: string;
  placeholder?: string;
  size?: InputSize;
  disabled?: boolean;
  readOnly?: boolean;
  allowClear?: boolean;
  maxLength?: number;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  status?: InputStatus;
  label?: string;
  helpText?: string;
  required?: boolean;
  className?: string;
  style?: CSSProperties;

  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onClear?: () => void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

// Yup validation schemas by type

const validationSchemas: Record<string, Yup.AnySchema> = {
  text: Yup.string(),
  email: Yup.string().email("Invalid email address"),
  password: Yup.string().min(6, "Password must be at least 6 characters"),
  tel: Yup.string().matches(/^[0-9]{10}$/, "Phone must be 10 digits"),
  url: Yup.string().url("Invalid URL"),
  number: Yup.number().typeError("Must be a number"),
  search: Yup.string(),
  date: Yup.date().typeError("Invalid date"),
  time: Yup.string(),
  datetime_local: Yup.date().typeError("Invalid datetime"),
  month: Yup.string(),
  week: Yup.string(),
  color: Yup.string().matches(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, "Invalid color")
};

const Input = forwardRef<InputRef, InputProps>(
  (
    {
      id,
      name,
      value,
      defaultValue,
      type = "text",
      placeholder = "",
      size = "medium",
      disabled = false,
      readOnly = false,
      allowClear = false,
      maxLength,
      prefix,
      suffix,
      status = "default",
      label,
      helpText,
      required = false,
      className = "",
      style,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      onClear,
      ...rest
    },
    ref: Ref<InputRef>
  ) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const isControlled = value !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue || "");
    const currentValue = isControlled ? value : uncontrolledValue;

    const [error, setError] = useState<string>("");

    // ✅ Clear value whenever `type` changes
    useEffect(() => {
      if (!isControlled) {
        setUncontrolledValue("");
      }
      setError("");
    }, [type, isControlled]);

    // ✅ Validate value based on type
    const runValidation = (val: string) => {
      const schema = validationSchemas[type];
      if (schema) {
        schema
          .validate(val)
          .then(() => setError("")) // no error
          .catch(err => setError(err.message));
      }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;

      if (!isControlled) {
        setUncontrolledValue(val);
      }

      runValidation(val);
      onChange?.(e);
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      runValidation(e.target.value);
      onBlur?.(e);
    };

    const handleClear = () => {
      if (!isControlled) {
        setUncontrolledValue("");
      }
      setError(""); // clear error
      onClear?.();
      onChange?.({
        target: { value: "" }
      } as ChangeEvent<HTMLInputElement>);
      internalRef.current?.focus();
    };

    useImperativeHandle(ref, () => ({
      focus: () => internalRef.current?.focus(),
      blur: () => internalRef.current?.blur(),
      clear: handleClear
    }));

    return (
      <div className={`w-full ${className}`} style={style}>
        {label && (
          <label htmlFor={id} className={labelClasses}>
            {label}
            {required && <span className={requiredMarkClasses}>*</span>}
          </label>
        )}

        <div
          className={`${wrapperBaseClasses} ${
            error ? statusClasses["error"] : statusClasses[status as InputStatus]
          } ${numberInputNoArrows} ${disabled ? disabledClasses : ""}`}
        >
          {prefix && <span className={prefixClasses}>{prefix}</span>}

          <input
            ref={internalRef}
            id={id}
            name={name}
            type={type}
            {...(isControlled ? { value: currentValue } : { value: uncontrolledValue })}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            maxLength={maxLength}
            required={required}
            aria-invalid={!!error}
            aria-required={required}
            aria-describedby={helpText || error ? `${id}-help` : undefined}
            className={`${inputBaseClasses} ${sizeClasses[size as InputSize]} ${
              disabled ? "ubmisg-cursor-not-allowed" : ""
            }`}
            onChange={handleChange}
            onFocus={e => onFocus?.(e)}
            onBlur={handleBlur}
            onKeyDown={e => onKeyDown?.(e)}
            {...rest}
          />

          {allowClear && currentValue && !disabled && (
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

        {(helpText || error) && (
          <p
            id={`${id}-help`}
            className={error ? errorTextClasses : helpTextClasses}
            aria-live="polite"
          >
            {error || helpText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
