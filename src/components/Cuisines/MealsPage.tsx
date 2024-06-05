import Meals from "./Meals";
import SwiperCuisines from "./SwiperCuisines";
import Loading from "../ui/Loading";

// import DashboardImage from "/Images/dashboard.png";
import { FetchError } from "../../lib/http/error";
import { Meal } from "../../lib/types/types";
import useMealManager from "../../utils/hooks/useMealManager";

const MealsPage = () => {
  const {
    allMealsData,
    allMealsPending,
    allMealsIsError,
    allMealsError,
    filteredMealsData,
    filteredMealsLoading,
    filteredMealsIsError,
    filteredMealsError,
  } = useMealManager();

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
      {/* <div>
        <img src={DashboardImage} alt="dashboard-image" />
      </div> */}
      <div className="mx-10 mt-4">
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
