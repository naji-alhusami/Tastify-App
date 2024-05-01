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

export async function fetchMeals(): Promise<Meal[]> {
  const response = await fetch(
    "https://food-order-e25e0-default-rtdb.firebaseio.com/meals.json"
  );

  if (!response.ok) {
    console.log("res not ok");
    const info = await response.json();
    console.log(info);
    throw new FetchError("Error occurred", response.status, info);
  }

  const data = await response.json();
  console.log(data);
  return data;
}
