interface TableBodyProps {
  children: React.ReactNode;
  className?: string;
}

import cx from "classnames";

export default function TableBody({ children, className }: TableBodyProps) {
  return (
    <tbody
      className={cx(
        "divide-y divide-gray-200 overflow-auto dark:divide-gray-700",
        className
      )}
    >
      {children}
    </tbody>
  );
}
