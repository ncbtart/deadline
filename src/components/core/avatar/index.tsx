import Image from "next/image";

interface AvatarProps {
  name: string | null;
  image: string | null;
  tooltip?: boolean;
  className?: string;
}

import cx from "classnames";

export default function Avatar({
  name,
  image,
  tooltip = false,
  className,
}: AvatarProps) {
  return (
    <div className="group relative flex">
      {image && (
        <Image
          alt={`img ${name ?? "responsable"}`}
          src={image}
          className={cx(
            "bg-2 m-auto h-10 w-10 rounded-full bg-white object-cover shadow-md",
            className
          )}
          width={40}
          height={40}
        />
      )}
      {tooltip && (
        <span
          className="text-whites ounded-md absolute left-1/2 z-50 m-4 mx-auto hidden
          w-28 -translate-x-1/2 translate-y-full rounded-md bg-gray-800 px-1 py-1.5 text-center
    text-xs font-semibold text-gray-100 opacity-0 transition-opacity group-hover:block group-hover:opacity-100"
        >
          {name}
        </span>
      )}
    </div>
  );
}
