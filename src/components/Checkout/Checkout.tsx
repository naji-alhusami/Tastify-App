// import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/Input";
import {
  CheckoutValidator,
  TCheckoutValidator,
} from "../../lib/validators/checkout-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppSelector } from "../../store/redux/hooks";
import { useContext } from "react";
import StateContext from "../../store/context/state-context";
import { etractAddressDetails } from "../../lib/get-address";
import { useMutation } from "@tanstack/react-query";
import { sendOrders } from "../../lib/http";
// import { Loader2 } from "lucide-react";

// interface CheckoutProps {
//   openCheckout: (open: boolean) => void;
//   closeCheckout: (open: boolean) => void;
// }

export type Order = {
  name: string;
  email: string;
  state: string;
  city: string;
  zip: string;
  street: string;
  house: string;
};

const Checkout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCheckoutValidator>({
    resolver: zodResolver(CheckoutValidator),
  });

  const contextValue = useContext(StateContext) as { address: string };

  const { address } = contextValue;

  const { street, city, state, zipCode } = etractAddressDetails(address);
  // console.log(typeof )
  const basketItems = useAppSelector((state) => state.basket.items);

  const totalPrice = basketItems.reduce(
    (val, item) => val + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = totalPrice.toFixed(2);

  const { mutate } = useMutation({
    mutationFn: sendOrders,
  });

  const onSubmit: SubmitHandler<TCheckoutValidator> = async (data: Order) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <div className="grid gap-1 py-2">
          <div className=" flex flex-row justify-center items-center">
            <div className="w-full grid gap-1 py-2 pr-2">
              <label htmlFor="password">Name</label>
              <Input
                {...register("name")}
                // type="password"
                className={`focus-visible:ring-red-500 ${errors.name}`}
                placeholder="Password"
              />
              {errors?.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="w-full grid gap-1 py-2">
              <label htmlFor="email">Email</label>
              <Input
                {...register("email")}
                className={`focus-visible:ring-red-500 ${errors.email}`}
                placeholder="you@example.com"
              />
              {errors?.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>
          <div className="flex flex-row items-center justify-start">
            <div className="flex flex-col items-start justify-center pr-2">
              <label htmlFor="state" className="pb-2">
                State
              </label>
              <Input
                {...register("state")}
                className={`focus-visible:ring-red-500 ${errors.state}`}
                defaultValue={state}
                placeholder="Bavaria"
              />
              {errors?.state && (
                <p className="text-sm text-red-500">{errors.state.message}</p>
              )}
            </div>
            <div className="flex flex-col items-start justify-center pr-2">
              <label htmlFor="city" className="pb-2">
                City
              </label>
              <Input
                {...register("city")}
                className={`focus-visible:ring-red-500 ${errors.city}`}
                defaultValue={city}
                placeholder="Munich"
              />
              {errors?.city && (
                <p className="text-sm text-red-500">{errors.city.message}</p>
              )}
            </div>
            <div className="flex flex-col items-start justify-center pr-2">
              <label htmlFor="zip" className="pb-2">
                Zip
              </label>
              <Input
                {...register("zip")}
                type="number"
                className={`focus-visible:ring-red-500 ${errors.zip}`}
                defaultValue={zipCode}
                placeholder="12345"
              />
              {errors?.zip && (
                <p className="text-sm text-red-500">{errors.zip.message}</p>
              )}
            </div>
          </div>
          <div className="flex flex-row items-center justify-start py-2">
            <div className="flex flex-col items-start justify-center pr-2">
              <label htmlFor="street" className="pb-2">
                Street
              </label>
              <Input
                {...register("street")}
                className={`focus-visible:ring-red-500 ${errors.street}`}
                defaultValue={street}
                placeholder="Fauststraße"
              />
              {errors?.street && (
                <p className="text-sm text-red-500">{errors.street.message}</p>
              )}
            </div>

            <div className="flex flex-col items-start justify-center">
              <label htmlFor="house" className="pb-2">
                House Number
              </label>
              <Input
                {...register("house")}
                type="number"
                className={`focus-visible:ring-red-500 ${errors.house}`}
                placeholder="23"
              />
              {errors?.house && (
                <p className="text-sm text-red-500">{errors.house.message}</p>
              )}
            </div>
          </div>
          {/* {error && <p className="text-sm text-red-500">{error}</p>} */}
        </div>
        <div className="pb-4 text-center flex flex-row justify-between items-center">
          <div className="text-2xl flex flex-row justify-center items-center">
            Total Price:
            <p className="text-rose-500 font-bold pl-2">
              {formattedTotalPrice}$
            </p>
          </div>
          <div className="flex flex-row justify-center items-center">
            <button
              type="submit"
              className="flex flex-row items-center justify-center px-4 py-2  text-white rounded-md bg-rose-500 hover:bg-rose-600"
            >
              {/* {loading ? ( */}
              {/* <Loader2 className="mr-2 h-6 w-4 text-center animate-spin" /> */}
              {/* ) : ( */}
              Submit Order
              {/* )} */}
            </button>
          </div>
        </div>
        {/* <div> */}
        {/* <button
            type="submit"
            className="flex flex-row items-center justify-center mb-2 px-4 py-2 w-full text-white rounded-md bg-rose-500 hover:bg-rose-600"
          > */}
        {/* {loading ? (
              <Loader2 className="mr-2 h-6 w-4 text-center animate-spin" />
            ) : ( */}
        {/* Signup */}
        {/* </button> */}
        {/* <div className="relative py-4">
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center"
            >
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-6 text-muted-foreground">
                Already A Member?
              </span>
            </div>
          </div> */}
        {/* <button
            className=" w-full bg-white border border-rose-500 hover:bg-rose-100 rounded-md px-4 py-2 text-rose-600"
            onClick={loginFormHandler}
          >
            Log in
          </button> */}
        {/* </div> */}
      </div>
    </form>
  );
};

export default Checkout;
