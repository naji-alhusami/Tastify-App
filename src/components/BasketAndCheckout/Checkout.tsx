import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import {
  CheckoutValidator,
  type TCheckoutValidator,
} from "../../lib/validators/checkout-validators";
import { useAppDispatch, useAppSelector } from "../../store/redux/hooks";
import { extractAddressDetails } from "../../lib/get-address";
import { sendOrders } from "../../lib/http/SendOrderHttp";
import { clearBasket } from "../../store/redux/basket-slice";
import { type Order } from "../../lib/types/types";
import FormField from "../ui/FormField";
import Button from "../ui/Button";
// import useLocateAddress from "../../utils/custom-hooks/useLocateAddress";

interface CheckoutProps {
  setIsCheckoutForm: (open: boolean) => void;
  setIsBasketForm: (open: boolean) => void;
  setIsThanksOrder: (open: boolean) => void;
  setIsThanks: (open: boolean) => void;
  address: string | null;
}

const Checkout = ({
  setIsCheckoutForm,
  setIsBasketForm,
  setIsThanksOrder,
  setIsThanks,
  address,
}: CheckoutProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCheckoutValidator>({
    resolver: zodResolver(CheckoutValidator),
  });

  console.log("address:", address);
  const { street, city, state, zipCode } = extractAddressDetails(address)!;

  const dispatch = useAppDispatch();
  const basketItems = useAppSelector((state) => state.basket.items);

  const totalPrice = basketItems.reduce(
    (val, item) => val + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = totalPrice.toFixed(2);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: sendOrders,
    onSuccess: () => {
      setIsCheckoutForm(false);
      setIsBasketForm(false);
      setIsThanksOrder(true);
      setIsThanks(true);
      dispatch(clearBasket());
    },
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
              <FormField
                {...register("name")}
                htmlFor="name"
                labelValue="Name"
                inputType="text"
                placeholder="Your Name"
                className={`focus-visible:ring-red-500 ${errors.name}`}
                hasErrors={errors?.name ? true : false}
                errorsMessage={errors.name?.message || ""}
              />
            </div>
            <div className="w-full grid gap-1 py-2">
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
          </div>
          <div className="flex flex-row items-center justify-start">
            <div className="flex flex-col items-start justify-center pr-2">
              <FormField
                {...register("state")}
                htmlFor="state"
                labelValue="State"
                inputType="text"
                placeholder="Your State"
                defaultValue={state}
                className={`focus-visible:ring-red-500 ${errors.state}`}
                hasErrors={errors?.state ? true : false}
                errorsMessage={errors.state?.message || ""}
              />
            </div>
            <div className="flex flex-col items-start justify-center pr-2">
              <FormField
                {...register("city")}
                htmlFor="city"
                labelValue="City"
                inputType="text"
                placeholder="Your City"
                defaultValue={city}
                className={`focus-visible:ring-red-500 ${errors.city}`}
                hasErrors={errors?.city ? true : false}
                errorsMessage={errors.city?.message || ""}
              />
            </div>
            <div className="flex flex-col items-start justify-center pr-2">
              <FormField
                {...register("zip")}
                htmlFor="zip"
                labelValue="Zip"
                inputType="text"
                placeholder="Your Zip"
                defaultValue={zipCode}
                className={`focus-visible:ring-red-500 ${errors.zip}`}
                hasErrors={errors?.zip ? true : false}
                errorsMessage={errors.zip?.message || ""}
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-start py-2">
            <div className="flex flex-col items-start justify-center pr-2">
              <FormField
                {...register("street")}
                htmlFor="street"
                labelValue="Street"
                inputType="text"
                placeholder="Your Street Name"
                defaultValue={street}
                className={`focus-visible:ring-red-500 ${errors.street}`}
                hasErrors={errors?.street ? true : false}
                errorsMessage={errors.street?.message || ""}
              />
            </div>

            <div className="flex flex-col items-start justify-center">
              <FormField
                {...register("house")}
                htmlFor="house"
                labelValue="House Number"
                inputType="number"
                placeholder="Your House Number"
                className={`focus-visible:ring-red-500 ${errors.house}`}
                hasErrors={errors?.house ? true : false}
                errorsMessage={errors.house?.message || ""}
              />
            </div>
          </div>
        </div>
        {isError && (
          <div>
            <h1 className="text-rose-500">
              Error occurred:
              {error?.message}
            </h1>
          </div>
        )}
        <div className="pb-4 text-center flex flex-row justify-between items-center">
          <div className="text-2xl flex flex-row justify-center items-center">
            Total:
            <p className="text-rose-500 font-bold pl-2">
              {formattedTotalPrice}$
            </p>
          </div>
          <div className="flex flex-row justify-center items-center">
            <Button
              type="submit"
              className="flex flex-row items-center justify-center px-4 py-2  text-white rounded-md bg-rose-500 hover:bg-rose-600"
            >
              {isPending ? (
                <Loader2 className="mr-2 h-6 w-4 text-center animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Checkout;
