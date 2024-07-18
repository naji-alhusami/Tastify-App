import { createPortal } from "react-dom";
import { XCircle } from "lucide-react";

import Modal from "../ui/Modal";
import Backdrop from "../ui/Backdrop";
import MealForm from "./MealForm";

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

      <h1 className="font-bold text-2xl pb-4 text-center pacifico-regular">
        {isAddMealForm ? "Add Meal" : "Update Meal"}
      </h1>
      <div className="flex flex-row justify-center items-center pb-6">
        <MealForm
          isAddMealForm={isAddMealForm}
          isUpdateMealForm={isUpdateMealForm}
        />
      </div>
    </Modal>,
    document.getElementById("modal")!
  );
};

export default MealFormModal;
