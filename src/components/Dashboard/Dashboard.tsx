import { useQuery } from "@tanstack/react-query";
import { fetchMeals } from "../../lib/http";
// import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import { Meal } from "../Cuisines/MealsPage";
import Meals from "../Cuisines/Meals";
import { useEffect, useRef, useState } from "react";
import AddNewMealForm from "./AddNewMealForm";

const Dashboard = () => {
  const [isNewMealForm, setIsNewMealForm] = useState<boolean>(false);
  const { restaurant } = useParams();
  console.log(restaurant);
  const {
    data: allMealsData,
    // isPending: allMealsPending,
    // isError: allMealsIsError,
    // error: allMealsError,
  } = useQuery({
    queryKey: ["meals"],
    queryFn: () => fetchMeals({ restaurant }),
    staleTime: 5000, // this ensure that the data will not be fetched from cache always, but in every 5 sec
    // gcTime:1000 this is the time that talk about how much the data will kept around
  });

  const NewMealFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isNewMealForm && NewMealFormRef.current) {
      NewMealFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isNewMealForm]);

  console.log("all meals:", allMealsData);

  console.log("restaurant:", restaurant);
  console.log("allMealsData:", allMealsData);

  function addNewMealFormHandler() {
    setIsNewMealForm(true);
  }

  if (restaurant && allMealsData) {
    return (
      <>
        <div className="flex flex-col items-center justify-center ">
          {restaurant && allMealsData.length > 0 ? (
            <div>
              <h1 className="text-center font-bold my-6 text-4xl pacifico-regular">
                {restaurant} Meals
              </h1>
              <div className=" flex flex-col justify-center items-center flex-wrap w-full my-4 md:mx-4 md:flex-row">
                {allMealsData.map((meal: Meal) => (
                  <div key={meal.id}>
                    <Meals {...meal} />
                  </div>
                ))}
              </div>
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
        {isNewMealForm && (
          <div className="relative" ref={NewMealFormRef}>
            <AddNewMealForm restaurant={restaurant} setIsNewMealForm={setIsNewMealForm} />
          </div>
        )}
      </>
    );
  }
};

export default Dashboard;
