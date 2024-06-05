import { XCircle } from "lucide-react";
import Modal from "../ui/Modal";
import { createPortal } from "react-dom";
// import { ReactNode } from "react";
import Backdrop from "../ui/Backdrop";

interface MealFormModalProps {
  isAddMealForm: boolean;
  closeMealForm: () => void;
  isUpdateMealForm: boolean;
}

const MealFormModal = ({
  isAddMealForm,
  closeMealForm,
  isUpdateMealForm,
}: MealFormModalProps) => {
  return createPortal(
    <Modal>
      {(isAddMealForm || isUpdateMealForm) && (
        <Backdrop onClick={closeMealForm} />
      )}

      <XCircle
        onClick={closeMealForm}
        className="text-rose-500 h-8 w-8 self-end hover:bg-rose-200 hover:rounded-full cursor-pointer"
      />

      <h1 className="font-bold text-2xl pb-4 text-center">
        {isAddMealForm ? "Add Meal" : "Update Meal"}
      </h1>
      <div className="flex flex-row justify-center items-center pb-6"></div>
    </Modal>,
    document.getElementById("modal")!
  );
};

export default MealFormModal;
