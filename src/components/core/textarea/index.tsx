import { forwardRef } from "react";

import cx from "classnames";

interface TextAreaProps {
  label?: string;
  name: string;
  placeholder?: string;
  error?: string;
  rows: number;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, name, placeholder = "", rows, error, ...props }, ref) => (
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
        <textarea
          ref={ref}
          name={name}
          rows={rows}
          id={name}
          {...props}
          className={cx(
            "block h-40 w-full resize-none rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 dark:bg-gray-800 dark:text-gray-200 dark:ring-gray-700 dark:focus:ring-white sm:text-sm sm:leading-6",
            { "ring-red-500": error }
          )}
          placeholder={placeholder}
          autoFocus={error ? true : false}
        />
      </div>
      {error && (
        <span className="ml-1 mt-1 flex items-center text-xs font-medium tracking-wide text-red-500">
          {error}
        </span>
      )}
    </div>
  )
);

TextArea.displayName = "Textfield";

export default TextArea;
