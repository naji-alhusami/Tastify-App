import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/Input";
import DashboardImage from "/Images/dashboard.png";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MealValidator,
  TMealValidator,
} from "../../lib/validators/meal-validator";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../lib/http";
import { AddNewMeal } from "../../lib/http/AddNewMeal";
// import { v4 as uuidv4 } from "uuid";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Meal } from "../Cuisines/MealsPage";

const Dashboard = () => {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    // mutationKey: ["meals"],
    mutationFn: AddNewMeal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meals"], exact: true });
      navigate("/cuisines");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TMealValidator>({
    resolver: zodResolver(MealValidator),
  });

  const onSubmit: SubmitHandler<TMealValidator> = async (data: Meal) => {
    console.log(data);
    mutate(data);
  };

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
            onSubmit={handleSubmit(onSubmit)}
            // onSubmit={handleSubmit((data) =>
            //   onSubmit({ id: uuidv4(), ...data })
            // )}
            // onSubmit={handleSubmit((data) => onSubmit(data))}
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
                </div>
                <div className="grid gap-1 py-2 w-full md:mr-6">
                  <label htmlFor="password">Category</label>
                  <select
                    {...register("category")}
                    className={`
              focus-visible:ring-red-500 h-8 ${errors.category}
           `}
                  >
                    <option value="">Select a category</option>
                    <option value="BURGERS">BURGERS</option>
                    <option value="DESERTS">DESERTS</option>
                  </select>
                </div>
                <div className="grid gap-1 py-2 w-full">
                  <label htmlFor="name">Price</label>
                  <Input
                    {...register("price", { valueAsNumber: true })}
                    className={`focus-visible:ring-red-500 ${errors.price}`}
                    placeholder="Price"
                    type="number"
                    step="0.01"
                  />
                  {errors?.price && (
                    <p className="text-sm text-red-500">
                      {errors.price.message}
                    </p>
                  )}
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
                {errors?.image && (
                  <p className="text-sm text-red-500">{errors.image.message}</p>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="flex flex-row items-center justify-center mb-2 px-4 py-2 w-full text-white rounded-md bg-rose-500 hover:bg-rose-600"
                >
                  {isPending ? (
                    <Loader2 className="mr-2 h-6 w-4 text-center animate-spin" />
                  ) : (
                    "Add Meal"
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
