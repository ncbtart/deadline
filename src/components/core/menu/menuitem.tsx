import { Menu } from "@headlessui/react";

import cx from "classnames";

import Link from "next/link";

interface MenuItemProps {
  children: React.ReactNode;
  href?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const MenuItem = ({
  children,
  href = "#",
  disabled = false,
  onClick,
}: MenuItemProps) => {
  return (
    <Menu.Item disabled={disabled}>
      {disabled ? (
        <span
          className={cx(
            "block cursor-not-allowed rounded-lg px-4 py-2 text-sm font-medium text-gray-500 opacity-50"
          )}
        >
          {children}
        </span>
      ) : (
        ({}) => (
          <Link
            href={href}
            className={cx(
              "block rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            )}
            onClick={onClick}
          >
            {children}
          </Link>
        )
      )}
    </Menu.Item>
  );
};

export default MenuItem;
