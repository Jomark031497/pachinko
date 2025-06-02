import { lazy, Suspense } from "react";
import { Navigate } from "react-router";
import { Button } from "~/components/ui/Button";
import { useAuth } from "~/features/auth/hooks/useAuth";
import { useToggle } from "~/hooks/useToggle";
import AccountsList from "~/features/accounts/components/AccountsList";
import UserTransactionsList from "~/features/transactions/components/UserTransactionList";

const CreateAccountDialog = lazy(() => import("~/features/accounts/components/CreateAccountDialog"));
const CreateTransactionDialog = lazy(() => import("~/features/transactions/components/CreateTransactionDialog"));

export const Dashboard = () => {
  const { user, isLoading: isAuthLoading } = useAuth();

  const { open: openCreateAccount, close: closeCreateAccount, isOpen: isCreateAccountOpen } = useToggle();
  const { open: openCreateTransaction, close: closeCreateTransaction, isOpen: isCreateTransactionOpen } = useToggle();

  if (isAuthLoading) return <div className="p-4 text-center text-gray-600">Loading user data...</div>;

  if (!user) return <Navigate to="/login" replace />;

  return (
    <>
      <div className="flex flex-col gap-8">
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-textSecondary text-lg font-semibold">accounts</h3>

            <Button onClick={openCreateAccount} className="px-2 py-1.5 text-xs">
              add account
            </Button>
          </div>

          <AccountsList userId={user.id} />
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-textSecondary text-lg font-semibold">recent transactions</h3>
            <Button onClick={openCreateTransaction} className="px-2 py-1.5 text-xs">
              create transaction
            </Button>
          </div>

          <UserTransactionsList userId={user.id} />
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
