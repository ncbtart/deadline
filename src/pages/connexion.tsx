import { Button, Textfield } from "@/components/core";
import Head from "next/head";
import Image from "next/image";

import { useState } from "react";

const Connexion = () => {
  const [signIn, setSignIn] = useState(false);

  return (
    <>
      <Head>
        <title>Deadline - Connexion</title>
        <meta name="description" content="Login page Deadline" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <Image
              alt="Pattern"
              src="/login.svg"
              className="absolute inset-0 h-full w-full object-cover"
              width={500}
              height={500}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-800 object-cover opacity-75" />
            {/* logo centré */}
            <div className="absolute inset-0 left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform lg:block">
              <div className="flex flex-col items-center justify-center">
                <Image
                  alt="logo"
                  src={"/logo-white.svg"}
                  width={200}
                  height={200}
                />
                <h3 className="mt-2 text-6xl font-light tracking-wider text-white">
                  DeadLine
                </h3>

                <ul className="mt-6 text-xs font-semibold uppercase text-white">
                  <li className="flex flex-row items-center">
                    <div className="mr-2 h-2 w-2 rounded-full border-2 border-white" />
                    Simplifier vos rappels
                  </li>
                  <li className="mt-3 flex flex-row items-center">
                    <div className="mr-2 h-2 w-2 rounded-full border-2 border-white" />
                    Partager vos échéances
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          <main
            aria-label="Main"
            className="flex items-center justify-center bg-gray-100 px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
          >
            {signIn ? (
              <SignIn onSignUp={() => setSignIn(false)} />
            ) : (
              <SignUp onSignIn={() => setSignIn(true)} />
            )}
          </main>
        </div>
      </section>
    </>
  );
};

interface SignUpProps {
  onSignIn: () => void;
}

const SignUp = ({ onSignIn }: SignUpProps) => {
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

      <form action="#" className="mt-8 grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-3">
          <Textfield label="Prénom" name="firstname" type="text" />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <Textfield label="Nom" name="lastname" type="text" />
        </div>

        <div className="col-span-6">
          <Textfield label="Email" name="email" type="email" />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <Textfield label="Mot de passe" name="password" type="password" />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <Textfield
            label="Mot de passe de confirmation"
            name="passwordConfirmation"
            type="password"
          />
        </div>

        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
          <Button>Créer un compte</Button>

          <p className="mr-2 mt-4 text-sm text-gray-500 sm:mt-0">
            J&apos;ai déjà un compte ?
            <button className="ml-2 text-gray-700 underline" onClick={onSignIn}>
              Connexion
            </button>
            .
          </p>
        </div>
      </form>
    </div>
  );
};

interface SignInProps {
  onSignUp: () => void;
}

const SignIn = ({ onSignUp }: SignInProps) => {
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

      <form action="#" className="mt-8 grid grid-cols-6 gap-6">
        <div className="col-span-12">
          <Textfield label="email" name="email" type="text" />
        </div>

        <div className="col-span-12">
          <Textfield label="Mot de passe" name="password" type="password" />
        </div>

        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
          <Button>Connexion</Button>

          <p className="mr-2 mt-4 text-sm text-gray-500 sm:mt-0">
            Créer un compte ?
            <button className="ml-2 text-gray-700 underline" onClick={onSignUp}>
              Enregistrement
            </button>
            .
          </p>
        </div>
      </form>
    </div>
  );
};

export default Connexion;
