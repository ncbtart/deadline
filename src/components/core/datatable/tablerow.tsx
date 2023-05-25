interface TableRowProps {
  children: React.ReactNode;
}

export default function TableRow({ children }: TableRowProps) {
  return <tr className="odd:bg-gray-50 dark:odd:bg-gray-800/50">{children}</tr>;
}
