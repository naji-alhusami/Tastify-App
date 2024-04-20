import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

import { AppDispatch, RootState } from "./store";

type DispatchFunction = () => AppDispatch;

export const useBasketDispatch: DispatchFunction = useDispatch;
export const useBasketSelector: TypedUseSelectorHook<RootState> = useSelector;
