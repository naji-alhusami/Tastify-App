import { Bike } from "lucide-react";
import { addToBasket } from "../../store/redux/basket-slice";
import { useAppDispatch } from "../../store/redux/hooks";
// import { Meal } from "./MealsPage";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { TMealValidator } from "../../lib/validators/meal-validator";
import { Meal } from "./MealsPage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { DeleteMealHttp } from "../../lib/http/DeleteMealHttp";
import { fetchMealDetails, queryClient } from "../../lib/http";
// import { useContext } from "react";
// import StateContext from "../../store/context/state-context";
// import AddNewMealForm from "../Dashboard/AddNewMealForm";
// import { useContext, useEffect, useRef } from "react";
// import StateContext from "../../store/context/state-context";

export default function Meals({ id, category, name, price, imageUrl }: Meal) {
  const path = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  // console.log("Meal's data in Meals:", imageUrl);

  const dispatch = useAppDispatch();
  // console.log("id in Meal:", id);
  function addToBasketHandler() {
    if (id) {
      // const numericPrice = parseFloat(price);
      dispatch(addToBasket({ id, name, price }));
    }
  }

  // const contextValue = useContext(StateContext) as {
  //   setIsMealForm: (meal: boolean) => void;
  // };

  // const { setIsMealForm } = contextValue;

  const {
    mutate: deleteMutation,
    // , isPending, isError, error
  } = useMutation({
    // mutationKey: ["meals"],
    mutationFn: DeleteMealHttp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meals"], exact: true });
      // setIsNewMealForm(false);
      //   navigate("/cuisines");
    },
  });

  function deleteMealHandler() {
    if (id) {
      deleteMutation(id);
    }
  }

  const {
    data: mealData,
    // isPending: mealDataPending,
    // isError: mealDataIsError,
    // error: mealDataError,
  } = useQuery({
    queryKey: ["meals", id],
    queryFn: ({ signal }) => fetchMealDetails({ signal, id: id }),
  });

  console.log("mealData in Meals last try:", mealData);

  function editMealHandler() {
    // if (id) {
    console.log("id in edit", id);
    navigate(`/dashboard/${params.restaurant}/update/${id}`);
    // deleteMutation(id);
    // }
    // setIsMealForm(true);
  }

  return (
    // <Link to={`/cuisines/${id}`} className="cursor-pointer">
    <div className="w-[250px] m-4 border border-gray-200 rounded-lg  overflow-hidden hover:scale-100">
      <div>
        <img src={imageUrl} alt="rest-image" className="w-full h-[250px]" />
      </div>
      <div className="p-4 ">
        <h1 className="text-xl font-semibold">{name}</h1>
        <p>{category}</p>
        <p>{price}$</p>
        {path.pathname === "/Cuisines" ? (
          <>
            <div className="flex flex-row text-rose-500">
              <Bike color="#db0042" strokeWidth={1} />
              <p className="#db0042">Free</p>
            </div>
            <div className="flex justify-end items-center">
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
              onClick={editMealHandler}
              className="bg-white border border-rose-500 hover:bg-rose-200 text-rose-600 px-6 py-1 rounded-md mt-4"
            >
              Edit
            </button>
            <button
              onClick={deleteMealHandler}
              className="bg-white border border-rose-500 hover:bg-rose-200 text-rose-600 px-6 py-1 rounded-md mt-4"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* {isMealForm && (
        <div className="relative" ref={NewMealFormRef}>
          <AddNewMealForm setIsMealForm={setIsMealForm} />
        </div>
      )} */}
    </div>

    // </Link>
  );
}
