import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { signUpSchema, type SignUpInputs } from "~/features/auth/auth.schema";
import { useAuth } from "~/features/auth/hooks/useAuth";
import { ApiError } from "~/utils/errors";

export const SignUp = () => {
  const navigate = useNavigate();

  const { handleSignUp } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<SignUpInputs>({
    resolver: zodResolver(signUpSchema),
  });

  const mutation = useMutation({
    mutationFn: (payload: SignUpInputs) => handleSignUp(payload),
    onSuccess: () => {
      toast.success("Sign up successful!");
      reset();
      navigate("/");
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        // TODO: disgusting hack. sorry future me
        Object.keys(error.details!).forEach((key) => {
          const value = error.details![key];

          setError(key as keyof SignUpInputs, {
            message: value as string,
          });
        });
      }
    },
  });

  const onSubmit: SubmitHandler<SignUpInputs> = (values) => {
    mutation.mutate(values);
  };

  return (
    <main className="bg-background flex h-screen items-center justify-center border p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-md flex-col gap-4 rounded border border-gray-200 bg-white p-8 shadow"
      >
        <h1 className="text-2xl font-semibold">Sign up to Claremont</h1>

        <Input label="username" {...register("username")} error={errors.username?.message} />
        <Input label="email" {...register("email")} error={errors.email?.message} />
        <Input label="password" type="password" {...register("password")} error={errors.password?.message} />

        <Button type="submit" className="self-center">
          Sign Up
        </Button>

        <p className="mt-4 text-center text-gray-500 italic">
          already have an account?{" "}
          <Link to="/login" className="font-semibold text-blue-500">
            login
          </Link>
        </p>
      </form>
    </main>
  );
};
