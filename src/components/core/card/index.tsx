interface CardProps {
  children: React.ReactNode;
  className?: string;
}

import cx from "classnames";

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={cx(
        "lg:p-8bg-white before:bot-0 relative flex items-start justify-between overflow-hidden rounded-xl bg-white p-4 shadow-md  dark:bg-gray-600 sm:p-6",
        className
      )}
    >
      {children}
    </div>
  );
}
