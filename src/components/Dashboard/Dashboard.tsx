import { useQuery } from "@tanstack/react-query";
import { fetchMeals } from "../../lib/http";
// import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import { type Meal } from "../../lib/types";
import Meals from "../Cuisines/Meals";
// import { useContext, useEffect, useRef } from "react";
// import AddNewMealForm from "./AddNewMealForm";
// import StateContext from "../../store/context/state-context";

const Dashboard = () => {
  const navigate = useNavigate();
  const { restaurant } = useParams();
  const params = useParams();
  console.log("params:", params);
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

  // const NewMealFormRef = useRef<HTMLDivElement>(null);

  // const contextValue = useContext(StateContext) as {
  //   isMealForm: boolean;
  //   setIsMealForm: (meal: boolean) => void;
  // };

  // const { isMealForm, setIsMealForm } = contextValue;

  // useEffect(() => {
  //   if (isMealForm && NewMealFormRef.current) {
  //     NewMealFormRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [isMealForm]);

  // console.log("all meals:", allMealsData);

  // console.log("restaurant:", restaurant);
  // console.log("allMealsData:", allMealsData);

  function addNewMealFormHandler() {
    // setIsMealForm(true);
    navigate(`/dashboard/${restaurant}/add`);
  }

  if (restaurant && allMealsData) {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-screen">
          {restaurant && allMealsData.length > 0 ? (
            <div>
              <h1 className="text-center font-bold my-6 text-4xl pacifico-regular">
                {restaurant} Meals
              </h1>
              <div className=" flex flex-col justify-center items-center flex-wrap w-full my-4 md:flex-row">
                {allMealsData.map((meal: Meal) => (
                  <div key={meal.id}>
                    <Meals {...meal} restaurant={restaurant} />
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
        {/* {path.pathname !== "/Cuisines" && ( */}
        {/* )} */}
        {/* {isMealForm && (
          <div className="relative" ref={NewMealFormRef}>
            <AddNewMealForm setIsMealForm={setIsMealForm} allMealsData={allMealsData} />
          </div>
        )} */}
      </>
    );
  }
};

export default Dashboard;
