import Meals from "./Meals";
import SwiperCuisines from "./SwiperCuisines";
import { useQuery } from "@tanstack/react-query";
import { fetchMeals } from "../../lib/http";
import Loading from "../ui/Loading";
import { useContext } from "react";
import StateContext from "../../store/context/state-context";
import DashboardImage from "/Images/dashboard.png";
import { FetchError } from "../../lib/http/error";

export type Meal = {
  id?: string;
  category: string;
  name: string;
  price: number;
  image: FileList;
  description: string;
};

const MealsPage = () => {
  // const [params] = useSearchParams();
  // const cuisine = params.get("cuisine");

  const {
    data: allMealsData,
    isPending: allMealsPending,
    isError: allMealsIsError,
    error: allMealsError,
  } = useQuery({
    queryKey: ["meals"],
    queryFn: () => fetchMeals({}),
    staleTime: 5000, // this ensure that the data will not be fetched from cache always, but in every 5 sec
    // gcTime:1000 this is the time that talk about how much the data will kept around
  });
  console.log(allMealsPending);
  const contextValue = useContext(StateContext) as { isRestaurant: string };

  const { isRestaurant } = contextValue;

  const {
    data: filteredMealsData,
    isLoading: filteredMealsLoading,
    isError: filteredMealsIsError,
    error: filteredMealsError,
  } = useQuery({
    queryKey: ["meals", { cuisine: isRestaurant }],
    queryFn: ({ signal }) => fetchMeals({ signal, isRestaurant }),
    enabled: !!isRestaurant, // the isLoading will not be true if this query is just disabled
  });

  let content;
  if (allMealsPending || filteredMealsLoading) {
    content = <Loading />;
  } else if (allMealsIsError || filteredMealsIsError) {
    if (
      allMealsError instanceof FetchError ||
      filteredMealsError instanceof FetchError
    ) {
      const error =
        allMealsError instanceof FetchError
          ? allMealsError
          : (filteredMealsError as FetchError);
      content = (
        <div className="text-center text-xl h-[350px] text-rose-500">
          <h1>
            {error.message} - {error.info}
          </h1>
        </div>
      );
    }
  } else if (filteredMealsData) {
    content = (
      <div className="flex flex-col justify-center items-center flex-wrap w-full my-4 md:mx-4 md:flex-row">
        {filteredMealsData.map((meal: Meal) => (
          <div key={meal.id}>
            <Meals {...meal} />
          </div>
        ))}
      </div>
    );
  } else if (allMealsData) {
    content = (
      <div className=" flex flex-col justify-center items-center flex-wrap w-full my-4 md:mx-4 md:flex-row">
        {allMealsData.map((meal: Meal) => (
          <div key={meal.id}>
            <Meals {...meal} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div>
        <img src={DashboardImage} alt="dashboard-image" />
      </div>
      <div className="mx-4 mt-4">
        <div>
          <h1 className="text-4xl">Choose Cuisines:</h1>
        </div>
        <div className="flex justify-center items-center m-4">
          <SwiperCuisines />
        </div>
        <div>{content}</div>
      </div>
    </>
  );
};

export default MealsPage;
