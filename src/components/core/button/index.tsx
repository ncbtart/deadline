interface ButtonProps {
  children: string;
  outlined?: boolean;
  rounded?: boolean;
}

import cx from "classnames";

export default function Button({
  children,
  outlined = false,
  rounded = false,
}: ButtonProps) {
  return (
    <a
      className={cx(
        "inline-block rounded  px-8 py-3 text-sm font-medium transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring",
        { "bg-indigo-600 text-white active:bg-indigo-500": !outlined },
        {
          "border border-current border-indigo-600 bg-white text-indigo-600 active:text-indigo-500":
            outlined,
        },
        { "rounded-full": rounded }
      )}
    >
      {children}
    </a>
  );
}
