// import React from "react";

import { createPortal } from "react-dom";
import Backdrop from "../ui/Backdrop";
import { XCircle } from "lucide-react";
import Checkout from "./Checkout";

// import { useForm } from "react-hook-form";
// import { Input } from "../ui/Input";
// import {
//   CheckoutValidator,
//   TCheckoutValidator,
// } from "../../lib/validators/checkout-validators";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Loader2 } from "lucide-react";

interface CheckoutProps {
  openCheckout: boolean;
  closeCheckout: () => void;
}

const CheckoutModal = ({ openCheckout, closeCheckout }: CheckoutProps) => {
  // const {
  //   register,
  //   // handleSubmit,
  //   formState: { errors },
  // } = useForm<TCheckoutValidator>({
  //   resolver: zodResolver(CheckoutValidator),
  // });

  return createPortal(
    <>
      {openCheckout && <Backdrop onClick={closeCheckout} />}
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50" />
      <dialog
        id="basket-modal"
        className="z-50 p-6 fixed w-[300px] sm:w-[400px] md:w-[500px] bg-white rounded-lg shadow-md"
        open
      >
        <div className="flex flex-col">
          <XCircle
            onClick={closeCheckout}
            className="text-rose-500 h-8 w-8 self-end hover:bg-rose-200 hover:rounded-full cursor-pointer"
          />
          <h1 className="font-bold text-2xl pb-4 text-center">Checkout</h1>
          {/* <h1 className="text-md text-center my-6">
            Thanks for signing-up, We have sent an email verification for you.
          </h1> */}
          <Checkout />
          {/* <div className="flex flex-row justify-end items-center">
            <button
              className=" mb-2 px-4 py-2 w-full text-white rounded-md bg-rose-500 hover:bg-rose-600"
              // onClick={openLoginModalHandler}
            >
              Log in
            </button>
          </div> */}
        </div>
      </dialog>
    </>,
    document.getElementById("modal")!
  );
};

export default CheckoutModal;
