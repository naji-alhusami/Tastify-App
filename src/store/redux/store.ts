import { configureStore } from "@reduxjs/toolkit";
import { basketSlice } from "./basket-slice";

configureStore({
  reducer: {
    basket: basketSlice.reducer,
  },
});
