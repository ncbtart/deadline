interface ButtonProps {
  children: React.ReactNode;
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
    <button
      className={cx(
        "flex items-center justify-between  rounded px-8 py-3 text-sm font-medium transition hover:scale-105 hover:shadow-md focus:outline-none focus:ring",
        { "bg-pink-600 text-white active:bg-pink-500": !outlined },
        {
          "border border-current border-pink-600 bg-white text-pink-600 active:text-pink-500":
            outlined,
        },
        { "rounded-full": rounded }
      )}
    >
      {children}
    </button>
  );
}
