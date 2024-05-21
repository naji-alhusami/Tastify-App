import { z } from "zod";

export const MealValidator = z.object({
  name: z.string().min(6, { message: "name must be at least 6 characters." }),
  category: z.string().min(4, { message: "category must be at least 6 characters." }),
  description: z.string().min(4, { message: "description must be at least 6 characters." }),
  price: z.string().min(4, { message: "price must be at least 6 characters." }),
//   zip: z.string().max(5, { message: "zip must be at max 6 numbers." }),
//   street: z
//     .string()
//     .min(6, { message: "street must be at least 6 characters." }),
//   house: z.string().min(1, { message: "house must be at max 6 numbers." }),
});

export type TMealValidator = z.infer<typeof MealValidator>;
// id: string;
// price: number;
// image: string;