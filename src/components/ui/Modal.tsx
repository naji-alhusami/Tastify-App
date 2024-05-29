import { createPortal } from "react-dom";

import "../../index.css";
import { type ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
}

export default function Modal({ children }: ModalProps) {
  return createPortal(
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50" />
      <dialog
        id="basket-modal"
        className="z-40 p-6 fixed w-[350px] sm:w-[450px] md:w-[500px] bg-white rounded-lg shadow-md"
        open
      >
        <div className="flex flex-col">{children}</div>
      </dialog>
    </>,
    document.getElementById("modal")!
  );
}
