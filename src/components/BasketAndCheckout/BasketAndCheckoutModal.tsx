import { createPortal } from "react-dom";
import Modal from "../ui/Modal";
import Backdrop from "../ui/Backdrop";
import { XCircle } from "lucide-react";
import { ReactNode } from "react";
// import Checkout from "../Checkout/Checkout";
// import BasketItems from "./BasketItems";

interface BasketAndCheckoutModalProps {
  children: ReactNode;
  isCheckoutForm: boolean;
  isBasketForm: boolean;
  //   openBasketAndCheckout: () => void;
  closeBasketAndCheckout: () => void;
}

const BasketAndCheckoutModal = ({
  children,
  isCheckoutForm,
  isBasketForm,
  //   openBasketAndCheckout,
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
