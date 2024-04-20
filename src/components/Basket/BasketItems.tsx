import {
  addToBasket,
  removeFromBasket,
  type BasketItem,
} from "../../store/redux/basket-slice";
import { useBasketDispatch, useBasketSelector } from "../../store/redux/hooks";

export default function BasketItems() {
  const basketItems = useBasketSelector((state) => state.basket.items);
  const dispatch = useBasketDispatch();

  const totalPrice = basketItems.reduce(
    (val, item) => val + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = totalPrice.toFixed(2);

  function handleAddToBasket(item: BasketItem) {
    dispatch(addToBasket(item));
  }

  function handleRemoveFromBasket(id: string) {
    dispatch(removeFromBasket(id));
  }

  return (
    <div id="cart" className="pb-10">
      {basketItems.length === 0 && <p>No items in cart!</p>}

      {basketItems.length > 0 && (
        <ul id="cart-items">
          {basketItems.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id} className="flex flex-row justify-between items-center bg-gray-200 my-4 rounded-md px-2">
                <div>
                  <span>{item.name}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div>
                  <button onClick={() => handleRemoveFromBasket(item.id)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleAddToBasket(item)}>+</button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <div id="flex flex-row justify-end items-center">
        Cart Total: <strong>${formattedTotalPrice}</strong>
      </div>
    </div>
  );
}
