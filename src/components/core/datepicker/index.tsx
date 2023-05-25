import { useRef } from "react";

import {
  type AriaDatePickerProps,
  type DateValue,
  useDatePicker,
} from "react-aria";
import { useDatePickerState } from "react-stately";

import {
  CalendarIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

import { FieldButton } from "./button";
import { Popover } from "./popover";
import { Dialog } from "./dialog";
import { Calendar } from "./calendar";

import cx from "classnames";

import DateField from "./datefield";

const DatePicker = (props: AriaDatePickerProps<DateValue>) => {
  const state = useDatePickerState(props);
  const ref = useRef(null);

  const {
    groupProps,
    labelProps,
    fieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
  } = useDatePicker(props, state, ref);

  return (
    <div className="relative inline-flex flex-col text-left">
      <span
        {...labelProps}
        className="block text-sm font-bold uppercase leading-6 text-gray-900 dark:text-white"
      >
        {props.label}
      </span>
      <div {...groupProps} ref={ref} className="group mt-2 flex">
        <div
          className={cx(
            "relative flex items-center rounded-l-md border border-gray-300 bg-white p-1 pr-10 transition-colors group-focus-within:border-2 group-focus-within:border-gray-600 group-hover:border-gray-400 group-focus-within:group-hover:border-gray-600",
            {
              "border-2 border-red-500": state.validationState === "invalid",
            },
            { "border-2 border-gray-600": state.isOpen }
          )}
        >
          <DateField {...fieldProps} autoFocus={state.isOpen} />
          {state.validationState === "invalid" && (
            <ExclamationTriangleIcon className="absolute right-1 h-6 w-6 text-red-500" />
          )}
        </div>
        <FieldButton {...buttonProps} isPressed={state.isOpen}>
          <CalendarIcon className="h-5 w-5 text-gray-700 group-focus-within:text-gray-700" />
        </FieldButton>
      </div>
      {state.isOpen && (
        <Popover triggerRef={ref} state={state} placement="bottom start">
          <Dialog {...dialogProps}>
            <Calendar {...calendarProps} />
          </Dialog>
        </Popover>
      )}
    </div>
  );
};

export default DatePicker;
