import Link from "next/link";

interface ErrorPageProps {
  statusCode: number;
  message: string;
}

export default function ErrorPage({ statusCode, message }: ErrorPageProps) {
  return (
    <div className="grid h-screen place-content-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-rose-200">{statusCode}</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Eh-oh!
        </p>

        <p className="mt-4 text-gray-500">{message}</p>

        <Link
          href="/"
          className="mt-6 inline-block rounded bg-rose-600 px-5 py-3 text-sm font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
