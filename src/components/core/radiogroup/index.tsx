interface RadioGroupProps {
  classNames?: string;
  name: string;
  options: RadioOption[];
  onChange?: (val: string) => void;
  value: string;
  error?: string;
  disabled?: boolean;
}

interface RadioOption {
  name: string;
  value: string;
  label: string;
}

import cx from "classnames";

const RadioGroup = ({
  classNames,
  name,
  options,
  onChange,
  value,
  error,
  disabled = false,
}: RadioGroupProps) => {
  return (
    <fieldset className={cx("flex flex-wrap gap-3", classNames)}>
      <legend className="sr-only">{name}</legend>
      <>
        {options.map((option: RadioOption, index: number) => (
          <div key={index}>
            <input
              type="radio"
              name={name}
              value={option.value}
              id={option.name}
              className="peer hidden [&:checked_+_label_svg]:block"
              checked={value === option.value}
              onChange={(event) => {
                if (disabled) return;
                if (onChange)
                  onChange((event.target as HTMLInputElement).value);
              }}
            />

            <label
              htmlFor={option.name}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-gray-100 bg-white px-3 py-2 text-gray-900 hover:border-gray-200 peer-checked:border-pink-600  peer-checked:bg-gradient-to-l peer-checked:from-pink-800 peer-checked:from-20% peer-checked:to-rose-600 peer-checked:text-white"
            >
              <svg
                className="hidden h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>

              <p className="text-sm font-medium">{option.label}</p>
            </label>
          </div>
        ))}
      </>
      {error && (
        <span className="ml-1 mt-1 flex items-center text-xs font-medium tracking-wide text-red-500">
          {error}
        </span>
      )}
    </fieldset>
  );
};

RadioGroup.displayName = "RadioGroup";

export default RadioGroup;
