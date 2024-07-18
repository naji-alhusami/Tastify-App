import { useState } from "react";

interface DetermineAddressReturn {
  determineAddress: () => void;
  address: string | null;
  enabledButton: boolean;
  inputValue: string;
  lat: number | null;
  lon: number | null;
}

const useLocateAddress = (): DetermineAddressReturn => {
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [enabledButton, setEnabledButton] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const determineAddress = () => {
    setEnabledButton(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLat(latitude);
          setLon(longitude);
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const fullAddress = data.display_name;
            setAddress(fullAddress);
            setInputValue(fullAddress);
          } catch (error) {
            console.error("Error fetching address:", error);
            setAddress(null);
          }
        },
        (error) => {
          console.error("Error getting current location:", error);
          setAddress(null);
        }
      );
    }
  };

  return {
    determineAddress,
    address,
    enabledButton,
    inputValue,
    lat,
    lon,
  };
};

export default useLocateAddress;
