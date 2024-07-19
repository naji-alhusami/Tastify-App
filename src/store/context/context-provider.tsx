import { useState } from "react";
import StateContext from "./state-context";

interface ContextProviderProps {
  children: React.ReactNode;
}

const ContextProvider = ({ children }: ContextProviderProps) => {
  const [isCuisine, setIsCuisine] = useState<string | null>(null);
  const [isRestaurant, setIsRestaurant] = useState<string | null>(null);
  const [isMealId, setIsMealId] = useState<string | null>(null);
  const [showRestaurants, setShowRestaurants] = useState<boolean>(false);
  const [isAddMealForm, setIsAddMealForm] = useState<boolean>(false);
  const [isUpdateMealForm, setIsUpdateMealForm] = useState<boolean>(false);
  const [isNotLoginModal, setIsNotLoginModal] = useState<boolean>(false);

  const value = {
    isRestaurant,
    setIsRestaurant,
    isMealId,
    setIsMealId,
    isCuisine,
    setIsCuisine,
    showRestaurants,
    setShowRestaurants,
    isAddMealForm,
    setIsAddMealForm,
    isUpdateMealForm,
    setIsUpdateMealForm,
    isNotLoginModal,
    setIsNotLoginModal,
  };

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

export default ContextProvider;
