interface TableHeadProps {
  children: React.ReactNode;
}

export default function TableHead({ children }: TableHeadProps) {
  return <thead className="ltr:text-left rtl:text-right">{children}</thead>;
}
