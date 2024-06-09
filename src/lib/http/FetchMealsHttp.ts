import { type Meal } from "../types/types";
import { FetchError } from "./error";

interface FetchMealsOptions {
  signal?: AbortSignal; // Type for signal, assuming you're using AbortController
  isCuisine?: string; // Type for cuisine, assuming it's a string
  isRestaurant?: string;
  id?: string;
}

export async function fetchMeals({
  signal,
  isCuisine,
  isRestaurant,
  id,
}: FetchMealsOptions): Promise<Meal[]> {
  const response = await fetch(
    "https://food-order-e25e0-default-rtdb.firebaseio.com/meals.json",
    { signal: signal }
  );
  if (!response.ok) {
    const info = await response.json();

    throw new FetchError("Error occurred", info.error);
  }

  const data = await response.json();
  // console.log("restaurant in http:", restaurant);

  const allConvertedMeals = Object.keys(data).map((key) => ({
    id: key,
    ...data[key],
  }));

  // To filter meals for buyer users:
  if (isCuisine) {
    const filteredMeals = allConvertedMeals.filter(
      (meal: Meal) => meal.category === isCuisine
    );

    return filteredMeals;
  }

  // To check the details of any meal:
  if (id) {
    // console.log("id in http:", id);
    const mealDetails = allConvertedMeals.filter(
      (meal: Meal) => meal.id === id
    );

    // console.log("mealDetails:", mealDetails);
    return mealDetails;
  }

  // To get all the meals for speceific restaurant:
  if (isRestaurant) {
    const restaurantMeals = allConvertedMeals.filter(
      (meal: Meal) => meal.restaurant === isRestaurant
    );

    // console.log(restaurantMeals);
    return restaurantMeals;
  }

  return allConvertedMeals;
}
