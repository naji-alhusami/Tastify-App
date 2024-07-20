import { configureStore } from "@reduxjs/toolkit";

import { basketSlice } from "./basket-slice";
import usersSlice from "./user-slice";

export const store = configureStore({
  reducer: {
    users: usersSlice,
    basket: basketSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
