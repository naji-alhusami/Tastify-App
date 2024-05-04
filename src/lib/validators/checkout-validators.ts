import { z } from "zod";

export const CheckoutValidator = z.object({
  name: z.string().email(),
  email: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
  address: z
    .string()
    .min(6, { message: "address must be at least 6 characters." }),
});

export type TCheckoutValidator = z.infer<typeof CheckoutValidator>;
