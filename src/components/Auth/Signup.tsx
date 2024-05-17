import { Input } from "../ui/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AuthValidator,
  type TAuthValidator,
} from "../../lib/validators/account-validator";
import { User, signupUser } from "../../store/redux/user-slice";
// import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../store/redux/hooks";
import { useState } from "react";
// import { ZodError } from "zod";
import { v4 as uuidv4 } from "uuid";
import { Loader2 } from "lucide-react";

interface SignupProps {
  setIsThanks: (open: boolean) => void;
  setAuthIsVisible: (open: boolean) => void;
  setIsSignupForm: (open: boolean) => void;
}

const Signup = ({
  setIsThanks,
  setAuthIsVisible,
  setIsSignupForm,
}: SignupProps) => {
  const [error, setError] = useState<string>("");

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.users);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthValidator>({
    resolver: zodResolver(AuthValidator),
  });

  const loginFormHandler = () => {
    setIsSignupForm(false);
  };

  const onSubmit: SubmitHandler<
    TAuthValidator & { id: string } & { role: string }
  > = async (data: User, event) => {
    event?.preventDefault();

    try {
      await dispatch(
        signupUser({
          id: data.id,
          email: data.email,
          password: data.password,
          role: data.role,
        })
      ).unwrap();
      // console.log(user);
      setAuthIsVisible(false);
      setIsThanks(true);
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
    <form
      onSubmit={handleSubmit((data) =>
        onSubmit({ id: uuidv4(), role: "user", ...data })
      )}
    >
      <div className="grid gap-2">
        <div className="grid gap-1 py-2">
          <label htmlFor="email">Email</label>
          <Input
            {...register("email")}
            className={`focus-visible:ring-red-500 ${errors.email}
          `}
            placeholder="you@example.com"
          />
          {errors?.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <div className="grid gap-1 py-2 pb-8">
          <label htmlFor="password">Password</label>
          <Input
            {...register("password")}
            type="password"
            className={`
              focus-visible:ring-red-500 ${errors.password}
           `}
            placeholder="Password"
          />
          {errors?.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="flex flex-row items-center justify-center mb-2 px-4 py-2 w-full text-white rounded-md bg-rose-500 hover:bg-rose-600"
          >
            {loading ? (
              <Loader2 className="mr-2 h-6 w-4 text-center animate-spin" />
            ) : (
              "Signup"
            )}
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
            onClick={loginFormHandler}
          >
            Log in
          </button>
        </div>
      </div>
    </form>
  );
};

export default Signup;
