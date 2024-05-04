import {
  addToBasket,
  removeFromBasket,
  type BasketItem,
} from "../../store/redux/basket-slice";
import { useAppDispatch, useAppSelector } from "../../store/redux/hooks";

interface BasketItemsProps {
  openCheckoutHandler: () => void;
}

export default function BasketItems({ openCheckoutHandler }: BasketItemsProps) {
  const basketItems = useAppSelector((state) => state.basket.items);
  const dispatch = useAppDispatch();

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
              <li
                key={item.id}
                className="flex flex-row justify-between items-center bg-gray-200 my-4 rounded-md px-2"
              >
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
      <button onClick={openCheckoutHandler}>Submit</button>
    </div>
  );
}
