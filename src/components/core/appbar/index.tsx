import Image from "next/image";
import Link from "next/link";

export default function Appbar() {
  return (
    <div className="z-100 fixed inset-x-0 top-0 flex h-16 items-center border-b border-gray-200 bg-white shadow-lg">
      <div className="relative mx-auto w-full max-w-screen-xl px-6">
        <div className="-mx-6 flex items-center">
          <div className="pl-6 pr-6 lg:w-1/4 lg:pr-8 xl:w-1/5">
            <div className="flex items-center">
              <Link className="block lg:mr-4" href="/">
                <div className="flex flex-row items-center">
                  <Image
                    priority
                    src="/logo.svg"
                    width={50}
                    height={50}
                    alt="Follow us on Twitter"
                  />
                  <span className="ml-2 h-6 w-24 text-lg font-semibold not-italic leading-6 tracking-wider text-gray-900">
                    Deadline
                  </span>
                </div>
              </Link>
            </div>
          </div>
          <div className="flex min-w-0 flex-grow lg:w-3/4 xl:w-4/5">
            <div className="flex w-full min-w-0 lg:px-6">
              <div className="grow" />
              <button
                type="button"
                className="group flex shrink-0 items-center rounded-lg transition"
              >
                <span className="sr-only">Menu</span>
                <Image
                  alt="Man"
                  src="/profile.avif"
                  className="bg-2 h-10 w-10 rounded-full bg-white  object-cover shadow-md"
                  width={40}
                  height={40}
                />

                <p className="ms-2 hidden text-left text-xs sm:block">
                  <strong className="block font-medium">Eric Frusciante</strong>

                  <span className="text-gray-500"> eric@frusciante.com </span>
                </p>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ms-4 hidden h-5 w-5 text-gray-500 transition group-hover:text-gray-700 sm:block"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
