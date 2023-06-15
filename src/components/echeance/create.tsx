import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { today, getLocalTimeZone } from "@internationalized/date";

import { Note, Typologie } from "@prisma/client";
import { useMemo } from "react";

import Link from "next/link";

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
import { api } from "@/utils/api";
import { type EcheanceWithPersonnel } from "@/utils/interface";
import { HomeIcon } from "@heroicons/react/24/outline";

const EcheanceSchemaCreate = z
  .object({
    reference: z.string().nonempty({ message: "Ce champ est requis" }),
    title: z.string().nonempty({ message: "Ce champ est requis" }),
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
  onSuccess: (data: EcheanceWithPersonnel) => void;
}

export default function EcheanceCreate({
  title,
  onSuccess,
}: EcheanceMainProps) {
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

  const utils = api.useContext();

  const createMutation = api.echeance.createEcheance.useMutation({
    onSuccess: async (data) => {
      await utils.echeance.findAll.invalidate();

      onSuccess(data as EcheanceWithPersonnel);
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
    createMutation.mutate({ ...data });
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
        <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
          <div className="ml-4 mr-16 mt-8 grid w-[580px] grid-cols-2 gap-6">
            <Controller
              control={control}
              name="title"
              defaultValue={""}
              render={({ field, fieldState: { error } }) => (
                <Textfield
                  {...field}
                  className="col-span-2"
                  label="Titre"
                  type="text"
                  error={error?.message}
                />
              )}
            />
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
            <div className="col-span-2">
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
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center">
            <Button type="submit" rounded>
              <div className="flex items-center gap-2">
                {createMutation.isLoading && (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="h-4 w-4 animate-spin rounded-full"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
                <span>Enregistrer</span>
              </div>
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}
