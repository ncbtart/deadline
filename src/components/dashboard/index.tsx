import { format } from "date-fns";

import type { Echeance } from "@/utils/models";

import EcheanceDisplay from "./echeance";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
} from "@/components/core";
import Status from "./status";

interface TableDashboardProps {
  data?: Echeance[];
  className?: string;
}

export default function TableDashboard({
  data,
  className,
}: TableDashboardProps) {
  return (
    <Table className={className}>
      <TableHead>
        <TableCell header>Objet</TableCell>
        <TableCell header>Responsable</TableCell>
        <TableCell header>Reference</TableCell>
        <TableCell header>Date</TableCell>
        <TableCell header>Typologie</TableCell>
        <TableCell header>Échéance</TableCell>
        <TableCell header>Status</TableCell>
      </TableHead>
      <TableBody>
        {data?.map((item: Echeance) => (
          <TableRow key={item.id}>
            <TableCell>
              <p className="max-w-xs truncate">{item.objet}</p>
            </TableCell>
            <TableCell>
              <Avatar
                tooltip
                name={`${item.responsable.firstname as string} ${
                  item.responsable.lastname as string
                }`}
                image={item.responsable.image}
              />
            </TableCell>
            <TableCell>{item.reference}</TableCell>
            <TableCell>{format(item.date, "dd/MM/yy")}</TableCell>
            <TableCell>{item.typologie}</TableCell>
            <TableCell>
              <EcheanceDisplay dateDebut={item.date} dateFin={item.echeance} />
            </TableCell>
            <TableCell>
              <Status status={item.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
