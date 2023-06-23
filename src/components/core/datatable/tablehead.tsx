interface TableHeadProps {
  children: React.ReactNode;
}

export default function TableHead({ children }: TableHeadProps) {
  return (
    <thead className="w-full ltr:text-left rtl:text-right">
      <tr className="w-full">{children}</tr>
    </thead>
  );
}
