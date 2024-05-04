import { createPortal } from "react-dom";

import BasketItems from "./BasketItems.tsx";
import { XCircle } from "lucide-react";
import Backdrop from "../ui/Backdrop.tsx";
import "../../index.css";

type CartProps = {
  onClose: () => void;
  openBasket: boolean;
  openCheckoutHandler: () => void;
};

export default function Basket({
  onClose,
  openBasket,
  openCheckoutHandler,
}: CartProps) {
  return createPortal(
    <>
      {openBasket && <Backdrop onClick={onClose} />}
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

          <h1 className="font-bold text-2xl pb-10">Your Basket</h1>
          <BasketItems openCheckoutHandler={openCheckoutHandler} />
          <div className="flex flex-row justify-end items-center">
            <button
              onClick={onClose}
              className="bg-rose-500 hover:bg-rose-600 px-4 py-2 rounded-md text-white"
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>,
    document.getElementById("modal")!
  );
}
