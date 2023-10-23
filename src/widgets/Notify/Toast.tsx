import * as React from "react";
import { useState } from "react";
import * as Toast from "@radix-ui/react-toast";
import "./styles.css";
import { useErrorStore } from "../../app/state.ts";

const ToastErrors = (props: { errorMessage: string }) => {
  const [open, setOpen] = useState(false);
  const clearErrors = useErrorStore((state) => state.clearErrors);

  return (
    <div>
      <Toast.Root
        className="ToastRoot"
        open={!!props.errorMessage || open}
        onOpenChange={setOpen}
      >
        <Toast.Title className="ToastTitle">{props.errorMessage}</Toast.Title>
        <Toast.Description asChild></Toast.Description>
        <Toast.Action
          className="ToastAction"
          asChild
          altText="Goto schedule to undo"
        >
          <button className="Button small green" onClick={() => clearErrors()}>
            Закрыть
          </button>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </div>
  );
};

export default ToastErrors;
