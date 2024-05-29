import { z } from "zod";

export const AuthValidator = z.object({
  restaurant: z.string().min(6, { message: "Password must be at least 6 characters." }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export type TAuthValidator = z.infer<typeof AuthValidator>;
