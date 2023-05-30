interface TableProps {
  children: React.ReactNode;
  className?: string;
}

import cx from "classnames";

export default function Table({ children, className }: TableProps) {
  return (
    <div className={cx("overflow-x-auto", className)}>
      <table className="mb-2 min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-900">
        <>{children}</>
      </table>
    </div>
  );
}
