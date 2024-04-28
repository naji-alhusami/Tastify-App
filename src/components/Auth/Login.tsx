// import { Label } from "../ui/label";
import { Input } from "../ui/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AuthValidator,
  type TAuthValidator,
} from "../../lib/validators/account-validator";
import { loginUser } from "../../store/redux/user-slice";
import { useAppDispatch } from "../../store/redux/hooks";
import { useState } from "react";

interface LoginProps {
  setIsSignupForm: (open: boolean) => void;
  setIsAuthModal: (open: boolean) => void;
}

const Login = ({
  setIsSignupForm,
}: // setIsAuthModal
LoginProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthValidator>({
    resolver: zodResolver(AuthValidator),
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useAppDispatch();

  const SignupFormHandler = () => {
    setIsSignupForm(true);
  };

  const onSubmit: SubmitHandler<TAuthValidator> = async () => {
    // event?.preventDefault();
    console.log(email);
    console.log(password);
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      console.log("before dispatch");
    } catch (error) {
      if (error && typeof error === "string") {
        if (error.includes("email-already-in-use")) {
          setError(
            "Email is already in use. Please use a different email address."
          );
        }
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1 py-4">
            <label htmlFor="email">Email</label>
            <Input
              {...register("email")}
              className={`focus-visible:ring-red-500${errors.email}`}
              placeholder="you@example.com"
              onChange={(event) => setEmail(event.target.value)}
            />
            {errors?.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="grid gap-1 py-4 pb-8">
            <label htmlFor="password">Password</label>
            <Input
              {...register("password")}
              type="password"
              className={`
                "focus-visible:ring-red-500" ${errors.password},
                `}
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
            {errors?.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="pb-8">
            <button
              type="submit"
              className="mb-2 px-4 py-2 w-full text-white rounded-md bg-rose-500 hover:bg-rose-600"
            >
              Log in
            </button>
            {error && (
              <p className="text-red-500 text-lg text-center">{error}</p>
            )}
            <button
              className=" w-full bg-white border border-rose-500 hover:bg-rose-100 rounded-md px-4 py-2 text-rose-600"
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
