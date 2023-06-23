import { LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";

import { Button, Textfield } from "@/components/core";
import Image from "next/image";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/router";

const SignInSchema = z.object({
  email: z.string().email({ message: "Ce champ doit être un email" }),
  password: z.string(),
});

type SignInSchemaType = z.infer<typeof SignInSchema>;

const SignIn = () => {
  const router = useRouter();

  const { control, handleSubmit, setError } = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit: SubmitHandler<SignInSchemaType> = async (data) => {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    }).then(async (res) => {
      if (res?.ok) {
        await router.push((router.query.callbackUrl as string) || "/");
      } else {
        setError("password", {
          message: "Email ou mot de passe incorrect",
        });
      }
    });
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
        action="#"
        className="mt-8 grid grid-cols-6 gap-6"
        onSubmit={(event) => void handleSubmit(onSubmit)(event)}
      >
        <div className="col-span-12">
          <Controller
            control={control}
            defaultValue=""
            name="email"
            render={({ field, fieldState: { error } }) => (
              <Textfield
                label="email"
                {...field}
                error={error?.message}
                type="text"
                startIcon={<UserIcon className="h-4 w-4" />}
              />
            )}
          />
        </div>

        <div className="col-span-12">
          <Controller
            control={control}
            defaultValue=""
            name="password"
            render={({ field, fieldState: { error } }) => (
              <Textfield
                label="Mot de passe"
                type="password"
                startIcon={<LockClosedIcon className="h-4 w-4" />}
                {...field}
                error={error?.message}
              />
            )}
          />
        </div>

        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
          <Button type="submit">Connexion</Button>

          <p className="mr-2 mt-4 text-sm text-gray-500 sm:mt-0">
            Créer un compte ?
            <Link className="ml-2 text-gray-700 underline" href="/auth/signup">
              Enregistrement
            </Link>
            .
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
