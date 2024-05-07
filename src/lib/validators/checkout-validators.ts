import { z } from "zod";

export const CheckoutValidator = z.object({
  email: z.string().email(),
  name: z.string().min(6, { message: "name must be at least 6 characters." }),
  // address: z
  //   .string()
  //   .min(6, { message: "address must be at least 6 characters." }),
  state: z.string().min(4, { message: "state must be at least 6 characters." }),
  city: z.string().min(4, { message: "city must be at least 6 characters." }),
  zip: z.string().max(5, { message: "zip must be at max 6 numbers." }),
  street: z
    .string()
    .min(6, { message: "street must be at least 6 characters." }),
  house: z.string().min(1, { message: "house must be at max 6 numbers." }),
});

export type TCheckoutValidator = z.infer<typeof CheckoutValidator>;
