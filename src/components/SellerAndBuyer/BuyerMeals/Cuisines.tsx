import { useContext } from "react";

import { ITEMS_CATEGORIES } from "./ItemsCategories";
import StateContext from "../../../store/context/state-context";

const Cuisines = () => {
  const contextValue = useContext(StateContext);

  if (!contextValue) {
    // We should handle the case when contextValue is null
    return null; // or any other fallback logic
  }
  const { isCuisine, setIsCuisine, setShowRestaurants } = contextValue;

  const restaurantsHandler = (cuisine: string) => {
    setIsCuisine(cuisine);
    setShowRestaurants(true);
  };

  return (
    <div className="mx-12 my-10 flex flex-row flex-wrap items-center justify-center  h-32 rounded-xl text-gray-500">
      {ITEMS_CATEGORIES.map((item, i) => (
        <div key={i} className="relative mx-auto my-1">
          <div
            onClick={() => restaurantsHandler(item.value)}
            className={`font-bold text-center ${
              isCuisine === item.value
                ? "text-rose-500 font-bold border-2 border-rose-500 rounded-xl px-6 py-2"
                : "px-6 py-2 border-2 border-gray-400 hover:border-rose-500 hover:text-rose-500 rounded-xl cursor-pointer"
            }`}
          >
            <p>{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cuisines;
