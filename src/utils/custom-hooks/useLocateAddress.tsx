// import { useState } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface DetermineAddressReturn {
  determineAddress: () => void;
  address: string | null;
  //   enabledButton: boolean;
  //   inputValue: string;
//   lat: number | null;
//   lon: number | null;
}

const useLocateAddress = (): DetermineAddressReturn => {
//   const [lat, setLat] = useState<number | null>(null);
//   const [lon, setLon] = useState<number | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  //   const [inputValue, setInputValue] = useState<string>("");
  //   const [enabledButton, setEnabledButton] = useState<boolean>(false);
  const navigate = useNavigate();

  const determineAddress = () => {
    // setEnabledButton(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
        //   setLat(latitude);
        //   setLon(longitude);
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const fullAddress = data.display_name;
            console.log("full address in useLocateAddress:", fullAddress);
            setAddress(fullAddress);
            console.log("address:", address);
            // setInputValue(fullAddress);
            navigate(`/meals?lng=${longitude}&lat=${latitude}`);
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
  // console.log("address in useLocateAddress but outside fun:", fullAddress);

  return {
    determineAddress,
    address,
    // enabledButton,
    // inputValue,
    // lat,
    // lon,
  };
};

export default useLocateAddress;
