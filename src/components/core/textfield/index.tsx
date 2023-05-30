import { forwardRef, type ReactNode } from "react";

import cx from "classnames";

interface TextFieldProps {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  error?: string;
}

const Textfield = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      name,
      type,
      placeholder = "",
      startIcon,
      endIcon,
      error,
      ...props
    },
    ref
  ) => (
    <div>
      {label && (
        <label
          htmlFor={name}
          className={cx(
            "block text-sm font-bold uppercase leading-6 text-gray-900 dark:text-white",
            { "text-red-500": error }
          )}
        >
          {label}
        </label>
      )}
      <div className="relative mt-2 rounded-md shadow-sm">
        {startIcon && (
          <span className="pointer-events-none absolute inset-y-0 end-0 grid w-10 place-content-center text-gray-900 dark:text-gray-200">
            {startIcon}
          </span>
        )}
        <input
          ref={ref}
          {...props}
          type={type}
          id={name}
          className={cx(
            "block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 dark:bg-gray-800 dark:text-gray-200 dark:ring-gray-700 dark:focus:ring-white sm:text-sm sm:leading-6",
            { "ring-red-500": error }
          )}
          placeholder={placeholder}
          autoFocus={error ? true : false}
        />
        {endIcon && (
          <span className="pointer-events-none absolute inset-y-0 end-0 grid w-10 place-content-center text-gray-900 dark:text-gray-200">
            {endIcon}
          </span>
        )}
      </div>
      {error && (
        <span className="ml-1 mt-1 flex items-center text-xs font-medium tracking-wide text-red-500">
          {error}
        </span>
      )}
    </div>
  )
);

Textfield.displayName = "Textfield";

export default Textfield;
