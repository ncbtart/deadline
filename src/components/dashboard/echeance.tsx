import { useMemo } from "react";
import { Progress } from "../core";

interface EcheanceProps {
  message: string;
  pourcentage: string;
  status?: string | null;
}

export default function Echeance({
  message,
  pourcentage,
  status,
}: EcheanceProps) {
  const color = useMemo(() => {
    if (status === "A_FAIRE") {
      if (Number(pourcentage) === 0) {
        return "green";
      }
      if (Number(pourcentage) < 75) {
        return "yellow";
      }
      return "red";
    }

    if (status === "EN_COURS") {
      if (Number(pourcentage) < 50) {
        return "green";
      }
      if (Number(pourcentage) >= 100) {
        return "red";
      }
      return "yellow";
    }

    if (status === "TERMINE") {
      return "green";
    }

    return "green";
  }, [status, pourcentage]);

  return (
    <div className="flex w-40 flex-col">
      <Progress value={pourcentage} color={color} />
      <p className="text-center text-[9px] font-medium uppercase text-gray-500">
        {message}
      </p>
    </div>
  );
}
