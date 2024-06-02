import { FetchError } from "./error";
import { type Meal } from "../../components/Cuisines/MealsPage";

export async function UpdateMealHttp(meal: Meal) {
  const { id, name, category, price, imageUrl, description, restaurant } = meal;
  console.log(name, category, price, imageUrl, description);

  const newMealInfo = {
    restaurant,
    name,
    category,
    price,
    description,
    imageUrl,
  };

  const response = await fetch(
    `https://food-order-e25e0-default-rtdb.firebaseio.com/meals/${id}.json`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMealInfo),
    }
  );

  if (!response.ok) {
    console.log("res not ok");
    const info = await response.json();
    throw new FetchError("Error occurred", info); // to check
  }

  const mealData = await response.json();

  return mealData;
}
