import DashboardImage from "/Images/dashboard.png";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  MealValidator,
  TMealValidator,
} from "../../lib/validators/meal-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AddMealHttp } from "../../lib/http/AddMealHttp";
import { fetchMeals, queryClient } from "../../lib/http";
import { type Meal } from "../../lib/types";
// import { Input } from "../ui/Input";
import { Loader2 } from "lucide-react";
import { UpdateMealHttp } from "../../lib/http/UpdateMealHttp";
import FormField from "../ui/FormField";

const MealForm = () => {
  const navigate = useNavigate();
  const { restaurant } = useParams();
  const params = useParams();
  console.log(params);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TMealValidator>({
    resolver: zodResolver(MealValidator),
  });

  const {
    data: mealData,
    isPending: mealDataPending,
    isError: mealDataIsError,
    error: mealDataError,
  } = useQuery({
    queryKey: ["meals", params.id],
    queryFn: ({ signal }) => fetchMeals({ signal, id: params.id }),
  });
  if (mealDataPending) {
    console.log("Loading...");
  } else if (mealDataIsError) {
    console.log("Error:", mealDataError);
  } else if (mealData && mealData.length > 0) {
    console.log("First meal data:", mealData[0]);
  } else {
    console.log("No meal data available");
  }

  const {
    mutate: AddMeal,
    isPending,
    isError,
    error,
  } = useMutation({
    // mutationKey: ["meals"],
    mutationFn: AddMealHttp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meals"], exact: true });
      //   setIsMealForm(false);
      navigate(`/dashboard/${restaurant}`);
    },
  });

  const {
    mutate: UpdateMealMutate,
    isPending: updateMealPending,
    // isError, error
  } = useMutation({
    mutationKey: ["meals", params.id],
    mutationFn: UpdateMealHttp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meals"], exact: true });
      // setIsNewMealForm(false);
      navigate(`/dashboard/${restaurant}`);
    },
  });

  const onSubmit: SubmitHandler<
    TMealValidator & { restaurant: string }
  > = async (data: Meal) => {
    console.log("mealData before sending data to query:", data);
    // if (restaurant) {
    // const mealData = { params, ...data };
    console.log("mealData inside update data in query:", data);
    if (params.mealform === "update") {
      UpdateMealMutate({ ...data, id: params.id });
    } else {
      AddMeal(data);
      // }
    }
  };

  if (restaurant) {
    return (
      <div>
        <div className="text-center my-12">
          <h1 className="text-4xl pacifico-regular">
            {params.mealform === "update" ? "Update Meal" : "Add New Meal"}
          </h1>
        </div>
        <div
          className="w-full h-full bg-cover"
          style={{ backgroundImage: `url(${DashboardImage})` }}
        >
          <div className=" w-full bg-slate-200 bg-opacity-80 p-14 pb-6">
            <form
              onSubmit={handleSubmit((data) =>
                onSubmit({
                  restaurant: restaurant,
                  ...data,
                })
              )}
            >
              <div className="grid gap-2 w-full">
                <div className="flex flex-col md:flex-row md:justify-between md:w-full">
                  <div className="grid gap-1 py-2 w-full md:mr-6">
                    <FormField
                      {...register("name")}
                      htmlFor="name"
                      labelValue="Meal Name"
                      inputType="text"
                      placeholder="Meal Name"
                      className={`focus-visible:ring-red-500 ${errors.name}`}
                      defaultValue={
                        params.mealform === "update" ? mealData?.name : ""
                      }
                      hasErrors={errors?.name ? true : false}
                      errorsMessage={errors.name?.message || ""}
                    />
                    {/* <label htmlFor="name">Name</label>
                    <Input
                      {...register("name")}
                      className={`focus-visible:ring-red-500 ${errors.name}`}
                      placeholder="Cheese Burger"
                      defaultValue={
                        params.mealform === "update" ? mealData?.name : ""
                      }
                    />
                    {errors?.name && (
                      <p className="text-sm text-red-500">
                        {errors.name.message}
                      </p>
                    )} */}
                  </div>
                  <div className="grid gap-1 py-2 w-full md:mr-6">
                    <label htmlFor="password">Category</label>
                    <select
                      {...register("category")}
                      className={`
              focus-visible:ring-red-500 h-8 ${errors.category}
           `}
                      defaultValue={
                        params.mealform === "update" ? mealData?.category : ""
                      }
                    >
                      <option value="">Select a category</option>
                      <option value="BURGERS">BURGERS</option>
                      <option value="DESERTS">DESERTS</option>
                    </select>
                  </div>
                  <div className="grid gap-1 py-2 w-full">
                    <FormField
                      {...register("price")}
                      htmlFor="price"
                      labelValue="Price"
                      inputType="number"
                      placeholder="12.99$"
                      className={`focus-visible:ring-red-500 ${errors.price}`}
                      defaultValue={
                        params.mealform === "update" ? mealData?.price : ""
                      }
                      hasErrors={errors?.price ? true : false}
                      errorsMessage={errors.price?.message || ""}
                    />
                    {/* <label htmlFor="name">Price</label>
                    <Input
                      {...register("price", { valueAsNumber: true })}
                      className={`focus-visible:ring-red-500 ${errors.price}`}
                      placeholder="Price"
                      type="number"
                      step="0.01"
                      defaultValue={
                        params.mealform === "update" ? mealData?.price : ""
                      }
                    />
                    {errors?.price && (
                      <p className="text-sm text-red-500">
                        {errors.price.message}
                      </p>
                    )} */}
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
                    defaultValue={
                      params.mealform === "update" ? mealData?.description : ""
                    }
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
                    <p className="text-sm text-red-500">
                      {errors.image.message}
                    </p>
                  )}
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex flex-row items-center justify-center mb-2 px-4 py-2 w-full text-white rounded-md bg-rose-500 hover:bg-rose-600"
                  >
                    {params.mealform === "update" ? (
                      updateMealPending ? (
                        <Loader2 className="mr-2 h-6 w-4 text-center animate-spin" />
                      ) : (
                        "Update Meal"
                      )
                    ) : isPending ? (
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
  }
};

export default MealForm;
