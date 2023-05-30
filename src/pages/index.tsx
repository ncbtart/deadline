import Head from "next/head";
// import { signIn, signOut, useSession } from "next-auth/react";

import { Button, Card } from "@/components/core";
import LoggedLayout from "@/components/layout/template";
import TableDashboard from "@/components/dashboard";
import { api } from "@/utils/api";

import { PlusCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "@/server/api/root";
import { getSession } from "next-auth/react";

import { prisma } from "@/server/db";
import SuperJSON from "superjson";

const Home = () => {
  const { data: echeances, status } = api.echeance.getAll.useQuery();
  return (
    <>
      <Head>
        <title>Deadline - Dashboard</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoggedLayout>
        <div className="flex min-h-screen flex-col content-center items-center justify-center ">
          <Card className="invisible sm:visible">
            <div className="container flex flex-col">
              {/* Dashboard Header */}
              <div className="flex items-center gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-pink-600 sm:h-8 sm:w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>

                <h3 className="text-xl font-bold sm:text-2xl">Dashboard</h3>
                <div className="grow" />
                <Link href="/echeance/nouvelle">
                  <Button rounded>
                    <div className="flex items-center gap-2">
                      <PlusCircleIcon className="h-6 w-6 text-white sm:h-8 sm:w-8" />
                      <span>Tache</span>
                    </div>
                  </Button>
                </Link>
              </div>
              {/* Dashboard Card */}
              <Card className="mt-4 px-8">
                <div className="container flex flex-col">
                  <h5 className="text-md font-medium sm:text-lg">
                    Liste des tâches
                  </h5>
                  {status === "loading" ? (
                    <div className="mt-6 flex items-center justify-center">
                      <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-pink-900"></div>
                    </div>
                  ) : (
                    <TableDashboard className="mb-4 mt-6" data={echeances} />
                  )}
                </div>
              </Card>
            </div>
          </Card>
        </div>
      </LoggedLayout>
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {
      session: await getSession(),
      prisma,
    },
    transformer: SuperJSON,
  });
  /*
   * Prefetching the `post.byId` query.
   * `prefetch` does not return the result and never throws - if you need that behavior, use `fetch` instead.
   */
  await helpers.echeance.getAll.prefetch();

  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
  };
}
