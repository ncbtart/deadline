import Head from "next/head";
import Image from "next/image";

interface Props {
  title: string;
  children: React.ReactNode;
}

const PublicLayout = ({ title, children }: Props) => {
  return (
    <>
      <Head>
        <title>Deadline - {title}</title>
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

            <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-800 object-cover opacity-80" />
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

                <ul className="mt-6 text-xs uppercase text-white">
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
            {children}
          </main>
        </div>
      </section>
    </>
  );
};

export default PublicLayout;
