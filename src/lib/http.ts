import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Order } from "../components/BasketAndCheckout/Checkout";
import { storage } from "../firebase-config";
// import { Meal } from "../components/Cuisines/MealsPage";
import { TMealValidator } from "./validators/meal-validator";

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
  id?: string;
}

export async function fetchMeals({
  signal,
  isRestaurant,
  id,
}: FetchMealsOptions): Promise<TMealValidator[]> {
  // console.log(isRestaurant);

  const response = await fetch(
    "https://food-order-e25e0-default-rtdb.firebaseio.com/meals.json",
    { signal: signal }
  );
  if (!response.ok) {
    console.log("res not ok");
    const info = await response.json();
    throw new FetchError("Error occurred", response.status, info);
  }

  const data = await response.json();
  console.log("response:",data)

  if (isRestaurant) {
    const filteredMeals = data.filter(
      (meal: TMealValidator) => meal.category === isRestaurant
    );

    // console.log(filteredMeals);
    return filteredMeals;
  }

  if (id) {
    console.log(id);
    const mealDetails = data.filter((meal: TMealValidator) => meal.id === id);

    console.log(mealDetails);
    return mealDetails;
  }

  console.log(data);
  return data;
}

export async function fetchMealDetails({
  signal,
  id,
}: FetchMealsOptions): Promise<TMealValidator> {
  console.log(id);
  const response = await fetch(
    `https://food-order-e25e0-default-rtdb.firebaseio.com/meals/${id}.json`,
    { signal: signal }
  );

  if (!response.ok) {
    console.log("res not ok");
    const info = await response.json();
    throw new FetchError("Error occurred", response.status, info);
  }

  const data = await response.json();
  console.log("data:", data);

  return data;
}

export async function sendOrders(orders: Order) {
  const { name, email, state, city, zip, street, house } = orders;
  const fullAddress = `${street} ${house}, ${city}, ${state}, ${zip}`;
  const orderData = {
    name,
    email,
    fullAddress,
  };

  const response = await fetch(
    "https://food-order-e25e0-default-rtdb.firebaseio.com/orders.json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    }
  );

  if (!response.ok) {
    console.log("res not ok");
    const info = await response.json();
    throw new FetchError("Error occurred", response.status, info);
  }

  const { order } = await response.json();

  return order;
}

export async function AddNewMeal(meal: TMealValidator) {
  const { name, category, price, image, description } = meal;
  console.log(name, category, price, image, description);

  const metadata = {
    contentType: image.type,
  };

  const storageRef = ref(storage, `${image.name}/${image.name}`);
  const snapshot = await uploadBytes(storageRef, image, metadata);
  const downloadUrl = await getDownloadURL(snapshot.ref);

  const newMeal = {
    name,
    category,
    price,
    description,
    imageUrl: downloadUrl,
  };

  const response = await fetch(
    "https://food-order-e25e0-default-rtdb.firebaseio.com/meals.json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMeal),
    }
  );

  if (!response.ok) {
    console.log("res not ok");
    const info = await response.json();
    throw new FetchError("Error occurred", response.status, info);
  }

  const mealss = await response.json();
  console.log(mealss);

  return mealss;
}
