import { Bike } from "lucide-react";
import { addToBasket } from "../../store/redux/basket-slice";
import { useAppDispatch } from "../../store/redux/hooks";
// import { Meal } from "./MealsPage";
import { Link, useLocation } from "react-router-dom";
// import { TMealValidator } from "../../lib/validators/meal-validator";
import { Meal } from "./MealsPage";

export default function Meals({ id, category, name, price, imageUrl }: Meal) {
  const path = useLocation();
  console.log("image in Meal:", imageUrl);

  const dispatch = useAppDispatch();
  console.log("id in Meal:", id);
  function addToBasketHandler() {
    if (id) {
      // const numericPrice = parseFloat(price);
      dispatch(addToBasket({ id, name, price }));
    }
  }

  return (
    <Link to={`/cuisines/${id}`} className="cursor-pointer">
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
                // onClick={addToBasketHandler}
                className="bg-white border border-rose-500 hover:bg-rose-100 text-rose-600 px-6 py-1 rounded-md mt-4"
              >
                Edit
              </button>
              <button
                // onClick={addToBasketHandler}
                className="bg-white border border-rose-500 hover:bg-rose-100 text-rose-600 px-6 py-1 rounded-md mt-4"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
