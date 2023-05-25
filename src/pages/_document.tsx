import { Html, Head, Main, NextScript } from "next/document";
import { useLocale } from "react-aria";

export default function Document() {
  const { locale, direction } = useLocale();
  return (
    <Html lang={locale} dir={direction}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
