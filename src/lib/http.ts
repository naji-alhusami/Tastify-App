import { Order } from "../components/BasketAndCheckout/Checkout";
import { Meal } from "../components/Cuisines/MealsPage";
import { FetchError } from "./http/error";
// import { Meal } from "../components/Cuisines/MealsPage";
import { TMealValidator } from "./validators/meal-validator";
import { QueryClient } from "@tanstack/react-query";
// import { Meal } from "../components/Cuisines/MealsPage";

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

  const allConvertedMeals = Object.keys(data).map((key) => ({
    id: key,
    ...data[key],
  }));

  // To filter meals for buyer users:
  if (isRestaurant) {
    const filteredMeals = allConvertedMeals.filter(
      (meal: TMealValidator) => meal.category === isRestaurant
    );

    return filteredMeals;
  }

  // To check the details of any meal:
  if (id) {
    // console.log(id);
    const mealDetails = allConvertedMeals.filter(
      (meal: Meal) => meal.id === id
    );

    // console.log(mealDetails);
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

export async function fetchMealDetails({
  signal,
  id,
}: FetchMealsOptions): Promise<Meal> {
  // console.log(id);
  const response = await fetch(
    `https://food-order-e25e0-default-rtdb.firebaseio.com/meals/${id}.json`,
    { signal: signal }
  );

  if (!response.ok) {
    // console.log("res not ok");
    const info = await response.json();
    throw new FetchError("Error occurred", info);
  }

  const data = await response.json();
  // console.log("data:", data);

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
    // console.log("res not ok");
    const info = await response.json();
    throw new FetchError("Error occurred", info);
  }

  const { order } = await response.json();

  return order;
}

// export async function UpdateMealHttp({
//   signal,
//   id,
// }: FetchMealsOptions): Promise<Meal> {
//   const { name, category, price, image, description, restaurant } = meal;
//   console.log(
//     "meal data inside http:",
//     id,
//     name,
//     category,
//     restaurant,
//     price,
//     image,
//     description
//   );

  // if (image) {
  //   const imageFile = image[0];

  //   const metadata = {
  //     contentType: imageFile.type,
  //   };

  //   const storageRef = ref(storage, `${name}`);
  //   const snapshot = await uploadBytes(storageRef, imageFile, metadata);
  //   const downloadUrl = await getDownloadURL(snapshot.ref);

  //   const newMealInfo = {
  //     restaurant,
  //     name,
  //     category,
  //     price,
  //     description,
  //     imageUrl: downloadUrl,
  //   };

  //   const response = await fetch(
  //     `https://food-order-e25e0-default-rtdb.firebaseio.com/meals/${id}.json`,
  //     {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(newMealInfo),
  //     }
  //   );

  //   if (!response.ok) {
  //     console.log("res not ok");
  //     const info = await response.json();
  //     throw new FetchError("Error occurred", info); // to check
  //   }

  //   const mealData = await response.json();

  //   return mealData;
  // }
// }

// export async function AddNewMeal(newMealInfo: TMealValidator) {
//   const { name, category, price, image, description } = newMealInfo;
//   console.log(name, category, price, image, description);

//   const imageFile = image[0];

//   if (!imageFile) {
//     throw new Error("No file selected");
//   }

//   const metadata = {
//     contentType: image.type,
//   };

//   const storageRef = ref(storage, `${name}`);
//   const snapshot = await uploadBytes(storageRef, imageFile, metadata);
//   const downloadUrl = await getDownloadURL(snapshot.ref);

//   const newMeal = {
//     name,
//     category,
//     price,
//     description,
//     imageUrl: downloadUrl,
//   };

//   const response = await fetch(
//     "https://food-order-e25e0-default-rtdb.firebaseio.com/meals.json",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newMeal),
//     }
//   );

//   if (!response.ok) {
//     console.log("res not ok");
//     const info = await response.json();
//     throw new FetchError("Error occurred", response.status, info); // to check
//   }

//   const meal = await response.json();

//   return meal;
// }
