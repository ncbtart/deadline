import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/core";
import { type Echeance } from "@/utils/models";

interface TableDashboardProps {
  data: Echeance[];
  className?: string;
}

export default function TableDashboard({
  data,
  className,
}: TableDashboardProps) {
  return (
    <Table className={className}>
      <TableHead>
        <TableRow>
          <TableCell header>Objet</TableCell>
          <TableCell header>Responsable</TableCell>
          <TableCell header>Reference</TableCell>
          <TableCell header>Date</TableCell>
          <TableCell header>Typologie</TableCell>
          <TableCell header>Échéance</TableCell>
          <TableCell header>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.map((item: Echeance) => (
          <TableRow key={item.id}>
            <TableCell>{item.objet}</TableCell>
            <TableCell>{item.responsable}</TableCell>
            <TableCell>{item.reference}</TableCell>
            <TableCell>{item.date}</TableCell>
            <TableCell>{item.typologie}</TableCell>
            <TableCell>{item.echeance}</TableCell>
            <TableCell>{item.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
