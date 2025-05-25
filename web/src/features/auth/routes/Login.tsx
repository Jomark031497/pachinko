import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { useAuth } from "~/features/auth/hooks/useAuth";
import { Navigate, useNavigate } from "react-router";

const loginSchema = z.object({
  username: z
    .string()
    .min(3, "username must be atleast 3 characters long")
    .max(256, "username must not exceed 256 characters"),
  password: z
    .string()
    .min(6, "password must be atleast 6 characters long")
    .max(256, "password must not exceed 256 characters"),
});

export type LoginCredentials = z.infer<typeof loginSchema>;

export const Login = () => {
  const navigate = useNavigate();

  const { handleLogin, user } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });

  if (user) return <Navigate to="/" replace />;

  const onSubmit: SubmitHandler<LoginCredentials> = async (values) => {
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
    <main className="bg-background flex h-screen items-center justify-center rounded border p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-md flex-col gap-4 bg-white p-4 shadow">
        <h1 className="text-2xl">Login</h1>

        <Input label="username" {...register("username")} error={errors.username?.message} />
        <Input label="password" type="password" {...register("password")} error={errors.password?.message} />

        <Button type="submit" className="self-center">
          Login
        </Button>
      </form>
    </main>
  );
};
