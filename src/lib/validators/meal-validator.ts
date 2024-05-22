import { z } from "zod";

// const ImageSchema = z
//   .string()
//   .refine((value) => value.startsWith("data:image/"), {
//     message: "Image must be of type data:image",
//   });

export const MealValidator = z.object({
  name: z.string().min(6, { message: "name must be at least 6 characters." }),
  category: z
    .string()
    .min(4, { message: "category must be at least 6 characters." }),
  description: z
    .string()
    .min(6, { message: "description must be at least 6 characters." }),
  price: z.string().min(3, { message: "price must be at least 3 numbers." }),
  // price: z.number(),
  // image: z.object({
  //   file: z.string().min(1, { message: "Please upload an image." }),
  // }),
  image: z.string().min(3, { message: "price must be at least 3 numbers." }),
});

export type TMealValidator = z.infer<typeof MealValidator>;

// export type Meal = {
//   id: string;
//   category: string;
//   name: string;
//   price: string;
//   image: TMealValidator["image"]; // Use the validated image type
//   description: string;
// };
