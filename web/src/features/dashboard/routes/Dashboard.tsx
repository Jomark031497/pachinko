import { lazy, Suspense } from "react";
import { Navigate } from "react-router";
import { Button } from "~/components/ui/Button";
import { useAuth } from "~/features/auth/hooks/useAuth";
import { useToggle } from "~/hooks/useToggle";

const CreateAccountDialog = lazy(() => import("~/features/accounts/components/CreateAccountDialog"));
const AccountsList = lazy(() => import("~/features/accounts/components/AccountsList"));

export const Dashboard = () => {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { open: openCreateAccount, close: closeCreateAccount, isOpen: isCreateAccountOpen } = useToggle();

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
      </div>

      <Suspense fallback={null}>
        <CreateAccountDialog isOpen={isCreateAccountOpen} onClose={closeCreateAccount} userId={user.id} />
      </Suspense>
    </>
  );
};
