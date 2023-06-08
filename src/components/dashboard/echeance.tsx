import { Progress } from "../core";

interface EcheanceProps {
  message: string;
  pourcentage: string;
  color: "green" | "yellow" | "red";
}

export default function Echeance({
  message,
  pourcentage,
  color,
}: EcheanceProps) {
  return (
    <div className="flex w-40 flex-col">
      <Progress value={pourcentage} color={color} />
      <p className="text-center text-[9px] font-medium uppercase text-gray-500">
        {message}
      </p>
    </div>
  );
}
