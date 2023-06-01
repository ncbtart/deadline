import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Note, type Personnel, Typologie } from "@prisma/client";
import { useMemo, useState } from "react";

import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import {
  Button,
  Card,
  DatePicker,
  Select,
  TextArea,
  Textfield,
} from "@/components/core";

import { RadioGroup } from "@/components/core";

import type { Echeance } from "@/utils/models";
import type { DateValue } from "react-aria";
import Personnels from "./personnels";

const EcheanceSchema = z.object({
  reference: z.string(),
  objet: z.string(),
  date: z.date(),
  echeance: z.date(),
  typologie: z.string(),
  note: z.string(),
});

type EcheanceSchemaType = z.infer<typeof EcheanceSchema>;

interface EcheanceMainProps {
  echeance?: Echeance;
}

export default function EcheanceMain({ echeance }: EcheanceMainProps) {
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

  const title = useMemo(() => {
    return echeance ? "Modifier une échéance" : "Nouvelle échéance";
  }, [echeance]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EcheanceSchemaType>({
    resolver: zodResolver(EcheanceSchema),
  });

  const onSubmit: SubmitHandler<EcheanceSchemaType> = (data) =>
    console.log(data);

  const [personnels, setPersonnels] = useState<Personnel[]>([]);

  return (
    <Card className="invisible sm:visible">
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

          <h3 className="text-lg font-bold sm:text-xl">{title}</h3>
        </div>
        <form onSubmit={() => handleSubmit(onSubmit)}>
          <div className="ml-4 mr-16 mt-8 grid w-[580px] grid-cols-2 gap-6">
            <Controller
              control={control}
              name="reference"
              rules={{ required: true }}
              defaultValue=""
              render={({ field }) => (
                <Textfield {...field} label="Référence" type="text" />
              )}
            />
            <Controller
              control={control}
              name="note"
              rules={{ required: true }}
              render={({ field }) => (
                <RadioGroup
                  name="note"
                  classNames="items-end"
                  onChange={(val: string) => {
                    console.log(val);
                    field.onChange(val);
                  }}
                  value={field.value}
                  options={notes}
                />
              )}
            />
            <Controller
              control={control}
              name="typologie"
              rules={{ required: true }}
              render={({ field }) => (
                <Select label="Typologie" {...field} options={typologies} />
              )}
            />
            <div />
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <DatePicker
                  onChange={(val: DateValue) => field.onChange(val.toString())}
                  label="Date de début"
                />
              )}
            />
            <Controller
              control={control}
              name="echeance"
              render={({ field }) => (
                <DatePicker
                  onChange={(val: DateValue) => field.onChange(val.toString())}
                  label="Echéance - Soutenu"
                />
              )}
            />

            <Controller
              control={control}
              name="objet"
              rules={{ required: true }}
              defaultValue=""
              render={({ field }) => (
                <TextArea {...field} label="Objet" rows={8} />
              )}
            />
            <Personnels
              personnels={personnels}
              onAddPersonnel={(personnel) => {
                if (personnels.find((p) => p.id === personnel.id)) return;
                setPersonnels([...personnels, personnel]);
              }}
              onRemovePersonnel={(personnel) => {
                setPersonnels(personnels.filter((p) => p.id !== personnel.id));
              }}
            />
          </div>
          <div className="mt-4 flex items-center justify-center">
            <Button type="submit">Enregistrer</Button>
          </div>

          {/* <DevTool control={control} /> */}
        </form>
      </div>
    </Card>
  );
}
