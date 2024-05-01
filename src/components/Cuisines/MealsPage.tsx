import { useSearchParams } from "react-router-dom";
import Meals from "./Meals";
import SwiperCuisines from "./SwiperCuisines";
// import { MEALSDATA } from "./Meals-data";
import { useQuery } from "@tanstack/react-query";
import { FetchError, fetchMeals } from "../../lib/http";
import Loading from "../ui/Loading";

export type Meal = {
  id: string;
  category: string;
  name: string;
  price: number;
  image: string;
};

const MealsPage = () => {
  const [params] = useSearchParams();
  const cuisine = params.get("cuisine");

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["meals"],
    queryFn: fetchMeals,
  });

  let content;
  // console.log("loading:", isPending);
  if (isPending) {
    content = <Loading />;
  } else if (isError) {
    console.log("before the check");
    if (error instanceof FetchError) {
      console.log("after the check");
      content = (
        <div>
          <h1>Error occurred: {error.message}</h1>
          <p>Error code: {error.code}</p>
          <p>Error info: {error.info}</p>
        </div>
      );
    }
  } else if (cuisine && data) {
    const filteredMeals = data.filter(
      (meal: Meal) => meal.category === cuisine
    );
    content = (
      <div className="flex flex-col justify-center items-center flex-wrap w-full my-4 md:mx-4 md:flex-row">
        {filteredMeals.map((meal: Meal) => (
          <div key={meal.id}>
            <Meals {...meal} />
          </div>
        ))}
      </div>
    );
  } else {
    content = (
      <div className=" flex flex-col justify-center items-center flex-wrap w-full my-4 md:mx-4 md:flex-row">
        {data?.map((meal: Meal) => (
          <div key={meal.id}>
            <Meals {...meal} />
          </div>
        ))}
      </div>
    );
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
        {content}
        {/* <div className=" flex flex-col justify-center items-center flex-wrap w-full my-4 md:mx-4 md:flex-row">
          {mealsToDisplay.map((meal) => (
            <Meals {...meal} />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default MealsPage;
