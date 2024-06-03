import { Minus, Plus } from "lucide-react";
import {
  addToBasket,
  removeFromBasket,
  type BasketItem,
} from "../../store/redux/basket-slice";
import { useAppDispatch, useAppSelector } from "../../store/redux/hooks";
import Button from "../ui/Button";

interface BasketProps {
  setIsCheckoutForm: (open: boolean) => void;
}

export default function Basket({ setIsCheckoutForm }: BasketProps) {
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

  function openCheckoutHandler() {
    setIsCheckoutForm(true);
  }

  return (
    <div className="flex flex-col justify-end">
      <div className=" pb-10 pt-4">
        {basketItems.length === 0 && <p>No items in cart!</p>}

        {basketItems.length > 0 && (
          <ul>
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
                      <Minus />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleAddToBasket(item)}>
                      <Plus />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col">
          Cart Total: <strong>${formattedTotalPrice}</strong>
        </div>
        <Button
          type="button"
          className="bg-rose-500 hover:bg-rose-600 rounded-md px-4 py-2 text-white"
          onClick={openCheckoutHandler}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
}
