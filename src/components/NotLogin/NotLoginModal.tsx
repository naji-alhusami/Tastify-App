import { CircleAlert, XCircle } from "lucide-react";
import { useContext } from "react";
import StateContext from "../../store/context/state-context";
import Modal from "../ui/Modal";
import Backdrop from "../ui/Backdrop";

interface NotLoginModalProps {
  openLoginModalHandler: () => void;
}

const NotLoginModal = ({ openLoginModalHandler }: NotLoginModalProps) => {
  const contextValue = useContext(StateContext) as {
    isNotLoginModal: boolean;
    setIsNotLoginModal: (notLogin: boolean) => void;
  };
  const { isNotLoginModal, setIsNotLoginModal } = contextValue;

  function closeNotLoginModalHandler() {
    setIsNotLoginModal(false);
  }

  return (
    <Modal>
      {isNotLoginModal && <Backdrop onClick={closeNotLoginModalHandler} />}

      <XCircle
        onClick={closeNotLoginModalHandler}
        className="text-rose-500 h-8 w-8 self-end hover:bg-rose-200 hover:rounded-full cursor-pointer"
      />
      <h1 className="font-bold text-2xl pb-4 text-center">Warning!</h1>
      <CircleAlert className="text-rose-500 h-12 w-12 self-center my-6" />
      <h1 className="text-md text-center my-6">
        You Should Login in Order to Add Meals to Basket
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

export default NotLoginModal;
