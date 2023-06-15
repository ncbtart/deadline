import ErrorPage from "@/components/core/error/page";

export default function Page404() {
  return <ErrorPage statusCode={404} message="Cette page n'existe pas" />;
}
