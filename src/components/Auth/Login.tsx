// import { Label } from "../ui/label";
import { Input } from "../ui/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AuthValidator,
  type TAuthValidator,
} from "../../lib/validators/account-validator";

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
    // handleSubmit,
    formState: { errors },
  } = useForm<TAuthValidator>({
    resolver: zodResolver(AuthValidator),
  });

  const SignupFormHandler = () => {
    setIsSignupForm(true);
  };

  //   const onSubmit = ({ email, password }: TAuthValidator) => {
  //     mutate({ email, password });
  //   };

  return (
    <>
      <form
      //   onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid gap-2">
          <div className="grid gap-1 py-4">
            <label htmlFor="email">Email</label>
            <Input
              {...register("email")}
              className={`focus-visible:ring-red-500${errors.email}`}
              placeholder="you@example.com"
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
            />
            {errors?.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="pb-8">
            <button className="mb-2 px-4 py-2 w-full text-white rounded-md bg-rose-500 hover:bg-rose-600">
              Log in
            </button>
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
