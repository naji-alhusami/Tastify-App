import { useParams } from "react-router-dom";

import { type Meal } from "../../lib/types/types";
import { FetchError } from "../../lib/http/error";
import Meals from "../Cuisines/Meals";
import useMealManager from "../../utils/hooks/useMealManager";
import Loading from "../ui/Loading";
import { useContext, useEffect } from "react";
import StateContext from "../../store/context/state-context";

const Dashboard = () => {
  const params = useParams();
  // console.log(params.restaurant);
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

  let content;
  if (allRestaurantMealsPending) {
    content = <Loading />;
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
  } else if (allRestaurantMealsData) {
    content = (
      <div className="flex flex-col justify-center items-center flex-wrap w-full my-4 md:flex-row">
        {allRestaurantMealsData.map((meal: Meal) => (
          <div key={meal.id}>
            <Meals {...meal} />
          </div>
        ))}
      </div>
    );
  }

  function addNewMealFormHandler() {
    setIsAddMealForm(true);
    // navigate(`/dashboard/${restaurant}/add`);
  }

  if (params.restaurant && allRestaurantMealsData) {
    return (
      <>
        <div className="flex flex-col items-center justify-center">
          {params.restaurant && allRestaurantMealsData.length > 0 ? (
            <div>
              <h1 className="text-center font-bold my-6 text-4xl pacifico-regular">
                {params.restaurant} Meals
              </h1>
              {content}
            </div>
          ) : (
            <div className="text-center text-xl font-bold my-6">
              No meals added!
            </div>
          )}
          <button
            onClick={addNewMealFormHandler}
            type="button"
            className="flex flex-row items-center justify-center my-8 px-4 py-2  text-white rounded-md bg-rose-500 hover:bg-rose-600"
          >
            Add New Meal
          </button>
        </div>
      </>
    );
  }
};

export default Dashboard;
