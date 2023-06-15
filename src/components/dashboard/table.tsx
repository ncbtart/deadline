import { Table, TableHead, TableCell, TableBody } from "@/components/core";

import { type EcheanceWithPersonnel } from "@/utils/interface";
import { EcheanceRow } from "./echeanceRow";

interface TableDashboardProps {
  data?: EcheanceWithPersonnel[];
  className?: string;
}

export default function TableDashboard({
  data,
  className,
}: TableDashboardProps) {
  return (
    <Table className={className}>
      <TableHead>
        <TableCell header>Reference</TableCell>

        <TableCell header>Responsable</TableCell>
        <TableCell header>Objet</TableCell>

        <TableCell header>Date</TableCell>
        <TableCell header>Typologie</TableCell>
        <TableCell header>Échéance</TableCell>
        <TableCell header>Status</TableCell>
      </TableHead>
      <TableBody>
        {data?.map((item) => (
          <EcheanceRow key={item.id} echeance={item} />
        ))}
      </TableBody>
    </Table>
  );
}
