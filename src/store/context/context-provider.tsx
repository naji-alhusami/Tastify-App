import {
  useEffect,
  // useEffect
  useState,
} from "react";
import StateContext from "./state-context";
import { useSearchParams } from "react-router-dom";
import { getAddress } from "../../lib/get-address";
// import { useSearchParams } from "react-router-dom";
// import { getAddress } from "../lib/get-address";

interface ContextProviderProps {
  children: React.ReactNode;
}

const ContextProvider = ({ children }: ContextProviderProps) => {
  const [address, setAddress] = useState<string | null>(null);
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [isCuisine, setIsCuisine] = useState<string | null>(null);
  const [isRestaurant, setIsRestaurant] = useState<string | null>(null);
  const [isMealId, setIsMealId] = useState<string | null>(null);
  const [showRestaurants, setShowRestaurants] = useState<boolean>(false);
  const [isAddMealForm, setIsAddMealForm] = useState<boolean>(false);
  const [isUpdateMealForm, setIsUpdateMealForm] = useState<boolean>(false);
  const [isNotLoginModal, setIsNotLoginModal] = useState<boolean>(false);

  const [params] = useSearchParams();
  const latString = params.get("lat");
  const lonString = params.get("lng");

  const lata = latString ? parseFloat(latString) : null;
  const lona = lonString ? parseFloat(lonString) : null;

  useEffect(() => {
    const fetchAddress = async () => {
      if (lata !== null && lona !== null) {
        const fetchedAddress = await getAddress(lata, lona);
        setAddress(fetchedAddress);
      }
    };

    fetchAddress();
    setShowRestaurants(false);
  }, [lata, lona, setAddress]);

  const value = {
    address,
    setAddress,
    lat,
    setLat,
    lon,
    setLon,
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
