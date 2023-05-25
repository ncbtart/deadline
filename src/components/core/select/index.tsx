import { forwardRef } from "react";

import cx from "classnames";

interface SelectFieldProps {
  label?: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  options?: string[];
  error?: string;
}

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, name, placeholder = "", defaultValue, options, error }, ref) => (
    <div>
      <label
        htmlFor={name}
        className={cx(
          "block text-sm font-bold uppercase leading-6 text-gray-900 dark:text-white",
          {
            "text-red-500": error,
          }
        )}
      >
        {label}
      </label>

      <select
        ref={ref}
        name={name}
        id="HeadlineAct"
        className={cx(
          "sm:leading-6rounded-lg mt-1.5  block w-full rounded-md border-0 border-gray-300 py-1.5 text-gray-900 ring-1 ring-inset  ring-gray-300 placeholder:text-gray-400 focus:right-2 focus:ring-2 focus:ring-inset focus:ring-gray-900 dark:bg-gray-800 dark:text-gray-200 dark:ring-gray-700 dark:focus:ring-white  sm:text-sm sm:leading-6",
          { "ring-red-500": error }
        )}
        defaultValue={defaultValue}
        placeholder={placeholder}
        autoFocus={error ? true : false}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && (
        <span className="ml-1 mt-1 flex items-center text-xs font-medium tracking-wide text-red-500">
          {error}
        </span>
      )}
    </div>
  )
);

SelectField.displayName = "SelectField";

export default SelectField;
