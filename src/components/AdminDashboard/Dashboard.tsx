import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/Input";
import DashboardImage from "/Images/dashboard.png";
// import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MealValidator,
  TMealValidator,
} from "../../lib/validators/meal-validator";
// import { Loader2 } from "lucide-react";
// import { useAppSelector } from "../../store/redux/hooks";
import { useMutation } from "@tanstack/react-query";
import { AddNewMeal } from "../../lib/http";
import { v4 as uuidv4 } from "uuid";
import { Loader2 } from "lucide-react";
// import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const Dashboard = () => {
  // const { loading } = useAppSelector((state) => state.users);
  // const [selectedImage, setSelectedImage] = useState<File | null>(null);
  // const [error, setError] = useState<string>("");

  const { mutate, isPending, isError, error } = useMutation({
    // mutationKey: ["meals"],
    mutationFn: AddNewMeal,
    //   // onSuccess: () => {
    //   //   setIsCheckoutForm(false);
    //   //   setIsBasketForm(false);
    //   //   navigate("/");
    //   //   dispatch(clearBasket());
    //   // },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TMealValidator>({
    resolver: zodResolver(MealValidator),
  });

  const onSubmit: SubmitHandler<TMealValidator & { id: string }> = async (
    data: TMealValidator
  ) => {
    // const { id, ...formDataWithoutId } = data;
    console.log(data);
    console.log(data.image[0]);
    mutate(data);
  };

  // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     setSelectedImage(event.target.files[0]);
  //   }
  // };

  // const uploadImage = async (file: File): Promise<string> => {
  //   const storage = getStorage();
  //   const storageRef = ref(storage, `images/${file.name}-${uuidv4()}`);
  //   await uploadBytes(storageRef, file);
  //   const downloadURL = await getDownloadURL(storageRef);
  //   return downloadURL;
  // };

  return (
    <div className="relative">
      <div className="text-center my-12">
        <h1 className="text-4xl pacifico-regular">Add New Meal</h1>
      </div>
      <div
        className="w-full h-full bg-cover"
        style={{ backgroundImage: `url(${DashboardImage})` }}
      >
        <div className=" w-full bg-slate-200 bg-opacity-80 p-14 pb-6">
          <form
            // onSubmit={handleSubmit(onSubmit)}
            onSubmit={handleSubmit((data) =>
              onSubmit({ id: uuidv4(), ...data })
            )}
          >
            <div className="grid gap-2 w-full">
              <div className="flex flex-col md:flex-row md:justify-between md:w-full">
                <div className="grid gap-1 py-2 w-full md:mr-6">
                  <label htmlFor="name">Name</label>
                  <Input
                    {...register("name")}
                    className={`focus-visible:ring-red-500 ${errors.name}`}
                    placeholder="Cheese Burger"
                  />
                  {errors?.name && (
                    <p className="text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                  {/* {error && <p className="text-sm text-red-500">{error}</p>} */}
                </div>

                <div className="grid gap-1 py-2 w-full md:mr-6">
                  <label htmlFor="password">Category</label>
                  <select
                    {...register("category")}
                    className={`
              focus-visible:ring-red-500 h-8 ${errors.category}
           `}
                    // placeholder="Category"
                  >
                    <option value="">Select a category</option>
                    <option value="BURGERS">BURGERS</option>
                    <option value="DESERTS">DESERTS</option>
                  </select>
                  {/* {errors?.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )} */}
                </div>
                <div className="grid gap-1 py-2 w-full">
                  <label htmlFor="name">Price</label>
                  <Input
                    {...register("price")}
                    className={`focus-visible:ring-red-500 ${errors.price}`}
                    placeholder="Price"
                    type="number"
                  />
                  {errors?.price && (
                    <p className="text-sm text-red-500">
                      {errors.price.message}
                    </p>
                  )}
                  {/* {error && <p className="text-sm text-red-500">{error}</p>} */}
                </div>
              </div>
              <div className="grid gap-1 py-2">
                <label htmlFor="description">Description</label>
                <textarea
                  {...register("description")}
                  rows={3}
                  className={`focus-visible:ring-red-500 rounded-md ${
                    errors.description ? "border-red-500" : ""
                  }`}
                  placeholder="Write your description here"
                />
                {errors?.description && (
                  <p className="text-sm text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="grid gap-1 py-2 w-full  pb-8">
                <label htmlFor="name">Upload Image</label>
                <input
                  {...register("image")}
                  className={`focus-visible:ring-red-500 ${errors.image}`}
                  placeholder="Upload Meal Image"
                  type="file"
                  accept="image/*"
                />
                {/* {errors?.image && (
                  <p className="text-sm text-red-500">{errors.image.message}</p>
                )} */}
                {/* {error && <p className="text-sm text-red-500">{error}</p>} */}
              </div>
              <div>
                <button
                  type="submit"
                  className="flex flex-row items-center justify-center mb-2 px-4 py-2 w-full text-white rounded-md bg-rose-500 hover:bg-rose-600"
                >
                  {isPending ? (
                    <Loader2 className="mr-2 h-6 w-4 text-center animate-spin" />
                  ) : (
                    " Add Meal"
                  )}
                </button>
                {isError && <p>{error.message || "error"}</p>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
