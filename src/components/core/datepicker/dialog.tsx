import { useDialog } from "react-aria";
import React from "react";

interface DialogProps {
  children: React.ReactNode;
}

export function Dialog({ children, ...props }: DialogProps) {
  const ref = React.useRef(null);
  const { dialogProps } = useDialog(props, ref);

  return (
    <div {...dialogProps} ref={ref}>
      {children}
    </div>
  );
}
