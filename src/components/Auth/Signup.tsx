import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { Loader2 } from "lucide-react";

import {
  BuyerAuthValidator,
  SellerAuthValidator,
  type TAuthValidator,
} from "../../lib/validators/account-validator";
import { User, signupUser } from "../../store/redux/user-slice";
import { useAppDispatch, useAppSelector } from "../../store/redux/hooks";
import FormField from "../ui/FormField";
import Button from "../ui/Button";

interface SignupProps {
  setIsThanks: (open: boolean) => void;
  setIsAuth: (open: boolean) => void;
  setIsSignupBuyerForm: (open: boolean) => void;
  setIsLoginForm: (open: boolean) => void;
  setIsSignupSellerForm: (open: boolean) => void;
  isSignupBuyerForm: boolean;
  isSignupSellerForm: boolean;
}

const Signup = ({
  setIsThanks,
  setIsAuth,
  setIsSignupBuyerForm,
  isSignupBuyerForm,
  isSignupSellerForm,
  setIsSignupSellerForm,
  setIsLoginForm,
}: SignupProps) => {
  const [error, setError] = useState<string>("");

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.users);

  const currentValidator = isSignupSellerForm
    ? SellerAuthValidator
    : BuyerAuthValidator;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthValidator>({
    resolver: zodResolver(currentValidator),
  });

  const loginFormHandler = () => {
    setIsLoginForm(true);
    setIsSignupBuyerForm(false);
    setIsSignupSellerForm(false);
  };

  function SignupSellerHandler() {
    setIsLoginForm(false);
    setIsSignupSellerForm(true);
    setIsSignupBuyerForm(false);
  }

  function SignupBuyerHandler() {
    setIsSignupBuyerForm(true);
    setIsSignupSellerForm(false);
  }

  const onSubmit: SubmitHandler<
    TAuthValidator & { id: string; role: string }
  > = async (data: User, event) => {
    event?.preventDefault();

    if (!data.password) {
      setError("Password is required.");
      return;
    }

    try {
      await dispatch(
        signupUser({
          email: data.email,
          password: data.password,
          role: isSignupSellerForm ? "seller" : "buyer",
          restaurant: data.restaurant,
        })
      ).unwrap();
      setIsAuth(false);
      setIsThanks(true);
    } catch (error) {
      if (error && typeof error === "string") {
        if (error.includes("email-already-in-use")) {
          setError(
            "Email is already in use. Please use a different email address."
          );
        }
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit((data) =>
        onSubmit({
          id: uuidv4(),
          role: isSignupSellerForm ? "seller" : "buyer",
          ...data,
        })
      )}
    >
      <div className="grid gap-2">
        <div className="flex flex-row justify-between items-center">
          {/* Email */}
          <div className="grid gap-1 py-2 mr-2">
            <FormField
              {...register("email")}
              htmlFor="email"
              labelValue="Email"
              inputType="email"
              placeholder="Your Email"
              className={`focus-visible:ring-red-500 ${errors.email}`}
              hasErrors={errors?.email ? true : false}
              errorsMessage={errors.email?.message || ""}
            />
          </div>

          {/* Password */}
          <div className="grid gap-1 py-2">
            <FormField
              {...register("password")}
              htmlFor="password"
              labelValue="Password"
              inputType="password"
              placeholder="Your Password"
              className={`focus-visible:ring-red-500 ${errors.password}`}
              hasErrors={errors?.password ? true : false}
              errorsMessage={errors.password?.message || ""}
            />
          </div>
        </div>

        {/* Restaurant Name */}
        {isSignupSellerForm && (
          <div className="grid gap-1 py-2">
            <FormField
              {...register("restaurant")}
              htmlFor="restaurant"
              labelValue="Restaurant Name"
              inputType="text"
              placeholder="Restaurant Name"
              className={`focus-visible:ring-red-500 ${
                "restaurant" in errors && errors.restaurant
                  ? "border-red-500"
                  : ""
              }`}
              hasErrors={
                "restaurant" in errors && errors?.restaurant ? true : false
              }
              errorsMessage={
                ("restaurant" in errors && errors.restaurant?.message) || ""
              }
            />
          </div>
        )}

        {/* Errors From Firebase */}
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex flex-row justify-center items-center">
          <Button
            type="submit"
            className="w-full text-white bg-rose-500 hover:bg-rose-600"
          >
            {loading ? (
              <Loader2 className="mr-2 h-6 w-4 text-center animate-spin" />
            ) : (
              "Signup"
            )}
          </Button>
          <div className="relative py-4">
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center"
            >
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-6 text-muted-foreground text-center">
                Already Member?
              </span>
            </div>
          </div>
          <Button
            type="button"
            className="w-full bg-white border border-rose-500 hover:bg-rose-100 text-rose-600"
            onClick={loginFormHandler}
          >
            Log in
          </Button>
        </div>

        <div className="relative py-4">
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center"
          >
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">or</span>
          </div>
        </div>
        {isSignupBuyerForm ? (
          <div className="w-full">
            <Button
              type="button"
              onClick={SignupSellerHandler}
              className="w-full bg-gray-300 hover:bg-gray-500 rounded-md px-4 py-2"
            >
              Signup as Seller
            </Button>
          </div>
        ) : (
          isSignupSellerForm && (
            <div className="w-full">
              <Button
                type="button"
                onClick={SignupBuyerHandler}
                className="w-full bg-gray-300 hover:bg-gray-500 rounded-md px-4 py-2"
              >
                Signup as Buyer
              </Button>
            </div>
          )
        )}
      </div>
    </form>
  );
};

export default Signup;
