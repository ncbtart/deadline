interface TableRowProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

import cx from "classnames";

export default function TableRow({
  children,
  className,
  onClick,
}: TableRowProps) {
  return (
    <tr
      className={cx("odd:bg-gray-50 dark:odd:bg-gray-800/50", className)}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}
