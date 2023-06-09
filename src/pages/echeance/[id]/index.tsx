import Head from "next/head";
// import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "@/utils/api";

import { useSession } from "next-auth/react";

import LoggedLayout from "@/components/layout/private";
import EcheanceUpdate from "@/components/echeance/update";
import { EcheanceNoEdit } from "@/components/echeance/recap";
import ErrorPage from "@/components/core/error/page";
import ReponseResponsable from "@/components/echeance/reponseResp";
import ReponsePersonnel from "@/components/echeance/reponsePers";

import { createServerSideHelpers } from "@trpc/react-query/server";
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import { prisma } from "@/server/db";
import { getSession } from "next-auth/react";

import superjson from "superjson";
import { appRouter } from "@/server/api/root";
import SuiviPersonnels from "@/components/echeance/suiviPers";

const ModifEcheance = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { data: session } = useSession();

  const { id } = props;

  const { data: echeance, status } = api.echeance.findById.useQuery({
    id,
  });

  return (
    <>
      <Head>
        <title>Deadline - Modifier echeance</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoggedLayout>
        <div className="flex min-h-screen flex-col content-center items-center justify-center py-20">
          {status === "loading" || !session ? (
            <div className="mt-6 flex items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-pink-600"></div>
            </div>
          ) : status === "success" && echeance !== null ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {echeance &&
              (echeance.echeance < new Date() ||
                echeance.responsable.id !== session.user.id) ? (
                <>
                  <EcheanceNoEdit echeance={echeance} />
                  <ReponsePersonnel echeance={echeance} />
                </>
              ) : (
                <>
                  <EcheanceUpdate echeance={echeance} />
                  <div className="flex flex-col gap-6">
                    <ReponseResponsable echeance={echeance} />
                    <SuiviPersonnels echeance={echeance} />
                  </div>
                </>
              )}
            </div>
          ) : (
            <ErrorPage statusCode={204} message="Cette echeance n'existe pas" />
          )}
        </div>
      </LoggedLayout>
    </>
  );
};

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ id: string }>
) {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {
      prisma,
      session: await getSession(context),
    },
    transformer: superjson,
  });
  const id = context.params?.id as string;

  await helpers.echeance.findById.prefetch({ id });
  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
  };
}

ModifEcheance.auth = true;

export default ModifEcheance;
