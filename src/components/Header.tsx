// import { useState } from "react";

import { CircleUserRound } from "lucide-react";

// import Cart from "./Cart.tsx";

export default function Header() {
  //   const [cartIsVisible, setCartIsVisible] = useState(false);

  //   function handleOpenCartClick() {
  //     setCartIsVisible(true);
  //   }

  //   function handleCloseCartClick() {
  //     setCartIsVisible(false);
  //   }

  return (
    <>
      {/* {cartIsVisible && <Cart onClose={handleCloseCartClick} />} */}
      <header className="w-full sticky shadow-lg flex flex-row justify-between items-center px-6 py-4">
        <div>
          <CircleUserRound
            className="text-rose-500 h-6 w-6 md:hidden"
            // onClick={openLoginModalHandler}
          />
        </div>
        <div className="text-left">
          <h1 className="font-bold text-3xl md:text-4xl text-rose-500 pacifico-regular">
            Tastify
          </h1>
        </div>
        <div className="flex flex-row justify-center items-center">
          <div className=" hidden md:flex md:flex-row md:justify-center md:items-center">
            <button className=" mr-4 bg-white border border-rose-500 hover:bg-rose-100 rounded-md px-4 py-2 text-rose-600">
              Login
            </button>
            <button className=" mr-4 bg-white border border-rose-500 hover:bg-rose-100 rounded-md px-4 py-2 text-rose-600">
              Signup
            </button>
          </div>
          <div>
            <button className="bg-rose-500 hover:bg-rose-600 rounded-md px-4 py-2 text-white">
              Cart (0)
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
