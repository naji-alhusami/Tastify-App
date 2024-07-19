import { MailCheck, XCircle, CheckCheck } from "lucide-react";

import Backdrop from "../ui/Backdrop";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

interface ThanksModalProps {
  isThanks: boolean;
  isThanksOrder: boolean;
  closeThanksModalHandler: () => void;
  openLoginModalHandler: () => void;
}

const ThanksModal = ({
  isThanks,
  isThanksOrder,
  closeThanksModalHandler,
  openLoginModalHandler,
}: ThanksModalProps) => {
  return (
    <Modal>
      {isThanks && <Backdrop onClick={closeThanksModalHandler} />}

      <XCircle
        onClick={closeThanksModalHandler}
        className="text-rose-500 h-8 w-8 self-end hover:bg-rose-200 hover:rounded-full cursor-pointer"
      />
      {isThanksOrder ? (
        <h1 className="font-bold text-2xl pb-4 text-center">Sent</h1>
      ) : (
        <h1 className="font-bold text-2xl pb-4 text-center">Welcome!</h1>
      )}
      {isThanksOrder ? (
        <CheckCheck className="text-rose-500 h-12 w-12 self-center my-6" />
      ) : (
        <MailCheck className="text-rose-500 h-12 w-12 self-center my-6" />
      )}
      {isThanksOrder ? (
        <h1 className="text-md text-center my-6">
          Thanks for your order, We have sent your order to the restaurant.
        </h1>
      ) : (
        <h1 className="text-md text-center my-6">
          Thanks for signing-up, We have sent an email verification for you.
        </h1>
      )}
      <div className="flex flex-row justify-end items-center">
        {isThanksOrder ? (
          <div
            className=" mb-2 px-4 py-2 w-full text-white rounded-md bg-rose-500 hover:bg-rose-600"
            onClick={closeThanksModalHandler}
          >
            Close
          </div>
        ) : (
          <Button
            type="button"
            className=" mb-2 px-4 py-2 w-full text-white rounded-md bg-rose-500 hover:bg-rose-600"
            onClick={openLoginModalHandler}
          >
            Log in
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default ThanksModal;
