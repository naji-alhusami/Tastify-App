import { useState } from "react";
import { CircleUserRound, ShoppingCart, MapPin } from "lucide-react";

// import StateContext from "../../store/context/state-context";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/redux/hooks";
import AuthModal from "../Auth/AuthModal";
import Signup from "../Auth/Signup";
import Login from "../Auth/Login";
import ThanksModal from "../Thanks/ThanksModal";
import { logoutUser, setUserLogin } from "../../store/redux/user-slice";
import Checkout from "../BasketAndCheckout/Checkout";
// import Basket from "../Basket/BasketModal";
import BasketAndCheckoutModal from "../BasketAndCheckout/BasketAndCheckoutModal";
import BasketItems from "../BasketAndCheckout/Basket";

const Navbar = () => {
  // Authentication (Signup and Login)
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isLoginForm, setIsLoginForm] = useState<boolean>(false);
  const [isSignupBuyerForm, setIsSignupBuyerForm] = useState<boolean>(false);
  const [isSignupSellerForm, setIsSignupSellerForm] = useState<boolean>(false);
  const [isThanks, setIsThanks] = useState<boolean>(false);
  
  const openSignupModalHandler = () => {
    setIsAuth(true);
    setIsSignupBuyerForm(true);
  };

  const openLoginModalHandler = () => {
    setIsAuth(true);
    setIsLoginForm(true);
    setIsSignupBuyerForm(false);
    setIsSignupSellerForm(false);
    setIsThanks(false);
  };

  const closeAuthModalHandler = () => {
    setIsAuth(false);
    setIsLoginForm(false);
    setIsSignupBuyerForm(false);
    setIsSignupSellerForm(false);
    setIsThanks(false);
  };

  // Basket and Checkout:
  const [isBasketForm, setIsBasketForm] = useState<boolean>(false);
  const [isCheckoutForm, setIsCheckoutForm] = useState<boolean>(false);

  function openBasketModalHandler() {
    setIsBasketForm(true);
  }
  function closeBasketAndCheckoutModalHandler() {
    setIsBasketForm(false);
    setIsCheckoutForm(false);
  }

  const dispatch = useAppDispatch();
  const userLogin = useAppSelector((state) => state.users.userlogin);

  // Check if user state exists in local storage
  const storedUserLogin = localStorage.getItem("userLogin");
  const storedAddress = localStorage.getItem("address");

  if (storedUserLogin) {
    // Parse stored user state and set Redux state
    dispatch(setUserLogin(JSON.parse(storedUserLogin)));
  }

  const navigate = useNavigate();
  const path = useLocation();
  const basketQuantity = useAppSelector((state) =>
    state.basket.items.reduce((val, item) => val + item.quantity, 0)
  );

  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate("/");
    localStorage.removeItem("userLogin");
    localStorage.removeItem("address");
  };

  // const contextValue = useContext(StateContext) as { address: string };
  // const { address } = contextValue;

  const heightClass = path.pathname !== "/" ? "lg:h-16" : "h-16";

  return (
    <>
      {isAuth && (
        <AuthModal
          openAuth={isAuth}
          closeAuth={closeAuthModalHandler}
          isLoginForm={isLoginForm}
          isSignupBuyerForm={isSignupBuyerForm}
          // setIsSignupBuyerForm={setIsSignupBuyerForm}
          isSignupSellerForm={isSignupSellerForm}
        >
          {isSignupBuyerForm || isSignupSellerForm ? (
            <Signup
              isSignupBuyerForm={isSignupBuyerForm}
              isSignupSellerForm={isSignupSellerForm}
              setIsAuth={setIsAuth}
              setIsSignupBuyerForm={setIsSignupBuyerForm}
              setIsLoginForm={setIsLoginForm}
              setIsThanks={setIsThanks}
              setIsSignupSellerForm={setIsSignupSellerForm}
            />
          ) : (
            <Login
              setIsSignupBuyerForm={setIsSignupBuyerForm}
              setIsLoginForm={setIsLoginForm}
              setIsAuth={setIsAuth}
            />
          )}
        </AuthModal>
      )}

      {isBasketForm && (
        <BasketAndCheckoutModal
          isCheckoutForm={isCheckoutForm}
          isBasketForm={isBasketForm}
          closeBasketAndCheckout={closeBasketAndCheckoutModalHandler}
        >
          {isCheckoutForm ? (
            <Checkout
              setIsBasketForm={setIsBasketForm}
              setIsCheckoutForm={setIsCheckoutForm}
            />
          ) : (
            <BasketItems setIsCheckoutForm={setIsCheckoutForm} />
          )}
        </BasketAndCheckoutModal>
      )}

      {isThanks && (
        <ThanksModal
          isThanks={isThanks}
          closeThanksModalHandler={closeAuthModalHandler}
          openLoginModalHandler={openLoginModalHandler}
        />
      )}

      {/* Navbar */}
      <section
        className={`bg-white z-30 top-0 w-full px-2 sticky shadow-lg  md:px-8 ${heightClass}`}
      >
        <header className="h-full flex flex-row items-center justify-between">
          <div
            className="p-3 hover:rounded-full hover:bg-rose-100 cursor-pointer lg:hidden"
            onClick={openLoginModalHandler}
          >
            {!userLogin ? (
              <CircleUserRound className="text-rose-500 h-6 w-6 lg:hidden" />
            ) : (
              <button
                onClick={logoutHandler}
                className=" bg-rose-500 hover:bg-rose-600 rounded-md px-4 py-2 text-white"
              >
                Logout
              </button>
            )}
          </div>
          <div className="ml-0 md:ml-4">
            <h1
              onClick={() => navigate("/")}
              className="font-bold text-3xl text-rose-500 pacifico-regular cursor-pointer"
            >
              Tastify
            </h1>
          </div>
          {path.pathname !== "/" && (
            <div className="hidden text-center  lg:flex lg:flex-row lg:items-center lg:justify-center lg:px-12">
              <MapPin strokeWidth={1} className="h-8 w-8 mr-2" />
              {storedAddress ? (
                <p className="text-rose-500 xl:max-w-xl lg:max-w-lg lg:overflow-hidden lg:whitespace-nowrap lg:overflow-ellipsis">
                  {JSON.parse(storedAddress)}
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
              onClick={openBasketModalHandler}
              className="m-1 p-3 flex flex-row justify-center items-center hover:bg-rose-100 hover:rounded-full hover:p-3  cursor-pointer"
            >
              <ShoppingCart className="text-rose-500 h-6 w-6 mr-2" />(
              {basketQuantity})
            </div>
          </div>
        </header>
        {path.pathname !== "/" && (
          <div className="mx-4 text-center flex flex-row items-center justify-center py-4 h-16 lg:hidden">
            <MapPin strokeWidth={1} className="h-8 w-8 mr-2" />
            {storedAddress ? (
              <p className="text-rose-500 font-bold overflow-hidden whitespace-nowrap overflow-ellipsis">
                {JSON.parse(storedAddress)}
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
