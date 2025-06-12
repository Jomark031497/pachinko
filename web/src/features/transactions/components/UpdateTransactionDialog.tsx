import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "~/components/ui/Button";
import DatePicker from "~/components/ui/Datepicker";
import { Dialog } from "~/components/ui/Dialog";
import { Input } from "~/components/ui/Input";
import { Select } from "~/components/ui/Select";
import { __QUERY_KEYS__ } from "~/constants";
import useUserAccounts from "~/features/accounts/hooks/useUserAccounts";
import useUserCategories from "~/features/categories/hooks/useUserCategories";
import { updateTransaction } from "~/features/transactions/transactions.api";
import {
  TRANSACTION_TYPES,
  updateTransactionSchema,
  type Transaction,
  type UpdateTransactionInput,
} from "~/features/transactions/transactions.schema";
import { queryClient } from "~/lib/queryClient";

interface UpdateTransactionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction;
}

const UpdateTransactionDialog = ({ isOpen, onClose, transaction }: UpdateTransactionDialogProps) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<UpdateTransactionInput>({
    resolver: zodResolver(updateTransactionSchema),
    defaultValues: {
      accountId: transaction.accountId,
      amount: transaction.amount,
      categoryId: transaction.categoryId,
      description: transaction.description ?? "",
      name: transaction.name,
      transactionDate: new Date(format(transaction.transactionDate, "MM/dd/yyyy")),
      type: transaction.type ?? "income",
    },
  });

  const transactionType = watch("type") ?? "income";

  const { data: categories } = useUserCategories(transaction.userId, transactionType);
  const { data: accounts } = useUserAccounts(transaction.userId);

  const mutation = useMutation({
    mutationFn: (payload: UpdateTransactionInput) => updateTransaction(transaction.id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [__QUERY_KEYS__.TRANSACTION] });
      onClose();
      toast.success("transaction updated successfully");
    },
    onError: (error) => {
      console.error("Failed to update transaction:", error);
      toast.error("update transaction failed");
    },
  });

  const onSubmit: SubmitHandler<UpdateTransactionInput> = (payload) => {
    mutation.mutate(payload);
  };

  return (
    <Dialog title="Update Transaction" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input label="Name" {...register("name")} error={errors.name?.message} autoFocus />

        <Input label="Amount" type="number" step="0.01" {...register("amount")} error={errors.amount?.message} />

        <Select label="Type" {...register("type")} error={errors.type?.message}>
          {TRANSACTION_TYPES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>

        <Select label="Account" {...register("accountId")} error={errors.accountId?.message}>
          {accounts?.data?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.type} - {item.name}
            </option>
          ))}
        </Select>

        <Select label="Category" {...register("categoryId")} error={errors.categoryId?.message}>
          {categories?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </Select>

        <Controller
          control={control}
          name="transactionDate"
          render={({ field }) => (
            <DatePicker
              label="Transaction Date"
              placeholderText="Select date"
              onChange={(date) => field.onChange(date)}
              selected={field.value}
            />
          )}
        />

        <Button type="submit" disabled={mutation.isPending || isSubmitting}>
          Update
        </Button>
      </form>
    </Dialog>
  );
};

export default UpdateTransactionDialog;
