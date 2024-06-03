import { createPortal } from "react-dom";
import { XCircle } from "lucide-react";
import { type ReactNode } from "react";

import Modal from "../ui/Modal.tsx";
import Backdrop from "../ui/Backdrop.tsx";
import "../../index.css";

interface AuthModalProps {
  openAuth: boolean;
  closeAuth: () => void;
  isLoginForm: boolean;
  isSignupBuyerForm: boolean;
  isSignupSellerForm: boolean;
  children: ReactNode;
}

export default function AuthModal({
  openAuth,
  closeAuth,
  isLoginForm,
  isSignupBuyerForm,
  isSignupSellerForm,
  children,
}: AuthModalProps) {
  return createPortal(
    <Modal>
      {openAuth && <Backdrop onClick={closeAuth} />}

      <XCircle
        onClick={closeAuth}
        className="text-rose-500 h-8 w-8 self-end hover:bg-rose-200 hover:rounded-full cursor-pointer"
      />

      <h1 className="font-bold text-2xl pb-4 text-center">Welcome!</h1>
      <div className="flex flex-row justify-center items-center pb-6">
        <h1 className="text-md text-center pr-2">
          {isSignupSellerForm
            ? "Signup to continue"
            : isSignupBuyerForm
            ? "Signup to continue"
            : isLoginForm
            ? "Login to continue"
            : null}
        </h1>
        <h1 className="text-center font-bold text-rose-500">
          {isSignupSellerForm
            ? "(As Seller)"
            : isSignupBuyerForm
            ? "(As Buyer)"
            : null}
        </h1>
      </div>
      {children}
    </Modal>,
    document.getElementById("modal")!
  );
}
