interface TableCellProps {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
  colSpan?: number;
  rowSpan?: number;
  scope?: "col" | "row";
  header?: boolean;
}

import cx from "classnames";

export function TableCell({
  children,
  className,
  align,
  colSpan,
  rowSpan,
  scope,
  header = false,
  ...props
}: TableCellProps) {
  const classes = cx(
    "whitespace-nowrap px-4 py-2 text-gray-900 dark:text-white",
    {
      "text-left": align === "left",
      "text-center": align === "center",
      "text-right": align === "right",
    },
    { "text-gray-500 dark:text-gray-800": header },
    className
  );

  return (
    <td
      {...props}
      className={classes}
      colSpan={colSpan}
      rowSpan={rowSpan}
      scope={scope}
    >
      {children}
    </td>
  );
}
