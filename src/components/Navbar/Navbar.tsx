import { useContext, useState } from "react";
import { CircleUserRound, ShoppingCart, MapPin } from "lucide-react";

import StateContext from "../../store/context/state-context";
import { useNavigate, useSearchParams } from "react-router-dom";
import Basket from "../Basket/Basket";
import { useAppDispatch, useAppSelector } from "../../store/redux/hooks";
import AuthModal from "../ui/AuthModal";
import Signup from "../Auth/Signup";
import Login from "../Auth/Login";
import ThanksModal from "../ui/ThanksModal";
import { logoutUser } from "../../store/redux/user-slice";

const Navbar = () => {
  const [authIsVisible, setAuthIsVisible] = useState<boolean>(false);
  const [thanksModal, setThanksModal] = useState<boolean>(false);
  const [isSignupForm, setIsSignupForm] = useState<boolean>(false);
  const [basketIsVisible, setBasketIsVisible] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const userLogin = useAppSelector((state) => state.users.userlogin);

  console.log(userLogin);

  const contextValue = useContext(StateContext);
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const basketQuantity = useAppSelector((state) =>
    state.basket.items.reduce((val, item) => val + item.quantity, 0)
  );

  function handleOpenBasketClick() {
    setBasketIsVisible(true);
  }

  function handleCloseBasketClick() {
    setBasketIsVisible(false);
  }

  const openSignupModalHandler = () => {
    setIsSignupForm(true);
    setAuthIsVisible(true);
  };

  const openLoginModalHandler = () => {
    setIsSignupForm(false);
    setAuthIsVisible(true);
    setThanksModal(false);
  };

  const closeModalHandler = () => {
    setAuthIsVisible(false);
    setThanksModal(false);
  };

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  if (!contextValue) {
    // We should handle the case when contextValue is null
    return null; // or any other fallback logic
  }

  const { address } = contextValue;
  const heightClass = params.size > 0 ? " lg:h-16" : "h-16";

  return (
    <>
      {authIsVisible && (
        <AuthModal
          onClose={closeModalHandler}
          isSignupForm={isSignupForm}
          openAuth={authIsVisible}
        >
          {isSignupForm ? (
            <Signup
              setThanksModal={setThanksModal}
              setIsAuthModal={setAuthIsVisible}
              setIsSignupForm={setIsSignupForm}
            />
          ) : (
            <Login
              setIsSignupForm={setIsSignupForm}
              setIsAuthModal={setAuthIsVisible}
            />
          )}
        </AuthModal>
      )}

      {thanksModal && (
        <ThanksModal
          openAuth={authIsVisible}
          closeModalHandler={closeModalHandler}
          openLoginModalHandler={openLoginModalHandler}
        />
      )}

      {basketIsVisible && (
        <Basket openBasket={basketIsVisible} onClose={handleCloseBasketClick} />
      )}

      {/* Navbar */}
      <section
        className={`bg-white z-50 top-0 w-full sticky shadow-lg px-2 md:px-8 ${heightClass}`}
      >
        <header className="h-full flex flex-row items-center justify-between">
          <div
            className="p-3 hover:rounded-full hover:bg-rose-100 cursor-pointer lg:hidden"
            onClick={openLoginModalHandler}
          >
            <CircleUserRound className="text-rose-500 h-6 w-6 lg:hidden" />
          </div>
          <div className="ml-0 md:ml-4">
            <h1
              onClick={() => navigate("/")}
              className="font-bold text-3xl text-rose-500 pacifico-regular cursor-pointer"
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
            {!userLogin ? (
              <div className="hidden lg:flex lg:flex-row lg:justify-center lg:items-center pr-10">
                <button
                  onClick={openLoginModalHandler}
                  className=" mr-4 bg-white border border-rose-500 hover:bg-rose-100 rounded-md px-4 py-2 text-rose-600"
                >
                  Login
                </button>
                <button
                  onClick={openSignupModalHandler}
                  className=" bg-rose-500 hover:bg-rose-600 rounded-md px-4 py-2 text-white"
                >
                  Signup
                </button>
              </div>
            ) : (
              <div className="hidden lg:flex lg:flex-row lg:justify-center lg:items-center pr-6">
                <button
                  onClick={logoutHandler}
                  className=" bg-rose-500 hover:bg-rose-600 rounded-md px-4 py-2 text-white"
                >
                  Logout
                </button>
              </div>
            )}
            <div
              onClick={handleOpenBasketClick}
              className="m-1 p-3 flex flex-row justify-center items-center hover:bg-rose-100 hover:rounded-full hover:p-3  cursor-pointer"
            >
              <ShoppingCart className="text-rose-500 h-6 w-6 mr-2" />(
              {basketQuantity})
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
      </section>
    </>
  );
};

export default Navbar;
