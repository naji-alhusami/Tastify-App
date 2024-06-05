import { type Order } from "../types";
import { FetchError } from "./error";

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
