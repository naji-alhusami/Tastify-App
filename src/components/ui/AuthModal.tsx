import { createPortal } from "react-dom";

import { XCircle } from "lucide-react";
import Backdrop from "../ui/Backdrop.tsx";
import "../../index.css";
import { type ReactNode } from "react";

type CartProps = {
  onClose: () => void;
  isSignupForm: boolean;
  children: ReactNode;
  openAuth: boolean;
};

export default function AuthModal({
  onClose,
  openAuth,
  isSignupForm,
  children,
//   openModal,
}: CartProps) {
  return createPortal(
    <>
      {openAuth && <Backdrop onClick={onClose} />}
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50" />
      <dialog
        id="basket-modal"
        className="z-50 p-6 fixed w-[300px] sm:w-[400px] md:w-[500px] bg-white rounded-lg shadow-md"
        open
      >
        <div className="flex flex-col">
          <XCircle
            onClick={onClose}
            className="text-rose-500 h-8 w-8 self-end hover:bg-rose-200 hover:rounded-full cursor-pointer"
          />

          <h1 className="font-bold text-2xl pb-4 text-center">Welcome</h1>
          <h1 className="text-md pb-6 text-center">
            {isSignupForm ? "Sign-up to continue" : "Login to continue"}
          </h1>
          {children}
          {/* <div className="flex flex-row justify-end items-center">
            <button
              onClick={onClose}
              className="bg-rose-500 hover:bg-rose-600 px-4 py-2 rounded-md text-white"
            >
              Close
            </button>
          </div> */}
        </div>
      </dialog>
    </>,
    document.getElementById("modal")!
  );
}
