// import { useState } from "react";

// import { CircleUserRound, MapPin } from "lucide-react";
// import { useContext } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import StateContext from "../../store/state-context";

// // import Cart from "./Cart.tsx";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const [params] = useSearchParams();
//   console.log(params.get("lon"));
//   console.log(params.size);
//   const contextValue = useContext(StateContext);
//   //   const [cartIsVisible, setCartIsVisible] = useState(false);

//   //   function handleOpenCartClick() {
//   //     setCartIsVisible(true);
//   //   }

//   //   function handleCloseCartClick() {
//   //     setCartIsVisible(false);
//   //   }

//   if (!contextValue) {
//     // We should handle the case when contextValue is null
//     return null; // or any other fallback logic
//   }

//   const { address } = contextValue;

//   const heightClass = params.size > 0 ? "h-32 lg:h-16" : "h-16";

//   return (
//     <section
//       className={`bg-white z-10 top-0 w-full sticky shadow-lg px-8 ${heightClass}`}
//     >
//       {/* {cartIsVisible && <Cart onClose={handleCloseCartClick} />} */}
//       <nav className="h-full flex flex-row items-center justify-between">
//         <div>
//           <CircleUserRound
//             className="text-rose-500 h-6 w-6 md:hidden"
//             // onClick={openLoginModalHandler}
//           />
//         </div>
//         <div className="text-left">
//           <h1
//             onClick={() => navigate("/")}
//             className="font-bold text-3xl md:text-4xl text-rose-500 pacifico-regular cursor-pointer"
//           >
//             Tastify
//           </h1>
//         </div>
//         {params.size > 0 && (
//           <div className="hidden text-center  lg:flex lg:flex-row lg:items-center lg:justify-center  lg:px-12">
//             <MapPin strokeWidth={1} className="h-8 w-8 mr-2" />
//             {address ? (
//               <p className="text-rose-500 xl:max-w-xl lg:max-w-lg lg:overflow-hidden lg:whitespace-nowrap lg:overflow-ellipsis">
//                 {address}
//               </p>
//             ) : (
//               <p>Loading...</p>
//             )}
//           </div>
//         )}
//         <div className="flex flex-row justify-center items-center">
//           <div className=" hidden md:flex md:flex-row md:justify-center md:items-center">
//             <button className=" mr-4 bg-white border border-rose-500 hover:bg-rose-100 rounded-md px-2 py-1 text-rose-600">
//               Login
//             </button>
//             <button className=" mr-4 bg-white border border-rose-500 hover:bg-rose-100 rounded-md px-2 py-1 text-rose-600">
//               Signup
//             </button>
//           </div>
//           <div>
//             <button className="bg-rose-500 hover:bg-rose-600 rounded-md  px-2 py-1 text-white">
//               Cart (0)
//             </button>
//           </div>
//         </div>
//       </nav>
//     </section>
//   );
// }

import { useContext } from "react";
import { CircleUserRound, ShoppingCart, MapPin } from "lucide-react";

import StateContext from "../../store/state-context";
import { useNavigate, useSearchParams } from "react-router-dom";

// interface NavbarProps {
//   user: User | null;
// }

const Navbar = () => {
  const contextValue = useContext(StateContext);
  const navigate = useNavigate();
  const [params] = useSearchParams();

  if (!contextValue) {
    // We should handle the case when contextValue is null
    return null; // or any other fallback logic
  }

  const { address } = contextValue;
  const heightClass = params.size > 0 ? " lg:h-16" : "h-16";

  //   return (
  //     <section
  //       className={`bg-white z-10 top-0 w-full sticky shadow-lg px-8 ${heightClass}`}
  //     >
  return (
    <>
      {/* Navbar */}
      <section
        className={`bg-white z-50 top-0 w-full sticky shadow-lg px-8 ${heightClass}`}
      >
        <header className="h-full flex flex-row items-center justify-between">
          <div>
            <CircleUserRound
              className="text-rose-500 h-6 w-6 lg:hidden"
              // onClick={openLoginModalHandler}
            />
          </div>
          <div className="ml-0 md:ml-4">
            <h1
              onClick={() => navigate("/")}
              className="font-bold text-3xl md:text-4xl text-rose-500 pacifico-regular cursor-pointer"
            >
              Tastify
            </h1>
          </div>
          {params.size > 0 && (
            <div className="hidden text-center  lg:flex lg:flex-row lg:items-center lg:justify-center  lg:px-12">
              <MapPin strokeWidth={1} className="h-8 w-8 mr-2" />
              {address ? (
                <p className="text-rose-500 xl:max-w-xl lg:max-w-lg lg:overflow-hidden lg:whitespace-nowrap lg:overflow-ellipsis">
                  {address}
                </p>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          )}

          <div className="lg:flex lg:flex-row">
            <div className="hidden lg:flex lg:flex-row lg:justify-center lg:items-center">
              <button className=" mr-4 bg-white border border-rose-500 hover:bg-rose-100 rounded-md px-2 py-1 text-rose-600">
                Login
              </button>
              <button className=" bg-rose-500 hover:bg-rose-600 rounded-md  px-2 py-1 text-white">
                Signup
              </button>
            </div>
            <div className="m-1 p-3 hover:bg-rose-100 hover:rounded-full hover:p-3 ">
              <ShoppingCart className="text-rose-500 h-6 w-6" />
            </div>
          </div>
        </header>
        {params.size > 0 && (
          <div className="mx-4 text-center flex flex-row items-center justify-center py-4 h-16 lg:hidden">
            <MapPin strokeWidth={1} className="h-8 w-8 mr-2" />
            {address ? (
              <p className="text-rose-500 font-bold overflow-hidden whitespace-nowrap overflow-ellipsis">
                {address}
              </p>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        )}
        {/* <NavMenuItems /> */}
        {/* <div className=" border-rounded-full flex flex-row ">
          <input
            type="text"
            className="w-full p-2 rounded-md bg-gray-100 mr-1 border-rose-300"
            placeholder="Search For Restaurant..."
          /> */}
        {/* <Search className="absolute right-0 top-2 text-gray-500" /> */}
        {/* <Button variant={"outline"}>Search</Button>
        </div>
      </div> */}
      </section>
    </>

    // <div className="bg-white sticky z-50 top-0 inset-x-0 h-16 ">
    //   <header className="relative bg-white">
    //     <WidthWrapper>
    //       <div className="border-b border-gray-200 ">
    //         <div className="flex h-16 items-center">
    //           <div className="flex lg:ml-0">
    //             <Link href="/">
    //               <h1
    //                 className={cn(
    //                   " text-rose-500 text-4xl",
    //                   pacifico.className
    //                 )}
    //               >
    //                 Tastify
    //               </h1>
    //             </Link>
    //           </div>
    //           <div className=" z-50 lg:ml-8 lg:block lg:self-stretch">
    //             <NavMenuItems />
    //           </div>
    //         </div>
    //       </div>
    //     </WidthWrapper>
    //   </header>
    // </div>
  );
};

export default Navbar;
