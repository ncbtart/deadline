import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api, trpc } from "@/utils/api";

import "@/styles/globals.css";

import { I18nProvider, SSRProvider } from "react-aria";
import { useRouter } from "next/router";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const { locale } = useRouter();

  return (
    <SessionProvider session={session}>
      <SSRProvider>
        <I18nProvider locale={locale}>
          <Component {...pageProps} />
        </I18nProvider>
      </SSRProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(api.withTRPC(MyApp));
