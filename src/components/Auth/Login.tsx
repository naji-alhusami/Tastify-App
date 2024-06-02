// import { Label } from "../ui/label";
import { Input } from "../ui/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AuthValidator,
  type TAuthValidator,
} from "../../lib/validators/account-validator";
import { loginUser, setUserLogin } from "../../store/redux/user-slice";
import { useAppDispatch, useAppSelector } from "../../store/redux/hooks";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
    // console.log(data);

    try {
      const response = await dispatch(loginUser({ email, password })).unwrap();
      // console.log("response:", response);

      if (response.userlogin) {
        dispatch(setUserLogin(true));
        localStorage.setItem("userLogin", JSON.stringify(response.userlogin));
        setIsLoginForm(false);
        setIsAuth(false);
        if (response.role === "admin") {
          navigate("/admin");
        } else if (response.role === "seller") {
          navigate(`/dashboard/${response.restaurant}`);
        } else {
          navigate("/cuisines");
        }
      }
    } catch (error) {
      // console.log(error);
      if (error && typeof error === "string") {
        if (error.includes("invalid-credential")) {
          setError("Check your email or password");
        } else {
          setError(error);
        }
      }
      // if (error && typeof error === "string") {
      //   if (error.includes("email-already-in-use")) {
      //     setError(
      //       "Email is already in use. Please use a different email address."
      //     );
      //   }
      // }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1 py-2">
            <label htmlFor="email">Email</label>
            <Input
              {...register("email")}
              className={`focus-visible:ring-red-500${errors.email}`}
              placeholder="Restaurant"
            />
            {errors?.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="grid gap-1 py-2">
            <label htmlFor="password">Password</label>
            <Input
              {...register("password")}
              type="password"
              className={`
                "focus-visible:ring-red-500" ${errors.password},
                `}
              placeholder="Password"
            />
            {errors?.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          {error && (
            <p className="text-md text-red-500 text-center font-bold">
              {error}
            </p>
          )}
          <div className="flex flex-row justify-center items-center">
            <button
              type="submit"
              className="flex flex-row items-center justify-center px-4 py-2 w-full text-white rounded-md bg-rose-500 hover:bg-rose-600"
            >
              {loading ? (
                <Loader2 className="mr-2 h-6 w-4 text-center animate-spin" />
              ) : (
                "Log in"
              )}
            </button>
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
            <button
              className="w-full bg-white border border-rose-500 hover:bg-rose-100 rounded-md px-4 py-2 text-rose-600"
              onClick={SignupFormHandler}
            >
              Sign up
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
