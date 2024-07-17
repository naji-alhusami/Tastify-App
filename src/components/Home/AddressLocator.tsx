import { useNavigate } from "react-router-dom";
import useLocateAddress from "../../utils/custom-hooks/useLocateAddress";
import { LocateFixed } from "lucide-react";

const AddressLocator = () => {
  const { determineAddress, enabledButton, inputValue, lat, lon } =
    useLocateAddress();
  const navigate = useNavigate();
  const findCuisinesHandler = () => {
    navigate(`/meals?lng=${lon}&lat=${lat}`);
  };

  return (
    <>
      <input
        type="text"
        className="border border-gray-300  focus:ring-rose-500 overflow-hidden whitespace-nowrap overflow-ellipsis w-full px-4 py-2 rounded-md"
        placeholder="Locate Address"
        value={inputValue}
        readOnly
      />
      <button
        className="absolute right-8 top-6 md:right-28 md:top-6 cursor-pointer"
        onClick={determineAddress}
      >
        <LocateFixed size={20} className="bg-white" />
      </button>
      <button
        onClick={findCuisinesHandler}
        disabled={!enabledButton}
        className={`text-white ${
          enabledButton ? "bg-rose-500 hover:bg-rose-600" : "bg-gray-500"
        } px-4 py-2 rounded-md`}
      >
        Search
      </button>
    </>
  );
};

export default AddressLocator;
