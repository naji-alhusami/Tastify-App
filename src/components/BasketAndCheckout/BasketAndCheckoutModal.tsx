import { type ReactNode } from "react";
import { createPortal } from "react-dom";
import { XCircle } from "lucide-react";

import Modal from "../ui/Modal";
import Backdrop from "../ui/Backdrop";

interface BasketAndCheckoutModalProps {
  children: ReactNode;
  isCheckoutForm: boolean;
  isBasketForm: boolean;
  closeBasketAndCheckout: () => void;
}

const BasketAndCheckoutModal = ({
  children,
  isCheckoutForm,
  isBasketForm,
  closeBasketAndCheckout,
}: BasketAndCheckoutModalProps) => {
  return createPortal(
    <Modal>
      {isBasketForm && <Backdrop onClick={closeBasketAndCheckout} />}
      <XCircle
        onClick={closeBasketAndCheckout}
        className="text-rose-500 h-8 w-8 self-end hover:bg-rose-200 hover:rounded-full cursor-pointer"
      />
      <h1 className="font-bold text-2xl pb-4 text-center">
        {isCheckoutForm ? "Checkout" : "Basket"}
      </h1>
      {children}
    </Modal>,
    document.getElementById("modal")!
  );
};

export default BasketAndCheckoutModal;
