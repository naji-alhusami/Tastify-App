import { createContext } from "react";

interface ContextType {
  address: string | null;
  setAddress: (address: string | null) => void;
  lat: number | null;
  setLat: (lat: number | null) => void;
  lon: number | null;
  setLon: (lon: number | null) => void;
  isRestaurant: string | null;
  setIsRestaurant: (restaurant: string) => void;
  isMealId: string | null;
  setIsMealId: (id: string) => void;
  isCuisine: string | null;
  setIsCuisine: (cuisine: string) => void;
  showRestaurants: boolean;
  setShowRestaurants: (restaurant: boolean) => void;
  isAddMealForm: boolean;
  setIsAddMealForm: (form: boolean) => void;
  isUpdateMealForm: boolean;
  setIsUpdateMealForm: (form: boolean) => void;
  isNotLoginModal: boolean;
  setIsNotLoginModal: (notLogin: boolean) => void;
}

const StateContext = createContext<null | ContextType>(null);

export default StateContext;
