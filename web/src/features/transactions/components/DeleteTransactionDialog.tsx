import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/Button";
import { Dialog } from "~/components/ui/Dialog";
import { __QUERY_KEYS__ } from "~/constants";
import { deleteTransaction } from "~/features/transactions/transactions.api";
import type { Transaction } from "~/features/transactions/transactions.schema";
import { queryClient } from "~/lib/queryClient";

interface DeleteTransactionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction;
}

const DeleteTransactionDialog = ({ isOpen, onClose, transaction }: DeleteTransactionDialogProps) => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (id: Transaction["id"]) => deleteTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [__QUERY_KEYS__.TRANSACTION] });
      onClose();
      toast.success("transaction deleted successfully");
      navigate("/");
    },
    onError: (error) => {
      console.error("Failed to delete transaction:", error);
      toast.error("Failed to delete transaction");
    },
  });

  const handleDeleteTransaction = () => {
    mutation.mutate(transaction.id);
  };

  return (
    <Dialog title="Delete Transaction" isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Are you sure you want to delete <strong>{transaction.name}</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="error" onClick={handleDeleteTransaction}>
            Delete
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteTransactionDialog;
