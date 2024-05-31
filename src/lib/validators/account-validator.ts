import { z } from "zod";

// Schema for sellers
export const SellerAuthValidator = z.object({
  restaurant: z.string().optional(),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

// Schema for buyers
export const BuyerAuthValidator = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

// Combined schema using union
export const AuthValidator = z.union([SellerAuthValidator, BuyerAuthValidator]);

export type TAuthValidator = z.infer<typeof AuthValidator>;
