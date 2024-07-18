import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { storage } from "../../firebase-config";
import { FetchError } from "./error";
import { type Meal } from "../types/types";

export async function UpdateMealHttp(meal: Meal) {
  const { id, name, category, price, image, description, restaurant } = meal;
  console.log(
    "meal data inside http:",
    id,
    name,
    category,
    restaurant,
    price,
    image,
    description
  );

  if (image) {
    const imageFile = image[0];

    const metadata = {
      contentType: imageFile.type,
    };

    const storageRef = ref(storage, `${name}`);
    const snapshot = await uploadBytes(storageRef, imageFile, metadata);
    const downloadUrl = await getDownloadURL(snapshot.ref);

    const newMealInfo = {
      restaurant,
      name,
      category,
      price,
      description,
      imageUrl: downloadUrl,
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
}
