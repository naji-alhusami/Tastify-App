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

  console.log(mealData);

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
      <div className="flex justify-center items-center m-8">
        <div className="w-[300px] h-[300px] bg-gray-400 rounded-md">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-lg p-4 font-bold text-white">
              {mealData.name}
            </h1>
            <img src={mealData.image} alt={mealData.name} />
            <div className="p-4 shadow-xl ">
              <p className="pb-4">{mealData.description}</p>
              <p className="">Price: {mealData.price}$</p>

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
    );
  }

  return <div>{content}</div>;
};

export default MealDetails;
