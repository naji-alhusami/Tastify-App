import { z } from "zod";

export const CheckoutValidator = z.object({
  name: z.string().email(),
  email: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
  address: z
    .string()
    .min(6, { message: "address must be at least 6 characters." }),
  state: z.string().min(6, { message: "state must be at least 6 characters." }),
  city: z.string().min(6, { message: "city must be at least 6 characters." }),
  street: z
    .string()
    .min(6, { message: "street must be at least 6 characters." }),
  zip: z
    .number({
      required_error: "Zip is required",
      // invalid_type_error: "Age must be a number",
    })
    .lte(5, { message: "this" }),
  house: z
    .number({
      required_error: "house is required",
      // invalid_type_error: "Age must be a number",
    })
    .lte(5, { message: "this" }),
});

export type TCheckoutValidator = z.infer<typeof CheckoutValidator>;
