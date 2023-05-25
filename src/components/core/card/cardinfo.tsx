interface CardInfoProps {
  children: React.ReactNode;
  className?: string;
  color:
    | "red"
    | "blue"
    | "green"
    | "yellow"
    | "purple"
    | "pink"
    | "indigo"
    | "gray"
    | "white"
    | "black";
}

import cx from "classnames";

export default function CardInfo({
  children,
  className,
  color,
}: CardInfoProps) {
  return (
    <div
      className={cx(
        `lg:p-8bg-white relative flex items-start justify-between overflow-hidden rounded-xl border border-l-4 border-${color}-600 p-4 shadow-md dark:bg-gray-600 sm:p-6`,
        className
      )}
    >
      {children}
    </div>
  );
}
