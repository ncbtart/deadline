import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { today, getLocalTimeZone } from "@internationalized/date";

import { Note, Typologie } from "@prisma/client";
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

import { type DateValue } from "react-aria";
import Personnels from "./personnels";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { type UserWithoutPassword } from "@/utils/interface";
import { useSession } from "next-auth/react";

const EcheanceSchemaCreate = z
  .object({
    reference: z.string().nonempty({ message: "Ce champ est requis" }),
    objet: z.string().nonempty({ message: "Ce champ est requis" }),
    date: z
      .date({ errorMap: () => ({ message: "Ce champ est requis" }) })
      .min(today(getLocalTimeZone()).toDate(getLocalTimeZone()), {
        message: "La date de création doit être supérieure à la date du jour",
      }),

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

type EcheanceSchemaCreateType = z.infer<typeof EcheanceSchemaCreate>;

interface EcheanceMainProps {
  title: string;
}

export default function EcheanceCreate({ title }: EcheanceMainProps) {
  const router = useRouter();

  const { data: user } = useSession();

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

  const { control, handleSubmit, setError } = useForm<EcheanceSchemaCreateType>(
    {
      resolver: zodResolver(EcheanceSchemaCreate),
    }
  );

  const [personnels, setPersonnels] = useState<UserWithoutPassword[]>([]);

  const utils = api.useContext();

  const createMutation = api.echeance.createEcheance.useMutation({
    onSuccess: async () => {
      await utils.echeance.findAll.invalidate();
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

  const onSubmit: SubmitHandler<EcheanceSchemaCreateType> = (data) => {
    const personnelsId = personnels.map((personnel) => personnel.id);
    createMutation.mutate({ ...data, personnelsId });
  };

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
              defaultValue={""}
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
              defaultValue={"NEMO"}
              render={({ field, fieldState: { error } }) => (
                <RadioGroup
                  name="note"
                  classNames="items-end"
                  onChange={(val: string) => {
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
              defaultValue={"INFORMATIQUE"}
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
              name="date"
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  onChange={(val: DateValue) =>
                    field.onChange(val.toDate(getLocalTimeZone()))
                  }
                  error={error?.message}
                  granularity="day"
                  label="Date de début"
                  minValue={today(getLocalTimeZone())}
                />
              )}
            />
            <Controller
              control={control}
              name="echeance"
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  onChange={(val: DateValue) =>
                    field.onChange(val.toDate(getLocalTimeZone()))
                  }
                  label="Echéance - Soutenu"
                  error={error?.message}
                  minValue={today(getLocalTimeZone())}
                />
              )}
            />

            <Controller
              control={control}
              name="objet"
              rules={{ required: true }}
              defaultValue={""}
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
              responsableId={user?.user.id}
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
        </form>
      </div>
    </Card>
  );
}
