// import React from "react";

import { useForm } from "react-hook-form";
import { Input } from "../ui/Input";
import {
  CheckoutValidator,
  TCheckoutValidator,
} from "../../lib/validators/checkout-validators";
import { zodResolver } from "@hookform/resolvers/zod";
// import { Loader2 } from "lucide-react";

// interface CheckoutProps {
//   openCheckout: (open: boolean) => void;
//   closeCheckout: (open: boolean) => void;
// }

const Checkout = () => {
  const {
    register,
    // handleSubmit,
    formState: { errors },
  } = useForm<TCheckoutValidator>({
    resolver: zodResolver(CheckoutValidator),
  });

  return (
    <form
    //   onSubmit={handleSubmit((data) => onSubmit({ id: uuidv4(), ...data }))}
    >
      <div className="grid gap-2">
        <div className="grid gap-1 py-2">
          <label htmlFor="email">Email</label>
          <Input
            {...register("email")}
            className={`focus-visible:ring-red-500 ${errors.email}
      `}
            placeholder="you@example.com"
          />
          {errors?.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
          {/* {error && <p className="text-sm text-red-500">{error}</p>} */}
        </div>

        <div className="grid gap-1 py-2 pb-8">
          <label htmlFor="password">Password</label>
          <Input
            {...register("name")}
            type="password"
            className={`
          focus-visible:ring-red-500 ${errors.name}
       `}
            placeholder="Password"
          />
          {errors?.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="flex flex-row items-center justify-center mb-2 px-4 py-2 w-full text-white rounded-md bg-rose-500 hover:bg-rose-600"
          >
            {/* {loading ? (
              <Loader2 className="mr-2 h-6 w-4 text-center animate-spin" />
            ) : ( */}
            Signup
          </button>
          <div className="relative py-4">
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
          </div>
          {/* <button
            className=" w-full bg-white border border-rose-500 hover:bg-rose-100 rounded-md px-4 py-2 text-rose-600"
            onClick={loginFormHandler}
          >
            Log in
          </button> */}
        </div>
      </div>
    </form>
  );
};

export default Checkout;
