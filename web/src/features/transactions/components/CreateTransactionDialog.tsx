import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "~/components/ui/Button";
import { Dialog } from "~/components/ui/Dialog";
import { Input } from "~/components/ui/Input";
import { Select } from "~/components/ui/Select";
import useUserCategories from "~/features/categories/hooks/useUserCategories";
import {
  createTransactionSchema,
  TRANSACTION_TYPES,
  type CreateTransactionInput,
  type Transaction,
} from "~/features/transactions/transactions.schema";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userId: Transaction["userId"];
}

const CreateTransactionDialog = ({ isOpen, onClose, userId }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateTransactionInput>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      type: "income",
    },
  });

  const transactionType = watch("type");

  const { data: categories } = useUserCategories(userId, transactionType);

  const mutation = useMutation({});

  const onSubmit: SubmitHandler<CreateTransactionInput> = (values) => {
    console.log(values);
  };

  return (
    <Dialog title="Create Transaction" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input label="Name" {...register("name")} error={errors.name?.message} />
        <Input label="Amount" type="number" step="0.01" {...register("amount")} error={errors.amount?.message} />

        <Select label="Type" {...register("type")} error={errors.type?.message}>
          {TRANSACTION_TYPES.map((item) => (
            <option key={item} value={item}>
              {item}
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

        <Button type="submit" disabled={mutation.isPending || isSubmitting}>
          Create
        </Button>
      </form>
    </Dialog>
  );
};

export default CreateTransactionDialog;
