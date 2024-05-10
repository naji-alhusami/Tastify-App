import { createPortal } from "react-dom";

import { XCircle } from "lucide-react";
import Backdrop from "../ui/Backdrop.tsx";
import "../../index.css";
import { type ReactNode } from "react";
import Modal from "../ui/Modal.tsx";

interface AuthModalProps {
  closeAuth: () => void; //finish
  isSignupForm: boolean;
  children: ReactNode;
  openAuth: boolean;
}

export default function AuthModal({
  closeAuth,
  openAuth,
  isSignupForm,
  children,
}: AuthModalProps) {
  return createPortal(
    <Modal>
      {openAuth && <Backdrop onClick={closeAuth} />}

      <XCircle
        onClick={closeAuth}
        className="text-rose-500 h-8 w-8 self-end hover:bg-rose-200 hover:rounded-full cursor-pointer"
      />

      <h1 className="font-bold text-2xl pb-4 text-center">Welcome</h1>
      <h1 className="text-md pb-6 text-center">
        {isSignupForm ? "Sign-up to continue" : "Login to continue"}
      </h1>
      {children}
    </Modal>,
    document.getElementById("modal")!
  );
}
