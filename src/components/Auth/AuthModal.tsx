import { createPortal } from "react-dom";

import { XCircle } from "lucide-react";
import Backdrop from "../ui/Backdrop.tsx";
import "../../index.css";
import { type ReactNode } from "react";
import Modal from "../ui/Modal.tsx";

interface CartProps {
  onClose: () => void;
  isSignupForm: boolean;
  children: ReactNode;
  openAuth: boolean;
}

export default function AuthModal({
  onClose,
  openAuth,
  isSignupForm,
  children,
}: //   openModal,
CartProps) {
  return createPortal(
    <Modal>
      {openAuth && <Backdrop onClick={onClose} />}

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
    </Modal>,
    document.getElementById("modal")!
  );
}
