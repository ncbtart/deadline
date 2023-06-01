import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Image from "next/image";

import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { Button, Textfield } from "@/components/core";
import { api } from "@/utils/api";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

const SignUpchema = z
  .object({
    firstname: z.string().nonempty({ message: "Ce champ est requis" }),
    lastname: z.string().nonempty({ message: "Ce champ est requis" }),
    email: z.string().email({ message: "Ce champ doit être un email" }),
    password: z
      .string()
      .min(8, { message: "Ce champ doit faire 8 caractères" }),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Les mots de passe ne correspondent pas",
    path: ["passwordConfirmation"],
  });

type SignUpchemaSchemaType = z.infer<typeof SignUpchema>;

const SignUp = () => {
  const router = useRouter();

  const mutation = api.auth.signup.useMutation({
    onSuccess: async (data) => {
      console.log("try to sign in");
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/",
      });
    },
  });

  const { control, handleSubmit } = useForm<SignUpchemaSchemaType>({
    resolver: zodResolver(SignUpchema),
  });

  const onSubmit: SubmitHandler<SignUpchemaSchemaType> = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-xl lg:max-w-3xl">
      <div className="block text-blue-600">
        <span className="sr-only">Home</span>
        <Image
          src="/logo.svg"
          className="h-10 sm:h-12"
          alt="Logo"
          width={50}
          height={50}
        />
      </div>

      <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
        Bienvenue sur Deadline
      </h1>

      <p className="mt-4 leading-relaxed text-gray-500">
        Cette application à pour but de vous aider à gérer vos tâches et vos
        échéances.
      </p>

      <form
        className="mt-8 grid grid-cols-6 gap-6"
        onSubmit={(event) => void handleSubmit(onSubmit)(event)}
      >
        <div className="col-span-6 sm:col-span-3">
          <Controller
            control={control}
            defaultValue=""
            name="firstname"
            render={({ field, fieldState: { error } }) => (
              <Textfield
                label="Prénom"
                type="text"
                {...field}
                error={error?.message}
              />
            )}
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <Controller
            control={control}
            defaultValue=""
            name="lastname"
            render={({ field, fieldState: { error } }) => (
              <Textfield
                label="Nom"
                type="text"
                {...field}
                error={error?.message}
              />
            )}
          />
        </div>

        <div className="col-span-6">
          <Controller
            control={control}
            defaultValue=""
            name="email"
            render={({ field, fieldState: { error } }) => (
              <Textfield
                label="Email"
                type="text"
                {...field}
                error={error?.message}
              />
            )}
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <Controller
            control={control}
            defaultValue=""
            name="password"
            render={({ field, fieldState: { error } }) => (
              <Textfield
                label="Mot de passe"
                {...field}
                type="password"
                error={error?.message}
              />
            )}
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <Controller
            control={control}
            defaultValue=""
            name="passwordConfirmation"
            render={({ field, fieldState: { error } }) => (
              <Textfield
                label="Mot de passe de confirmation"
                type="password"
                error={error?.message}
                {...field}
              />
            )}
          />
        </div>

        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
          <Button type="submit">Créer un compte</Button>

          <p className="mr-2 mt-4 text-sm text-gray-500 sm:mt-0">
            J&apos;ai déjà un compte ?
            <Link
              className="ml-2 text-gray-700 underline"
              href={`/auth/signin?callbackUrl=${
                router.query.callbackUrl as string
              }`}
            >
              Connexion
            </Link>
            .
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
