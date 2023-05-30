interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  outlined?: boolean;
  rounded?: boolean;
  type?: "button" | "submit" | "reset";
}

import cx from "classnames";

export default function Button({
  children,
  outlined = false,
  rounded = false,
  type = "button",
  className,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cx(
        "rounded px-8 py-2 text-sm font-medium  transition hover:scale-105 hover:shadow-md focus:outline-none focus:ring",
        {
          "bg-gradient-to-r from-rose-600 from-10% to-pink-800 text-white active:bg-pink-500":
            !outlined,
          "border border-current border-pink-600 bg-white text-pink-600 active:text-pink-500":
            outlined,
        },
        { "rounded-full": rounded },
        className
      )}
    >
      {children}
    </button>
  );
}
