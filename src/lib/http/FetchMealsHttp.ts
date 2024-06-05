import { type Meal } from "../types";
import { FetchError } from "./error";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

interface FetchMealsOptions {
  signal?: AbortSignal; // Type for signal, assuming you're using AbortController
  isRestaurant?: string; // Type for cuisine, assuming it's a string
  restaurant?: string;
  id?: string;
}

export async function fetchMeals({
  signal,
  isRestaurant,
  restaurant,
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
  console.log("restaurant in http:", restaurant);

  const allConvertedMeals = Object.keys(data).map((key) => ({
    id: key,
    ...data[key],
  }));

  // To filter meals for buyer users:
  if (isRestaurant) {
    const filteredMeals = allConvertedMeals.filter(
      (meal: Meal) => meal.category === isRestaurant
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
  if (restaurant) {
    const restaurantMeals = allConvertedMeals.filter(
      (meal: Meal) => meal.restaurant === restaurant
    );

    // console.log(restaurantMeals);
    return restaurantMeals;
  }

  return allConvertedMeals;
}