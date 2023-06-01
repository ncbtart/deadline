import { useRef } from "react";
import {
  type DateFieldState,
  DateSegment,
  useDateFieldState,
} from "react-stately";
import {
  useDateField,
  useDateSegment,
  useLocale,
  type AriaDateFieldProps,
  type DateValue,
} from "react-aria";

import cx from "classnames";

import { createCalendar } from "@internationalized/date";

export default function DateField(props: AriaDateFieldProps<DateValue>) {
  const { locale } = useLocale();
  const state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  });

  const ref = useRef(null);

  const { fieldProps } = useDateField(props, state, ref);

  return (
    <div {...fieldProps} ref={ref} className="ml-2  flex ">
      {state.segments.map((segment, i) => (
        <DateSegment key={i} segment={segment} state={state} />
      ))}
    </div>
  );
}

interface DateSegmentProps {
  segment: DateSegment;
  state: DateFieldState;
}

function DateSegment({ segment, state }: DateSegmentProps) {
  const ref = useRef(null);
  const { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <div
      {...segmentProps}
      ref={ref}
      style={{
        ...segmentProps.style,
      }}
      className={cx(
        "group box-content rounded-sm px-0.5 text-right outline-none focus:bg-pink-600 focus:text-white",
        {
          "text-gray-500": !segment.isEditable,
          "text-gray-800": segment.isEditable,
        }
      )}
    >
      {/* Always reserve space for the placeholder, to prevent layout shift when editing. */}
      <span
        aria-hidden="true"
        className={cx(
          "pointer-events-none block w-full text-center italic text-gray-500 group-focus:text-white	",
          {
            visible: segment.isPlaceholder,
            "invisible h-0": !segment.isPlaceholder,
          }
        )}
      >
        {segment.placeholder}
      </span>
      {segment.isPlaceholder ? "" : segment.text}
    </div>
  );
}
