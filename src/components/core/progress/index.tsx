interface ProgressProps {
  value: string;
  color?: "red" | "yellow" | "green";
}

import cx from "classnames";

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
        className={cx("block rounded-full", {
          "bg-green-100": color === "green",
          "bg-yellow-50": color === "yellow",
          "bg-red-100": color === "red",
        })}
      >
        <span
          className={cx("block h-3 rounded-full", {
            "bg-green-500": color === "green",
            "bg-yellow-200": color === "yellow",
            "bg-red-500": color === "red",
          })}
          style={{ width: `${value}%` }}
        ></span>
      </span>
    </div>
  );
}
