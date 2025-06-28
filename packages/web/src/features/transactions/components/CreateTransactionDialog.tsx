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
import { createTransaction } from "~/features/transactions/transactions.api";
import {
  createTransactionSchema,
  TRANSACTION_TYPES,
  type CreateTransactionInput,
  type Transaction,
} from "~/features/transactions/transactions.schema";
import { queryClient } from "~/lib/queryClient";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userId: Transaction["userId"];
  accountId?: Transaction["accountId"];
}

const CreateTransactionDialog = ({ isOpen, onClose, userId, accountId }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateTransactionInput>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      type: "income",
      userId,
      transactionDate: new Date(format(new Date(), "MM dd yyyy")),
      accountId,
      amount: "0.00",
    },
  });

  const transactionType = watch("type");

  const { data: categories } = useUserCategories(userId, transactionType);
  const { data: accounts } = useUserAccounts(userId);

  const mutation = useMutation({
    mutationFn: (payload: CreateTransactionInput) => createTransaction(payload),
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: [__QUERY_KEYS__.USER_ACCOUNTS] });
      queryClient.invalidateQueries({ queryKey: [__QUERY_KEYS__.USER_TRANSACTIONS] });
      queryClient.invalidateQueries({ queryKey: [__QUERY_KEYS__.USER_SUMMARY] });

      toast.success("transaction created successfully");
      onClose();
    },
  });

  const onSubmit: SubmitHandler<CreateTransactionInput> = (values) => {
    mutation.mutate(values);
  };

  return (
    <Dialog title="Create Transaction" isOpen={isOpen} onClose={onClose}>
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
              {item.name}
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
          Create
        </Button>
      </form>
    </Dialog>
  );
};

export default CreateTransactionDialog;
