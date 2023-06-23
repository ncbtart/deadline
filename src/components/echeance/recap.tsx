import { getLocalTimeZone, parseAbsolute } from "@internationalized/date";

import { Note, Typologie } from "@prisma/client";
import { useMemo } from "react";

import {
  Button,
  Card,
  DatePicker,
  Select,
  TextArea,
  Textfield,
} from "@/components/core";

import { RadioGroup } from "@/components/core";

import { type EcheanceWithPersonnel } from "@/utils/interface";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";

interface EcheanceNoEditProps {
  echeance: EcheanceWithPersonnel;
}

export function EcheanceNoEdit({ echeance }: EcheanceNoEditProps) {
  const { data: session } = useSession({ required: true });

  const notes = useMemo(() => {
    return Object.keys(Note).map((key) => ({
      value: key,
      label: key,
      name: key,
    }));
  }, []);

  const typologies = useMemo(() => {
    return Object.keys(Typologie).map((key) => ({
      value: key,
      label: key.charAt(0) + key.substring(1).toLowerCase(),
    }));
  }, []);

  return (
    <Card className="invisible bg-white sm:visible">
      <div className="container flex flex-col">
        {/* Dashboard Header */}
        <div className="flex items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 font-bold text-pink-600 sm:h-8 sm:w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <h3 className="text-lg font-bold sm:text-xl">
            Recapitulatif échéance
          </h3>
          <div className="grow" />

          <Link href="/">
            <Button outlined rounded>
              <div className="flex items-center gap-2">
                <HomeIcon className="h-5 w-5" />
                <span>Retour</span>
              </div>
            </Button>
          </Link>
        </div>
        <div className="ml-4 mr-16 mt-8 grid w-[580px] grid-cols-2 gap-6">
          <Textfield
            name="title"
            className="col-span-2"
            value={echeance.title}
            label="Titre"
            type="text"
            disabled
          />
          <Textfield
            name="reference"
            value={echeance.reference}
            label="Référence"
            type="text"
            disabled
          />
          <RadioGroup
            name="note"
            classNames="items-end"
            value={echeance.note || "NEMO"}
            options={notes}
            disabled
          />
          <Select
            name="typologie"
            label="Typologie"
            options={typologies}
            value={echeance.typologie || "AUTRE"}
            disabled
          />

          <div />

          <DatePicker
            value={
              echeance &&
              parseAbsolute(echeance.date.toISOString(), getLocalTimeZone())
            }
            granularity="day"
            label="Date de début"
            isDisabled
          />

          <DatePicker
            value={parseAbsolute(
              session?.user.id !== echeance?.responsable.id
                ? echeance?.datePersonnels?.toISOString() ??
                    echeance?.echeance?.toISOString()
                : echeance?.echeance?.toISOString() ?? "",
              getLocalTimeZone()
            )}
            label={
              session?.user.id === echeance?.responsable.id
                ? "Echéance - Soutenu"
                : "Echéance - CDAD"
            }
            granularity="day"
            isDisabled
          />

          <div className="col-span-2">
            <TextArea
              name="objet"
              value={echeance?.objet ?? ""}
              label="Objet"
              rows={8}
              disabled
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
