import type { StatusEcheance } from "@prisma/client";

interface StatusProps {
  status: StatusEcheance;
}

export default function Status({ status }: StatusProps) {
  return (
    <div className="flex items-center">
      <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
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
