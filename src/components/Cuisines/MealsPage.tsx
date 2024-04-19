import { useSearchParams } from "react-router-dom";
import Meals from "./Meals";
import SwiperCuisines from "./SwiperCuisines";
import { MEALSDATA } from "./Meals-data";

const MealsPage = () => {
  const [params] = useSearchParams();

  const cuisine = params.get("cuisine");

  let mealsToDisplay = [];

  if (cuisine) {
    mealsToDisplay = MEALSDATA.filter((meal) => meal.category === cuisine);
  } else {
    mealsToDisplay = MEALSDATA;
  }

  return (
    <div className="mx-4 mt-4">
      <div>
        <h1 className="text-4xl">Choose Cuisines:</h1>
      </div>
      <div className="flex justify-center items-center m-4">
        <SwiperCuisines />
      </div>
      <div>
        <div className=" flex flex-col justify-center items-center flex-wrap w-full my-4 md:mx-4 md:flex-row">
          {mealsToDisplay.map((meal) => (
            <Meals {...meal} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealsPage;
