import {
  type UserWithoutPassword,
  type EcheanceWithPersonnel,
} from "@/utils/interface";
import { Button, Card, DatePicker } from "@/components/core";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import { getLocalTimeZone, parseAbsolute } from "@internationalized/date";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { type DateValue } from "react-aria";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import Personnels from "./personnels";

interface ReponseResponsableProps {
  echeance?: EcheanceWithPersonnel | null;
}

const ReponseSchema = z.object({
  datePersonnels: z.date({
    errorMap: () => ({ message: "Ce champ est requis" }),
  }),
});

type ReponseSchemaType = z.infer<typeof ReponseSchema>;

export default function ReponseResponsable({
  echeance,
}: ReponseResponsableProps) {
  const [isOpen, setOpen] = useState(() => !!echeance?.datePersonnels);

  const { control, handleSubmit, setError } = useForm<ReponseSchemaType>({
    resolver: zodResolver(ReponseSchema),
  });

  const utils = api.useContext();

  const mutateReponse = api.echeance.initReponse.useMutation({
    onSuccess: async () => {
      await utils.echeance.findAll.invalidate();
      await utils.echeance.findById.invalidate({ id: echeance?.id });
    },
    onError: (error) => {
      console.log(error);
      setError("datePersonnels", {
        type: "manual",
        message: error.message,
      });
    },
  });

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

  const onSubmit: SubmitHandler<ReponseSchemaType> = (data) => {
    if (echeance?.id === undefined) {
      return;
    }

    const personnelsId = personnels.map((personnel) => personnel.id);

    mutateReponse.mutate({
      id: echeance.id,
      ...data,
      personnelsId,
    });
  };

  return (
    <>
      {isOpen ? (
        <Card className="invisible h-fit sm:visible">
          <div className="container flex flex-col">
            {/* Dashboard Header */}
            <div className="flex items-center gap-4">
              <ChatBubbleBottomCenterIcon className="h-6 w-6 font-bold text-pink-600 sm:h-8 sm:w-8" />
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Réponse
              </h2>
            </div>
            <form
              onSubmit={(event) => {
                console.log("submit");
                void handleSubmit(onSubmit)(event);
              }}
            >
              <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Controller
                  control={control}
                  defaultValue={echeance?.datePersonnels as Date}
                  name="datePersonnels"
                  rules={{
                    validate: (value) => {
                      if (!echeance?.echeance) return true;
                      value <= echeance?.echeance;
                    },
                  }}
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
                      maxValue={parseAbsolute(
                        echeance?.echeance.toISOString() ?? "",
                        getLocalTimeZone()
                      )}
                      granularity="day"
                      label="Échéance - Cdad"
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
                    setPersonnels(
                      personnels.filter((p) => p.id !== personnel.id)
                    );
                  }}
                />
              </div>
              <div className="mt-6 flex items-center justify-center">
                <Button type="submit" rounded>
                  <div className="flex items-center gap-2">
                    {mutateReponse.isLoading && (
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
                    <span>Partager</span>
                  </div>
                </Button>
              </div>
            </form>
          </div>
        </Card>
      ) : (
        <div className="flex h-full items-center justify-center">
          <Button onClick={() => setOpen(true)} rounded>
            Configuration Réponse
          </Button>
        </div>
      )}
    </>
  );
}
