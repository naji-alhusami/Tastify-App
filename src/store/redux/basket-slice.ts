import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type BasketItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type BasketState = {
  items: BasketItem[];
};

const initialState: BasketState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket(
      state,
      action: PayloadAction<{ id: string; name: string; price: number }>
    ) {
      // check if there is item of same id before
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      ); // items from initialState

      // if there is item, we increase its quantity
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity++;
      } else {
        // otherwise, set the first quantity of this item
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromBasket(state, action: PayloadAction<string>) {
      //string its the id type
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload //all the payload, because we are checking all the item
      );

      if (state.items[itemIndex].quantity === 1) {
        state.items.splice(itemIndex, 1);
      } else {
        state.items[itemIndex].quantity--;
      }
    },

    clearBasket(state) {
      state.items = [];
    },
  },
});

export const { addToBasket, removeFromBasket, clearBasket } =
  basketSlice.actions;
