import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  today,
  getLocalTimeZone,
  parseAbsolute,
} from "@internationalized/date";

import { Note, Typologie } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";

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

import { type DateValue } from "react-aria";
import Personnels from "./personnels";
import { useRouter } from "next/router";
import {
  type UserWithoutPassword,
  type EcheancheWithPersonnel,
} from "@/utils/interface";
import { api } from "@/utils/api";

const EcheanceSchemaUpdate = z
  .object({
    reference: z.string().nonempty({ message: "Ce champ est requis" }),
    objet: z.string().nonempty({ message: "Ce champ est requis" }),
    date: z.date({ errorMap: () => ({ message: "Ce champ est requis" }) }),
    echeance: z
      .date({ errorMap: () => ({ message: "Ce champ est requis" }) })
      .min(new Date(), {
        message: "La date de création doit être supérieure à la date du jour",
      }),
    typologie: z.nativeEnum(Typologie, {
      errorMap: () => ({ message: "Ce champ est requis" }),
    }),
    note: z.nativeEnum(Note, {
      errorMap: () => ({ message: "Ce champ est requis" }),
    }),
  })
  .refine((data) => data.date < data.echeance, {
    message: "La date d'échéance doit être supérieure à la date de création",
    path: ["echeance"],
  });

type EcheanceSchemaUpdateType = z.infer<typeof EcheanceSchemaUpdate>;

interface EcheanceMainProps {
  echeance?: EcheancheWithPersonnel | null;
  title: string;
}

export default function EcheanceUpdate({ echeance, title }: EcheanceMainProps) {
  const router = useRouter();

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

  const { control, handleSubmit, setError } = useForm<EcheanceSchemaUpdateType>(
    {
      resolver: zodResolver(EcheanceSchemaUpdate),
    }
  );

  const [personnels, setPersonnels] = useState<UserWithoutPassword[]>([]);

  useEffect(() => {
    if (echeance) {
      setPersonnels(
        echeance.echeancePersonnel.map(
          (echeancePersonnel) => echeancePersonnel.personnel
        )
      );
    }
  }, [echeance]);

  const utils = api.useContext();

  const updateMutation = api.echeance.updateEcheance.useMutation({
    onSuccess: async () => {
      await utils.echeance.findAll.invalidate();
      await utils.echeance.findById.invalidate({ id: echeance?.id });
      await router.push("/");
    },
    onError: (error) => {
      console.log(error);
      setError("reference", {
        type: "manual",
        message: error.message,
      });
    },
  });

  const onSubmit: SubmitHandler<EcheanceSchemaUpdateType> = (data) => {
    if (echeance?.id === undefined) {
      return;
    }

    const personnelsId = personnels.map((personnel) => personnel.id);
    updateMutation.mutate({ id: echeance.id, ...data, personnelsId });
  };

  if (echeance && echeance.echeance < new Date()) {
    return <EchanceTermine echeance={echeance} personnels={personnels} />;
  }

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
        <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
          <div className="ml-4 mr-16 mt-8 grid w-[580px] grid-cols-2 gap-6">
            <Controller
              control={control}
              name="reference"
              defaultValue={echeance?.reference ?? ""}
              render={({ field, fieldState: { error } }) => (
                <Textfield
                  {...field}
                  label="Référence"
                  type="text"
                  error={error?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="note"
              defaultValue={echeance?.note ?? "NEMO"}
              render={({ field, fieldState: { error } }) => (
                <RadioGroup
                  name="note"
                  classNames="items-end"
                  onChange={(val: string) => {
                    console.log(val);
                    field.onChange(val);
                  }}
                  value={field.value}
                  options={notes}
                  error={error?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="typologie"
              defaultValue={echeance?.typologie ?? "INFORMATIQUE"}
              render={({ field, fieldState: { error } }) => (
                <Select
                  label="Typologie"
                  {...field}
                  options={typologies}
                  error={error?.message}
                />
              )}
            />
            <div />
            <Controller
              control={control}
              defaultValue={echeance?.date}
              name="date"
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  onChange={(val: DateValue) =>
                    field.onChange(val.toDate(getLocalTimeZone()))
                  }
                  value={
                    field.value
                      ? parseAbsolute(
                          field.value.toISOString(),
                          getLocalTimeZone()
                        )
                      : null
                  }
                  error={error?.message}
                  granularity="day"
                  label="Date de début"
                />
              )}
            />
            <Controller
              control={control}
              name="echeance"
              defaultValue={echeance?.echeance}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  onChange={(val: DateValue) =>
                    field.onChange(val.toDate(getLocalTimeZone()))
                  }
                  value={
                    field.value
                      ? parseAbsolute(
                          field.value.toISOString(),
                          getLocalTimeZone()
                        )
                      : null
                  }
                  label="Echéance - Soutenu"
                  error={error?.message}
                  granularity="day"
                  minValue={today(getLocalTimeZone())}
                />
              )}
            />

            <Controller
              control={control}
              name="objet"
              rules={{ required: true }}
              defaultValue={echeance?.objet ?? ""}
              render={({ field, fieldState: { error } }) => (
                <TextArea
                  {...field}
                  label="Objet"
                  rows={8}
                  error={error?.message}
                />
              )}
            />
            <Personnels
              personnels={personnels}
              responsableId={echeance?.responsable.id}
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
            <Button type="submit">Modifier</Button>
          </div>
        </form>
      </div>
    </Card>
  );
}

interface EchanceTermineProps {
  echeance?: EcheancheWithPersonnel | null;
  personnels: UserWithoutPassword[];
}

function EchanceTermine({ echeance, personnels }: EchanceTermineProps) {
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

          <h3 className="text-lg font-bold sm:text-xl">
            Recapitulatif échéance
          </h3>
        </div>
        <div className="ml-4 mr-16 mt-8 grid w-[580px] grid-cols-2 gap-6">
          <Textfield
            name="reference"
            value={echeance?.reference}
            label="Référence"
            type="text"
            disabled
          />
          <RadioGroup
            name="note"
            classNames="items-end"
            value={echeance?.note ?? "NEMO"}
            options={notes}
            disabled
          />
          <Select
            name="typologie"
            label="Typologie"
            options={typologies}
            value={echeance?.typologie ?? "NEMO"}
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
            value={
              echeance &&
              parseAbsolute(echeance.echeance.toISOString(), getLocalTimeZone())
            }
            label="Echéance - Soutenu"
            granularity="day"
            isDisabled
          />

          <TextArea
            name="objet"
            value={echeance?.objet ?? ""}
            label="Objet"
            rows={8}
            disabled
          />

          <Personnels
            responsableId={echeance?.responsable.id}
            personnels={personnels}
            disabled
            onAddPersonnel={() => {
              return;
            }}
            onRemovePersonnel={() => {
              return;
            }}
          />
        </div>
      </div>
    </Card>
  );
}
