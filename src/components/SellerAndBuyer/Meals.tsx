import { useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { addToBasket } from "../../store/redux/basket-slice";
import { useAppDispatch, useAppSelector } from "../../store/redux/hooks";
import { type Meal } from "../../lib/types/types";
import useMealManager from "../../utils/custom-hooks/useMealManager";
import { FetchError } from "../../lib/http/error";
import StateContext from "../../store/context/state-context";

interface MealProps extends Meal {
  isActive?: boolean;
}

export default function Meals({
  id,
  name,
  description,
  price,
  imageUrl,
  isActive,
  restaurant,
}: MealProps) {
  const params = useParams();
  const path = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.users);

  const contextValue = useContext(StateContext) as {
    setIsUpdateMealForm: (form: boolean) => void;
    setIsAddMealForm: (form: boolean) => void;
    setIsMealId: (id: string) => void;
    setIsNotLoginModal: (notLogin: boolean) => void;
  };
  const {
    setIsUpdateMealForm,
    setIsAddMealForm,
    setIsMealId,
    setIsNotLoginModal,
  } = contextValue;

  function addToBasketHandler() {
    if (!user.userlogin || user.user.role === "seller") {
      setIsNotLoginModal(true);
    } else if (id && user.userlogin) {
      dispatch(addToBasket({ id, name, price }));
    }
  }

  const {
    deleteMealMutation,
    deleteMealPending,
    deleteMealIsError,
    deleteMealError,
  } = useMealManager();

  function deleteMealHandler() {
    if (id) {
      deleteMealMutation(id);
    }
  }

  function editMealHandler(id: string) {
    setIsMealId(id);
    setIsUpdateMealForm(true);
    setIsAddMealForm(false);
  }
  
  return (
    <div className="text-center w-[275px]  rounded-lg overflow-hidden hover:scale-100 border-2 border-amber-400">
      <div>
        <img src={imageUrl} alt="rest-image" className="w-full h-[250px]" />
      </div>
      <div className="p-4 ">
        <h1 className="text-xl font-semibold">{name}</h1>
        <h1 className="text-xl text-rose-500 font-bold">({restaurant})</h1>
        {isActive && path.pathname === "/meals" && (
          <p className="italic py-4">{description}</p>
        )}
        {params.restaurant && <p className="italic py-4">{description}</p>}
        <p className="text-rose-500 text-2xl">{price}$</p>
        {path.pathname === "/meals" || path.pathname === "/" ? (
          <>
            {isActive && (
              <div className="flex justify-center items-center">
                <button
                  onClick={addToBasketHandler}
                  className="bg-rose-500 hover:bg-rose-600 px-2 py-1 rounded-md mt-4 text-white"
                >
                  Add To Basket +
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-md flex flex-row justify-between items-center">
            <button
              onClick={() => id && editMealHandler(id)}
              className="bg-white border border-rose-500 hover:bg-rose-200 text-rose-600 px-6 py-1 rounded-md mt-4"
            >
              Edit
            </button>
            <button
              onClick={deleteMealHandler}
              className="bg-white border border-rose-500 hover:bg-rose-200 text-rose-600 px-6 py-1 rounded-md mt-4"
            >
              {deleteMealPending ? (
                <Loader2 className="mr-2 h-6 w-4 text-center animate-spin" />
              ) : (
                "Delete"
              )}
            </button>
            {deleteMealIsError && (
              <p>
                {deleteMealError instanceof FetchError
                  ? deleteMealError.message
                  : "error"}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
