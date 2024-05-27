import { z } from "zod";

// const MAX_FILE_SIZE = 500000;
// const ACCEPTED_IMAGE_TYPES = [
//   "image/jpeg",
//   "image/jpg",
//   "image/png",
//   "image/webp",
// ];

export const MealValidator = z.object({
  id: z.string().optional(),
  // id: z.string().min(1, { message: "name must be at least 6 characters." }),
  name: z.string().min(6, { message: "name must be at least 6 characters." }),
  category: z
    .string()
    .min(4, { message: "category must be at least 6 characters." }),
  description: z
    .string()
    .min(6, { message: "description must be at least 6 characters." }),
  // price: z.union([z.string(), z.number()]),

  // price: z.number().positive({ message: "Price must be a positive number." }),
  price: z.string().min(3, { message: "price must be at least 3 numbers." }),
  image: z.any().refine((files) => files?.length == 1, "Image is required."),
  // .refine(
  //   (files) => files?.[0]?.size <= MAX_FILE_SIZE,
  //   `Max file size is 5MB.`
  // )
  // .refine(
  //   (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  //   ".jpg, .jpeg, .png and .webp files are accepted."
  // ),
});

export type TMealValidator = z.infer<typeof MealValidator>;
