import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  MealValidator,
  type TMealValidator,
} from "../../lib/validators/meal-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { type Meal } from "../../lib/types/types";
import FormField from "../ui/FormField";
import useMealManager from "../../utils/custom-hooks/useMealManager";
import { FetchError } from "../../lib/http/error";
import StateContext from "../../store/context/state-context";
import LoadingSpinner from "../ui/LoadingSpinner";

interface MealFormProps {
  isAddMealForm: boolean;
  isUpdateMealForm: boolean;
}

const MealForm = ({ isAddMealForm, isUpdateMealForm }: MealFormProps) => {
  const contextValue = useContext(StateContext) as {
    isRestaurant: string;
    isMealId: string;
  };
  const { isRestaurant, isMealId } = contextValue;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TMealValidator>({
    resolver: zodResolver(MealValidator),
  });

  const {
    mealData,
    mealDataPending,
    mealDataIsError,
    mealDataError,
    addMealMutation,
    addMealIsPending,
    addMealIsError,
    addMealError,
    updateMealMutation,
    updateMealIsPending,
    updateMealIsError,
    updateMealError,
  } = useMealManager();

  const onSubmit: SubmitHandler<
    TMealValidator & { restaurant: string }
  > = async (data: Meal) => {
    if (isUpdateMealForm) {
      updateMealMutation({ ...data, id: isMealId });
    } else if (isAddMealForm) {
      addMealMutation(data);
    }
  };

  if (mealDataPending && isUpdateMealForm) {
    return <LoadingSpinner />;
  } else if (mealDataIsError && isUpdateMealForm) {
    if (mealDataError instanceof FetchError) {
      return (
        <div className="text-center text-xl h-[350px] text-rose-500">
          <h1>
            {mealDataError.message} - {mealDataError.info}
          </h1>
        </div>
      );
    }
  }

  return (
    <div>
      <div
        className="w-full h-full bg-cover"
      >
        <div className="w-full p-4">
          <form
            onSubmit={handleSubmit((data) =>
              onSubmit({
                restaurant: isRestaurant,
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
                      isUpdateMealForm && mealData ? mealData[0].name : ""
                    }
                    hasErrors={errors?.name ? true : false}
                    errorsMessage={errors.name?.message || ""}
                  />
                </div>
                <div className="grid gap-1 py-2 w-full md:mr-6">
                  <label htmlFor="password">Category</label>
                  <select
                    {...register("category")}
                    className={` focus-visible:ring-red-500 h-8 ${errors.category}`}
                    defaultValue={
                      isUpdateMealForm && mealData ? mealData[0].category : ""
                    }
                  >
                    <option value="">Select a category</option>
                    <option value="BURGERS">BURGERS</option>
                    <option value="DESERTS">DESERTS</option>
                  </select>
                </div>
                <div className="grid gap-1 py-2 w-full">
                  <FormField
                    {...register("price", { valueAsNumber: true })}
                    htmlFor="price"
                    labelValue="Price"
                    inputType="number"
                    placeholder="12.99$"
                    className={`focus-visible:ring-red-500 ${errors.price}`}
                    defaultValue={
                      isUpdateMealForm && mealData ? mealData[0].price : ""
                    }
                    hasErrors={errors?.price ? true : false}
                    errorsMessage={errors.price?.message || ""}
                  />
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
                    isUpdateMealForm && mealData ? mealData[0].description : ""
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
                  <p className="text-sm text-red-500">{errors.image.message}</p>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="flex flex-row items-center justify-center mb-2 px-4 py-2 w-full text-white rounded-md bg-rose-500 hover:bg-rose-600"
                >
                  {isUpdateMealForm ? (
                    updateMealIsPending ? (
                      <Loader2 className="mr-2 h-6 w-4 text-center animate-spin" />
                    ) : (
                      "Update Meal"
                    )
                  ) : addMealIsPending ? (
                    <Loader2 className="mr-2 h-6 w-4 text-center animate-spin" />
                  ) : (
                    "Add Meal"
                  )}
                </button>
                {addMealIsError && (
                  <p>
                    {addMealError instanceof FetchError
                      ? addMealError.message
                      : "error"}
                  </p>
                )}
                {updateMealIsError && (
                  <p>
                    {updateMealError instanceof FetchError
                      ? updateMealError.message
                      : "error"}
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MealForm;
