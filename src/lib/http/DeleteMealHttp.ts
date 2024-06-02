import { FetchError } from "./error";

export async function DeleteMealHttp(mealId: string) {

  const response = await fetch(
    `https://food-order-e25e0-default-rtdb.firebaseio.com/meals/${mealId}.json`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    // console.log("res not ok");
    const info = await response.json();
    throw new FetchError("Error occurred", info); // to check
  }

  const mealData = await response.json();

  return mealData;
}
