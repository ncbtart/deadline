interface CardProps {
  children: React.ReactNode;
  className?: string;
}

import cx from "classnames";

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={cx(
        "before:bot-0 relative flex items-start justify-between overflow-hidden rounded-xl p-4 shadow-md dark:bg-gray-600  sm:p-8 lg:p-8",
        className
      )}
    >
      {children}
    </div>
  );
}
