import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { FetchError, fetchMealDetails } from "../../lib/http";
import Loading from "../ui/Loading";
import { useAppDispatch } from "../../store/redux/hooks";
import { addToBasket } from "../../store/redux/basket-slice";

const MealDetails = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  const {
    data: mealData,
    isPending: mealDataPending,
    isError: mealDataIsError,
    error: mealDataError,
  } = useQuery({
    queryKey: ["meals", params.id],
    queryFn: ({ signal }) => fetchMealDetails({ signal, id: params.id }),
  });

  function addToBasketHandler() {
    if (mealData) {
      dispatch(
        addToBasket({
          id: mealData.id,
          name: mealData.name,
          price: mealData.price,
        })
      );
    }
  }

  let content;
  if (mealDataPending) {
    content = <Loading />;
  } else if (mealDataIsError) {
    if (mealDataError instanceof FetchError) {
      content = (
        <div>
          <h1>
            Error occurred:
            {mealDataError?.message}
          </h1>
          {/* <p>Error code: {allMealsError?.code || filteredMealsError?.code}</p>
          <p>Error info: {allMealsError?.info || filteredMealsError?.info}</p> */}
        </div>
      );
    }
  } else if (mealData) {
    content = (
      <div className="flex justify-center items-center m-12">
        <div className="w-full md:w-[800px] md:h-[400px] flex flex-col justify-center items-center">
          <div className="w-full">
            <h1 className="bg-amber-500 text-lg p-4 font-bold text-white text-center">
              {mealData.name}
            </h1>
          </div>
          <div className="flex flex-col md:flex-row-reverse">
            <div className="md:w-[510px] md:h-full">
              <img src={mealData.image} alt={mealData.name} />
            </div>
            <div className="h-full w-full p-4 shadow-xl flex flex-col justify-between">
              <div>
                <p>Meal: {mealData.name}</p>
                <p className="pb-4">Meal Content: {mealData.description}</p>
                <p className="">Price: {mealData.price}$</p>
              </div>
              <div>
                <button
                  onClick={addToBasketHandler}
                  className="bg-rose-500 hover:bg-rose-600 px-2 py-1 rounded-md mt-4 text-white"
                >
                  Add To Basket +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="mx-6 md:mx-12 mt-8 min-h-screen">
      <h1 className="text-4xl">Meal Details:</h1>
      {content}
    </div>
  );
};

export default MealDetails;
