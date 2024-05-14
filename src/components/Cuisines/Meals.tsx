import { Bike } from "lucide-react";
import { addToBasket } from "../../store/redux/basket-slice";
import { useAppDispatch } from "../../store/redux/hooks";
import { Meal } from "./MealsPage";
import { Link } from "react-router-dom";

export default function Meals({ id, category, name, price, image }: Meal) {
  const dispatch = useAppDispatch();

  function addToBasketHandler() {
    dispatch(addToBasket({ id, name, price }));
  }

  return (
    <Link to={`/cuisines/${id}`} className="cursor-pointer">
      <div className="m-4 border border-gray-200 rounded-lg hover:bg-rose-100 overflow-hidden hover:scale-100">
        <div>
          <img src={image} alt="rest-image" className="w-full h-[250px]" />
        </div>
        <div className="p-4 ">
          <h1 className="text-xl font-semibold">{name}</h1>
          <p>{category}</p>
          <p>{price}$</p>
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
        </div>
      </div>
    </Link>
  );
}
