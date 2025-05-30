import { lazy, Suspense } from "react";
import { Navigate } from "react-router";
import { Button } from "~/components/ui/Button";
import { useAuth } from "~/features/auth/hooks/useAuth";
import TransactionsList from "~/features/transactions/components/TransactionsList";
import useTransactionsByUserId from "~/features/transactions/hooks/useTransactionsByUserId";
import { useToggle } from "~/hooks/useToggle";

const CreateAccountDialog = lazy(() => import("~/features/accounts/components/CreateAccountDialog"));
const CreateTransactionDialog = lazy(() => import("~/features/transactions/components/CreateTransactionDialog"));
const AccountsList = lazy(() => import("~/features/accounts/components/AccountsList"));

export const Dashboard = () => {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { open: openCreateAccount, close: closeCreateAccount, isOpen: isCreateAccountOpen } = useToggle();
  const { open: openCreateTransaction, close: closeCreateTransaction, isOpen: isCreateTransactionOpen } = useToggle();

  const { data: transactions } = useTransactionsByUserId(user?.id || "");

  if (isAuthLoading) {
    return <div className="p-4 text-center text-gray-600">Loading user data...</div>;
  }

  if (!user) return <Navigate to="/login" replace />;

  return (
    <>
      <div className="flex flex-col gap-8">
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-gray-500">Accounts</h3>

            <Button onClick={openCreateAccount}>Create</Button>
          </div>

          <Suspense fallback={<>Loading...</>}>
            <AccountsList userId={user.id} />
          </Suspense>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-gray-500">Transactions</h3>

            <Button onClick={openCreateTransaction}>Create Txn</Button>
          </div>

          <Suspense fallback={<>Loading...</>}>
            <TransactionsList transactions={transactions} />
          </Suspense>
        </section>
      </div>

      <Suspense fallback={null}>
        <CreateAccountDialog isOpen={isCreateAccountOpen} onClose={closeCreateAccount} userId={user.id} />
      </Suspense>

      <Suspense fallback={null}>
        <CreateTransactionDialog isOpen={isCreateTransactionOpen} onClose={closeCreateTransaction} userId={user.id} />
      </Suspense>
    </>
  );
};
