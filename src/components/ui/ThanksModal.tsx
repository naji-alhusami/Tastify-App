import { MailCheck, XCircle } from "lucide-react";
import { createPortal } from "react-dom";
import Backdrop from "./Backdrop";

interface ThanksModalProps {
  openAuth: boolean;
  closeModalHandler: () => void;
  openLoginModalHandler: () => void;
}

const ThanksModal = ({
  closeModalHandler,
  openAuth,
  openLoginModalHandler,
}: ThanksModalProps) => {
  return createPortal(
    <>
      {openAuth && <Backdrop onClick={closeModalHandler} />}
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50" />
      <dialog
        id="basket-modal"
        className="z-50 p-6 fixed w-[300px] sm:w-[400px] md:w-[500px] bg-white rounded-lg shadow-md"
        open
      >
        <div className="flex flex-col">
          <XCircle
            onClick={closeModalHandler}
            className="text-rose-500 h-8 w-8 self-end hover:bg-rose-200 hover:rounded-full cursor-pointer"
          />
          <h1 className="font-bold text-2xl pb-4 text-center">Welcome!</h1>
          <MailCheck className="text-rose-500 h-12 w-12 self-center my-6" />
          <h1 className="text-md text-center my-6">
            Thanks for signing-up, We have sent an email verification for you.
          </h1>
          <div className="flex flex-row justify-end items-center">
            <button
              className=" mb-2 px-4 py-2 w-full text-white rounded-md bg-rose-500 hover:bg-rose-600"
              onClick={openLoginModalHandler}
            >
              Log in
            </button>
          </div>
        </div>
      </dialog>
    </>,
    document.getElementById("modal")!
  );
};

export default ThanksModal;
