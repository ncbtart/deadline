import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import { Menu } from "@headlessui/react";
import { Avatar, MenuItem } from "@/components/core";

export default function Appbar() {
  const { data: session } = useSession();

  return (
    <div className="fixed inset-x-0 top-0 z-10 flex h-16 items-center border-b border-gray-200 bg-white shadow-lg">
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
              <Menu>
                <Menu.Button
                  type="button"
                  className="group flex shrink-0 items-center rounded-lg transition"
                >
                  <span className="sr-only">Menu</span>
                  <Avatar
                    image={session?.user.image as string | null}
                    name={session?.user?.name as string | null}
                  />

                  <p className="ms-2 text-left text-xs sm:block">
                    <strong className="block font-medium">
                      {session?.user.name}
                    </strong>

                    <span className="text-gray-500">{session?.user.email}</span>
                  </p>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ms-4 h-5 w-5 text-gray-500 transition group-hover:text-gray-700 sm:block"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Menu.Button>
                <Menu.Items className="absolute right-0 mt-12 flex w-56 origin-bottom-right flex-col space-y-1 divide-y divide-gray-100 rounded-md bg-white p-1.5 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem href="/account">Réglage du compte</MenuItem>
                  <MenuItem disabled>Inviter vos amis - bientôt!</MenuItem>
                  <MenuItem onClick={() => void signOut()}>
                    Déconnexion
                  </MenuItem>
                </Menu.Items>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
