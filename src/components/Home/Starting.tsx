// import HomeImage from "/Images/home-image.jpg";

// const Starting = () => {
//   return (
//     <div>
//       <div>
//         <img
//           src={HomeImage}
//           alt="home-image"
//           className="w-full h-full brightness-90"
//         />
//       </div>
//       <div className="flex flex-col justify-center items-center">
//         <h1 className="mx-24 text-center absolute top-20 text-md font-bold tracking-tight text-gray-900 sm:mx-52 sm:text-3xl md:mx-70 md:top-32 lg:mx-72 lg:top-24 lg:text-5xl">
//           Everything You Need Is Brought To Your Door With Our{" "}
//           <span className="text-rose-500">Delivery Service</span>..
//         </h1>
//       </div>
//     </div>
//   );
// };

// export default Starting;

import { useContext } from "react";

import HomeImage from "/Images/home-image.jpg";
import AddressLocator from "./locate-address";
import StateContext from "../../store/state-context";
import { useNavigate } from "react-router-dom";

const Starting = () => {
  const contextValue = useContext(StateContext);
  const navigate = useNavigate();

  if (!contextValue) {
    // We should handle the case when contextValue is null
    return null; // or any other fallback logic
  }

  const { lat, lon } = contextValue;
  console.log(lat, lon);
  const findCuisinesHandler = () => {
    navigate(`/cuisines?lon=${lon}&lat=${lat}`);
  };

  return (
    <div>
      <div>
        <img
          src={HomeImage}
          alt="home-image"
          className="w-full h-full brightness-90"
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="mx-24 text-center absolute top-24 text-md font-bold tracking-tight text-gray-900 sm:mx-40 sm:text-3xl md:mx-52 md:top-32 lg:mx-72 lg:top-32 lg:text-5xl">
          Everything You Need Is Brought To Your Door With Our{" "}
          <span className="text-rose-500">Delivery Service</span>..
        </h1>
        <div className="relative w-full flex flex-col justify-between bg-white p-4 rounded-md gap-2 shadow-lg md:absolute md:top-2/4 md:flex-row md:max-w-2xl lg:top-96">
          <AddressLocator />
          <button
            onClick={findCuisinesHandler}
            className="text-white bg-rose-500 hover:bg-rose-600 px-4 py-2 rounded-md"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Starting;
