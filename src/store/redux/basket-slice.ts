import { createSlice } from "@reduxjs/toolkit";

type BasketItem = {
  id: string;
  title: string;
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
  name: "basktet",
  initialState,
  reducers: {
    addToBasket() {},
    removeFromBasket() {},
  },
});
