import { configureStore } from "@reduxjs/toolkit";
import { basketSlice } from "./basket-slice";

export const store = configureStore({
  reducer: {
    basket: basketSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
