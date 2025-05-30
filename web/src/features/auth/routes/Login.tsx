import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { useAuth } from "~/features/auth/hooks/useAuth";
import { Link, Navigate, useNavigate } from "react-router";
import { loginSchema, type LoginInputs } from "~/features/auth/auth.schema";

export const Login = () => {
  const navigate = useNavigate();

  const { handleLogin, user } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
  });

  if (user) return <Navigate to="/" replace />;

  const onSubmit: SubmitHandler<LoginInputs> = async (values) => {
    try {
      await handleLogin(values);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        setError("username", { message: error.message });
        setError("password", { message: error.message });
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-md flex-col gap-4 rounded border border-gray-200 bg-white p-8 shadow"
      >
        <h1 className="text-primary text-2xl font-semibold">Login to Claremont</h1>

        <Input label="username" {...register("username")} error={errors.username?.message} />
        <Input label="password" type="password" {...register("password")} error={errors.password?.message} />

        <Button type="submit" className="self-center">
          Login
        </Button>

        <p className="mt-4 text-center text-gray-500 italic">
          no account yet?{" "}
          <Link to="/sign-up" className="font-semibold text-blue-500">
            sign up
          </Link>
        </p>
      </form>
    </>
  );
};
