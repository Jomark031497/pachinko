import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/Button";
import { Dialog } from "~/components/ui/Dialog";
import { __QUERY_KEYS__ } from "~/constants";
import { deleteAccount } from "~/features/accounts/accounts.api";
import { type Account } from "~/features/accounts/accounts.schema";
import { queryClient } from "~/lib/queryClient";

interface DeleteAccountDialogProps {
  isOpen: boolean;
  onClose: () => void;
  account: Account;
}

const DeleteAccountDialog = ({ isOpen, onClose, account }: DeleteAccountDialogProps) => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (accountId: Account["id"]) => deleteAccount(accountId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [__QUERY_KEYS__.USER_ACCOUNTS] });
      queryClient.invalidateQueries({ queryKey: [__QUERY_KEYS__.USER_TRANSACTIONS] });

      onClose();
      toast.success("account deleted successfully");
      navigate("/");
    },
    onError: (error) => {
      console.error("Failed to delete account:", error);
      toast.error("Failed to delete account");
    },
  });

  const handleDeleteAccount = () => {
    mutation.mutate(account.id);
  };

  return (
    <Dialog title="Delete Account" isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Are you sure you want to delete <strong>{account.name}</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="error" onClick={handleDeleteAccount}>
            Delete
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteAccountDialog;
