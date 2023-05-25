interface TableHeadProps {
  children: React.ReactNode;
}

export function TableHead({ children }: TableHeadProps) {
  return (
    <thead className="ltr:text-left rtl:text-right">
      <tr>{children}</tr>
    </thead>
  );
}
