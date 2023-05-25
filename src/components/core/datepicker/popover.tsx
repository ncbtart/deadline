import * as React from "react";
import { DismissButton, Overlay, usePopover } from "react-aria";
import type { AriaPopoverProps } from "react-aria";
import type { OverlayTriggerState } from "react-stately";

interface PopoverProps extends Omit<AriaPopoverProps, "popoverRef"> {
  children: React.ReactNode;
  state: OverlayTriggerState;
}

export function Popover({ state, children, ...props }: PopoverProps) {
  const ref = React.useRef(null);

  const { popoverProps, underlayProps } = usePopover(
    {
      ...props,
      popoverRef: ref,
    },
    state
  );

  return (
    <Overlay>
      <div {...underlayProps} className="fixed inset-0" />
      <div
        {...popoverProps}
        ref={ref}
        className="z-10 mt-2 rounded-md border border-gray-300 bg-white p-8 shadow-lg"
      >
        <DismissButton
          onDismiss={() => {
            state.close();
          }}
        />
        {children}
        <DismissButton
          onDismiss={() => {
            state.close();
          }}
        />
      </div>
    </Overlay>
  );
}
