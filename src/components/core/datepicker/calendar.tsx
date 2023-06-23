import { useRef } from "react";
import { useCalendarState } from "react-stately";
import {
  type AriaCalendarProps,
  type DateValue,
  useCalendar,
  useLocale,
} from "react-aria";
import { createCalendar } from "@internationalized/date";
import { CalendarButton } from "./button";
import { CalendarGrid } from "./grid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import localFont from "next/font/local";

const montserrat = localFont({
  src: "../../../../public/fonts/Montserrat-VariableFont_wght.ttf",
});

export function Calendar(props: AriaCalendarProps<DateValue>) {
  const { locale } = useLocale();
  const state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  });

  const ref = useRef(null);

  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useCalendar(props, state);

  return (
    <div
      {...calendarProps}
      ref={ref}
      className={`inline-block text-gray-800 ${montserrat.className}`}
    >
      <div className="flex items-center pb-4">
        <h2 className="ml-2 flex-1 text-xl font-bold">{title}</h2>
        <CalendarButton {...prevButtonProps}>
          <ChevronLeftIcon className="h-6 w-6" />
        </CalendarButton>
        <CalendarButton {...nextButtonProps}>
          <ChevronRightIcon className="h-6 w-6" />
        </CalendarButton>
      </div>
      <CalendarGrid state={state} />
    </div>
  );
}
