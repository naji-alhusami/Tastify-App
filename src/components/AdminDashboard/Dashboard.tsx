import { useForm } from "react-hook-form";
import { Input } from "../ui/Input";
import DashboardImage from "/Images/dashboard.png";
// import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { MealValidator, TMealValidator } from "../../lib/validators/meal-validator";

const Dashboard = () => {
  // const [error, setError] = useState<string>("");

  const {
    register,
    // handleSubmit,
    formState: { errors },
  } = useForm<TMealValidator>({
    resolver: zodResolver(MealValidator),
  });

  return (
    <div className="relative">
      <div>
        <img src={DashboardImage} alt="dashboard-image" />
      </div>
      <div className=" w-[250px] absolute top-12 bg-[#c6c6c6] p-6 rounded-md shadow-xl">
        <form
          // onSubmit={handleSubmit((data) =>
          //   onSubmit({ id: uuidv4(), role: "user", ...data })
          // )}
        >
          <div className="grid gap-2">
            <div className="grid gap-1 py-2">
              <label htmlFor="name">Name</label>
              <Input
                {...register("name")}
                className={`focus-visible:ring-red-500 ${errors.name}
          `}
                placeholder="Cheese Burger"
              />
              {errors?.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
              {/* {error && <p className="text-sm text-red-500">{error}</p>} */}
            </div>

            <div className="grid gap-1 py-2 pb-8">
              <label htmlFor="password">Password</label>
              <Input
                {...register("category")}
                type="password"
                className={`
              focus-visible:ring-red-500 ${errors.category}
           `}
                placeholder="Password"
              />
              {/* {errors?.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )} */}
            </div>
            <div>
              <button
                type="submit"
                className="flex flex-row items-center justify-center mb-2 px-4 py-2 w-full text-white rounded-md bg-rose-500 hover:bg-rose-600"
              >
                {/* {loading ? (
                  <Loader2 className="mr-2 h-6 w-4 text-center animate-spin" />
                ) : ( */}
                  "Signup"
                {/* )} */}
              </button>
              <div className="relative py-4">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center"
                >
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-6 text-muted-foreground">
                    Already A Member?
                  </span>
                </div>
              </div>
              <button
                className=" w-full bg-white border border-rose-500 hover:bg-rose-100 rounded-md px-4 py-2 text-rose-600"
                // onClick={loginFormHandler}
              >
                Log in
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
