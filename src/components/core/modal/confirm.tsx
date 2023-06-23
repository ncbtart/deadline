interface ConfirmProps {
  onConfirm: () => void;
  onCancel: () => void;
  className?: string;
}

import cx from "classnames";

export default function Confirm({
  onConfirm,
  onCancel,
  className,
}: ConfirmProps) {
  return (
    <div
      className={cx("absolute rounded-lg bg-white p-8 shadow-2xl", className)}
    >
      <h2 className="text-lg font-bold">Êtes vous sur de vouloir faire ça ?</h2>

      <p className="mt-2 text-sm text-gray-500">
        Cette action est définitive et impactera d&apos;autre donnée de
        l&apos;application.
      </p>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          className="rounded bg-green-50 px-4 py-2 text-sm font-medium text-green-600 transition hover:scale-105 hover:shadow-sm"
          onClick={() => onConfirm()}
        >
          Oui, je suis sûr
        </button>

        <button
          type="button"
          className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600 transition hover:scale-105 hover:shadow-sm"
          onClick={() => onCancel()}
        >
          Non! Annuler
        </button>
      </div>
    </div>
  );
}
