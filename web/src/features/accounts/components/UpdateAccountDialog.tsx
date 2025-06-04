import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "~/components/ui/Button";
import { Dialog } from "~/components/ui/Dialog";
import { Input } from "~/components/ui/Input";
import { Select } from "~/components/ui/Select";
import { __QUERY_KEYS__ } from "~/constants";
import { updateAccount } from "~/features/accounts/accounts.api";
import {
  ACCOUNT_TYPE,
  updateAccountSchema,
  type Account,
  type UpdateAccountInput,
} from "~/features/accounts/accounts.schema";
import { queryClient } from "~/lib/queryClient";

interface UpdateAccountDialogProps {
  isOpen: boolean;
  onClose: () => void;
  account: Account;
}

const UpdateAccountDialog = ({ isOpen, onClose, account }: UpdateAccountDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateAccountInput>({
    resolver: zodResolver(updateAccountSchema),
    defaultValues: {
      balance: account.balance,
      name: account.name,
      type: account.type,
    },
  });

  const mutation = useMutation({
    mutationFn: (payload: UpdateAccountInput) => updateAccount(account.id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [__QUERY_KEYS__.ACCOUNT] });
      onClose();
      toast.success("account updated successfully");
    },
    onError: (error) => {
      console.error("Failed to update account:", error);
      toast.error("update account failed");
    },
  });

  const onSubmit: SubmitHandler<UpdateAccountInput> = (payload) => {
    mutation.mutate(payload);
  };

  return (
    <Dialog title="Update Account" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input label="Name" {...register("name")} error={errors.name?.message} autoFocus />

        <Select label="Type" {...register("type")} error={errors.type?.message}>
          {ACCOUNT_TYPE.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>

        <Button type="submit" disabled={mutation.isPending || isSubmitting}>
          Update
        </Button>
      </form>
    </Dialog>
  );
};

export default UpdateAccountDialog;
