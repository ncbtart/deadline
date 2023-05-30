interface ProgressProps {
  value: string;
  color?: "red" | "yellow" | "green";
}

export default function Progress({ value, color = "green" }: ProgressProps) {
  return (
    <div>
      <span id="ProgressLabel" className="sr-only">
        Echeance
      </span>

      <span
        role="progressbar"
        aria-labelledby="ProgressLabel"
        aria-valuenow={Number(value)}
        className="block rounded-full bg-green-100"
      >
        <span
          className="block h-3 rounded-full bg-green-600"
          style={{ width: `${value}%` }}
        ></span>
      </span>
    </div>
  );
}
