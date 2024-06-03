import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import {
  AuthValidator,
  type TAuthValidator,
} from "../../lib/validators/account-validator";
import { loginUser, setUserLogin } from "../../store/redux/user-slice";
import { useAppDispatch, useAppSelector } from "../../store/redux/hooks";
import FormField from "../ui/FormField";
import Button from "../ui/Button";

interface LoginProps {
  setIsSignupBuyerForm: (open: boolean) => void;
  setIsLoginForm: (open: boolean) => void;
  setIsAuth: (open: boolean) => void;
}

const Login = ({
  setIsSignupBuyerForm,
  setIsLoginForm,
  setIsAuth,
}: LoginProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthValidator>({
    resolver: zodResolver(AuthValidator),
  });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.users);

  const SignupFormHandler = () => {
    setIsSignupBuyerForm(true);
    setIsLoginForm(false);
  };

  const onSubmit: SubmitHandler<TAuthValidator> = async (data) => {
    const { email, password } = data;

    try {
      const response = await dispatch(loginUser({ email, password })).unwrap();

      if (response.userlogin) {
        dispatch(setUserLogin(true));
        localStorage.setItem("userLogin", JSON.stringify(response.userlogin));

        setIsLoginForm(false);
        setIsAuth(false);

        if (response.role === "seller") {
          navigate(`/dashboard/${response.restaurant}`);
        } else {
          navigate("/cuisines");
        }
      }
    } catch (error) {
      if (error && typeof error === "string") {
        if (error.includes("invalid-credential")) {
          setError("Check your email or password");
        } else {
          setError(error);
        }
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          {/* Email */}
          <div className="grid gap-1 py-2">
            <FormField
              {...register("email")}
              htmlFor="email"
              labelValue="Email"
              inputType="email"
              placeholder="Your Email"
              className={`focus-visible:ring-red-500 ${errors.email}`}
              hasErrors={errors?.email ? true : false}
              errorsMessage={errors.email?.message || ""}
            />
          </div>

          {/* Password */}
          <div className="grid gap-1 py-2">
            <FormField
              {...register("password")}
              htmlFor="password"
              labelValue="Password"
              inputType="password"
              placeholder="Your Password"
              className={`focus-visible:ring-red-500 ${errors.password}`}
              hasErrors={errors?.password ? true : false}
              errorsMessage={errors.password?.message || ""}
            />
          </div>

          {/* Errors From Firebase */}
          {error && (
            <p className="text-md text-red-500 text-center font-bold">
              {error}
            </p>
          )}

          <div className="flex flex-row justify-center items-center">
            <Button
              type="submit"
              className=" text-white bg-rose-500 hover:bg-rose-600"
            >
              {loading ? (
                <Loader2 className="mr-2 h-6 w-4 text-center animate-spin" />
              ) : (
                "Log in"
              )}
            </Button>
            <div className="relative py-4">
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center"
              >
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase text-center">
                <span className="bg-white px-6 text-muted-foreground">
                  Not A Member?
                </span>
              </div>
            </div>
            <Button
              type="button"
              onClick={SignupFormHandler}
              className="bg-white border border-rose-500 hover:bg-rose-100 text-rose-600"
            >
              Sign up
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
