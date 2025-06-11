import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "~/components/ui/Button";
import { Dialog } from "~/components/ui/Dialog";
import { Input } from "~/components/ui/Input";
import { Select } from "~/components/ui/Select";
import { __QUERY_KEYS__ } from "~/constants";
import { createAccount } from "~/features/accounts/accounts.api";
import {
  ACCOUNT_TYPE,
  createAccountSchema,
  type Account,
  type CreateAccountInput,
} from "~/features/accounts/accounts.schema";
import { queryClient } from "~/lib/queryClient";

interface CreateAccountDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userId: Account["userId"];
}

const CreateAccountDialog = ({ isOpen, onClose, userId }: CreateAccountDialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateAccountInput>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      userId,
      balance: "0.00",
    },
  });

  const mutation = useMutation({
    mutationFn: (payload: CreateAccountInput) => createAccount(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [__QUERY_KEYS__.USER_ACCOUNTS] });
      queryClient.invalidateQueries({ queryKey: [__QUERY_KEYS__.USER_TRANSACTIONS] });
      queryClient.invalidateQueries({ queryKey: [__QUERY_KEYS__.USER_SUMMARY] });

      onClose();
      reset();
      toast.success("account created successfully");
    },
    onError: (error) => {
      console.error("Failed to create account:", error);
      toast.error("create account failed");
    },
  });

  const onSubmit: SubmitHandler<CreateAccountInput> = (payload) => {
    mutation.mutate(payload);
  };

  return (
    <Dialog title="create Account" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-4 gap-4">
        <Input
          label="name*"
          containerClassName="col-span-4"
          placeholder="ex. wallet, credit card, emergency funds"
          {...register("name")}
          error={errors.name?.message}
          autoFocus
        />

        <Input
          label="icon"
          containerClassName="col-span-2"
          placeholder="ex. 💸, 💰, 💳"
          {...register("icon")}
          error={errors.icon?.message}
        />

        <Select label="type*" containerClassName="col-span-2" {...register("type")} error={errors.type?.message}>
          {ACCOUNT_TYPE.map((item) => (
            <option key={item} value={item}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </option>
          ))}
        </Select>

        <Input
          label="balance"
          type="number"
          step="0.01"
          {...register("balance")}
          error={errors.balance?.message}
          containerClassName="col-span-4"
        />

        <Button type="submit" className="col-span-2 col-start-2 px-8" disabled={mutation.isPending || isSubmitting}>
          create
        </Button>
      </form>
    </Dialog>
  );
};

export default CreateAccountDialog;
