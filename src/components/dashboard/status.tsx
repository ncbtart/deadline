import type { StatusEcheance } from "@prisma/client";

import cx from "classnames";

interface StatusProps {
  status?: StatusEcheance | null;
  color?: "red" | "yellow" | "green";
}

export default function Status({ status, color }: StatusProps) {
  return (
    <div className="flex items-center">
      <span
        className={cx("mr-2 h-2 w-2 rounded-full", {
          "bg-green-500": color === "green",
          "bg-yellow-300": color === "yellow",
          "bg-red-500": color === "red",
        })}
      ></span>
      <span className="text-sm text-gray-600 dark:text-gray-400">
        {(() => {
          switch (status) {
            case "EN_COURS":
              return "En cours";
            case "TERMINE":
              return "Terminé";
            case "A_FAIRE":
              return "A faire";
            default:
              return "En cours";
          }
        })()}
      </span>
    </div>
  );
}
