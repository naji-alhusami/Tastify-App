import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import StateContext from "../../../store/context/state-context";
import { FetchError } from "../../../lib/http/error";
import Meals from "../Meals";
import useMealManager from "../../../utils/custom-hooks/useMealManager";
import LoadingDashboard from "../../ui/LoadingDashboard";
import useLoadUser from "../../../utils/custom-hooks/useLoadUser";

const Dashboard = () => {
  const params = useParams();

  const contextValue = useContext(StateContext) as {
    setIsAddMealForm: (form: boolean) => void;
    setIsRestaurant: (restaurant: string) => void;
  };
  const { setIsAddMealForm, setIsRestaurant } = contextValue;

  useEffect(() => {
    if (params.restaurant) {
      setIsRestaurant(params.restaurant);
    }
  }, [params.restaurant, setIsRestaurant]);

  const {
    allRestaurantMealsData,
    allRestaurantMealsPending,
    allRestaurantMealsIsError,
    allRestaurantMealsError,
  } = useMealManager();

  const { loading } = useLoadUser();

  if (loading) {
    return <LoadingDashboard />;
  }

  let content;
  if (allRestaurantMealsPending) {
    content = <LoadingDashboard />;
  } else if (allRestaurantMealsIsError) {
    if (allRestaurantMealsError instanceof FetchError) {
      content = (
        <div className="text-center text-xl h-[350px] text-rose-500">
          <h1>
            {allRestaurantMealsError.message} - {allRestaurantMealsError.info}
          </h1>
        </div>
      );
    }
  } else if (!allRestaurantMealsData) {
    content = (
      <div className="text-center text-xl font-bold my-6">No meals added!</div>
    );
  } else if (allRestaurantMealsData) {
    if (allRestaurantMealsData.length === 0) {
      content = (
        <div className="text-center text-xl font-bold my-6">
          No meals added!
        </div>
      );
    } else {
      content = (
        <div className="flex flex-col justify-center items-center md:flex-row md:flex-wrap">
          {allRestaurantMealsData.map((meal) => (
            <div key={meal.id} className="mx-8 my-4">
              <Meals {...meal} />
            </div>
          ))}
        </div>
      );
    }
  }

  function addNewMealFormHandler() {
    setIsAddMealForm(true);
  }

  // if (loading) {
  //   return <h1>Loading</h1>
  // }

  return (
    <>
      <div className="relative overflow-hidden rounded-xl">
        {params.restaurant && (
          <div>
            <h1 className="text-center font-bold my-12 text-4xl pacifico-regular">
              {params.restaurant} Meals
            </h1>
            {content}
          </div>
        )}
      </div>
      <div className="flex flex-row items-center justify-center">
        <button
          onClick={addNewMealFormHandler}
          type="button"
          className=" mb-[16rem] mt-20 px-4 py-2 cursor-pointer text-white rounded-md bg-rose-500 hover:bg-rose-600"
        >
          Add New Meal
        </button>
      </div>
    </>
  );
};

export default Dashboard;
