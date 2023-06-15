import { type EcheanceWithPersonnel } from "@/utils/interface";
import {
  Avatar,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/core";
import {
  ChatBubbleBottomCenterTextIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { StatusEcheance } from "@prisma/client";

import { useState } from "react";

import { Popover } from "@headlessui/react";
import { usePopper } from "react-popper";

interface SuiviPersonnelsProps {
  echeance?: EcheanceWithPersonnel | null;
}

export default function SuiviPersonnels({ echeance }: SuiviPersonnelsProps) {
  if (echeance?.echeancePersonnel?.length === 0 || !echeance?.datePersonnels)
    return <></>;

  return (
    <Card className="h-fit">
      <div className="container flex flex-col">
        {/* Dashboard Header */}

        <div className="flex items-center gap-4">
          <UsersIcon className="h-6 w-6 font-bold text-pink-600 sm:h-8 sm:w-8" />
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Suivi des personnels
          </h2>
        </div>
        <div className="container mt-6 flex h-72 flex-col">
          <Table>
            <TableHead>
              <TableCell header>Nom</TableCell>
              <TableCell header>Image</TableCell>
              <TableCell header>Statut</TableCell>
              <TableCell header>Date de réalisation</TableCell>
            </TableHead>
            <TableBody className="max-h-56">
              {echeance?.echeancePersonnel.map((echeancePersonnel, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex flex-row">
                        {echeancePersonnel.personnel.name}
                        {echeancePersonnel.message && (
                          <MessagePersonnel
                            message={echeancePersonnel.message}
                          />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Avatar
                        image={echeancePersonnel.personnel.image}
                        name={echeancePersonnel.personnel.name}
                      />
                    </TableCell>
                    <TableCell>
                      {echeancePersonnel.status === StatusEcheance.TERMINE ? (
                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                          Réalisé
                        </span>
                      ) : echeancePersonnel.status ===
                        StatusEcheance.EN_COURS ? (
                        <span className="inline-flex rounded-full bg-yellow-100 px-2 text-xs font-semibold leading-5 text-yellow-800">
                          En cours
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                          Non réalisé
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {echeancePersonnel.dateRealisation &&
                      echeancePersonnel.status === StatusEcheance.TERMINE
                        ? format(echeancePersonnel.dateRealisation, "dd/MM/yy")
                        : ""}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
}

interface MessagePersonnelProps {
  message: string | null;
}

const MessagePersonnel = ({ message }: MessagePersonnelProps) => {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "right-end",
  });

  return (
    <Popover>
      <Popover.Button
        ref={setReferenceElement}
        className="focus:outline-none focus:ring-0"
      >
        <ChatBubbleBottomCenterTextIcon className="ml-4 h-4 w-4 cursor-pointer text-blue-400 transition hover:scale-150" />
      </Popover.Button>
      <Popover.Panel
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        className="z-10"
      >
        <div className="overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800">
          <div className="p-4">
            <p className="text-sm text-gray-700 dark:text-gray-100">
              {message}
            </p>
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  );
};
