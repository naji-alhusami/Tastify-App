import { z } from "zod";

export const MealValidator = z.object({
  name: z.string().min(4, { message: "name must be at least 4 characters." }),
  category: z
    .string()
    .min(4, { message: "category must be at least 4 characters." }),
  description: z
    .string()
    .min(6, { message: "description must be at least 6 characters." }),
  price: z.number().positive({ message: "Price must be a positive number." }),
  image: z
    .instanceof(FileList, { message: "Image must be a FileList object" })
    .refine((files) => files.length > 0, "Image is required."),
});

export type TMealValidator = z.infer<typeof MealValidator>;
