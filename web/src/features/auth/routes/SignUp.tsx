import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { signUpSchema, type SignUpInputs } from "~/features/auth/auth.schema";
import { useAuth } from "~/features/auth/hooks/useAuth";

export const SignUp = () => {
  const navigate = useNavigate();

  const { handleSignUp } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpInputs>({
    resolver: zodResolver(signUpSchema),
  });

  const mutation = useMutation({
    mutationFn: (payload: SignUpInputs) => handleSignUp(payload),
    onSuccess: () => {
      toast.success("sign up success");
      reset();
      navigate("/");
    },
    onError: (error) => {
      console.error("Failed to create user:", error);
      toast.error("sign up failed");
    },
  });

  const onSubmit: SubmitHandler<SignUpInputs> = (values) => {
    mutation.mutate(values);
  };

  return (
    <main className="bg-background flex h-screen items-center justify-center rounded border p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-md flex-col gap-4 bg-white p-4 shadow">
        <h1 className="text-2xl">Sign Up</h1>

        <Input label="username" {...register("username")} error={errors.username?.message} />
        <Input label="email" {...register("email")} error={errors.email?.message} />
        <Input label="full name" {...register("fullName")} error={errors.fullName?.message} />
        <Input label="password" type="password" {...register("password")} error={errors.password?.message} />

        <Button type="submit" className="self-center">
          Sign Up
        </Button>

        <p>
          <Link to="/login">Login</Link>
        </p>
      </form>
    </main>
  );
};
