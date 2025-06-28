import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { Select } from "~/components/ui/Select";
import { useAuth } from "~/features/auth/hooks/useAuth";
import { updateUser } from "~/features/users/users.api";
import { CURRENCY, updateUserSchema, type UpdateUserInput } from "~/features/users/users.schema";

const UserSettings = () => {
  const { user, setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      currency: user?.currency,
      fullName: user?.fullName,
    },
  });

  const mutation = useMutation({
    mutationFn: (payload: UpdateUserInput) => updateUser(user!.id, payload),
    onSuccess: (payload) => {
      setUser(payload);
      toast.success("user updated successfully");
    },
    onError: (error) => {
      console.error("Failed to update user:", error);
      toast.error("update user failed");
    },
  });

  const onSubmit: SubmitHandler<UpdateUserInput> = (payload) => {
    mutation.mutate(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input label="Name" {...register("fullName")} error={errors.fullName?.message} autoFocus />

      <Select label="Type" {...register("currency")} error={errors.currency?.message}>
        {CURRENCY.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </Select>

      <Button type="submit" disabled={mutation.isPending || isSubmitting}>
        Update
      </Button>
    </form>
  );
};

export default UserSettings;
