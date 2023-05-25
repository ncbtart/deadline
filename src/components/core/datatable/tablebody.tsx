interface TableBodyProps {
  children: React.ReactNode;
}

export default function TableBody({ children }: TableBodyProps) {
  return (
    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
      {children}
    </tbody>
  );
}
