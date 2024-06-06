import { Loader2 } from "lucide-react";
import { addToBasket } from "../../store/redux/basket-slice";
import { useAppDispatch } from "../../store/redux/hooks";
import { useLocation } from "react-router-dom";
import { type Meal } from "../../lib/types/types";
import useMealManager from "../../utils/hooks/useMealManager";
import { FetchError } from "../../lib/http/error";
import { useContext } from "react";
import StateContext from "../../store/context/state-context";

export default function Meals({
  id,
  name,
  description,
  price,
  imageUrl,
}: Meal) {
  const path = useLocation();
  const dispatch = useAppDispatch();

  const contextValue = useContext(StateContext) as {
    setIsUpdateMealForm: (form: boolean) => void;
    setIsAddMealForm: (form: boolean) => void;
    setIsMealId: (id: string) => void;
  };
  const { setIsUpdateMealForm, setIsAddMealForm, setIsMealId } = contextValue;

  function addToBasketHandler() {
    if (id) {
      // const numericPrice = parseFloat(price);
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
    // if (id) {
    // console.log("id in edit", id);
    // navigate(`/dashboard/${params.restaurant}/update/${id}`);
    // deleteMutation(id);
    // }
    // setIsMealForm(true);
  }

  return (
    // <Link to={`/cuisines/${id}`} className="cursor-pointer">
    <div className="text-center w-[275px] border border-gray-200 rounded-lg  overflow-hidden hover:scale-100">
      <div>
        <img src={imageUrl} alt="rest-image" className="w-full h-[250px]" />
      </div>
      <div className="p-4 ">
        <h1 className="text-xl font-semibold">{name}</h1>
        <p className="italic py-4">{description}</p>
        <p className="text-rose-500 text-2xl">{price}$</p>
        {path.pathname === "/cuisines" || path.pathname === "/Cuisines" ? (
          <>
            {/* <div className="flex flex-row text-rose-500">
              <Bike color="#db0042" strokeWidth={1} />
              <p className="#db0042">Free</p>
            </div> */}
            <div className="flex justify-center items-center">
              <button
                onClick={addToBasketHandler}
                className="bg-rose-500 hover:bg-rose-600 px-2 py-1 rounded-md mt-4 text-white"
              >
                Add To Basket +
              </button>
            </div>
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

    // </Link>
  );
}
