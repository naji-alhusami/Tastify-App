import { Bike } from "lucide-react";
import { MEALSDATA } from "./Meals-data";
import { useSearchParams } from "react-router-dom";

const Meals = () => {
  const [params] = useSearchParams();

  const cuisine = params.get("cuisine");
  console.log(cuisine);
  console.log(MEALSDATA);

  let mealsToDisplay = [];

  if (cuisine) {
    mealsToDisplay = MEALSDATA.filter((meal) => meal.category === cuisine);
  } else {
    mealsToDisplay = MEALSDATA;
  }

  return (
    <div>
      <div
        // href={`/details/${restaurant.id}`}
        className=" flex flex-col justify-center items-center flex-wrap w-full my-4 md:mx-4 md:flex-row"
      >
        {mealsToDisplay.map((meal) => (
          <div
            key={meal.id}
            className="m-4 border border-gray-200 rounded-lg hover:bg-rose-100 overflow-hidden hover:scale-100"
          >
            <div>
              <img
                src={meal.image}
                alt="rest-image"
                className="w-full h-[250px]"
              />
            </div>
            <div className="p-4 ">
              <h1 className="text-xl font-semibold">{meal.name}</h1>
              <p>{meal.category}</p>
              <div className="flex flex-row text-rose-500">
                <Bike color="#db0042" strokeWidth={1} />
                <p className="#db0042">Free</p>
              </div>
              <div>
                <button className="bg-rose-500 hover:bg-rose-600 px-2 py-1 rounded-md mt-4 text-white">
                  Add To Cart +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Meals;
