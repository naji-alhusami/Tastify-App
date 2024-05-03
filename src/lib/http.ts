import { Meal } from "../components/Cuisines/MealsPage";

export class FetchError extends Error {
  code: number;
  info: string;

  constructor(message: string, code: number, info: string) {
    super(message);
    this.code = code;
    this.info = info;
  }
}

interface FetchMealsOptions {
  signal?: AbortSignal; // Type for signal, assuming you're using AbortController
  isRestaurant?: string; // Type for cuisine, assuming it's a string
}

export async function fetchMeals({
  signal,
  isRestaurant,
}: FetchMealsOptions): Promise<Meal[]> {
  console.log(isRestaurant);

  const response = await fetch(
    "https://food-order-e25e0-default-rtdb.firebaseio.com/meals.json",
    { signal: signal }
  );

  if (!response.ok) {
    console.log("res not ok");
    const info = await response.json();
    // console.log(info);
    throw new FetchError("Error occurred", response.status, info);
  }

  const data = await response.json();

  if (isRestaurant) {
    const filteredMeals = data.filter(
      (meal: Meal) => meal.category === isRestaurant
    );

    // console.log(filteredMeals);
    return filteredMeals;
  }
  // console.log(data);
  return data;
}