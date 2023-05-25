import { useRef } from "react";
import {
  useButton,
  useFocusRing,
  mergeProps,
  type AriaButtonProps,
} from "react-aria";

import cx from "classnames";

interface CalendarButtonProps extends AriaButtonProps<"button"> {
  children: React.ReactNode;
}

export function CalendarButton(props: CalendarButtonProps) {
  const ref = useRef(null);
  const { buttonProps } = useButton(props, ref);
  const { focusProps, isFocusVisible } = useFocusRing();
  return (
    <button
      {...mergeProps(buttonProps, focusProps)}
      ref={ref}
      className={`rounded-full p-2 ${props.isDisabled ? "text-gray-400" : ""} ${
        !props.isDisabled ? "hover:bg-violet-100 active:bg-violet-200" : ""
      } outline-none ${
        isFocusVisible ? "ring-2 ring-purple-600 ring-offset-2" : ""
      }`}
    >
      {props.children}
    </button>
  );
}

interface FieldButtonProps extends AriaButtonProps<"button"> {
  isPressed: boolean;
  children: React.ReactNode;
}

export function FieldButton(props: FieldButtonProps) {
  const ref = useRef(null);
  const { buttonProps, isPressed } = useButton(props, ref);
  return (
    <button
      {...buttonProps}
      ref={ref}
      className={cx(
        "-ml-px rounded-r-md border px-2 outline-none transition-colors group-focus-within:border-gray-600 group-focus-within:group-hover:border-gray-600",
        { "border-gray-400 bg-gray-200": isPressed || props.isPressed },
        {
          "border-gray-300 bg-gray-50 group-hover:border-gray-400":
            !isPressed && !props.isPressed,
        }
      )}
    >
      {props.children}
    </button>
  );
}
