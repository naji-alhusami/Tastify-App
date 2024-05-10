import { MailCheck, XCircle } from "lucide-react";
import Backdrop from "../ui/Backdrop";
import Modal from "../ui/Modal";

interface ThanksModalProps {
  isThanks: boolean;
  closeThanksModalHandler: () => void;
  openLoginModalHandler: () => void;
}

const ThanksModal = ({
  isThanks,
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
    </Modal>
  );
};

export default ThanksModal;
