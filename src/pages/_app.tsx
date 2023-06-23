import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "@/utils/api";

import localFont from "next/font/local";

const montserrat = localFont({
  src: "../../public/fonts/Montserrat-VariableFont_wght.ttf",
});

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
          <main className={montserrat.className}>
            <Component {...pageProps} />
          </main>
        </I18nProvider>
      </SSRProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
