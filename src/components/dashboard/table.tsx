import { Table, TableHead, TableCell, TableBody } from "@/components/core";

import { type EcheanceWithPersonnel } from "@/utils/interface";
import { EcheanceRow } from "./echeanceRow";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface TableDashboardProps {
  data?: EcheanceWithPersonnel[];
  className?: string;
  onSort: (name: string) => void;
}

export default function TableDashboard({
  data,
  className,
  onSort,
}: TableDashboardProps) {
  return (
    <>
      <Table className={className}>
        <TableHead>
          <TableCell header>
            <SortTableCell
              label="Titre"
              name="title"
              onClick={(val) => onSort(val)}
            />
          </TableCell>
          <TableCell header>
            <SortTableCell
              label="Responsable"
              name="responsable"
              onClick={(val) => onSort(val)}
            />
          </TableCell>
          <TableCell header>Reference</TableCell>
          <TableCell header>
            <SortTableCell
              label="Date"
              name="date"
              onClick={(val) => onSort(val)}
            />
          </TableCell>
          <TableCell header>
            <SortTableCell
              label="Typologie"
              name="typologie"
              onClick={(val) => onSort(val)}
            />
          </TableCell>
          <TableCell header>
            <SortTableCell
              label="Échéance"
              name="echeance"
              onClick={(val) => onSort(val)}
            />
          </TableCell>
          <TableCell header>
            <SortTableCell
              label="Échéance du Personnels"
              name="datePersonnels"
              onClick={(val) => onSort(val)}
            />
          </TableCell>
          <TableCell header>
            <SortTableCell
              label="Status"
              name="status"
              onClick={(val) => onSort(val)}
            />
          </TableCell>
        </TableHead>
        <TableBody>
          {data?.map((item) => (
            <EcheanceRow key={item.id} echeance={item} />
          ))}
        </TableBody>
      </Table>
    </>
  );
}

interface SortTableCellProps {
  label: string;
  name: string;
  onClick: (name: string) => void;
}

const SortTableCell = ({ label, name, onClick }: SortTableCellProps) => (
  <div
    className="justify- group  flex cursor-pointer flex-row  items-center hover:text-gray-600"
    onClick={() => onClick(name)}
  >
    <span>{label}</span>
    <ChevronDownIcon className="ml-2 h-4 w-4 transition group-hover:scale-125" />
  </div>
);
