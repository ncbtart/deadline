import type { Personnel } from "@prisma/client";

import { Popover } from "@headlessui/react";

import { Avatar } from "../core";

interface PersonnelsPannelProps {
  personnels?: Personnel[];
  onAddPersonnel?: (personnel: Personnel) => void;
  onRemovePersonnel?: (personnel: Personnel) => void;
}

import cx from "classnames";

import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { usePopper } from "react-popper";
import { api } from "@/utils/api";

export default function Personnels({
  personnels = [],
  onAddPersonnel,
  onRemovePersonnel,
}: PersonnelsPannelProps) {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "right",
  });

  const { data: personnelsDispo } = api.personnel.getAll.useQuery();

  const [active, setActive] = useState("");

  return (
    <div>
      <label
        className={cx(
          "block text-sm font-bold uppercase leading-6 text-gray-900 dark:text-white"
        )}
      >
        Personnel en copie
      </label>
      <div className="mt-6">
        <div className="mt-6">
          {personnels.map((personnel, index: number) => (
            <div
              className={cx("group relative m-2 inline-block rounded-full", {
                "ring-2 ring-pink-500": active === personnel.id,
              })}
              key={index}
              role="button"
              tabIndex={index}
              onFocus={() => setActive(personnel.id)}
              onBlur={() => setActive("")}
            >
              <Avatar
                key={index}
                name={`${personnel.prenom} ${personnel.nom}`}
                image={personnel.image as string}
                tooltip
              />

              {active === personnel.id && (
                <button
                  className="bg absolute bottom-0 right-0 z-50 h-8 w-8 translate-x-1/2 translate-y-1/2 rounded-full bg-white text-pink-800"
                  onMouseDown={() => {
                    console.log("remove", personnel);
                    onRemovePersonnel?.(personnel);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-68 w-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}
          <Popover>
            <Popover.Button
              ref={setReferenceElement}
              className="m-2 inline-flex h-8 w-8 items-center justify-center rounded-full text-pink-500 transition duration-150 ease-in-out hover:text-pink-800"
            >
              <span className="sr-only">Ajouter</span>
              <PlusCircleIcon />
            </Popover.Button>
            <Popover.Panel
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
              className="flex max-h-60 flex-col  space-y-1 overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5"
            >
              <input
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 focus-within:ring-0 hover:bg-gray-100 hover:text-gray-700 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:ring-gray-700 dark:focus:ring-white"
                placeholder="Rechercher un personnel"
              />

              <div className="overflow-y-auto">
                {personnelsDispo?.map((personnel, index: number) => (
                  <Popover.Button
                    key={index}
                    className="flew-row flex w-full items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    onClick={() => {
                      onAddPersonnel?.(personnel);
                    }}
                  >
                    <Avatar
                      name={personnel.nom}
                      image={personnel.image as string}
                    />
                    <p className="ml-4">
                      {personnel.prenom} {personnel.nom}
                    </p>
                  </Popover.Button>
                ))}
              </div>
            </Popover.Panel>
          </Popover>
        </div>
      </div>
    </div>
  );
}