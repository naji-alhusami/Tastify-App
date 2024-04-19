"use client";
import { FC, useContext } from "react";
import { LocateFixed } from "lucide-react";
import StateContext from "../../store/context/state-context";

const AddressLocator: FC = () => {
  const contextValue = useContext(StateContext);

  if (!contextValue) {
    // We should handle the case when contextValue is null
    return null; // or any other fallback logic
  }

  const { address, setAddress, setLat, setLon } = contextValue;

  const determineAddress = () => {
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

  return (
    <>
      <input
        type="text"
        className="border border-gray-300  focus:ring-rose-500 overflow-hidden whitespace-nowrap overflow-ellipsis w-full px-4 py-2 rounded-md"
        placeholder="Locate Address"
        defaultValue={address || ""}
        readOnly
      />
      <button
        className="absolute right-8 top-6 md:right-28 md:top-6 cursor-pointer"
        onClick={determineAddress}
      >
        <LocateFixed size={20} className="bg-white" />
      </button>
    </>
  );
};

export default AddressLocator;
